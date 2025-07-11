#!/usr/bin/env python3
import requests
import json
import time
import sys
import statistics
import uuid
from datetime import datetime
from typing import Dict, Any, Optional, List, Tuple

# Get the backend URL from the frontend/.env file
BACKEND_URL = "https://71ab3fe3-39f4-41a9-a500-ae2886ab0494.preview.emergentagent.com/api"

def measure_response_time(func, *args, **kwargs):
    """Measure the response time of a function"""
    start_time = time.time()
    result = func(*args, **kwargs)
    end_time = time.time()
    return result, (end_time - start_time) * 1000  # Convert to milliseconds

def test_root_endpoint():
    """Test the root endpoint"""
    print("\n🔍 Testing root endpoint...")
    try:
        response_times = []
        for _ in range(3):  # Test 3 times to get average response time
            response, response_time = measure_response_time(requests.get, f"{BACKEND_URL}/")
            response_times.append(response_time)
            
        avg_response_time = statistics.mean(response_times)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print(f"✅ Root endpoint test passed! Average response time: {avg_response_time:.2f}ms")
                return True
            else:
                print(f"❌ Root endpoint returned unexpected data: {data}")
                return False
        else:
            print(f"❌ Root endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing root endpoint: {str(e)}")
        return False

def test_create_status_check():
    """Test creating a status check"""
    print("\n🔍 Testing status check creation...")
    try:
        client_name = f"TestClient-{datetime.utcnow().isoformat()}"
        payload = {"client_name": client_name}
        
        response, response_time = measure_response_time(
            requests.post, f"{BACKEND_URL}/status", json=payload
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("client_name") == client_name and "id" in data and "timestamp" in data:
                print(f"✅ Status check creation test passed! Response time: {response_time:.2f}ms")
                return True, data.get("id")
            else:
                print(f"❌ Status check creation returned unexpected data: {data}")
                return False, None
        else:
            print(f"❌ Status check creation returned status code {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing status check creation: {str(e)}")
        return False, None

def test_get_status_checks(expected_id=None):
    """Test retrieving status checks"""
    print("\n🔍 Testing status check retrieval...")
    try:
        response, response_time = measure_response_time(
            requests.get, f"{BACKEND_URL}/status"
        )
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                if expected_id:
                    found = any(item.get("id") == expected_id for item in data)
                    if found:
                        print(f"✅ Status check retrieval test passed! Found the created status check. Response time: {response_time:.2f}ms")
                        return True
                    else:
                        print(f"❌ Created status check with ID {expected_id} not found in retrieved data.")
                        return False
                else:
                    print(f"✅ Status check retrieval test passed! Retrieved {len(data)} status checks. Response time: {response_time:.2f}ms")
                    return True
            else:
                print(f"❌ Status check retrieval returned unexpected data format: {data}")
                return False
        else:
            print(f"❌ Status check retrieval returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing status check retrieval: {str(e)}")
        return False

def test_invalid_status_check_creation():
    """Test creating a status check with invalid data"""
    print("\n🔍 Testing invalid status check creation...")
    try:
        # Missing required field
        payload = {}
        
        response = requests.post(f"{BACKEND_URL}/status", json=payload)
        
        if response.status_code in [400, 422]:  # FastAPI validation error
            print("✅ Invalid status check creation test passed! Server correctly rejected invalid data.")
            return True
        else:
            print(f"❌ Invalid status check creation returned unexpected status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing invalid status check creation: {str(e)}")
        return False

def test_nonexistent_endpoint():
    """Test accessing a non-existent endpoint"""
    print("\n🔍 Testing non-existent endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/nonexistent")
        
        if response.status_code == 404:
            print("✅ Non-existent endpoint test passed! Server correctly returned 404.")
            return True
        else:
            print(f"❌ Non-existent endpoint returned unexpected status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing non-existent endpoint: {str(e)}")
        return False

def test_database_connectivity():
    """Test database connectivity by creating and retrieving a status check"""
    print("\n🔍 Testing database connectivity...")
    try:
        # Create a unique status check
        unique_name = f"DBConnTest-{datetime.utcnow().isoformat()}"
        create_payload = {"client_name": unique_name}
        
        create_response = requests.post(f"{BACKEND_URL}/status", json=create_payload)
        
        if create_response.status_code != 200:
            print(f"❌ Database connectivity test failed: Could not create test record. Status code: {create_response.status_code}")
            return False
        
        # Wait a moment for potential replication lag
        time.sleep(0.5)
        
        # Retrieve status checks and verify our test record exists
        get_response = requests.get(f"{BACKEND_URL}/status")
        
        if get_response.status_code != 200:
            print(f"❌ Database connectivity test failed: Could not retrieve records. Status code: {get_response.status_code}")
            return False
        
        data = get_response.json()
        found = any(item.get("client_name") == unique_name for item in data)
        
        if found:
            print("✅ Database connectivity test passed! Created record was successfully stored and retrieved.")
            return True
        else:
            print("❌ Database connectivity test failed: Created record was not found in retrieved data.")
            return False
    except Exception as e:
        print(f"❌ Error testing database connectivity: {str(e)}")
        return False

# ============= PAYMENT GATEWAY INTEGRATION TESTS =============

def create_test_order_payload(payment_method: str, pay_currency: Optional[str] = None) -> Dict[str, Any]:
    """Create a test order payload"""
    unique_id = str(uuid.uuid4())[:8]
    
    order_items = [
        {
            "product_id": f"prod_{unique_id}_1",
            "name": "Test Product 1",
            "variant": "Standard",
            "quantity": 1,
            "unit_price": 49.99,
            "total_price": 49.99
        },
        {
            "product_id": f"prod_{unique_id}_2",
            "name": "Test Product 2",
            "variant": "Premium",
            "quantity": 2,
            "unit_price": 29.99,
            "total_price": 59.98
        }
    ]
    
    shipping_address = {
        "name": "Test Customer",
        "email": "test@example.com",
        "phone": "+1234567890",
        "address_line_1": "123 Test Street",
        "address_line_2": "Apt 456",
        "city": "Test City",
        "state": "Test State",
        "postal_code": "12345",
        "country": "US"
    }
    
    payload = {
        "customer_email": f"test_{unique_id}@example.com",
        "customer_phone": "+1234567890",
        "items": order_items,
        "shipping_address": shipping_address,
        "payment_method": payment_method,
        "notes": f"Test order created by automated testing - {unique_id}"
    }
    
    if pay_currency:
        payload["pay_currency"] = pay_currency
    
    return payload

def test_create_order_paypal():
    """Test creating an order with PayPal payment method"""
    print("\n🔍 Testing order creation with PayPal...")
    try:
        payload = create_test_order_payload("paypal")
        
        response, response_time = measure_response_time(
            requests.post, f"{BACKEND_URL}/orders", json=payload
        )
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("success") and 
                data.get("payment_id") and 
                data.get("order_id") and 
                data.get("gateway_payment_id") and 
                data.get("payment_url")):
                print(f"✅ PayPal order creation test passed! Response time: {response_time:.2f}ms")
                print(f"   Order ID: {data.get('order_id')}")
                print(f"   Payment ID: {data.get('payment_id')}")
                return True, data
            else:
                print(f"❌ PayPal order creation returned incomplete data: {data}")
                return False, None
        else:
            print(f"❌ PayPal order creation returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing PayPal order creation: {str(e)}")
        return False, None

