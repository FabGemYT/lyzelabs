import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, BookOpen, Users, FileText, ExternalLink } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DisclaimerPage = () => {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Use Only Disclaimer</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Important legal and safety information regarding the use of research compounds supplied by Lyze Labs.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {/* Primary Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-red-800 mb-2">IMPORTANT: Research Use Only</h2>
                <p className="text-red-700 leading-relaxed">
                  All compounds, peptides, SARMs, and research chemicals supplied by Lyze Labs are intended 
                  <strong> FOR RESEARCH USE ONLY</strong> and are <strong>NOT approved for human consumption, 
                  therapeutic use, or any clinical applications</strong>. These products are not drugs, supplements, 
                  or food additives and have not been evaluated by any regulatory authority for safety or efficacy in humans.
                </p>
              </div>
            </div>
          </div>

          {/* Intended Use */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Intended Use and Scope</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-800 mb-3">Authorized Research Applications:</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• In vitro studies and laboratory research</li>
                <li>• Cellular and molecular biology research</li>
                <li>• Biochemical pathway investigations</li>
                <li>• Academic and institutional research projects</li>
                <li>• Pharmaceutical development and analysis</li>
                <li>• Quality control and analytical testing</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              Our research compounds are manufactured and distributed exclusively for use by qualified researchers, 
              scientists, and licensed institutions engaged in legitimate scientific research. All purchasers must 
              have appropriate qualifications, facilities, and authorization to handle research chemicals safely.
            </p>
          </section>

          {/* Prohibited Uses */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Prohibited Uses and Restrictions</h2>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-red-800 mb-3">Strictly Prohibited:</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Human consumption or ingestion of any kind</li>
                <li>• Animal consumption or veterinary use</li>
                <li>• Therapeutic, diagnostic, or clinical applications</li>
                <li>• Use as dietary supplements or food additives</li>
                <li>• Cosmetic or personal care applications</li>
                <li>• Any use outside of licensed research facilities</li>
                <li>• Resale to unlicensed individuals or entities</li>
                <li>• Use for recreational or performance enhancement purposes</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              Misuse of research compounds may result in serious health risks, legal consequences, and violations 
              of regulatory requirements. Purchasers are solely responsible for ensuring compliance with all 
              applicable laws and regulations in their jurisdiction.
            </p>
          </section>

          {/* Safety Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety and Handling Requirements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Laboratory Safety:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Use appropriate personal protective equipment</li>
                  <li>• Handle in well-ventilated laboratory areas</li>
                  <li>• Follow institutional safety protocols</li>
                  <li>• Maintain proper storage conditions</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Documentation:</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Maintain detailed research logs</li>
                  <li>• Document all handling procedures</li>
                  <li>• Keep certificates of analysis accessible</li>
                  <li>• Report any incidents or concerns</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              All research compounds should be handled by qualified personnel with appropriate training in 
              chemical safety and laboratory procedures. Institutions must maintain proper safety protocols, 
              waste disposal procedures, and emergency response plans.
            </p>
          </section>

          {/* Regulatory Compliance */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Regulatory Compliance and Legal Requirements</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Purchasers are solely responsible for ensuring compliance with all applicable laws, regulations, 
                and institutional policies in their jurisdiction. This includes but is not limited to:
              </p>
              
              <ul className="space-y-2 ml-6 list-disc">
                <li>Local and national regulations governing research chemicals</li>
                <li>Institutional review board requirements and approvals</li>
                <li>Import/export regulations for international shipments</li>
                <li>Proper licensing and authorization for handling research compounds</li>
                <li>Workplace safety and environmental regulations</li>
                <li>Documentation and reporting requirements</li>
              </ul>
              
              <p>
                Different jurisdictions may have varying regulations regarding the possession, use, and handling 
                of research compounds. It is the purchaser's responsibility to verify that their intended use 
                complies with all applicable laws and regulations.
              </p>
            </div>
          </section>

          {/* Liability and Warranty */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Liability Limitations and Warranty Disclaimer</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>NO WARRANTY:</strong> Lyze Labs provides research compounds "as is" without any express 
                  or implied warranties. We make no representations regarding the suitability, safety, or efficacy 
                  of these compounds for any particular research application.
                </p>
                
                <p>
                  <strong>LIMITATION OF LIABILITY:</strong> Lyze Labs shall not be liable for any direct, indirect, 
                  incidental, special, or consequential damages arising from the use or misuse of research compounds, 
                  including but not limited to personal injury, property damage, or research delays.
                </p>
                
                <p>
                  <strong>INDEMNIFICATION:</strong> Purchasers agree to indemnify and hold harmless Lyze Labs from 
                  any claims, damages, or liabilities arising from their use of research compounds, including any 
                  misuse or violation of applicable regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Quality and Testing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance and Testing</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                While Lyze Labs conducts quality control testing and provides certificates of analysis, 
                these are intended for research reference only and do not constitute a guarantee of 
                suitability for any specific research application.
              </p>
              
              <p>
                Researchers are encouraged to conduct their own analytical verification and quality 
                control testing appropriate for their specific research requirements. We recommend 
                independent verification of compound identity and purity when critical research 
                outcomes depend on compound quality.
              </p>
            </div>
          </section>

          {/* Updates and Changes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer Updates and Changes</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                This disclaimer may be updated periodically to reflect changes in regulations, industry 
                best practices, or company policies. Continued use of Lyze Labs products constitutes 
                acceptance of any updated terms and conditions.
              </p>
              
              <p>
                For the most current version of this disclaimer and other important legal information, 
                please visit our website regularly or contact our customer service team.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions and Contact Information</h2>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-blue-800 mb-4">
                If you have questions about the appropriate use of research compounds, regulatory compliance, 
                or safety requirements, please contact our technical support team:
              </p>
              
              <div className="space-y-2 text-blue-700">
                <p><strong>Email:</strong> compliance@lyzelabs.com</p>
                <p><strong>Technical Support:</strong> research@lyzelabs.com</p>
                <p><strong>WhatsApp:</strong> +91-9999999999</p>
              </div>
            </div>
          </section>

          {/* Final Statement */}
          <div className="bg-gray-900 text-white rounded-lg p-6 text-center">
            <p className="text-lg">
              <strong>By purchasing from Lyze Labs, you acknowledge that you have read, understood, 
              and agree to comply with all terms of this disclaimer.</strong>
            </p>
            <p className="text-gray-300 mt-2 text-sm">
              Last updated: January 2025
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default DisclaimerPage;