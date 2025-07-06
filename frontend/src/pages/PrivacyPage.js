import React from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, Mail, Globe, Settings, AlertCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how Lyze Labs collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 2025</p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {/* Introduction */}
          <section className="mb-8">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <p className="text-blue-800 leading-relaxed">
                Lyze Labs ("we," "our," or "us") is committed to protecting your privacy and maintaining the confidentiality 
                of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard 
                your information when you visit our website or purchase our research compounds.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 mb-3">We may collect the following personal information:</p>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• <strong>Contact Information:</strong> Name, email address, phone number, institution name</li>
                    <li>• <strong>Shipping Information:</strong> Physical address, city, state, postal code, country</li>
                    <li>• <strong>Professional Information:</strong> Research institution, academic affiliation, professional credentials</li>
                    <li>• <strong>Order Information:</strong> Purchase history, product preferences, payment information</li>
                    <li>• <strong>Communication Records:</strong> Customer service interactions, support inquiries</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-700">
                    <li>• IP address and device information</li>
                    <li>• Browser type and version</li>
                    <li>• Operating system and device type</li>
                    <li>• Website usage patterns and analytics data</li>
                    <li>• Cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Order Processing:</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Process and fulfill orders</li>
                  <li>• Arrange shipping and delivery</li>
                  <li>• Handle payments and billing</li>
                  <li>• Provide order confirmations and updates</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Customer Service:</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Respond to inquiries and support requests</li>
                  <li>• Provide technical assistance</li>
                  <li>• Handle complaints and feedback</li>
                  <li>• Improve customer experience</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Legal Compliance:</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Verify research credentials and licensing</li>
                  <li>• Maintain regulatory compliance records</li>
                  <li>• Respond to legal requests</li>
                  <li>• Ensure proper use of research compounds</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Business Operations:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Analyze website usage and performance</li>
                  <li>• Improve products and services</li>
                  <li>• Send important updates and notifications</li>
                  <li>• Conduct internal research and analytics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Information Sharing and Disclosure</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your 
                information only in the following limited circumstances:
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-3">Limited Sharing Circumstances:</h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• <strong>Service Providers:</strong> Trusted third-party vendors who assist with shipping, payment processing, and technical services</li>
                  <li>• <strong>Legal Requirements:</strong> When required by law, court order, or regulatory authority</li>
                  <li>• <strong>Safety and Security:</strong> To protect the rights, property, or safety of Lyze Labs, our customers, or others</li>
                  <li>• <strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of company assets</li>
                  <li>• <strong>Consent:</strong> When you have given explicit consent for specific sharing purposes</li>
                </ul>
              </div>
              
              <p>
                All third-party service providers are contractually obligated to maintain the confidentiality 
                and security of your personal information and are prohibited from using it for any purpose 
                other than providing services to us.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security Measures</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We implement comprehensive security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Technical Safeguards:</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• Secure server infrastructure and hosting</li>
                    <li>• Regular security audits and vulnerability testing</li>
                    <li>• Encrypted data storage and backup systems</li>
                  </ul>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-indigo-800 mb-2">Administrative Controls:</h3>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Limited access on need-to-know basis</li>
                    <li>• Employee training on data protection</li>
                    <li>• Regular security policy updates</li>
                    <li>• Incident response and breach protocols</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>Important:</strong> While we use industry-standard security measures, no method of 
                  transmission over the internet or electronic storage is 100% secure. We cannot guarantee 
                  absolute security but are committed to protecting your information using reasonable and 
                  appropriate safeguards.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="h-6 w-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking Technologies</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience 
                and analyze website usage. You can control cookie preferences through your browser settings.
              </p>
              
              <div className="bg-teal-50 rounded-lg p-4">
                <h3 className="font-semibold text-teal-800 mb-3">Types of Cookies We Use:</h3>
                <div className="space-y-3 text-teal-700">
                  <div>
                    <strong>Essential Cookies:</strong> Required for basic website functionality and security
                  </div>
                  <div>
                    <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website
                  </div>
                  <div>
                    <strong>Functional Cookies:</strong> Remember your preferences and improve user experience
                  </div>
                  <div>
                    <strong>Analytics Cookies:</strong> Provide insights into website traffic and usage patterns
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Your Privacy Rights</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <strong>Access:</strong> Request access to your personal information
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <strong>Correction:</strong> Request correction of inaccurate information
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <strong>Deletion:</strong> Request deletion of your personal information
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <strong>Portability:</strong> Request transfer of your data to another service
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <strong>Restriction:</strong> Request limitation of processing
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <strong>Objection:</strong> Object to certain types of processing
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 mt-4">
                <p className="text-indigo-800">
                  To exercise these rights, please contact us at <strong>privacy@lyzelabs.com</strong>. 
                  We will respond to your request within the timeframes required by applicable law.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes 
                outlined in this privacy policy, unless a longer retention period is required by law.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Typical Retention Periods:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Order Information:</strong> 7 years for regulatory compliance</li>
                  <li>• <strong>Customer Communications:</strong> 3 years from last interaction</li>
                  <li>• <strong>Website Analytics:</strong> 26 months from collection</li>
                  <li>• <strong>Marketing Data:</strong> Until you opt-out or request deletion</li>
                </ul>
              </div>
            </div>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your personal information during 
                international transfers.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800">
                  For transfers outside your region, we use standard contractual clauses, adequacy decisions, 
                  or other legally approved transfer mechanisms to ensure your data remains protected.
                </p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Children's Privacy</h2>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                Our services are not intended for individuals under 18 years of age. We do not knowingly 
                collect personal information from children. If we become aware that we have collected 
                personal information from a child, we will take steps to delete such information promptly.
              </p>
            </div>
          </section>

          {/* Updates to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Privacy Policy</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices, 
                technology, legal requirements, or other factors. We will notify you of material changes 
                through our website or by email.
              </p>
              
              <p>
                Your continued use of our services after any modifications indicates your acceptance of 
                the updated Privacy Policy.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-green-800 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="space-y-2 text-green-700">
                <p><strong>Privacy Officer:</strong> privacy@lyzelabs.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@lyzelabs.com</p>
                <p><strong>General Inquiries:</strong> support@lyzelabs.com</p>
                <p><strong>WhatsApp:</strong> +91-8879243924</p>
              </div>
              
              <div className="mt-4 p-3 bg-green-100 rounded">
                <p className="text-green-800 text-sm">
                  <strong>Postal Address:</strong><br />
                  Lyze Labs Privacy Department<br />
                  [Company Address]<br />
                  India
                </p>
              </div>
            </div>
          </section>

          {/* Final Statement */}
          <div className="bg-gray-900 text-white rounded-lg p-6 text-center">
            <p className="text-lg">
              <strong>This Privacy Policy is effective as of January 2025 and applies to all users of Lyze Labs services.</strong>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;