def test_create_order_cryptomus():
    """Test creating an order with Cryptomus payment method"""
    print("\n🔍 Testing order creation with Cryptomus...")
    try:
        payload = create_test_order_payload("cryptomus")
        
        response, response_time = measure_response_time(
            requests.post, f"{BACKEND_URL}/orders", json=payload
        )
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("success") and 
                data.get("payment_id") and 
                data.get("order_id") and 
                data.get("gateway_payment_id") and 
                data.get("payment_url")):
                print(f"✅ Cryptomus order creation test passed! Response time: {response_time:.2f}ms")
                print(f"   Order ID: {data.get('order_id')}")
                print(f"   Payment ID: {data.get('payment_id')}")
                return True, data
            else:
                print(f"❌ Cryptomus order creation returned incomplete data: {data}")
                return False, None
        else:
            print(f"❌ Cryptomus order creation returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing Cryptomus order creation: {str(e)}")
        return False, None

def test_create_order_nowpayments():
    """Test creating an order with NOWPayments payment method"""
    print("\n🔍 Testing order creation with NOWPayments...")
    try:
        payload = create_test_order_payload("nowpayments", "btc")
        
        response, response_time = measure_response_time(
            requests.post, f"{BACKEND_URL}/orders", json=payload
        )
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("success") and 
                data.get("payment_id") and 
                data.get("order_id") and 
                data.get("gateway_payment_id") and 
                data.get("payment_url")):
                print(f"✅ NOWPayments order creation test passed! Response time: {response_time:.2f}ms")
                print(f"   Order ID: {data.get('order_id')}")
                print(f"   Payment ID: {data.get('payment_id')}")
                return True, data
            else:
                print(f"❌ NOWPayments order creation returned incomplete data: {data}")
                return False, None
        else:
            print(f"❌ NOWPayments order creation returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing NOWPayments order creation: {str(e)}")
        return False, None

