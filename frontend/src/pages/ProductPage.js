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
import { getProductById } from "../data/products";

const ProductPage = () => {
  const { productId } = useParams();
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);

  const product = getProductById(productId);

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
          "name": product.name,
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": "Lyze Labs"
          },
          "offers": {
            "@type": "Offer",
            "price": product.price.replace('₹', ''),
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.customerReviews.length
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
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-lg"
              >
                <img 
                  src={product.image} 
                  alt={`${product.name} - pharmaceutical-grade research compound`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </span>
                </div>
              </motion.div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-600">Stealth Shipping</span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Award className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-600">Lab Tested</span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-600">Fast Delivery</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{product.variant}</p>
                <p className="text-blue-600 font-medium mb-4">{product.category}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviews.length} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                  <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                  <span className="text-lg text-green-600 font-medium">{product.priceUSD}</span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {/* Extended Description */}
                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed">{product.extendedDescription}</p>
                </div>

                {/* Crypto Payment */}
                <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <Bitcoin className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Preferred Payment: Cryptocurrency</p>
                      <p className="text-sm text-gray-600">Bitcoin, Ethereum, USDT accepted for secure transactions</p>
                    </div>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                    <select 
                      value={quantity} 
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>

                {/* Success Message */}
                {showCart && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg mb-6"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Added to cart successfully!</span>
                  </motion.div>
                )}

                {/* COA Download */}
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  Download Certificate of Analysis
                </button>
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
            {product.reviews.map((review) => (
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

      {/* WhatsApp Float */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all">
          <MessageCircle className="h-6 w-6" />
        </button>
      </motion.div>
    </div>
  );
};

export default ProductPage;