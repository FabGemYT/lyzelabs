from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class PaymentMethod(str, Enum):
    PAYPAL = "paypal"
    CRYPTOMUS = "cryptomus"
    NOWPAYMENTS = "nowpayments"


class OrderStatus(str, Enum):
    PENDING = "pending"
    PAYMENT_PROCESSING = "payment_processing"
    PAYMENT_COMPLETED = "payment_completed"
    PAYMENT_FAILED = "payment_failed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class PaymentStatus(str, Enum):
    CREATED = "created"
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    EXPIRED = "expired"


class OrderItem(BaseModel):
    product_id: str
    name: str
    variant: Optional[str] = None
    quantity: int
    unit_price: float
    total_price: float


class ShippingAddress(BaseModel):
    name: str
    email: str
    phone: str
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    state: str
    postal_code: str
    country: str


class Order(BaseModel):
    order_id: str = Field(..., alias="_id")
    customer_email: str
    customer_phone: Optional[str] = None
    items: List[OrderItem]
    subtotal: float
    shipping_cost: float
    total_amount: float
    currency: str = "USD"
    shipping_address: ShippingAddress
    payment_method: PaymentMethod
    payment_status: PaymentStatus = PaymentStatus.CREATED
    order_status: OrderStatus = OrderStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    notes: Optional[str] = None
    
    class Config:
        allow_population_by_field_name = True


class Payment(BaseModel):
    payment_id: str = Field(..., alias="_id")
    order_id: str
    payment_method: PaymentMethod
    gateway_payment_id: Optional[str] = None  # ID from payment gateway
    amount: float
    currency: str = "USD"
    status: PaymentStatus = PaymentStatus.CREATED
    gateway_response: Optional[Dict[str, Any]] = None
    webhook_data: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Crypto-specific fields
    pay_currency: Optional[str] = None
    pay_amount: Optional[float] = None
    pay_address: Optional[str] = None
    
    class Config:
        allow_population_by_field_name = True


class CreateOrderRequest(BaseModel):
    customer_email: str
    customer_phone: Optional[str] = None
    items: List[OrderItem]
    shipping_address: ShippingAddress
    payment_method: PaymentMethod
    notes: Optional[str] = None
    
    # Crypto payment specific
    pay_currency: Optional[str] = None  # For crypto payments


class PaymentResponse(BaseModel):
    success: bool
    payment_id: str
    order_id: str
    gateway_payment_id: Optional[str] = None
    payment_url: Optional[str] = None
    amount: float
    currency: str
    status: str
    
    # Crypto specific
    pay_amount: Optional[float] = None
    pay_currency: Optional[str] = None
    pay_address: Optional[str] = None