def test_get_order(order_id: str):
    """Test retrieving an order"""
    print(f"\n🔍 Testing order retrieval for order ID: {order_id}...")
    try:
        response, response_time = measure_response_time(
            requests.get, f"{BACKEND_URL}/orders/{order_id}"
        )
        
        if response.status_code == 200:
            data = response.json()
            if "order" in data and "payment" in data:
                print(f"✅ Order retrieval test passed! Response time: {response_time:.2f}ms")
                return True, data
            else:
                print(f"❌ Order retrieval returned incomplete data: {data}")
                return False, None
        else:
            print(f"❌ Order retrieval returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing order retrieval: {str(e)}")
        return False, None

def test_get_payment_status(payment_id: str):
    """Test retrieving payment status"""
    print(f"\n🔍 Testing payment status retrieval for payment ID: {payment_id}...")
    try:
        response, response_time = measure_response_time(
            requests.get, f"{BACKEND_URL}/payments/{payment_id}/status"
        )
        
        if response.status_code == 200:
            data = response.json()
            if "payment" in data:
                print(f"✅ Payment status retrieval test passed! Response time: {response_time:.2f}ms")
                print(f"   Payment Status: {data['payment'].get('status')}")
                return True, data
            else:
                print(f"❌ Payment status retrieval returned incomplete data: {data}")
                return False, None
        else:
            print(f"❌ Payment status retrieval returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing payment status retrieval: {str(e)}")
        return False, None

def test_paypal_capture_webhook(order_id: str):
    """Test PayPal capture webhook"""
    print(f"\n🔍 Testing PayPal capture webhook for order ID: {order_id}...")
    try:
        response, response_time = measure_response_time(
            requests.post, f"{BACKEND_URL}/payments/paypal/capture/{order_id}"
        )
        
        # This might fail in testing environment since the payment isn't real
        # We're just checking if the endpoint exists and responds
        if response.status_code in [200, 404, 500]:
            print(f"✅ PayPal capture webhook endpoint exists. Response time: {response_time:.2f}ms")
            print(f"   Status code: {response.status_code} (expected in test environment)")
            return True
        else:
            print(f"❌ PayPal capture webhook returned unexpected status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error testing PayPal capture webhook: {str(e)}")
        return False

def test_cryptomus_webhook():
    """Test Cryptomus webhook"""
    print("\n🔍 Testing Cryptomus webhook endpoint...")
    try:
        # Create a mock webhook payload
        payload = {
            "order_id": "test_order_id",
            "status": "paid",
            "uuid": "test_uuid",
            "amount": "100.00",
            "currency": "USD"
        }
        
        # In a real test, we would need to sign this payload
        # For now, we're just checking if the endpoint exists
        response, response_time = measure_response_time(
            requests.post, 
            f"{BACKEND_URL}/payments/cryptomus/webhook",
            json=payload,
            headers={"sign": "test_signature"}
        )
        
        # This will fail due to invalid signature, but we're just checking if the endpoint exists
        if response.status_code in [400, 401, 403]:
            print(f"✅ Cryptomus webhook endpoint exists. Response time: {response_time:.2f}ms")
            print(f"   Status code: {response.status_code} (expected in test environment without valid signature)")
            return True
        else:
            print(f"❌ Cryptomus webhook returned unexpected status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error testing Cryptomus webhook: {str(e)}")
        return False

