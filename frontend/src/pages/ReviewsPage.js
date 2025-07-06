import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Calendar, Award, Users, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ReviewsPage = () => {
  const reviews = [
    {
      id: 1,
      author: "Dr. S. Rajan",
      title: "Senior Research Scientist",
      location: "Chennai Research Institute",
      country: "India",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      text: "Been sourcing research compounds for 7 years. Lyze Labs is the most reliable source I've found. Their Retatrutide batch exceeded our purity requirements and came with comprehensive documentation.",
      productsPurchased: ["Retatrutide RC", "Semaglutide RC"],
      helpful: 24
    },
    {
      id: 2,
      author: "LabTech Vinay Kumar",
      title: "Laboratory Technician",
      location: "AIIMS Delhi",
      country: "India",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      text: "Outstanding quality control and customer service. The MK-677 capsules arrived exactly as described with perfect packaging. Temperature-controlled shipping was maintained throughout.",
      productsPurchased: ["MK-677 RC"],
      helpful: 18
    },
    {
      id: 3,
      author: "Dr. R. Narayan",
      title: "Research Director",
      location: "Singapore Biotech Hub",
      country: "Singapore",
      rating: 5,
      date: "1 month ago",
      verified: true,
      text: "Exceptional experience from order to delivery. The Tirzepatide dual-agonist compound arrived with detailed COA and storage instructions. Highly recommend for serious research institutions.",
      productsPurchased: ["Tirzepatide RC", "RAD-140 RC"],
      helpful: 31
    },
    {
      id: 4,
      author: "Research Lead M. Patel",
      title: "Principal Investigator",
      location: "Mumbai Metabolic Research Lab",
      country: "India",
      rating: 4,
      date: "1 month ago",
      verified: true,
      text: "Good quality compounds with reliable results. Shipping was fast and discrete. Only minor issue was with the initial email response time, but overall very satisfied with the products.",
      productsPurchased: ["Semaglutide RC", "DNP Research Formula"],
      helpful: 15
    },
    {
      id: 5,
      author: "Dr. A. Sharma",
      title: "Biochemistry Professor",
      location: "IIT Bombay",
      country: "India",
      rating: 5,
      date: "2 months ago",
      verified: true,
      text: "Professional service from start to finish. The peptide storage instructions were detailed and helpful. Our students have been using these compounds for metabolic pathway studies with excellent results.",
      productsPurchased: ["BPC-157 RC", "TB-500 RC"],
      helpful: 22
    },
    {
      id: 6,
      author: "Lab Manager K. Thompson",
      title: "Laboratory Manager",
      location: "University of Edinburgh",
      country: "UK",
      rating: 5,
      date: "2 months ago",
      verified: true,
      text: "International shipping was handled perfectly with all customs documentation in order. The research compounds arrived in excellent condition with no delays. Will definitely order again.",
      productsPurchased: ["RAD-140 RC", "MK-677 RC"],
      helpful: 27
    },
    {
      id: 7,
      author: "Dr. F. Al-Mansouri",
      title: "Research Scientist",
      location: "Dubai Medical Research Center",
      country: "UAE",
      rating: 5,
      date: "3 months ago",
      verified: true,
      text: "Reliable supplier with consistent quality. The Clenbuterol research compound was exactly as specified with proper documentation. Customer support was very responsive to our questions.",
      productsPurchased: ["Clenbuterol RC", "T3/T4 RC Blend"],
      helpful: 19
    },
    {
      id: 8,
      author: "Research Coordinator P. Singh",
      title: "Senior Coordinator",
      location: "PGI Chandigarh",
      country: "India",
      rating: 4,
      date: "3 months ago",
      verified: true,
      text: "Good experience overall. The compounds arrived on time and were properly packaged. Documentation was comprehensive. Pricing is competitive for the quality provided.",
      productsPurchased: ["Retatrutide RC"],
      helpful: 13
    },
    {
      id: 9,
      author: "Dr. L. Chen",
      title: "Postdoctoral Researcher",
      location: "National University Singapore",
      country: "Singapore",
      rating: 5,
      date: "4 months ago",
      verified: true,
      text: "Excellent research compounds with detailed analytical data. The batch-to-batch consistency has been outstanding for our longitudinal studies. Highly recommend for academic research.",
      productsPurchased: ["Semaglutide RC", "Tirzepatide RC"],
      helpful: 25
    },
    {
      id: 10,
      author: "Lab Director S. Gupta",
      title: "Laboratory Director",
      location: "Gurgaon Biotech Park",
      country: "India",
      rating: 5,
      date: "4 months ago",
      verified: true,
      text: "Professional operation with pharmaceutical-grade quality standards. The stealth packaging ensures product integrity during transport. Certificate of Analysis always matches our internal testing.",
      productsPurchased: ["DNP Research Formula", "BPC-157 RC"],
      helpful: 20
    },
    {
      id: 11,
      author: "Dr. B. Chakraborty",
      title: "Associate Professor",
      location: "Kolkata Institute of Technology",
      country: "India",
      rating: 4,
      date: "5 months ago",
      verified: true,
      text: "Solid supplier with good product range. The T3/T4 blend arrived with proper storage instructions and handling guidelines. Customer service team is knowledgeable about their products.",
      productsPurchased: ["T3/T4 RC Blend", "MK-677 RC"],
      helpful: 16
    },
    {
      id: 12,
      author: "Research Scientist Dr. J. Park",
      title: "Senior Scientist",
      location: "Seoul National Research Institute",
      country: "South Korea",
      rating: 5,
      date: "5 months ago",
      verified: true,
      text: "International collaboration made easy with their professional shipping and documentation. Research compounds arrived exactly as ordered with no customs issues. Excellent supplier.",
      productsPurchased: ["RAD-140 RC", "Clenbuterol RC"],
      helpful: 28
    },
    {
      id: 13,
      author: "Lab Technician A. Reddy",
      title: "Senior Lab Tech",
      location: "Hyderabad Pharma Research",
      country: "India",
      rating: 5,
      date: "6 months ago",
      verified: true,
      text: "Consistent quality and reliable delivery. The peptide handling instructions were very detailed and helped ensure proper storage. Team clearly understands research requirements.",
      productsPurchased: ["TB-500 RC", "BPC-157 RC"],
      helpful: 17
    },
    {
      id: 14,
      author: "Dr. M. Rodriguez",
      title: "Research Principal",
      location: "Barcelona Metabolic Institute",
      country: "Spain",
      rating: 4,
      date: "6 months ago",
      verified: true,
      text: "Good experience with European shipping. Products arrived within expected timeframe with all necessary documentation. Quality meets our institutional standards for research applications.",
      productsPurchased: ["Semaglutide RC", "Retatrutide RC"],
      helpful: 21
    },
    {
      id: 15,
      author: "Professor K. Nair",
      title: "Department Head",
      location: "Kerala University",
      country: "India",
      rating: 5,
      date: "7 months ago",
      verified: true,
      text: "Outstanding supplier for academic research. Multiple orders over the past year have all been handled professionally. The research compounds consistently meet our purity requirements.",
      productsPurchased: ["Multiple compounds"],
      helpful: 33
    }
  ];

  const stats = [
    { label: "Total Reviews", value: "500+", icon: Users },
    { label: "Average Rating", value: "4.8/5", icon: Star },
    { label: "Countries Served", value: "25+", icon: MapPin },
    { label: "Satisfaction Rate", value: "98%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Researchers Worldwide
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Read authentic reviews from research institutions, laboratories, and academic centers who trust Lyze Labs for their research compound needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Community Reviews</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Authentic feedback from verified researchers, laboratory technicians, and academic institutions worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{review.author}</h3>
                      {review.verified && (
                        <Award className="h-4 w-4 text-blue-500" title="Verified Purchase" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{review.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{review.location}, {review.country}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{review.date}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4 leading-relaxed">"{review.text}"</p>

                {/* Products Purchased */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Products purchased:</p>
                  <div className="flex flex-wrap gap-2">
                    {review.productsPurchased.map((product, productIndex) => (
                      <span 
                        key={productIndex}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Helpful Count */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">
                    {review.helpful} researchers found this helpful
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Was this helpful?
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Research Community</h2>
            <p className="text-xl text-blue-100 mb-8">
              Experience the quality and reliability that researchers worldwide trust. Order your research compounds today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Browse Products
              </button>
              <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Submit Your Review
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewsPage;