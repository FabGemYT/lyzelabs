import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { formatPriceSimple } from "../utils/currency";

const CartPage = () => {
  // Mock cart data - in real app this would come from state management
  const [cartItems, setCartItems] = useState([
    {
      id: "semaglutide",
      name: "Semaglutide",
      variant: "10mg x 10 vials",
      price: 150,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1595500382155-e7cd8180c301"
    },
    {
      id: "tirzepatide",
      name: "Tirzepatide",
      variant: "15mg x 10 vials",
      price: 175,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144"
    }
  ]);

  const updateQuantity = (id, variant, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => !(item.id === id && item.variant === variant)));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id && item.variant === variant 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeItem = (id, variant) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.variant === variant)));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length === 0 ? "Your cart is empty" : `${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some research compounds to get started.</p>
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.variant}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 flex items-center space-x-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.variant}</p>
                        <div className="text-sm font-medium text-gray-900 mt-1">
                          {(() => {
                            const priceData = formatPriceSimple(item.price);
                            
                            // If it's just a string (USD region), show normally
                            if (typeof priceData === 'string') {
                              return priceData;
                            }
                            
                            // If it's an object (has local currency), show formatted
                            return priceData.formatted;
                          })()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatPriceSimple(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id, item.variant)}
                          className="text-red-600 hover:text-red-700 mt-2 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">{formatPriceSimple(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">
                      {shipping === 0 ? "Free" : formatPriceSimple(shipping)}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-sm text-green-600">Free shipping on orders over $100</p>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">{formatPriceSimple(total)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center block"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    to="/products"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors text-center block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;