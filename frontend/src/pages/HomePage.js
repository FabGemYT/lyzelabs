import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import PeptideVial3D from "../components/PeptideVial3D";
import { getFeaturedProducts } from "../data/products";
import { formatPriceSimple } from "../utils/currency";

const HomePage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const products = getFeaturedProducts(12); // Show first 12 products

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

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
      answer: "Every Lyze Labs product comes with a unique batch number and comprehensive third-party lab verification. Download detailed purity analysis reports and batch documentation for complete transparency and research confidence."
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
      answer: "Most compounds are stable at room temperature (22–25°C) for extended periods if kept dry, sealed, and away from light. Cold-chain shipping is not required unless explicitly mentioned on the product page. Detailed storage instructions are included with each product. Always follow the specific guidelines on the product label."
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
                "price": String(product.price),
                "priceCurrency": "USD"
              }
            }))
          }
        })}
      </script>

      {/* SEO Meta Tags */}
      <meta property="og:title" content="Lyze Labs – Premium Research Compounds India" />
      <meta property="og:description" content="Shop high-purity peptides, SARMs & research agents. Stealth shipping. Crypto accepted. For research use only." />
      <meta property="og:image" content="https://images.unsplash.com/photo-1626420925443-c6421f87daa9" />
      <meta property="og:url" content="https://lyzelabs.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Lyze Labs" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Lyze Labs – Premium Research Compounds India" />
      <meta name="twitter:description" content="Shop high-purity peptides, SARMs & research agents. Stealth shipping. Crypto accepted. For research use only." />
      <meta name="twitter:image" content="https://images.unsplash.com/photo-1626420925443-c6421f87daa9" />

      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white overflow-hidden min-h-screen flex items-center">
        {/* 3D Vial Background - More Subtle */}
        <div className="absolute inset-0 opacity-30">
          <PeptideVial3D className="z-0" />
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:max-w-4xl"
          >
            {/* Trust Headlines */}
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
                Premium Research
                <br />
                <span className="text-blue-400">Compounds</span>
              </h1>
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-300 mb-8">
                99.9% Purity • Global Shipping • Research Use Only
              </div>
            </div>

            {/* Trust Badge Strip */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-lg px-4 py-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm font-semibold">7,200+ Units Shipped</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-lg px-4 py-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold">Lab-Tested</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-lg px-4 py-2 flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold">Same-Day Stealth Shipping</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-lg px-4 py-2 flex items-center gap-2">
                <Bitcoin className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold">Crypto Accepted</span>
              </div>
            </div>

            {/* Trust Tagline */}
            <div className="mb-8">
              <p className="text-lg md:text-xl text-blue-200 font-medium">
                <Award className="w-6 h-6 inline mr-2 text-yellow-400" />
                Trusted by 100+ Research Teams Worldwide
              </p>
            </div>

            {/* Multiple CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/products"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl border border-blue-500 inline-block text-center"
              >
                Shop Now
              </Link>
              <motion.a
                href="https://wa.me/918879243924?text=Hi,%20I%20need%20help%20with%20a%20research%20compound%20order%20from%20Lyze%20Labs."
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 197, 94, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl border border-green-500 inline-block text-center"
              >
                WhatsApp Support
              </motion.a>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search research compounds..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </form>
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

      {/* Above-the-fold Customer Reviews */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Researchers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real research teams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 font-medium">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Arrived in Berlin in 8 days, stealth packaging worked flawlessly. Excellent purity, stable at room temperature for over 3 weeks."
              </p>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Leon G. 🇩🇪</p>
                <p className="text-gray-600">Berlin, Germany</p>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg border border-purple-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 font-medium">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Used for in-vitro metabolic modulation testing — 10/10. Quality matches domestic suppliers at half the cost."
              </p>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Emma C. 🇺🇸</p>
                <p className="text-gray-600">California, USA</p>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg border border-green-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 font-medium">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Arrived in Mumbai in 2 days with professional stealth packaging. Perfect for our metabolic research protocols."
              </p>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Priya N. 🇮🇳</p>
                <p className="text-gray-600">Bangalore, India</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you need for your research</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Peptides", icon: "🧬", count: "15+" },
              { name: "SARMs", icon: "🔬", count: "8+" },
              { name: "Oral Tablets", icon: "💊", count: "12+" },
              { name: "Injectables", icon: "💉", count: "10+" },
              { name: "Neuropeptides / Nootropics", icon: "🧠", count: "6+" },
              { name: "Sexual Health", icon: "❤️", count: "5+" },
              { name: "Hair/Anti-Aging", icon: "✨", count: "4+" },
              { name: "Fat Loss Compounds", icon: "🔥", count: "3+" }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Categories</h2>
            <p className="text-xl text-gray-600">Professional-grade compounds for advanced research</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border border-gray-100"
            >
              <div className="text-blue-600 mb-4">
                <Package className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">High Purity Guaranteed</h3>
              <p className="text-gray-600 mb-6">Each compound undergoes rigorous independent laboratory testing to ensure research-grade purity and uncompromised quality standards.</p>
              <div className="flex items-center text-blue-600 font-semibold">
                <FileText className="w-5 h-5 mr-2" />
                View Lab Reports
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border border-gray-100"
            >
              <div className="text-purple-600 mb-4">
                <Globe className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Shipping</h3>
              <p className="text-gray-600 mb-6">Optimized for professionals and institutions worldwide with stealth packaging and express delivery.</p>
              <div className="flex items-center text-purple-600 font-semibold">
                <Truck className="w-5 h-5 mr-2" />
                1-3 Days India • 5-12 Days Global
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border border-gray-100"
            >
              <div className="text-green-600 mb-4">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Research-Grade Only</h3>
              <p className="text-gray-600 mb-6">Strictly intended for laboratory use with complete documentation and compliance protocols.</p>
              <div className="flex items-center text-green-600 font-semibold">
                <Lock className="w-5 h-5 mr-2" />
                Research Use Only
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bestselling Products */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Research Compounds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Lab-tested for purity. Trusted by research institutions worldwide. Express shipping available.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">99.9% Purity</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">Janoshik Tested</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                <Truck className="w-5 h-5 text-purple-600" />
                <span className="text-purple-800 font-medium">Same-Day Shipping</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.purity}% Pure
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      In Stock
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex flex-col">
                        {(() => {
                          const priceData = formatPriceSimple(product.price);
                          
                          // If it's just a string (USD region), show normally
                          if (typeof priceData === 'string') {
                            return <span className="text-2xl font-bold text-gray-900">{priceData}</span>;
                          }
                          
                          // If it's an object (has local currency), show with nice styling
                          return (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900">{priceData.usd}</span>
                              <span className="text-sm text-gray-500 font-normal">
                                (~{priceData.local})
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">per box (10 vials)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-600 font-semibold">1-3 Days Shipping</div>
                      <div className="text-xs text-gray-500">Express Available</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <motion.button
                      onClick={() => {
                        // Add to cart functionality
                        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
                        const cartItem = {
                          id: product.id,
                          name: product.name,
                          variant: 'Standard',
                          price: product.price,
                          quantity: 1,
                          image: product.image
                        };
                        
                        const existingItemIndex = currentCart.findIndex(
                          item => item.id === cartItem.id && item.variant === cartItem.variant
                        );
                        
                        if (existingItemIndex > -1) {
                          currentCart[existingItemIndex].quantity += 1;
                        } else {
                          currentCart.push(cartItem);
                        }
                        
                        localStorage.setItem('cart', JSON.stringify(currentCart));
                        
                        // Show success feedback
                        alert(`Added ${product.name} to cart!`);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all shadow-lg border border-blue-500"
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold text-sm transition-all"
                    >
                      Quick View
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Link 
                      to={`/product/${product.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      View Details
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </Link>
                    {product.certificate && (
                      <a 
                        href={product.certificate}
                        className="text-green-600 hover:text-green-800 font-medium flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="w-4 h-4" />
                        Lab Report
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl border border-blue-500 inline-block"
            >
              View All Products
            </Link>
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
            <h2 className="text-4xl font-bold mb-4">Verified Research Quality</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Every batch undergoes comprehensive third-party laboratory testing. Access detailed purity analysis and batch verification for complete research confidence.
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
                    <h3 className="font-semibold">Laboratory Verification</h3>
                    <p className="text-sm text-gray-300">Batch #LZ-{1000 + index} | Verified</p>
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
              Stay updated with the latest research developments, compound analysis, and breakthrough scientific insights from our laboratory partners.
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

      {/* Hidden SEO Content */}
      <div className="sr-only" aria-hidden="true">
        <h2>What People Search Before They Buy Peptides or Research Compounds</h2>
        <p>
          Researchers frequently search "where to buy retatrutide online" and "best place to order DNP safely" when seeking 
          high-quality research compounds. Many also look for "buy research SARMs with crypto" for secure transactions. 
          Common queries include "is semaglutide legal in India?" and "lab-tested peptides for research use only" to ensure 
          compliance and quality. Scientists also search for "clenbuterol delivery India" and similar location-specific terms. 
          At Lyze Labs, we provide all these research compounds with pharmaceutical-grade purity, stealth shipping, and complete 
          legal compliance for licensed research institutions. Our customers frequently search for reliable suppliers offering 
          MK-677, RAD-140, BPC-157, TB-500, and other peptides with cryptocurrency payment options and worldwide delivery.
        </p>
      </div>

      {/* City-Specific SEO */}
      <div className="sr-only" aria-hidden="true">
        <p>
          Buy peptides in Mumbai, Delhi, Bangalore, Hyderabad, Pune, Ahmedabad. Research chemicals delivery in Jaipur, 
          Surat, Kochi, Chandigarh, Kolkata. Premium research compounds available across India with fast delivery.
        </p>
      </div>

      <Footer />

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <button 
          onClick={() => {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors btn-explore"
        >
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
        <a 
          href="https://wa.me/918879243924?text=Hi,%20I%20need%20help%20with%20a%20research%20compound%20order%20from%20Lyze%20Labs."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-110 block"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
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