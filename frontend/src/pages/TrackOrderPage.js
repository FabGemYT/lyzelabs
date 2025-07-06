import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  Clock,
  Search,
  CheckCircle,
  AlertCircle,
  Info,
  Globe,
  Smartphone,
  Mail
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TrackOrderPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sample tracking data for demonstration
  const sampleTrackingData = {
    trackingNumber: "LZ2025001234",
    status: "In Transit",
    lastUpdate: "2 hours ago",
    estimatedDelivery: "Jan 8, 2025",
    currentLocation: "Berlin Distribution Center",
    events: [
      {
        status: "Package Picked Up",
        location: "Mumbai, India",
        date: "Jan 5, 2025",
        time: "2:30 PM IST",
        description: "Package picked up and processed at origin facility"
      },
      {
        status: "Departed Origin",
        location: "Mumbai International Hub",
        date: "Jan 5, 2025",
        time: "11:45 PM IST",
        description: "Package departed from origin sorting facility"
      },
      {
        status: "In Transit",
        location: "Dubai Transit Hub",
        date: "Jan 6, 2025",
        time: "4:20 AM GST",
        description: "Package in transit to destination country"
      },
      {
        status: "Customs Cleared",
        location: "Frankfurt, Germany",
        date: "Jan 7, 2025",
        time: "6:15 AM CET",
        description: "Package cleared customs and processed"
      },
      {
        status: "In Transit",
        location: "Berlin Distribution Center",
        date: "Jan 7, 2025",
        time: "2:45 PM CET",
        description: "Package arrived at local distribution center"
      }
    ]
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }
    
    setLoading(true);
    setError("");
    
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, return sample data for any tracking number
      setTrackingData(sampleTrackingData);
      setLoading(false);
    }, 1500);
  };

  const supportedCouriers = [
    { name: "DHL", logo: "🚚", countries: "190+ countries" },
    { name: "FedEx", logo: "📦", countries: "220+ countries" },
    { name: "UPS", logo: "🚛", countries: "220+ countries" },
    { name: "India Post", logo: "📮", countries: "India" },
    { name: "Aramex", logo: "✈️", countries: "Middle East, Asia" },
    { name: "PostNL", logo: "📫", countries: "Europe" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Track Your Order</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Enter your tracking number below to check the latest shipping status of your Lyze Labs research order.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-12"
          >
            <div className="text-center mb-8">
              <Package className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Universal Tracking</h2>
              <p className="text-gray-600">
                Track packages from DHL, FedEx, UPS, India Post, Aramex, and more
              </p>
            </div>

            <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter tracking number (e.g., LZ2025001234, 1Z999AA1234567890)"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mt-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {error}
                    </p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg border border-blue-500 disabled:opacity-50"
                >
                  {loading ? "Tracking..." : "Track Now"}
                </motion.button>
              </div>
            </form>

            {/* Supported Couriers */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">Supported Couriers:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {supportedCouriers.map((courier, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-lg">{courier.logo}</span>
                    <div>
                      <span className="font-medium text-gray-900">{courier.name}</span>
                      <p className="text-xs text-gray-500">{courier.countries}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tracking Results */}
          {trackingData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
            >
              {/* Status Header */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Tracking #{trackingData.trackingNumber}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Last update: {trackingData.lastUpdate}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Est. delivery: {trackingData.estimatedDelivery}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                      <Truck className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">{trackingData.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 text-center">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {trackingData.currentLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900">Tracking History</h4>
                <div className="relative">
                  {trackingData.events.map((event, index) => (
                    <div key={index} className="relative flex items-start space-x-4 pb-6">
                      {/* Timeline line */}
                      {index < trackingData.events.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      
                      {/* Status icon */}
                      <div className="relative">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      
                      {/* Event details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <h5 className="font-semibold text-gray-900">{event.status}</h5>
                            <p className="text-sm text-gray-600">{event.description}</p>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <p className="font-medium text-gray-900">{event.location}</p>
                            <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900 mb-1">Need Help?</h5>
                      <p className="text-sm text-blue-700 mb-3">
                        For shipping queries or delivery issues, contact our support team.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href="mailto:ceo@lyzelabs.net"
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <Mail className="h-4 w-4" />
                          <span>ceo@lyzelabs.net</span>
                        </a>
                        <a
                          href="https://wa.me/918879243924"
                          className="flex items-center space-x-2 text-green-600 hover:text-green-800 text-sm"
                        >
                          <Smartphone className="h-4 w-4" />
                          <span>+91 8879243924</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stealth Shipping Worldwide</h2>
            <p className="text-xl text-gray-600">
              Professional, discrete, and secure delivery to researchers globally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Coverage</h3>
              <p className="text-gray-600">
                Shipping to 190+ countries with local courier partnerships for reliable delivery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Stealth Packaging</h3>
              <p className="text-gray-600">
                Discrete packaging with no identifying marks ensures privacy and security.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">99%+ Success Rate</h3>
              <p className="text-gray-600">
                Proven stealth methods ensure safe passage through customs worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrackOrderPage;