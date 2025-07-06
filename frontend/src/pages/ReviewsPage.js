import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Calendar, Award, Users, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ReviewsPage = () => {
  const reviews = [
    {
      id: 1,
      author: "Emma C. 🇺🇸",
      title: "Research Scientist",
      location: "California, USA",
      country: "USA",
      rating: 5,
      date: "1 week ago",
      verified: true,
      text: "Excellent purity, stable at room temperature for over 3 weeks. Used for in-vitro metabolic modulation testing — 10/10. Quality matches domestic suppliers at half the cost.",
      productsPurchased: ["Retatrutide RC", "Semaglutide RC"],
      helpful: 34
    },
    {
      id: 2,
      author: "Leon G. 🇩🇪",
      title: "Principal Investigator",
      location: "Berlin, Germany",
      country: "Germany",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      text: "Arrived in Berlin in 8 days, stealth packaging worked flawlessly through EU customs. Purity analysis confirms >99.9% as advertised. Outstanding for metabolic pathway research.",
      productsPurchased: ["MK-677 RC", "RAD-140 RC"],
      helpful: 28
    },
    {
      id: 3,
      author: "Carlos R. 🇪🇸",
      title: "Research Director",
      location: "Madrid, Spain",
      country: "Spain",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      text: "Professional service with comprehensive documentation. Compounds arrived in perfect condition with detailed COA. Perfect for institutional research protocols.",
      productsPurchased: ["Tirzepatide RC", "Semaglutide RC"],
      helpful: 31
    },
    {
      id: 4,
      author: "Hiroshi T. 🇯🇵",
      title: "Senior Scientist",
      location: "Tokyo, Japan",
      country: "Japan",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      text: "Outstanding quality control and documentation. Used for GLP-1 pathway studies with excellent reproducible results. Delivery to Japan was seamless.",
      productsPurchased: ["Retatrutide RC", "DNP Research Formula"],
      helpful: 29
    },
    {
      id: 5,
      author: "Lucas F. 🇨🇭",
      title: "Laboratory Manager",
      location: "Zurich, Switzerland",
      country: "Switzerland",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      text: "Reliable source for research compounds. Storage at room temperature worked perfectly for our extended studies. Professional packaging and customs handling.",
      productsPurchased: ["BPC-157 RC", "TB-500 RC"],
      helpful: 26
    },
    {
      id: 6,
      author: "Alex M. 🇨🇦",
      title: "Research Coordinator",
      location: "Toronto, Canada",
      country: "Canada",
      rating: 5,
      date: "1 month ago",
      verified: true,
      text: "Arrived in Toronto in 9 days with perfect stealth packaging. Quality matches what we get from domestic suppliers at half the cost. Highly recommended.",
      productsPurchased: ["RAD-140 RC", "MK-677 RC"],
      helpful: 32
    },
    {
      id: 7,
      author: "Sameer Q. 🇦🇪",
      title: "Research Scientist",
      location: "Dubai, UAE",
      country: "UAE",
      rating: 5,
      date: "1 month ago",
      verified: true,
      text: "Good quality compound with reliable results. Delivery was prompt to Middle East, packaging excellent for lab storage. Customer support very responsive.",
      productsPurchased: ["Clenbuterol RC", "T3/T4 RC Blend"],
      helpful: 25
    },
    {
      id: 8,
      author: "Priya N. 🇮🇳",
      title: "Senior Coordinator",
      location: "Bangalore, India",
      country: "India",
      rating: 5,
      date: "1 month ago",
      verified: true,
      text: "Perfect for our metabolic research protocols. Fast domestic delivery with professional stealth packaging. COA documentation is thorough and professional.",
      productsPurchased: ["Retatrutide RC", "Semaglutide RC"],
      helpful: 23
    },
    {
      id: 9,
      author: "Sophie L. 🇫🇷",
      title: "Postdoctoral Researcher",
      location: "Paris, France",
      country: "France",
      rating: 5,
      date: "1 month ago",
      verified: true,
      text: "Excellent research compounds with detailed analytical data. Batch-to-batch consistency outstanding for our longitudinal studies. EU shipping was flawless.",
      productsPurchased: ["Semaglutide RC", "Tirzepatide RC"],
      helpful: 30
    },
    {
      id: 10,
      author: "Michael B. 🇦🇺",
      title: "Laboratory Director",
      location: "Melbourne, Australia",
      country: "Australia",
      rating: 4,
      date: "2 months ago",
      verified: true,
      text: "Professional operation with pharmaceutical-grade standards. Stealth packaging ensured product integrity during long transit. Certificate always matches internal testing.",
      productsPurchased: ["DNP Research Formula", "BPC-157 RC"],
      helpful: 27
    },
    {
      id: 11,
      author: "Tomasz P. 🇵🇱",
      title: "Associate Professor",
      location: "Warsaw, Poland",
      country: "Poland",
      rating: 5,
      date: "2 months ago",
      verified: true,
      text: "Arrived in Poland in 10 days, stealth packaging worked perfectly through EU customs. Stable at room temperature for weeks. Solid supplier with good product range.",
      productsPurchased: ["T3/T4 RC Blend", "MK-677 RC"],
      helpful: 24
    },
    {
      id: 12,
      author: "Kenta S. 🇯🇵",
      title: "Senior Scientist",
      location: "Osaka, Japan",
      country: "Japan",
      rating: 5,
      date: "2 months ago",
      verified: true,
      text: "Fast delivery and solid quality. Packaging survived local customs perfectly. Research compounds arrived exactly as ordered with no customs issues.",
      productsPurchased: ["RAD-140 RC", "Clenbuterol RC"],
      helpful: 28
    },
    {
      id: 13,
      author: "Arjun V. 🇮🇳",
      title: "Senior Lab Tech",
      location: "Mumbai, India",
      country: "India",
      rating: 5,
      date: "3 months ago",
      verified: true,
      text: "Consistent quality and reliable delivery. Peptide handling instructions very detailed and helpful. Team clearly understands research requirements.",
      productsPurchased: ["TB-500 RC", "BPC-157 RC"],
      helpful: 21
    },
    {
      id: 14,
      author: "Dr. James W. 🇬🇧",
      title: "Research Principal",
      location: "London, UK",
      country: "UK",
      rating: 5,
      date: "3 months ago",
      verified: true,
      text: "Arrived in UK in 7 days, stealth packaging worked flawlessly. Products meet our institutional standards for research applications. Will order again.",
      productsPurchased: ["Semaglutide RC", "Retatrutide RC"],
      helpful: 26
    },
    {
      id: 15,
      author: "Rafael S. 🇧🇷",
      title: "Department Head",
      location: "São Paulo, Brazil",
      country: "Brazil",
      rating: 5,
      date: "3 months ago",
      verified: true,
      text: "Outstanding purity and stability. Used for GLP-1 receptor pathway research with excellent reproducible results. Multiple orders handled professionally.",
      productsPurchased: ["Semaglutide RC", "MK-677 RC"],
      helpful: 25
    }
  ];
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