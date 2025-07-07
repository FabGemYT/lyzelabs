from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import sys
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime
import json

# Add current directory to Python path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import our payment and notification modules
from payment_clients import paypal_client, cryptomus_client, nowpayments_client
from models import (
    StatusCheck, StatusCheckCreate, Order, Payment, CreateOrderRequest, PaymentResponse, 
    PaymentMethod, PaymentStatus, OrderStatus, OrderItem, ShippingAddress
)
from notification_service import notification_service

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# ============= PAYMENT AND ORDER ROUTES =============

@api_router.post("/orders", response_model=PaymentResponse)
async def create_order(order_request: CreateOrderRequest):
    """Create a new order and initiate payment"""
    try:
        # Generate order ID
        order_id = f"LZ{datetime.now().strftime('%Y%m%d')}{str(uuid.uuid4())[:8].upper()}"
        
        # Calculate totals
        subtotal = sum(item.total_price for item in order_request.items)
        shipping_cost = 0.0 if subtotal >= 100 else 15.0  # Free shipping over $100
        total_amount = subtotal + shipping_cost
        
        # Create order object
        order = Order(
            _id=order_id,
            order_id=order_id,
            customer_email=order_request.customer_email,
            customer_phone=order_request.customer_phone,
            items=order_request.items,
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            total_amount=total_amount,
            shipping_address=order_request.shipping_address,
            payment_method=order_request.payment_method,
            notes=order_request.notes
        )
        
        # Save order to database
        order_dict = order.dict(by_alias=True)
        order_dict["_id"] = order_id
        await db.orders.insert_one(order_dict)
        
        # Create payment
        payment_id = f"PAY{datetime.now().strftime('%Y%m%d')}{str(uuid.uuid4())[:8].upper()}"
        payment = Payment(
            _id=payment_id,
            payment_id=payment_id,
            order_id=order_id,
            payment_method=order_request.payment_method,
            amount=total_amount,
            pay_currency=order_request.pay_currency
        )
        
        # Initialize payment with chosen gateway
        payment_url = None
        if order_request.payment_method == PaymentMethod.PAYPAL:
            paypal_response = await paypal_client.create_order({
                "order_id": order_id,
                "amount": total_amount,
                "currency": "USD",
                "items": [
                    {
                        "name": item.name,
                        "quantity": str(item.quantity),
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": f"{item.unit_price:.2f}"
                        }
                    } for item in order_request.items
                ]
            })
            
            payment.gateway_payment_id = paypal_response.id
            payment.gateway_response = paypal_response.__dict__
            payment_url = next((link.href for link in paypal_response.links if link.rel == "approve"), None)
            
        elif order_request.payment_method == PaymentMethod.CRYPTOMUS:
            cryptomus_response = await cryptomus_client.create_invoice({
                "order_id": order_id,
                "amount": total_amount,
                "currency": "USD"
            })
            
            if cryptomus_response.get("state") == 0:  # Success
                payment.gateway_payment_id = cryptomus_response["result"]["uuid"]
                payment.gateway_response = cryptomus_response
                payment_url = cryptomus_response["result"]["url"]
            else:
                raise HTTPException(status_code=400, detail="Failed to create Cryptomus payment")
                
        elif order_request.payment_method == PaymentMethod.NOWPAYMENTS:
            if not order_request.pay_currency:
                raise HTTPException(status_code=400, detail="pay_currency required for crypto payments")
                
            nowpayments_response = await nowpayments_client.create_payment({
                "order_id": order_id,
                "amount": total_amount,
                "pay_currency": order_request.pay_currency.lower(),
                "price_currency": "usd",
                "customer_email": order_request.customer_email,
                "description": f"Lyze Labs Order {order_id}"
            })
            
            payment.gateway_payment_id = nowpayments_response.get("payment_id")
            payment.gateway_response = nowpayments_response
            payment.pay_amount = nowpayments_response.get("pay_amount")
            payment.pay_currency = nowpayments_response.get("pay_currency")
            payment.pay_address = nowpayments_response.get("pay_address")
            payment_url = nowpayments_response.get("invoice_url")
        
        # Save payment to database
        payment_dict = payment.dict(by_alias=True)
        payment_dict["_id"] = payment_id
        await db.payments.insert_one(payment_dict)
        
        # Send new order notification
        await notification_service.notify_new_order(order_dict)
        
        return PaymentResponse(
            success=True,
            payment_id=payment_id,
            order_id=order_id,
            gateway_payment_id=payment.gateway_payment_id,
            payment_url=payment_url,
            amount=total_amount,
            currency="USD",
            status=payment.status.value,
            pay_amount=payment.pay_amount,
            pay_currency=payment.pay_currency,
            pay_address=payment.pay_address
        )
        
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    """Get order details"""
    try:
        order = await db.orders.find_one({"_id": order_id})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        payment = await db.payments.find_one({"order_id": order_id})
        
        return {
            "order": order,
            "payment": payment
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting order: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/payments/{payment_id}/status")
async def get_payment_status(payment_id: str):
    """Get payment status"""
    try:
        payment = await db.payments.find_one({"_id": payment_id})
        if not payment:
            raise HTTPException(status_code=404, detail="Payment not found")
        
        # Get latest status from gateway
        if payment["payment_method"] == PaymentMethod.PAYPAL:
            if payment.get("gateway_payment_id"):
                paypal_order = await paypal_client.get_order(payment["gateway_payment_id"])
                # Update status based on PayPal response
                if paypal_order.status == "COMPLETED":
                    payment["status"] = PaymentStatus.COMPLETED
                elif paypal_order.status == "APPROVED":
                    payment["status"] = PaymentStatus.PROCESSING
                    
        elif payment["payment_method"] == PaymentMethod.NOWPAYMENTS:
            if payment.get("gateway_payment_id"):
                nowpayments_status = await nowpayments_client.get_payment_status(payment["gateway_payment_id"])
                if nowpayments_status.get("payment_status") == "finished":
                    payment["status"] = PaymentStatus.COMPLETED
                elif nowpayments_status.get("payment_status") == "failed":
                    payment["status"] = PaymentStatus.FAILED
        
        # Update database if status changed
        await db.payments.update_one(
            {"_id": payment_id},
            {"$set": {"status": payment["status"], "updated_at": datetime.utcnow()}}
        )
        
        return {"payment": payment}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting payment status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ============= PAYMENT WEBHOOKS =============

@api_router.post("/payments/paypal/capture/{order_id}")
async def capture_paypal_payment(order_id: str):
    """Capture PayPal payment"""
    try:
        payment = await db.payments.find_one({"order_id": order_id})
        if not payment:
            raise HTTPException(status_code=404, detail="Payment not found")
        
        captured_order = await paypal_client.capture_order(payment["gateway_payment_id"])
        
        # Update payment status
        await db.payments.update_one(
            {"order_id": order_id},
            {
                "$set": {
                    "status": PaymentStatus.COMPLETED,
                    "updated_at": datetime.utcnow(),
                    "gateway_response": captured_order.__dict__
                }
            }
        )
        
        # Update order status
        await db.orders.update_one(
            {"_id": order_id},
            {
                "$set": {
                    "payment_status": PaymentStatus.COMPLETED,
                    "order_status": OrderStatus.PROCESSING,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        # Send payment completed notification
        order = await db.orders.find_one({"_id": order_id})
        await notification_service.notify_payment_completed(order, payment)
        
        return {"success": True, "order_id": captured_order.id}
        
    except Exception as e:
        logger.error(f"Error capturing PayPal payment: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/payments/cryptomus/webhook")
async def cryptomus_webhook(request: Request):
    """Handle Cryptomus webhook"""
    try:
        body = await request.body()
        webhook_data = json.loads(body.decode('utf-8'))
        signature = request.headers.get("sign", "")
        
        if not signature or not cryptomus_client.verify_webhook_signature(webhook_data, signature):
            raise HTTPException(status_code=400, detail="Invalid signature")
        
        order_id = webhook_data.get("order_id")
        status = webhook_data.get("status")
        
        if not order_id:
            raise HTTPException(status_code=400, detail="Missing order_id")
        
        # Update payment status
        if status == "paid":
            await db.payments.update_one(
                {"order_id": order_id},
                {
                    "$set": {
                        "status": PaymentStatus.COMPLETED,
                        "updated_at": datetime.utcnow(),
                        "webhook_data": webhook_data
                    }
                }
            )
            
            # Update order status
            await db.orders.update_one(
                {"_id": order_id},
                {
                    "$set": {
                        "payment_status": PaymentStatus.COMPLETED,
                        "order_status": OrderStatus.PROCESSING,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            
            # Send notifications
            order = await db.orders.find_one({"_id": order_id})
            payment = await db.payments.find_one({"order_id": order_id})
            await notification_service.notify_payment_completed(order, payment)
        
        return {"status": "OK"}
        
    except Exception as e:
        logger.error(f"Cryptomus webhook error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/payments/nowpayments/webhook")
async def nowpayments_webhook(request: Request):
    """Handle NOWPayments webhook"""
    try:
        body = await request.body()
        signature = request.headers.get("x-nowpayments-sig")
        
        if not nowpayments_client.verify_ipn_signature(body.decode('utf-8'), signature):
            raise HTTPException(status_code=400, detail="Invalid signature")
        
        webhook_data = json.loads(body.decode('utf-8'))
        order_id = webhook_data.get("order_id")
        status = webhook_data.get("payment_status")
        
        # Update payment status
        if status == "finished":
            payment_status = PaymentStatus.COMPLETED
        elif status == "failed":
            payment_status = PaymentStatus.FAILED
        else:
            payment_status = PaymentStatus.PROCESSING
        
        await db.payments.update_one(
            {"order_id": order_id},
            {
                "$set": {
                    "status": payment_status,
                    "updated_at": datetime.utcnow(),
                    "webhook_data": webhook_data
                }
            }
        )
        
        # Update order status
        if payment_status == PaymentStatus.COMPLETED:
            await db.orders.update_one(
                {"_id": order_id},
                {
                    "$set": {
                        "payment_status": PaymentStatus.COMPLETED,
                        "order_status": OrderStatus.PROCESSING,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            
            # Send notifications
            order = await db.orders.find_one({"_id": order_id})
            payment = await db.payments.find_one({"order_id": order_id})
            await notification_service.notify_payment_completed(order, payment)
        
        return {"status": "OK"}
        
    except Exception as e:
        logger.error(f"NOWPayments webhook error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ============= ADMIN ROUTES =============

@api_router.get("/admin/orders")
async def get_all_orders(
    limit: int = 50, 
    skip: int = 0, 
    status: Optional[str] = None,
    payment_method: Optional[str] = None
):
    """Get all orders for admin dashboard"""
    try:
        filter_query = {}
        if status:
            filter_query["order_status"] = status
        if payment_method:
            filter_query["payment_method"] = payment_method
        
        orders = await db.orders.find(filter_query).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        
        # Get payment info for each order
        for order in orders:
            payment = await db.payments.find_one({"order_id": order["_id"]})
            order["payment_info"] = payment
        
        total_orders = await db.orders.count_documents(filter_query)
        
        return {
            "orders": orders,
            "total": total_orders,
            "limit": limit,
            "skip": skip
        }
        
    except Exception as e:
        logger.error(f"Error getting orders: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/stats")
async def get_admin_stats():
    """Get admin dashboard statistics"""
    try:
        # Order statistics
        total_orders = await db.orders.count_documents({})
        pending_orders = await db.orders.count_documents({"order_status": OrderStatus.PENDING})
        processing_orders = await db.orders.count_documents({"order_status": OrderStatus.PROCESSING})
        completed_orders = await db.orders.count_documents({"order_status": OrderStatus.DELIVERED})
        
        # Payment statistics
        total_payments = await db.payments.count_documents({})
        completed_payments = await db.payments.count_documents({"status": PaymentStatus.COMPLETED})
        failed_payments = await db.payments.count_documents({"status": PaymentStatus.FAILED})
        
        # Revenue calculation
        completed_orders_cursor = db.orders.find({"payment_status": PaymentStatus.COMPLETED})
        total_revenue = 0
        async for order in completed_orders_cursor:
            total_revenue += order.get("total_amount", 0)
        
        # Recent orders
        recent_orders = await db.orders.find({}).sort("created_at", -1).limit(5).to_list(5)
        
        return {
            "order_stats": {
                "total": total_orders,
                "pending": pending_orders,
                "processing": processing_orders,
                "completed": completed_orders
            },
            "payment_stats": {
                "total": total_payments,
                "completed": completed_payments,
                "failed": failed_payments,
                "success_rate": (completed_payments / total_payments * 100) if total_payments > 0 else 0
            },
            "revenue": {
                "total": total_revenue,
                "currency": "USD"
            },
            "recent_orders": recent_orders
        }
        
    except Exception as e:
        logger.error(f"Error getting admin stats: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.patch("/admin/orders/{order_id}/status")
async def update_order_status(order_id: str, status_data: Dict[str, Any]):
    """Update order status"""
    try:
        new_status = status_data.get("status")
        if new_status not in [status.value for status in OrderStatus]:
            raise HTTPException(status_code=400, detail="Invalid status")
        
        result = await db.orders.update_one(
            {"_id": order_id},
            {
                "$set": {
                    "order_status": new_status,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return {"success": True, "message": "Order status updated"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating order status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/crypto/currencies")
async def get_crypto_currencies():
    """Get available crypto currencies"""
    try:
        currencies = await nowpayments_client.get_currencies()
        return currencies
    except Exception as e:
        logger.error(f"Error getting crypto currencies: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()