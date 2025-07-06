import React from "react";
import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle, ShoppingCart, Truck, Shield, CreditCard, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsPage = () => {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <FileText className="h-8 w-8 text-gray-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These terms govern your use of Lyze Labs services and the purchase of research compounds.
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
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Lyze Labs 
                regarding your use of our website, services, and purchase of research compounds. By accessing our 
                website or making a purchase, you agree to be bound by these Terms.
              </p>
            </div>
          </section>

          {/* Acceptance and Eligibility */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptance and Eligibility</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                By using Lyze Labs services, you represent and warrant that:
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-2 text-blue-800">
                  <li>• You are at least 18 years of age</li>
                  <li>• You are a qualified researcher or represent a licensed research institution</li>
                  <li>• You have the authority to enter into these Terms</li>
                  <li>• You will use research compounds solely for legitimate research purposes</li>
                  <li>• You have all necessary licenses and approvals for your intended research</li>
                  <li>• You will comply with all applicable laws and regulations</li>
                </ul>
              </div>
              
              <p>
                If you do not meet these requirements, you are not authorized to use our services or purchase our products.
              </p>
            </div>
          </section>

          {/* Research Use Only */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Research Use Only Requirements</h2>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
              <h3 className="font-bold text-red-800 mb-3">CRITICAL REQUIREMENTS:</h3>
              <ul className="space-y-2 text-red-700">
                <li>• All products are FOR RESEARCH USE ONLY</li>
                <li>• NOT approved for human consumption or therapeutic use</li>
                <li>• NOT intended for animal consumption or veterinary use</li>
                <li>• Must be handled in licensed research facilities only</li>
                <li>• Requires appropriate safety protocols and equipment</li>
                <li>• Subject to institutional review and approval processes</li>
              </ul>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                By purchasing from Lyze Labs, you explicitly acknowledge and agree that:
              </p>
              
              <ul className="space-y-2 ml-6 list-disc">
                <li>You understand the research-only nature of all products</li>
                <li>You will not use products for any non-research purposes</li>
                <li>You accept full responsibility for proper handling and storage</li>
                <li>You will comply with all safety and regulatory requirements</li>
                <li>Any misuse may result in serious legal and health consequences</li>
              </ul>
            </div>
          </section>

          {/* Products and Services */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <ShoppingCart className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Products and Services</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>
              <p>
                We strive to provide accurate product information, including descriptions, specifications, 
                and certificates of analysis. However, we reserve the right to:
              </p>
              
              <ul className="space-y-1 ml-6 list-disc">
                <li>Modify product specifications without notice</li>
                <li>Discontinue products at any time</li>
                <li>Correct pricing or description errors</li>
                <li>Limit quantities available for purchase</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6">Availability</h3>
              <p>
                Product availability is subject to stock levels and manufacturing schedules. We reserve 
                the right to limit quantities and refuse orders at our discretion.
              </p>
            </div>
          </section>

          {/* Ordering and Payment */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Ordering and Payment</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Order Process:</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Orders are subject to acceptance by Lyze Labs</li>
                  <li>• We may require additional verification for new customers</li>
                  <li>• Institutional purchase orders may be required</li>
                  <li>• All orders are confirmed via email</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Payment Terms:</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Payment required before shipping</li>
                  <li>• Cryptocurrency payments preferred</li>
                  <li>• Credit card payments accepted for verified institutions</li>
                  <li>• All prices in Indian Rupees unless specified</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-yellow-800">
                <strong>Payment Security:</strong> We use secure payment processing systems and do not store 
                complete credit card information. Cryptocurrency payments provide additional privacy and security.
              </p>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Truck className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Shipping and Delivery</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Shipping Terms:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Stealth packaging for all orders</li>
                    <li>• Temperature-controlled shipping when required</li>
                    <li>• Tracking information provided</li>
                    <li>• Delivery times are estimates, not guarantees</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery Requirements:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Institutional addresses preferred</li>
                    <li>• Adult signature may be required</li>
                    <li>• Customer responsible for import duties</li>
                    <li>• Risk of loss transfers upon shipment</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>International Shipping:</strong> Customers are responsible for ensuring compliance 
                  with local import regulations and customs requirements. Some products may not be available 
                  for shipment to certain countries.
                </p>
              </div>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Returns and Refunds</h2>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="font-bold text-orange-800 mb-3">Important Policy:</h3>
              <p className="text-orange-700 mb-4">
                Due to the nature of research compounds and regulatory requirements, ALL SALES ARE FINAL. 
                Returns and exchanges are not permitted once products have been shipped.
              </p>
              
              <div className="space-y-2 text-orange-700">
                <p><strong>Exceptions may be considered for:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Products damaged during shipping</li>
                  <li>• Incorrect products shipped due to our error</li>
                  <li>• Products that fail to meet specified purity standards</li>
                </ul>
              </div>
              
              <p className="text-orange-700 mt-4">
                Any claims must be reported within 48 hours of delivery with photographic evidence.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities and Prohibited Uses</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">You Agree To:</h3>
                <div className="bg-green-50 rounded-lg p-4">
                  <ul className="space-y-2 text-green-700">
                    <li>• Use products only for legitimate research purposes</li>
                    <li>• Maintain appropriate safety protocols and facilities</li>
                    <li>• Comply with all applicable laws and regulations</li>
                    <li>• Provide accurate information for all orders</li>
                    <li>• Maintain confidentiality of proprietary information</li>
                    <li>• Report any safety incidents or concerns</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Prohibited Activities:</h3>
                <div className="bg-red-50 rounded-lg p-4">
                  <ul className="space-y-2 text-red-700">
                    <li>• Human or animal consumption of any products</li>
                    <li>• Resale to unauthorized individuals or entities</li>
                    <li>• Use for non-research purposes</li>
                    <li>• Reverse engineering or unauthorized analysis</li>
                    <li>• Sharing with unlicensed researchers</li>
                    <li>• Any use that violates applicable laws</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the 
                property of Lyze Labs and is protected by intellectual property laws.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Permitted Use:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• View and download content for personal research use</li>
                  <li>• Print pages for research documentation purposes</li>
                  <li>• Reference product information in research publications</li>
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-red-800 mb-2">Prohibited Use:</h3>
                <ul className="space-y-1 text-red-700">
                  <li>• Commercial use without written permission</li>
                  <li>• Modification or redistribution of content</li>
                  <li>• Reverse engineering of products or processes</li>
                  <li>• Use of trademarks without authorization</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Liability and Disclaimers */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Liability and Disclaimers</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-900 text-white rounded-lg p-6">
                <h3 className="font-bold text-white mb-3">DISCLAIMER OF WARRANTIES</h3>
                <p className="text-gray-300 mb-4">
                  LYZE LABS PROVIDES ALL PRODUCTS AND SERVICES "AS IS" WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES. 
                  WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-bold text-red-800 mb-3">LIMITATION OF LIABILITY</h3>
                <p className="text-red-700 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, LYZE LABS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS, DATA LOSS, 
                  OR BUSINESS INTERRUPTION.
                </p>
                <p className="text-red-700">
                  OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID FOR THE SPECIFIC PRODUCT GIVING RISE TO THE CLAIM.
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-bold text-yellow-800 mb-3">INDEMNIFICATION</h3>
                <p className="text-yellow-700">
                  You agree to indemnify and hold harmless Lyze Labs from any claims, damages, losses, or expenses 
                  arising from your use of products, violation of these Terms, or infringement of any rights.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Dispute Resolution</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                These Terms are governed by the laws of India. Any disputes will be resolved through binding 
                arbitration in accordance with the Arbitration and Conciliation Act, 2015.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Dispute Resolution Process:</h3>
                <ol className="space-y-1 text-blue-700 ml-4 list-decimal">
                  <li>Informal negotiation and good faith discussions</li>
                  <li>Mediation if informal resolution fails</li>
                  <li>Binding arbitration as final resolution method</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We reserve the right to terminate or suspend your access to our services immediately, 
                without prior notice, for any violation of these Terms or applicable laws.
              </p>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Grounds for Termination:</h3>
                <ul className="space-y-1 text-orange-700">
                  <li>• Violation of research-only requirements</li>
                  <li>• Fraudulent or illegal activities</li>
                  <li>• Misrepresentation of credentials or qualifications</li>
                  <li>• Failure to comply with safety protocols</li>
                  <li>• Any breach of these Terms</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to These Terms</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We may update these Terms periodically to reflect changes in our services, legal requirements, 
                or business practices. Material changes will be communicated through our website or by email.
              </p>
              
              <p>
                Your continued use of our services after any modifications constitutes acceptance of the updated Terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-green-800 mb-4">
                For questions about these Terms or our services, please contact us:
              </p>
              
              <div className="space-y-2 text-green-700">
                <p><strong>Legal Department:</strong> legal@lyzelabs.com</p>
                <p><strong>Customer Service:</strong> support@lyzelabs.com</p>
                <p><strong>Compliance Officer:</strong> compliance@lyzelabs.com</p>
                <p><strong>WhatsApp:</strong> +91-8879243924</p>
              </div>
            </div>
          </section>

          {/* Final Statement */}
          <div className="bg-gray-900 text-white rounded-lg p-6 text-center">
            <p className="text-lg">
              <strong>By using Lyze Labs services, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service.</strong>
            </p>
            <p className="text-gray-300 mt-2 text-sm">
              Effective Date: January 2025 | Version 1.0
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;