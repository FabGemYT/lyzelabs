import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ReviewsPage from "./pages/ReviewsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import CheckoutPage from "./pages/CheckoutPage";
import ShippingPage from "./pages/ShippingPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

// Cart Context
export const CartContext = React.createContext();

function App() {
  const [cartCount, setCartCount] = useState(0);

  // Update cart count when cart changes
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage cartCount={cartCount} />} />
            <Route path="/products" element={<ProductsPage cartCount={cartCount} />} />
            <Route path="/product/:productId" element={<ProductPage cartCount={cartCount} />} />
            <Route path="/cart" element={<CartPage cartCount={cartCount} />} />
            <Route path="/reviews" element={<ReviewsPage cartCount={cartCount} />} />
            <Route path="/blog" element={<BlogPage cartCount={cartCount} />} />
            <Route path="/blog/:postId" element={<BlogPostPage cartCount={cartCount} />} />
            <Route path="/checkout" element={<CheckoutPage cartCount={cartCount} />} />
            <Route path="/shipping" element={<ShippingPage cartCount={cartCount} />} />
            <Route path="/track" element={<TrackOrderPage cartCount={cartCount} />} />
            <Route path="/disclaimer" element={<DisclaimerPage cartCount={cartCount} />} />
            <Route path="/privacy" element={<PrivacyPage cartCount={cartCount} />} />
            <Route path="/terms" element={<TermsPage cartCount={cartCount} />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage cartCount={cartCount} />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartContext.Provider>
  );
}

export default App;