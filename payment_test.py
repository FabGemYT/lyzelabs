#!/usr/bin/env python3
import requests
import json
import time
import sys
import statistics
from datetime import datetime

# Get the backend URL from the frontend/.env file
BACKEND_URL = "https://71ab3fe3-39f4-41a9-a500-ae2886ab0494.preview.emergentagent.com/api"

def measure_response_time(func, *args, **kwargs):
    """Measure the response time of a function"""
    start_time = time.time()
    result = func(*args, **kwargs)
    end_time = time.time()
    return result, (end_time - start_time) * 1000  # Convert to milliseconds

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

def test_create_order_paypal():
    """Test creating an order with PayPal payment method"""
    print("\n🔍 Testing order creation with PayPal...")
    try:
        # Use the sample order data from the review request but change payment method
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
          "payment_method": "paypal"
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

def test_create_order_nowpayments():
    """Test creating an order with NOWPayments payment method"""
    print("\n🔍 Testing order creation with NOWPayments...")
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
                print(f"✅ NOWPayments order creation test passed! Response time: {response_time:.2f}ms")
                print(f"   Order ID: {data.get('order_id')}")
                print(f"   Payment ID: {data.get('payment_id')}")
                print(f"   Pay Amount: {data.get('pay_amount')} {data.get('pay_currency')}")
                print(f"   Pay Address: {data.get('pay_address')}")
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

def test_get_order(order_id):
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
    """Test a complete payment flow with PayPal"""
    print("\n🔍 Testing complete payment flow with PayPal...")
    
    # Step 1: Create an order with PayPal
    success, order_data = test_create_order_paypal()
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
    print(f"   ✓ Successfully created order with PayPal")
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