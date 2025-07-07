import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Bitcoin, 
  Wallet, 
  Check, 
  Copy, 
  Loader, 
  AlertCircle,
  ExternalLink,
  Truck,
  Shield,
  Lock,
  ArrowRight,
  CheckCircle,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cryptoWallet, setCryptoWallet] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  // Shipping form state
  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: ""
  });

  useEffect(() => {
    loadCartItems();
    loadCryptoCurrencies();
  }, []);

  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart.length > 0 ? cart : [
      {
        id: "semaglutide",
        name: "Semaglutide",
        variant: "10mg x 10 vials",
        price: 150,
        originalPrice: 180,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1595500382155-e7cd8180c301"
      },
      {
        id: "tirzepatide",
        name: "Tirzepatide",
        variant: "15mg x 10 vials",
        price: 175,
        originalPrice: 200,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144"
      }
    ]);
  };

  const loadCryptoCurrencies = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto/currencies`);
      const data = await response.json();
      setCryptoCurrencies(data.currencies || []);
    } catch (error) {
      console.error('Error loading crypto currencies:', error);
      // Fallback crypto options
      setCryptoCurrencies(['bitcoin', 'ethereum', 'usdt']);
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 100 ? 0 : 15;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  };

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'address_line_1', 'city', 'state', 'postal_code', 'country'];
    for (const field of required) {
      if (!shippingForm[field]) {
        setError(`Please fill in ${field.replace('_', ' ')}`);
        return false;
      }
    }
    if (!selectedPaymentMethod) {
      setError("Please select a payment method");
      return false;
    }
    if ((selectedPaymentMethod === 'cryptomus' || selectedPaymentMethod === 'nowpayments') && !selectedCrypto) {
      setError("Please select a cryptocurrency");
      return false;
    }
    return true;
  };

  const createOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const { total } = calculateTotals();
      
      const orderRequest = {
        customer_email: shippingForm.email,
        customer_phone: shippingForm.phone,
        items: cartItems.map(item => ({
          product_id: item.id,
          name: item.name,
          variant: item.variant || "Standard",
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        })),
        shipping_address: shippingForm,
        payment_method: selectedPaymentMethod,
        pay_currency: selectedCrypto
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderRequest),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create order');
      }

      setOrderData(data);
      setPaymentData(data);

      // Handle different payment methods
      if (selectedPaymentMethod === 'paypal') {
        // PayPal will handle the redirect via PayPal buttons
      } else if (selectedPaymentMethod === 'cryptomus' || selectedPaymentMethod === 'nowpayments') {
        // Show crypto payment details
        if (data.payment_url) {
          // Open payment page in new tab
          window.open(data.payment_url, '_blank');
        }
        // Start polling for payment status
        startPaymentStatusPolling(data.payment_id);
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startPaymentStatusPolling = (paymentId) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payments/${paymentId}/status`);
        const data = await response.json();
        
        if (data.payment.status === 'completed') {
          clearInterval(pollInterval);
          setSuccess(true);
          localStorage.removeItem('cart');
        } else if (data.payment.status === 'failed') {
          clearInterval(pollInterval);
          setError('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Error polling payment status:', error);
      }
    }, 10000); // Poll every 10 seconds

    // Clear interval after 30 minutes
    setTimeout(() => clearInterval(pollInterval), 30 * 60 * 1000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      createOrder();
    }
  };

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const { subtotal, shipping, total } = calculateTotals();

  // Mock crypto options for display
  const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin (BTC)', icon: '₿', fee: 'Network fee: ~$2-5' },
    { id: 'eth', name: 'Ethereum (ETH)', icon: 'Ξ', fee: 'Network fee: ~$5-15' },
    { id: 'usdt', name: 'Tether (USDT)', icon: '₮', fee: 'Network fee: ~$1-3' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Cart */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
                
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.variant}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <Link to="/" className="text-blue-600 hover:text-blue-700">Continue shopping</Link>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Dr. John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution/Company</label>
                      <input
                        type="text"
                        value={shippingInfo.institution}
                        onChange={(e) => setShippingInfo({...shippingInfo, institution: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Research Institute"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john.doe@institution.edu"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Street address, Building, Apartment"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                      <input
                        type="text"
                        value={shippingInfo.pincode}
                        onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </form>

                {/* Shipping Options */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-blue-200 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Stealth Express</p>
                          <p className="text-sm text-gray-600">2-3 business days, temperature controlled</p>
                        </div>
                      </div>
                      <span className="font-semibold text-blue-600">₹500</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                {/* Payment Options */}
                <div className="space-y-4 mb-6">
                  <div 
                    onClick={() => setPaymentMethod("crypto")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "crypto" ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bitcoin className="h-6 w-6 text-orange-500" />
                        <div>
                          <p className="font-semibold text-gray-900">Cryptocurrency (Recommended)</p>
                          <p className="text-sm text-gray-600">Bitcoin, Ethereum, USDT - Secure & Anonymous</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "card" ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Crypto Selection */}
                {paymentMethod === "crypto" && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Cryptocurrency</h3>
                    <div className="space-y-3">
                      {cryptoOptions.map((crypto) => (
                        <div 
                          key={crypto.id}
                          onClick={() => setCryptoWallet(crypto.id)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            cryptoWallet === crypto.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{crypto.icon}</span>
                              <div>
                                <p className="font-medium text-gray-900">{crypto.name}</p>
                                <p className="text-sm text-gray-600">{crypto.fee}</p>
                              </div>
                            </div>
                            {cryptoWallet === crypto.id && (
                              <CheckCircle className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Review</h2>
                
                {/* Order Summary */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Important Notice */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">Research Use Only</h4>
                      <p className="text-red-700 text-sm">
                        By placing this order, you confirm these compounds are for licensed research purposes only 
                        and not for human consumption. You agree to comply with all local regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}
              <button 
                onClick={handleNextStep}
                disabled={cartItems.length === 0}
                className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>{step === 4 ? "Complete Order" : "Continue"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                {paymentMethod === "crypto" && (
                  <div className="flex justify-between text-green-600">
                    <span>Crypto Discount (5%)</span>
                    <span>-₹{Math.round(subtotal * 0.05).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{(paymentMethod === "crypto" ? Math.round(total * 0.95) : total).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {shipping === 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-700 font-medium">Free shipping applied!</span>
                  </div>
                </div>
              )}

              {/* Security Features */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure encrypted checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Stealth packaging included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span>Anonymous delivery available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;