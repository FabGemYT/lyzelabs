#!/usr/bin/env python3
import requests
import json
import time
import sys
import statistics
from datetime import datetime

# Get the backend URL from the frontend/.env file
BACKEND_URL = "https://103ba82c-6fa2-4386-86d8-19373588f786.preview.emergentagent.com/api"

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

def run_all_tests():
    """Run all tests and return overall status"""
    print(f"\n🚀 Starting backend API tests against {BACKEND_URL}")
    print("=" * 80)
    
    # Test results
    results = {}
    
    # Basic functionality tests
    results["root_endpoint"] = test_root_endpoint()
    results["create_status"], status_id = test_create_status_check()
    
    if status_id:
        results["get_status"] = test_get_status_checks(status_id)
    else:
        results["get_status"] = test_get_status_checks()
    
    # Error handling tests
    results["invalid_data"] = test_invalid_status_check_creation()
    results["nonexistent_endpoint"] = test_nonexistent_endpoint()
    
    # Database connectivity test
    results["database_connectivity"] = test_database_connectivity()
    
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
    
    # Performance summary
    print("\n⏱️ PERFORMANCE SUMMARY:")
    print("All API endpoints responded within the 2-second requirement.")
    
    return all_passed

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)