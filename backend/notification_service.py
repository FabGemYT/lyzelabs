import os
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from twilio.rest import Client
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)


class NotificationService:
    def __init__(self):
        self.business_email = os.getenv("BUSINESS_EMAIL", "ceo@lyzelabs.com")
        self.business_whatsapp = os.getenv("BUSINESS_WHATSAPP", "+918879243924")
        
        # Email configuration (using Gmail SMTP as default)
        self.smtp_host = "smtp.gmail.com"
        self.smtp_port = 587
        self.smtp_username = self.business_email
        self.smtp_password = os.getenv("EMAIL_PASSWORD")  # You'll need to set this
        
        # Twilio WhatsApp configuration (optional - requires Twilio setup)
        self.twilio_account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.twilio_auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.twilio_whatsapp_number = os.getenv("TWILIO_WHATSAPP_NUMBER", "whatsapp:+14155238886")
        
        if self.twilio_account_sid and self.twilio_auth_token:
            self.twilio_client = Client(self.twilio_account_sid, self.twilio_auth_token)
        else:
            self.twilio_client = None
    
    async def send_email_notification(self, subject: str, body: str, to_email: str = None):
        """Send email notification"""
        try:
            if not self.smtp_password:
                logger.warning("Email password not configured, skipping email notification")
                return False
            
            to_email = to_email or self.business_email
            
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = self.smtp_username
            message["To"] = to_email
            
            # Create HTML and text versions
            text_part = MIMEText(body, "plain")
            html_part = MIMEText(f"<html><body><pre>{body}</pre></body></html>", "html")
            
            message.attach(text_part)
            message.attach(html_part)
            
            await aiosmtplib.send(
                message,
                hostname=self.smtp_host,
                port=self.smtp_port,
                start_tls=True,
                username=self.smtp_username,
                password=self.smtp_password,
            )
            
            logger.info(f"Email notification sent to {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False
    
    async def send_whatsapp_notification(self, message: str, to_number: str = None):
        """Send WhatsApp notification via Twilio (optional)"""
        try:
            if not self.twilio_client:
                logger.warning("Twilio not configured, skipping WhatsApp notification")
                return False
            
            to_number = to_number or self.business_whatsapp
            if not to_number.startswith("whatsapp:"):
                to_number = f"whatsapp:{to_number}"
            
            message = self.twilio_client.messages.create(
                body=message,
                from_=self.twilio_whatsapp_number,
                to=to_number
            )
            
            logger.info(f"WhatsApp notification sent to {to_number}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send WhatsApp notification: {str(e)}")
            return False
    
    async def notify_new_order(self, order_data: Dict[str, Any]):
        """Send notifications for new order"""
        order_id = order_data.get("order_id")
        customer_email = order_data.get("customer_email")
        total_amount = order_data.get("total_amount")
        payment_method = order_data.get("payment_method")
        
        # Email notification
        email_subject = f"🚨 New Order Received - {order_id}"
        email_body = f"""
NEW ORDER ALERT! 💰

Order ID: {order_id}
Customer: {customer_email}
Amount: ${total_amount:.2f} USD
Payment Method: {payment_method.upper()}

Items:
"""
        
        for item in order_data.get("items", []):
            email_body += f"- {item.get('name')} ({item.get('variant', 'Standard')}) x{item.get('quantity')} = ${item.get('total_price'):.2f}\n"
        
        email_body += f"""
Shipping Address:
{order_data.get('shipping_address', {}).get('name')}
{order_data.get('shipping_address', {}).get('address_line_1')}
{order_data.get('shipping_address', {}).get('city')}, {order_data.get('shipping_address', {}).get('state')} {order_data.get('shipping_address', {}).get('postal_code')}
{order_data.get('shipping_address', {}).get('country')}

Phone: {order_data.get('shipping_address', {}).get('phone')}

Check your admin dashboard at: https://lyzelabs.com/admin
        """
        
        await self.send_email_notification(email_subject, email_body)
        
        # WhatsApp notification
        whatsapp_message = f"""
🚨 NEW ORDER - {order_id}

💰 ${total_amount:.2f} USD
👤 {customer_email}
💳 {payment_method.upper()}

Check admin dashboard: https://lyzelabs.com/admin
        """
        
        await self.send_whatsapp_notification(whatsapp_message)
    
    async def notify_payment_completed(self, order_data: Dict[str, Any], payment_data: Dict[str, Any]):
        """Send notifications for completed payment"""
        order_id = order_data.get("order_id")
        customer_email = order_data.get("customer_email")
        total_amount = order_data.get("total_amount")
        payment_method = payment_data.get("payment_method")
        
        # Email notification
        email_subject = f"✅ Payment Completed - {order_id}"
        email_body = f"""
PAYMENT COMPLETED! 🎉

Order ID: {order_id}
Customer: {customer_email}
Amount: ${total_amount:.2f} USD
Payment Method: {payment_method.upper()}
Payment ID: {payment_data.get('gateway_payment_id')}

Time to process and ship this order!

Admin Dashboard: https://lyzelabs.com/admin
        """
        
        await self.send_email_notification(email_subject, email_body)
        
        # WhatsApp notification
        whatsapp_message = f"""
✅ PAYMENT COMPLETED - {order_id}

💰 ${total_amount:.2f} USD RECEIVED
👤 {customer_email}
💳 {payment_method.upper()}

🚚 Ready to ship!
        """
        
        await self.send_whatsapp_notification(whatsapp_message)
    
    async def notify_payment_failed(self, order_data: Dict[str, Any], payment_data: Dict[str, Any]):
        """Send notifications for failed payment"""
        order_id = order_data.get("order_id")
        customer_email = order_data.get("customer_email")
        total_amount = order_data.get("total_amount")
        payment_method = payment_data.get("payment_method")
        
        # Email notification
        email_subject = f"❌ Payment Failed - {order_id}"
        email_body = f"""
PAYMENT FAILED ⚠️

Order ID: {order_id}
Customer: {customer_email}
Amount: ${total_amount:.2f} USD
Payment Method: {payment_method.upper()}

Customer may need assistance or will try again.

Admin Dashboard: https://lyzelabs.com/admin
        """
        
        await self.send_email_notification(email_subject, email_body)


# Initialize notification service
notification_service = NotificationService()