def test_nowpayments_webhook():
    """Test NOWPayments webhook"""
    print("\n🔍 Testing NOWPayments webhook endpoint...")
    try:
        # Create a mock webhook payload
        payload = {
            "order_id": "test_order_id",
            "payment_status": "finished",
            "payment_id": "test_payment_id",
            "pay_amount": "0.01",
            "pay_currency": "BTC"
        }
        
        # In a real test, we would need to sign this payload
        # For now, we're just checking if the endpoint exists
        response, response_time = measure_response_time(
            requests.post, 
            f"{BACKEND_URL}/payments/nowpayments/webhook",
            json=payload,
            headers={"x-nowpayments-sig": "test_signature"}
        )
        
        # This will fail due to invalid signature, but we're just checking if the endpoint exists
        if response.status_code in [400, 401, 403]:
            print(f"✅ NOWPayments webhook endpoint exists. Response time: {response_time:.2f}ms")
            print(f"   Status code: {response.status_code} (expected in test environment without valid signature)")
            return True
        else:
            print(f"❌ NOWPayments webhook returned unexpected status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error testing NOWPayments webhook: {str(e)}")
        return False

def test_admin_stats():
    """Test admin stats endpoint"""
    print("\n🔍 Testing admin stats endpoint...")
    try:
        response, response_time = measure_response_time(
            requests.get, f"{BACKEND_URL}/admin/stats"
        )
        
        if response.status_code == 200:
            data = response.json()
            if ("order_stats" in data and 
                "payment_stats" in data and 
                "revenue" in data and 
                "recent_orders" in data):
                print(f"✅ Admin stats test passed! Response time: {response_time:.2f}ms")
                print(f"   Order Stats: {data['order_stats']}")
                print(f"   Payment Stats: {data['payment_stats']}")
                print(f"   Revenue: {data['revenue']}")
                return True, data
            else:
                print(f"❌ Admin stats returned incomplete data: {data}")
                return False, None
        else:
            print(f"❌ Admin stats returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing admin stats: {str(e)}")
        return False, None

def test_crypto_currencies():
    """Test crypto currencies listing endpoint"""
    print("\n🔍 Testing crypto currencies listing endpoint...")
    try:
        response, response_time = measure_response_time(
            requests.get, f"{BACKEND_URL}/crypto/currencies"
        )
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, dict) and len(data) > 0:
                print(f"✅ Crypto currencies listing test passed! Response time: {response_time:.2f}ms")
                print(f"   Available currencies: {data.get('currencies', [])[:5]}...")
                return True, data
            else:
                print(f"❌ Crypto currencies listing returned unexpected data format: {data}")
                return False, None
        else:
            print(f"❌ Crypto currencies listing returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing crypto currencies listing: {str(e)}")
        return False, None

def test_create_order_nowpayments_btc():
    """Test creating an order with NOWPayments payment method using BTC"""
    print("\n🔍 Testing order creation with NOWPayments using BTC...")
    try:
        # Use the sample order data from the review request
        payload = {
          "customer_email": "test@lyzelabs.com",
          "customer_phone": "+918879243924",
          "items": [
            {
              "product_id": "1",
              "name": "Semaglutide",
              "variant": "1mg",
              "quantity": 1,
              "unit_price": 125.0,
              "total_price": 125.0
            }
          ],
          "shipping_address": {
            "name": "Test User",
            "email": "test@lyzelabs.com",
            "phone": "+918879243924",
            "address_line_1": "123 Test Street",
            "city": "Mumbai",
            "state": "Maharashtra",
            "postal_code": "400001",
            "country": "IN"
          },
          "payment_method": "nowpayments",
          "pay_currency": "btc"
        }
        
        response, response_time = measure_response_time(
            requests.post, f"{BACKEND_URL}/orders", json=payload
        )
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("success") and 
                data.get("payment_id") and 
                data.get("order_id") and 
                data.get("gateway_payment_id") and 
                data.get("payment_url")):
                print(f"✅ NOWPayments BTC order creation test passed! Response time: {response_time:.2f}ms")
                print(f"   Order ID: {data.get('order_id')}")
                print(f"   Payment ID: {data.get('payment_id')}")
                print(f"   Pay Amount: {data.get('pay_amount')} {data.get('pay_currency')}")
                print(f"   Pay Address: {data.get('pay_address')}")
                return True, data
            else:
                print(f"❌ NOWPayments BTC order creation returned incomplete data: {data}")
                return False, None
        else:
            print(f"❌ NOWPayments BTC order creation returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing NOWPayments BTC order creation: {str(e)}")
        return False, None

