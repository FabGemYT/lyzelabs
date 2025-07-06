import React from "react";
import { motion } from "framer-motion";
import { 
  Truck, 
  Package, 
  Clock, 
  Shield, 
  Globe, 
  Thermometer,
  CheckCircle,
  AlertTriangle,
  MapPin,
  CreditCard,
  Phone,
  Mail
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ShippingPage = () => {
  const shippingZones = [
    {
      zone: "India - Metro Cities",
      cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"],
      time: "1-2 business days",
      cost: "Free shipping",
      features: ["Express delivery", "Stealth packaging", "Tracking included"]
    },
    {
      zone: "India - Other Cities",
      cities: ["Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kochi", "Chandigarh"],
      time: "2-3 business days",
      cost: "₹199",
      features: ["Standard delivery", "Stealth packaging", "Tracking included"]
    },
    {
      zone: "Asia (Outside India)",
      cities: ["Singapore", "UAE", "Hong Kong", "Malaysia", "Thailand", "Japan"],
      time: "5-7 business days",
      cost: "$10-15 USD",
      features: ["International express", "Stealth customs handling", "Full tracking"]
    },
    {
      zone: "Europe & Americas",
      cities: ["UK", "Germany", "France", "USA", "Canada", "Brazil", "Poland"],
      time: "7-12 business days",
      cost: "Flat $30 max",
      features: ["International express", "Proven stealth methods", "Full tracking"]
    }
  ];

  const packagingFeatures = [
    {
      icon: Package,
      title: "Stealth Packaging",
      description: "Discrete packaging with no identifying marks or logos to ensure privacy and security."
    },
    {
      icon: Thermometer,
      title: "Temperature Control",
      description: "Specialized packaging maintains compound integrity with temperature monitoring throughout transit."
    },
    {
      icon: Shield,
      title: "Secure Handling",
      description: "Tamper-evident seals and secure packaging protocols ensure product authenticity and safety."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Worldwide shipping with customs documentation and compliance for international deliveries."
    }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Shipping & Fulfillment</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Professional, secure, and discrete shipping worldwide. Our specialized fulfillment ensures your research compounds arrive safely and on time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Zones */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Zones & Timeframes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver to research institutions worldwide with specialized handling for each region.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shippingZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">{zone.zone}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Major Cities:</p>
                    <div className="flex flex-wrap gap-2">
                      {zone.cities.map((city, cityIndex) => (
                        <span key={cityIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Delivery Time</span>
                      </div>
                      <p className="text-sm text-gray-600">{zone.time}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <CreditCard className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Shipping Cost</span>
                      </div>
                      <p className="text-sm text-gray-600">{zone.cost}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                    <ul className="space-y-1">
                      {zone.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Packaging Standards</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our specialized packaging ensures compound integrity and discrete delivery for research institutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packagingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Shipping Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From order confirmation to delivery, every step is managed with precision and care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Order Processing",
                description: "Payment verification and order preparation in our certified facility.",
                time: "1-24 hours"
              },
              {
                step: "2",
                title: "Quality Check",
                description: "Compound verification, packaging preparation, and documentation.",
                time: "24-48 hours"
              },
              {
                step: "3",
                title: "Secure Packaging",
                description: "Stealth packaging with temperature control and tracking setup.",
                time: "2-4 hours"
              },
              {
                step: "4",
                title: "Delivery",
                description: "Express shipping with real-time tracking and delivery confirmation.",
                time: "As per zone"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {process.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -z-10"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{process.description}</p>
                <span className="text-blue-600 font-medium text-sm">{process.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Returns Policy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900">Returns & Exchanges</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Important:</strong> Due to the nature of research compounds and regulatory requirements, 
                  all sales are final. Returns and exchanges are not permitted once products have been shipped.
                </p>
                
                <div>
                  <p className="font-medium mb-2">We ensure quality through:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Comprehensive quality testing before shipment</li>
                    <li>• Certificate of Analysis with every order</li>
                    <li>• Temperature-controlled storage and shipping</li>
                    <li>• Batch tracking and documentation</li>
                  </ul>
                </div>
                
                <p>
                  If you receive damaged or incorrect products, contact us within 48 hours of delivery 
                  for investigation and resolution.
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Phone className="h-6 w-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900">Shipping Support</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Track Your Order</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    You'll receive tracking information via email once your order ships. 
                    Use our tracking system for real-time updates.
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Track Order
                  </button>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">shipping@lyzelabs.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">+91-9999999999 (WhatsApp)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Business Hours</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customs and Compliance */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-blue-900 text-white rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">International Shipping & Customs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Customs Documentation</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Complete customs declarations included</li>
                  <li>• Research-use documentation provided</li>
                  <li>• Institutional shipping addresses preferred</li>
                  <li>• Compliance with local regulations ensured</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Important Notes</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Customer responsible for local import duties</li>
                  <li>• Delivery times may vary due to customs</li>
                  <li>• Some regions may have shipping restrictions</li>
                  <li>• Contact us for specific country requirements</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-red-900/50 rounded-lg border border-red-700">
              <p className="text-red-200 text-sm">
                <strong>Research Use Only:</strong> All products are intended exclusively for licensed research purposes. 
                Not approved for human consumption or therapeutic use. Customers must comply with all local regulations and institutional guidelines.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingPage;