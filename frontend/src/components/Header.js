import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

const Header = ({ cartCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-gray-900">
                <span className="text-blue-600">Lyze</span>Labs
              </div>
            </Link>
            <nav className="hidden md:ml-8 md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Research Blog</Link>
              <Link to="/reviews" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</Link>
              <Link to="/shipping" className="text-gray-700 hover:text-blue-600 transition-colors">Shipping</Link>
              <Link to="/track" className="text-gray-700 hover:text-blue-600 transition-colors">Track Order</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/checkout" className="text-gray-700 hover:text-blue-600 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Research Blog</Link>
              <Link to="/reviews" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</Link>
              <Link to="/shipping" className="text-gray-700 hover:text-blue-600 transition-colors">Shipping</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;