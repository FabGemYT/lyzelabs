import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Shield, 
  Truck, 
  FileText, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  X,
  Play,
  Download,
  Globe,
  Award,
  Zap,
  Lock,
  Bitcoin,
  CreditCard,
  Languages,
  MapPin,
  Clock,
  Package,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Target
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllProducts } from "../data/products";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const products = getAllProducts().slice(0, 5); // Show first 5 products

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    {
      name: "Metabolic Research Compounds",
      description: "Advanced peptide research solutions",
      icon: "🧬",
      count: "12 Products",
      image: "https://images.unsplash.com/photo-1581093577421-f561a654a353",
      alt: "pharmaceutical-grade peptides India laboratory research"
    },
    {
      name: "Cellular Research Agents",
      description: "Cutting-edge cellular modulators",
      icon: "🔬",
      count: "8 Products",
      image: "https://images.pexels.com/photos/8728559/pexels-photo-8728559.jpeg",
      alt: "cellular research compounds high-purity laboratory"
    },
    {
      name: "Performance Research Modulators",
      description: "Selective research compounds",
      icon: "⚡",
      count: "15 Products",
      image: "https://images.unsplash.com/photo-1614023928026-39cb5515ee73",
      alt: "research SARMs for lab use performance modulators"
    },
    {
      name: "Metabolic Regulators",
      description: "Hormonal research solutions",
      icon: "🎯",
      count: "6 Products",
      image: "https://images.unsplash.com/photo-1626420925443-c6421f87daa9",
      alt: "metabolic research compounds hormonal regulators India"
    }
  ];

  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "Perfect purity and fast delivery.",
      author: "Researcher, Bangalore",
      date: "2 weeks ago"
    },
    {
      id: 2,
      rating: 5,
      text: "Trusted source. Great communication.",
      author: "LabTech, Singapore",
      date: "1 month ago"
    },
    {
      id: 3,
      rating: 5,
      text: "Excellent quality compounds. Highly recommended.",
      author: "Research Director, Mumbai",
      date: "3 weeks ago"
    }
  ];

  const faqs = [
    {
      question: "What makes Lyze Labs compounds different?",
      answer: "Our compounds are synthesized using pharmaceutical-grade processes with rigorous quality control. Each batch undergoes comprehensive testing for purity, potency, and contamination. We provide detailed lab reports with every product."
    },
    {
      question: "How do I verify the authenticity of my research compounds?",
      answer: "Every Lyze Labs product comes with a unique batch number and QR code. You can verify authenticity on our website and download the corresponding Certificate of Analysis (COA) with third-party lab results."
    },
    {
      question: "What is your shipping policy for international orders?",
      answer: "We offer discreet worldwide shipping with tracking. Orders typically arrive within 5-12 business days internationally. We use specialized packaging to maintain compound integrity during transit."
    },
    {
      question: "Are these compounds legal for research use?",
      answer: "All Lyze Labs compounds are intended exclusively for licensed research purposes. They are not approved for human consumption or therapeutic use. Researchers must comply with local regulations and institutional guidelines."
    },
    {
      question: "How should I store my research compounds?",
      answer: "Storage requirements vary by compound. Most peptides should be stored at -20°C in a freezer. Detailed storage instructions are included with each product. Always follow the specific guidelines on the product label."
    }
  ];

  const blogPosts = [
    {
      title: "Is Retatrutide the Future of Metabolic Research?",
      excerpt: "Exploring the latest developments in GLP-1 receptor agonist research and its implications for metabolic studies.",
      date: "Jan 15, 2025",
      readTime: "5 min read",
      slug: "retatrutide-future-metabolic-research"
    },
    {
      title: "Top 5 Peptides for Metabolic Research in 2025",
      excerpt: "A comprehensive guide to the most promising peptides driving breakthrough metabolic research this year.",
      date: "Dec 28, 2024",
      readTime: "8 min read",
      slug: "top-5-peptides-metabolic-research-2025"
    },
    {
      title: "Why India is Becoming a Hub for Research Peptides",
      excerpt: "Exploring India's growing role in global peptide research and pharmaceutical development.",
      date: "Dec 18, 2024",
      readTime: "7 min read",
      slug: "india-hub-research-peptides"
    }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for joining! Check your email for your 10% discount code.");
      setEmail("");
      setShowPopup(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Lyze Labs",
          "url": "https://lyzelabs.com",
          "logo": "https://lyzelabs.com/logo.png",
          "description": "Premium research compounds for licensed institutions. High-purity peptides, SARMs, and metabolic modulators shipped worldwide.",
          "areaServed": ["India", "Global"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Research Compounds",
            "itemListElement": products.map(product => ({
              "@type": "Product",
              "name": product.name,
              "description": product.description,
              "offers": {
                "@type": "Offer",
                "price": product.price.replace('₹', ''),
                "priceCurrency": "INR"
              }
            }))
          }
        })}
      </script>

      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/8728559/pexels-photo-8728559.jpeg)' }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Redefining Research.
              <br />
              <span className="text-blue-400">Empowering Progress.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Premium research compounds for licensed institutions. Pharmaceutical-grade quality with complete transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
              >
                Explore Products
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/20"
              >
                <Play className="inline mr-2 h-5 w-5" />
                Watch Demo
              </motion.button>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search research compounds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Lyze Labs Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Lyze Labs?</h2>
            <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700">
              <p>
                <span className="font-semibold text-blue-600">Buy peptides in India</span> from the most trusted source for research institutions. 
                We specialize in <span className="font-semibold">research compounds for sale online</span> with unmatched purity and reliability.
              </p>
              <p>
                Get <span className="font-semibold text-blue-600">high-purity compounds like Retatrutide, DNP, Semaglutide shipped discreetly across India & worldwide</span> 
                with comprehensive lab reports and pharmaceutical-grade quality assurance.
              </p>
              <p>
                From <span className="font-semibold">metabolic research peptides</span> to <span className="font-semibold">selective research modulators</span>, 
                we provide the highest quality compounds for licensed research applications.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <span className="text-lg font-semibold text-gray-900">99%+ Purity Guaranteed</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <TrendingUp className="h-8 w-8 text-blue-500" />
                <span className="text-lg font-semibold text-gray-900">Fastest Growing in India</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Target className="h-8 w-8 text-purple-500" />
                <span className="text-lg font-semibold text-gray-900">Research-Grade Quality</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Stealth Shipping</h3>
                <p className="text-sm text-gray-600">Discreet worldwide delivery</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Bitcoin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Crypto Accepted</h3>
                <p className="text-sm text-gray-600">Secure payment options</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Lab-Tested</h3>
                <p className="text-sm text-gray-600">99%+ purity guaranteed</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Fast Global Delivery</h3>
                <p className="text-sm text-gray-600">5-12 business days</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of research compounds, each category designed for specific research applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={category.image} 
                      alt={category.alt}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="text-sm text-blue-600 font-medium">{category.count}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Bestselling Research Compounds</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most trusted research compounds, rigorously tested and verified by leading research institutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="relative mb-4">
                    <img 
                      src={product.image} 
                      alt={`${product.name} - pharmaceutical-grade research compounds India`}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {product.badge}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.variant}</p>
                  <p className="text-xs text-gray-500 mb-3 leading-tight">{product.description.slice(0, 100)}...</p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-gray-900">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    </div>
                  </div>
                  
                  {/* Crypto Payment Strip */}
                  <div className="mb-4 p-2 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-center space-x-2">
                      <Bitcoin className="h-4 w-4 text-orange-500" />
                      <span className="text-xs font-medium text-gray-700">Pay with Crypto</span>
                      <span className="text-xs text-gray-500">BTC | ETH | USDT</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/products/${product.id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Researchers Worldwide</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of researchers who trust Lyze Labs for their research compound needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-sm text-gray-600">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/reviews"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Lab Reports & Sample Invoice */}
      <section id="lab-reports" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Transparency Through Testing</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Every batch is tested by independent laboratories. Download complete analysis reports for full transparency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-blue-400 mr-3" />
                  <div>
                    <h3 className="font-semibold">Certificate of Analysis</h3>
                    <p className="text-sm text-gray-300">Batch #LZ-{1000 + index}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Purity:</span>
                    <span className="text-green-400 font-medium">99.{90 + index}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tested:</span>
                    <span>Jan {10 + index}, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Lab:</span>
                    <span>Verified Labs Inc.</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </motion.div>
            ))}
            
            {/* Sample Invoice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center mb-4">
                <CreditCard className="h-8 w-8 text-green-400 mr-3" />
                <div>
                  <h3 className="font-semibold">Sample Invoice</h3>
                  <p className="text-sm text-gray-300">Invoice #LZ-INV-2025001</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Product:</span>
                  <span>Retatrutide RC 10mg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Quantity:</span>
                  <span>1 Vial</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Batch:</span>
                  <span>LZ-1001</span>
                </div>
                <div className="text-xs text-red-400 mt-2">
                  For Research Use Only - Not for Human Consumption
                </div>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                Download Sample
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Insights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest research developments, compound analysis, and industry insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                </div>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read More →
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our research compounds and services.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors">
          Explore Products
        </button>
      </div>

      {/* WhatsApp Float */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-20 md:bottom-6 right-6 z-50"
      >
        <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all">
          <MessageCircle className="h-6 w-6" />
        </button>
      </motion.div>

      {/* Email Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Join the Lyze Labs Research Circle
                </h3>
                <p className="text-gray-600 mb-6">
                  Get exclusive access to new compounds and receive 10% off your first order.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Get 10% Off
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-4">
                  By joining, you agree to receive research updates and promotional emails.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;