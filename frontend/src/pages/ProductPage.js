import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Star, 
  ShoppingCart, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Bitcoin,
  Shield,
  Truck,
  Award,
  MessageCircle,
  ArrowLeft,
  Info,
  CheckCircle
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { products, getProductById } from "../data/products";
import { formatPrice, formatPriceSimple } from "../utils/currency";

const ProductPage = () => {
  const { productId } = useParams();
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const product = getProductById(productId);

  // Calculate current variant pricing
  const currentVariant = product && product.variants ? product.variants[selectedVariant] : null;
  const currentPrice = currentVariant ? currentVariant.price : (product ? product.price : 0);
  const currentOriginalPrice = currentVariant ? currentVariant.originalPrice : (product ? product.originalPrice : null);

  useEffect(() => {
    // Initialize selected variant
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(0);
    }
  }, [product]);

  useEffect(() => {
    if (showCart) {
      const timer = setTimeout(() => setShowCart(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCart]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-700">Return to Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    setShowCart(true);
    // Add to cart logic would go here
    console.log(`Added ${quantity} x ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup for Product */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name || "",
          "description": product.description || "",
          "image": product.image || "",
          "brand": {
            "@type": "Brand",
            "name": "Lyze Labs"
          },
          "offers": {
            "@type": "Offer",
            "price": currentPrice || "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating || "4.8",
            "reviewCount": product.reviewCount || "0"
          },
          "review": product.customerReviews.map(review => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": review.author
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": review.rating
            },
            "reviewBody": review.text
          }))
        })}
      </script>

      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-xl shadow-lg"
              >
                <img 
                  src={product.image} 
                  alt={`${product.name} - pharmaceutical-grade research compound`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.purity || '99.9'}% Pure
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    In Stock
                  </span>
                </div>
              </motion.div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Stealth Shipping</span>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100">
                  <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Lab Tested</span>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100">
                  <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">1-3 Days India</span>
                </div>
              </div>
            </div>

            {/* Product Info - Conversion Focused */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Product Title & Rating */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-600 mb-3">{product.category}</p>
                    {/* Variant Selector - Always show for better UX */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Variant:
                      </label>
                      <select 
                        value={selectedVariant} 
                        onChange={(e) => setSelectedVariant(Number(e.target.value))}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg font-medium focus:border-blue-500 focus:outline-none bg-white"
                      >
                        {product.variants && product.variants.length > 0 ? (
                          product.variants.map((variant, index) => (
                            <option key={index} value={index}>
                              {variant.dose} – {(() => {
                                const priceData = formatPriceSimple(variant.price);
                                return typeof priceData === 'string' ? priceData : priceData.formatted;
                              })()}
                            </option>
                          ))
                        ) : (
                          <option value={0}>
                            Standard – {(() => {
                              const priceData = formatPriceSimple(product.price);
                              return typeof priceData === 'string' ? priceData : priceData.formatted;
                            })()}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">({product.rating})</span>
                  </div>
                </div>

                {/* Price & Shipping */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const priceData = formatPriceSimple(currentPrice);
                          
                          // If it's just a string (USD region), show normally
                          if (typeof priceData === 'string') {
                            return <span className="text-4xl font-bold text-gray-900">{priceData}</span>;
                          }
                          
                          // If it's an object (has local currency), show with nice styling
                          return (
                            <>
                              <span className="text-4xl font-bold text-gray-900">{priceData.usd}</span>
                              <span className="text-lg text-gray-500 font-normal">
                                (~{priceData.local})
                              </span>
                            </>
                          );
                        })()}
                      </div>
                      {currentOriginalPrice && (
                        <div className="mt-1">
                          {(() => {
                            const originalPriceData = formatPriceSimple(currentOriginalPrice);
                            
                            if (typeof originalPriceData === 'string') {
                              return <span className="text-lg text-gray-400 line-through">{originalPriceData}</span>;
                            }
                            
                            return (
                              <div className="flex items-center gap-2">
                                <span className="text-lg text-gray-400 line-through">{originalPriceData.usd}</span>
                                <span className="text-sm text-gray-400 line-through">
                                  (~{originalPriceData.local})
                                </span>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">1-3 Days India</div>
                      <div className="text-sm text-gray-600">5-12 Days International</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    ✓ Express shipping available • ✓ Crypto payments accepted
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Lab-Tested {product.name} for Metabolic Research</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">99.9% Purity with Janoshik Certificate</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Professional Stealth Packaging</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Research Use Only - Complete Documentation</span>
                    </li>
                  </ul>
                </div>

                {/* Add to Cart Section */}
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <label className="text-lg font-semibold text-gray-900">Quantity:</label>
                      <select 
                        value={quantity} 
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border-2 border-gray-300 rounded-lg px-4 py-2 text-lg font-medium focus:border-blue-500 focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 10].map(num => (
                          <option key={num} value={num}>{num}x box{num > 1 ? 'es' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {(() => {
                          const priceData = formatPriceSimple(currentPrice * quantity);
                          return typeof priceData === 'string' ? priceData : priceData.formatted;
                        })()}
                      </div>
                      <div className="text-sm text-gray-600">Total Price</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button
                      onClick={handleAddToCart}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl border border-blue-500 flex items-center justify-center"
                    >
                      <ShoppingCart className="h-6 w-6 mr-3" />
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl border border-purple-500 flex items-center justify-center"
                    >
                      <Bitcoin className="h-6 w-6 mr-3" />
                      Buy with Crypto
                    </motion.button>
                  </div>
                </div>

                {/* Success Message */}
                {showCart && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-3 text-green-700 bg-green-50 p-4 rounded-xl mb-6 border border-green-200"
                  >
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-semibold">Added to cart successfully!</span>
                  </motion.div>
                )}

                {/* Janoshik Certificate */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg border border-green-500 flex items-center justify-center"
                >
                  <Download className="h-6 w-6 mr-3" />
                  Download Janoshik Certificate
                </motion.button>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 mb-1">Research Use Only</p>
                      <p className="text-sm text-yellow-700">
                        This product is strictly intended for laboratory and scientific research purposes only. 
                        Not for human or animal consumption.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits & Use Cases */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Research Benefits</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Research Applications</h3>
                <ul className="space-y-3">
                  {product.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h3>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <dl className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                      <dd className="text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Important Notice */}
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Important Research Notice</h4>
                <p className="text-red-700 text-sm">
                  This product is intended FOR RESEARCH USE ONLY and is NOT approved for human consumption or therapeutic use. 
                  Researchers must comply with all local regulations and institutional guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.customerReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: review.id * 0.1 }}
                className="bg-white rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-600">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Product FAQ</h2>
          <div className="space-y-4">
            {product.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {activeFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {activeFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="text-center">
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {(() => {
                const priceData = formatPriceSimple(currentPrice * quantity);
                return typeof priceData === 'string' ? priceData : priceData.formatted;
              })()}
            </div>
            <div className="text-sm text-gray-600">{quantity} box{quantity > 1 ? 'es' : ''}</div>
          </div>
          <div className="flex gap-3">
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-lg font-bold text-lg flex items-center shadow-lg"
            >
              <Bitcoin className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* WhatsApp Float */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-24 right-6 z-50 lg:bottom-6"
      >
        <a 
          href="https://wa.me/918879243924?text=Hi,%20I%20need%20help%20with%20a%20research%20compound%20order%20from%20Lyze%20Labs."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-110 block"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </motion.div>
    </div>
  );
};

export default ProductPage;