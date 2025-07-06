import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Download, 
  MessageCircle, 
  Mail, 
  Copy,
  Bitcoin,
  Clock,
  Package,
  Shield
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderConfirmationPage = () => {
  const orderNumber = "LZ-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const bitcoinAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";
  const orderAmount = "₹24,499"; // Example total
  const cryptoAmount = "0.00034 BTC"; // Example crypto amount

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for your order. Your research compounds will be prepared and shipped according to our stealth packaging protocols.
          </p>
        </motion.div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Order Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-semibold text-gray-900">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold text-gray-900">{orderAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold text-blue-600">Bitcoin (BTC)</span>
                </div>
              </div>
            </motion.div>

            {/* Payment Instructions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-orange-50 border border-orange-200 rounded-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Bitcoin className="h-6 w-6 text-orange-500" />
                <h3 className="text-lg font-bold text-gray-900">Payment Required</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Send exactly this amount:</label>
                  <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
                    <span className="font-mono font-semibold text-lg">{cryptoAmount}</span>
                    <button 
                      onClick={() => copyToClipboard(cryptoAmount)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Copy className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To this Bitcoin address:</label>
                  <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
                    <span className="font-mono text-sm break-all">{bitcoinAddress}</span>
                    <button 
                      onClick={() => copyToClipboard(bitcoinAddress)}
                      className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
                    >
                      <Copy className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Payment Deadline</p>
                      <p className="text-sm text-yellow-700">
                        Please complete payment within 24 hours to secure your order. 
                        Orders will be processed after payment confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">WhatsApp: +91-9999999999</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">support@lyzelabs.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* What's Next */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Payment Verification</h4>
                    <p className="text-sm text-gray-600">
                      We'll confirm your cryptocurrency payment within 1-3 blockchain confirmations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Order Processing</h4>
                    <p className="text-sm text-gray-600">
                      Your compounds will be prepared and quality-checked in our certified facility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Stealth Packaging</h4>
                    <p className="text-sm text-gray-600">
                      Discrete packaging with temperature control for compound integrity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Delivery</h4>
                    <p className="text-sm text-gray-600">
                      Express delivery with tracking information sent to your email.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security & Compliance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900 text-white rounded-lg p-6"
            >
              <h3 className="text-lg font-bold mb-4">Security & Compliance</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm">End-to-end encrypted communications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">Stealth packaging protocols</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-400" />
                  <span className="text-sm">Research-only compliance verified</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-900/50 rounded-lg border border-red-700">
                <p className="text-red-200 text-sm">
                  <strong>Important:</strong> These compounds are for licensed research use only. 
                  Not approved for human consumption or therapeutic use.
                </p>
              </div>
            </motion.div>

            {/* Download Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Download Order Documents</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Order Confirmation (PDF)</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Payment Instructions (PDF)</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Research Compliance Guide (PDF)</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Return to Shopping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;