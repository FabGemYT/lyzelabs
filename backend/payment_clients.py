import os
import base64
import json
import hashlib
import hmac
from datetime import datetime
from typing import Dict, Any
import httpx
from paypalcheckoutsdk.core import SandboxEnvironment, LiveEnvironment, PayPalHttpClient
from paypalcheckoutsdk.orders import OrdersCreateRequest, OrdersCaptureRequest, OrdersGetRequest


class PayPalClient:
    def __init__(self):
        # Use sandbox for testing, switch to LiveEnvironment for production
        environment = SandboxEnvironment(
            client_id=os.getenv("PAYPAL_CLIENT_ID"),
            client_secret=os.getenv("PAYPAL_SECRET")
        )
        self.client = PayPalHttpClient(environment)
    
    async def create_order(self, order_data: Dict[str, Any]):
        """Create PayPal order"""
        request = OrdersCreateRequest()
        request.prefer('return=representation')
        
        purchase_units = [{
            "reference_id": order_data["order_id"],
            "amount": {
                "currency_code": order_data.get("currency", "USD"),
                "value": f"{order_data['amount']:.2f}",
                "breakdown": {
                    "item_total": {
                        "currency_code": order_data.get("currency", "USD"),
                        "value": f"{order_data['amount']:.2f}"
                    }
                }
            },
            "items": order_data.get("items", [])
        }]
        
        request.request_body = {
            "intent": "CAPTURE",
            "purchase_units": purchase_units,
            "application_context": {
                "return_url": f"{os.getenv('BASE_URL')}/payment/success",
                "cancel_url": f"{os.getenv('BASE_URL')}/payment/cancel",
                "brand_name": "Lyze Labs",
                "landing_page": "BILLING",
                "user_action": "PAY_NOW"
            }
        }
        
        response = self.client.execute(request)
        return response.result
    
    async def capture_order(self, order_id: str):
        """Capture PayPal order"""
        request = OrdersCaptureRequest(order_id)
        response = self.client.execute(request)
        return response.result
    
    async def get_order(self, order_id: str):
        """Get PayPal order details"""
        request = OrdersGetRequest(order_id)
        response = self.client.execute(request)
        return response.result


class CryptomusClient:
    def __init__(self):
        self.api_key = os.getenv("CRYPTOMUS_USER_API_KEY")
        self.payout_api_key = os.getenv("CRYPTOMUS_PAYOUT_API_KEY")
        self.base_url = "https://api.cryptomus.com/v1"
    
    def _create_signature(self, data: Dict[str, Any]) -> str:
        """Create signature for Cryptomus API"""
        encoded_data = base64.b64encode(json.dumps(data).encode()).decode()
        signature = hashlib.md5(f"{encoded_data}{self.api_key}".encode()).hexdigest()
        return signature
    
    async def create_invoice(self, order_data: Dict[str, Any]):
        """Create Cryptomus invoice"""
        data = {
            "amount": str(order_data["amount"]),
            "currency": order_data.get("currency", "USD"),
            "order_id": order_data["order_id"],
            "url_return": f"{os.getenv('BASE_URL')}/payment/success",
            "url_callback": f"{os.getenv('BASE_URL')}/api/payments/cryptomus/webhook",
            "is_subtract": "1"
        }
        
        signature = self._create_signature(data)
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/payment",
                json=data,
                headers={
                    "merchant": self.api_key[:32],  # Use first 32 chars as merchant ID
                    "sign": signature,
                    "Content-Type": "application/json",
                },
            )
            return response.json()
    
    def verify_webhook_signature(self, data: Dict[str, Any], signature: str) -> bool:
        """Verify Cryptomus webhook signature"""
        encoded_data = base64.b64encode(json.dumps(data).encode()).decode()
        expected_signature = hashlib.md5(f"{encoded_data}{self.api_key}".encode()).hexdigest()
        return expected_signature == signature


class NOWPaymentsClient:
    def __init__(self):
        self.api_key = os.getenv("NOWPAYMENTS_API_KEY")
        self.ipn_secret = os.getenv("NOWPAYMENTS_IPN_SECRET")
        self.base_url = "https://api.nowpayments.io/v1"
        # Use sandbox for testing
        # self.base_url = "https://api-sandbox.nowpayments.io/v1"
    
    async def get_currencies(self):
        """Get available currencies"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/currencies",
                headers={"x-api-key": self.api_key}
            )
            return response.json()
    
    async def create_payment(self, order_data: Dict[str, Any]):
        """Create NOWPayments payment"""
        payment_data = {
            "price_amount": order_data["amount"],
            "price_currency": order_data.get("price_currency", "usd"),
            "pay_currency": order_data["pay_currency"],
            "ipn_callback_url": f"{os.getenv('BASE_URL')}/api/payments/nowpayments/webhook",
            "order_id": order_data["order_id"],
            "order_description": order_data.get("description", "Lyze Labs Order")
        }
        
        if order_data.get("customer_email"):
            payment_data["customer_email"] = order_data["customer_email"]
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/payment",
                json=payment_data,
                headers={"x-api-key": self.api_key, "Content-Type": "application/json"}
            )
            return response.json()
    
    async def get_payment_status(self, payment_id: str):
        """Get payment status"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/payment/{payment_id}",
                headers={"x-api-key": self.api_key}
            )
            return response.json()
    
    def verify_ipn_signature(self, payload: str, signature: str) -> bool:
        """Verify IPN signature"""
        expected_signature = hmac.new(
            self.ipn_secret.encode('utf-8'),
            payload.encode('utf-8'),
            hashlib.sha512
        ).hexdigest()
        return hmac.compare_digest(expected_signature, signature)


# Initialize clients
paypal_client = PayPalClient()
cryptomus_client = CryptomusClient()
nowpayments_client = NOWPaymentsClient()