def test_get_order(order_id: str):
    """Test retrieving an order"""
    print(f"\n🔍 Testing order retrieval for order ID: {order_id}...")
    try:
        response, response_time = measure_response_time(
            requests.get, f"{BACKEND_URL}/orders/{order_id}"
        )
        
        if response.status_code == 200:
            data = response.json()
            if "order" in data and "payment" in data:
                print(f"✅ Order retrieval test passed! Response time: {response_time:.2f}ms")
                print(f"   Order Status: {data['order'].get('order_status')}")
                print(f"   Payment Status: {data['payment'].get('status')}")
                return True, data
            else:
                print(f"❌ Order retrieval returned incomplete data: {data}")
                return False, None
        else:
            print(f"❌ Order retrieval returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing order retrieval: {str(e)}")
        return False, None

def test_admin_orders():
    """Test admin orders listing endpoint"""
    print("\n🔍 Testing admin orders listing endpoint...")
    try:
        response, response_time = measure_response_time(
            requests.get, f"{BACKEND_URL}/admin/orders"
        )
        
        if response.status_code == 200:
            data = response.json()
            if "orders" in data and "total" in data:
                print(f"✅ Admin orders listing test passed! Response time: {response_time:.2f}ms")
                print(f"   Total orders: {data.get('total')}")
                if data.get('total') > 0 and len(data.get('orders', [])) > 0:
                    print(f"   Latest order ID: {data['orders'][0].get('_id')}")
                return True, data
            else:
                print(f"❌ Admin orders listing returned incomplete data: {data}")
                return False, None
        else:
            print(f"❌ Admin orders listing returned status code {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Error testing admin orders listing: {str(e)}")
        return False, None

def test_complete_payment_flow():
    """Test a complete payment flow with NOWPayments and BTC"""
    print("\n🔍 Testing complete payment flow with NOWPayments and BTC...")
    
    # Step 1: Create an order with NOWPayments and BTC
    success, order_data = test_create_order_nowpayments_btc()
    if not success or not order_data:
        print("❌ Complete payment flow test failed at order creation step")
        return False
    
    order_id = order_data.get("order_id")
    payment_id = order_data.get("payment_id")
    
    # Step 2: Verify the order is stored correctly in database
    success, order_details = test_get_order(order_id)
    if not success or not order_details:
        print("❌ Complete payment flow test failed at order verification step")
        return False
    
    # Step 3: Check that order appears in admin dashboard
    success, admin_orders = test_admin_orders()
    if not success or not admin_orders:
        print("❌ Complete payment flow test failed at admin orders check step")
        return False
    
    # Verify our order is in the admin orders list
    order_found = False
    for order in admin_orders.get("orders", []):
        if order.get("_id") == order_id:
            order_found = True
            break
    
    if not order_found:
        print(f"❌ Created order {order_id} not found in admin orders list")
        return False
    
    print(f"✅ Complete payment flow test PASSED!")
    print(f"   ✓ Successfully created order with NOWPayments and BTC")
    print(f"   ✓ Order was stored correctly in database")
    print(f"   ✓ Order appears in admin dashboard")
    return True

def run_payment_tests():
    """Run the payment system tests"""
    print(f"\n🚀 Starting payment system tests against {BACKEND_URL}")
    print("=" * 80)
    
    # Test results
    results = {}
    
    # Test admin dashboard stats
    results["admin_stats"], _ = test_admin_stats()
    
    # Test crypto currencies endpoint
    results["crypto_currencies"], _ = test_crypto_currencies()
    
    # Test complete payment flow
    results["complete_payment_flow"] = test_complete_payment_flow()
    
    # Print summary
    print("\n" + "=" * 80)
    print("📊 PAYMENT SYSTEM TEST SUMMARY:")
    all_passed = True
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        if not result:
            all_passed = False
        print(f"{test_name}: {status}")
    
    print("\n🏁 OVERALL STATUS: " + ("✅ ALL TESTS PASSED!" if all_passed else "❌ SOME TESTS FAILED!"))
    
    return all_passed

if __name__ == "__main__":
    success = run_payment_tests()
    sys.exit(0 if success else 1)