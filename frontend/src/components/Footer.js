import React from "react";
import { Link } from "react-router-dom";
import { Globe, MessageCircle, Languages } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold mb-4 inline-block">
              <span className="text-blue-400">Lyze</span>Labs
            </Link>
            <p className="text-gray-400 mb-4">
              Premium research compounds for licensed institutions worldwide.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Globe className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/products/retatrutide" className="hover:text-white transition-colors">Retatrutide RC</Link></li>
              <li><Link to="/products/semaglutide" className="hover:text-white transition-colors">Semaglutide RC</Link></li>
              <li><Link to="/products/tirzepatide" className="hover:text-white transition-colors">Tirzepatide RC</Link></li>
              <li><Link to="/products/mk-677" className="hover:text-white transition-colors">MK-677 RC</Link></li>
              <li><Link to="/products/rad-140" className="hover:text-white transition-colors">RAD-140 RC</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/track" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Research Blog</Link></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/disclaimer" className="hover:text-white transition-colors">Research Disclaimer</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
            
            {/* Language Selector */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Languages className="h-4 w-4" />
                <select className="bg-gray-800 text-gray-300 rounded px-2 py-1 text-sm">
                  <option>English</option>
                  <option>हिंदी (Coming Soon)</option>
                  <option>বাংলা (Coming Soon)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Lyze Labs. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              <span className="text-red-400 font-semibold">For Research Use Only</span> – Not for Human Consumption
            </p>
          </div>
          
          {/* Hidden SEO Content Block */}
          <div className="hidden" aria-hidden="true">
            <p>Buy Semaglutide online India for metabolic research applications. High-purity peptides for metabolic research USA, Europe, and globally. How to store MK677 and research compounds safely at room temperature. Safe SARMs source Europe with lab-grade documentation. Research chemicals that mimic Ozempic effects for scientific studies. Lab-tested compounds for non-human consumption research protocols. Peptide storage guidelines for extended stability in laboratory settings.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;