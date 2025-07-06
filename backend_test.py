#!/usr/bin/env python3
import requests
import json
import time
import sys
from datetime import datetime

# Get the backend URL from the frontend/.env file
BACKEND_URL = "https://2d199040-3c85-41ad-acba-85e2c83e42e9.preview.emergentagent.com/api"

def test_root_endpoint():
    """Test the root endpoint"""
    print("\n🔍 Testing root endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Root endpoint test passed!")
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
        
        response = requests.post(f"{BACKEND_URL}/status", json=payload)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("client_name") == client_name and "id" in data and "timestamp" in data:
                print("✅ Status check creation test passed!")
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
        response = requests.get(f"{BACKEND_URL}/status")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                if expected_id:
                    found = any(item.get("id") == expected_id for item in data)
                    if found:
                        print("✅ Status check retrieval test passed! Found the created status check.")
                        return True
                    else:
                        print(f"❌ Created status check with ID {expected_id} not found in retrieved data.")
                        return False
                else:
                    print(f"✅ Status check retrieval test passed! Retrieved {len(data)} status checks.")
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

def run_all_tests():
    """Run all tests and return overall status"""
    print(f"\n🚀 Starting backend API tests against {BACKEND_URL}")
    print("=" * 80)
    
    # Test results
    results = {}
    
    # Test root endpoint
    results["root_endpoint"] = test_root_endpoint()
    
    # Test status check creation
    results["create_status"], status_id = test_create_status_check()
    
    # Test status check retrieval
    if status_id:
        results["get_status"] = test_get_status_checks(status_id)
    else:
        results["get_status"] = test_get_status_checks()
    
    # Print summary
    print("\n" + "=" * 80)
    print("📊 TEST SUMMARY:")
    all_passed = True
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        if not result:
            all_passed = False
        print(f"{test_name}: {status}")
    
    print("\n🏁 OVERALL STATUS: " + ("✅ ALL TESTS PASSED!" if all_passed else "❌ SOME TESTS FAILED!"))
    return all_passed

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)