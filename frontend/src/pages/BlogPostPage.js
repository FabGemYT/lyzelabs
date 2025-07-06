import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  BookOpen,
  ChevronRight,
  MessageCircle,
  ThumbsUp
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getBlogPostById, getAllBlogPosts } from "../data/blogPosts";

const BlogPostPage = () => {
  const { postId } = useParams();
  const post = getBlogPostById(postId);
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter(p => p.id !== postId && p.category === post?.category).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <Link to="/blog" className="text-blue-600 hover:text-blue-700">Return to Blog</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Expanded content for demonstration
  const fullContent = `
    ${post.content}

    ## Introduction

    The landscape of research compounds continues to evolve rapidly, with new developments emerging from laboratories worldwide. This comprehensive analysis explores the current state of research in this field, examining key developments, safety considerations, and future directions.

    ## Current Research Landscape

    Research institutions across India and globally are making significant strides in understanding the mechanisms and applications of various research compounds. The focus has shifted towards more sophisticated analytical methods and comprehensive safety protocols.

    ### Key Developments

    Recent studies have highlighted several important factors:

    1. **Purity Standards**: The importance of pharmaceutical-grade purity in research applications
    2. **Storage Protocols**: Enhanced understanding of optimal storage conditions
    3. **Analytical Methods**: Advanced testing procedures for compound verification
    4. **Safety Considerations**: Updated safety protocols for laboratory handling

    ## Regulatory Framework

    The regulatory environment continues to evolve, with clear distinctions maintained between research applications and other uses. Research institutions must ensure compliance with:

    - Local regulatory requirements
    - Institutional review board guidelines
    - Safety and handling protocols
    - Documentation and reporting standards

    ## Best Practices for Research Applications

    Based on current research and institutional feedback, several best practices have emerged:

    ### Storage and Handling
    - Maintain appropriate temperature conditions
    - Use proper containment systems
    - Follow established safety protocols
    - Document all handling procedures

    ### Documentation
    - Maintain detailed research logs
    - Document all experimental procedures
    - Record storage conditions and durations
    - Keep certificates of analysis readily available

    ## Future Directions

    The field continues to advance with several promising areas of development:

    - Enhanced analytical methods
    - Improved storage solutions
    - Advanced safety protocols
    - Expanded research applications

    ## Conclusion

    As the research landscape continues to evolve, the importance of maintaining high standards for compound quality, safety, and regulatory compliance cannot be overstated. Research institutions must stay informed about the latest developments and best practices to ensure the integrity and safety of their research programs.

    For more information about specific compounds or research protocols, consult with your institutional review board and follow all applicable guidelines and regulations.

    ---

    *This article is intended for educational purposes only and is designed to provide information about research applications of various compounds. All compounds discussed are intended for research use only and are not approved for human consumption or therapeutic use.*
  `;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link to="/blog" className="text-gray-500 hover:text-gray-700">Blog</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 truncate">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Link */}
            <Link 
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center text-gray-600 mb-8 space-x-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Share this article:</span>
              <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>Discuss</span>
              </button>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.excerpt}
            </div>

            <div className="text-gray-700 leading-relaxed space-y-6">
              {fullContent.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.includes('1. **') || paragraph.includes('- ')) {
                  return (
                    <div key={index} className="space-y-2">
                      {paragraph.split('\n').map((item, itemIndex) => {
                        if (item.trim().startsWith('1.') || item.trim().startsWith('-')) {
                          return (
                            <div key={itemIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{item.replace(/^\d+\.\s*\*\*|\*\*|^-\s*/g, '')}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  );
                }
                if (paragraph.startsWith('---')) {
                  return <hr key={index} className="my-8 border-gray-300" />;
                }
                if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  return (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
                      <p className="text-sm text-yellow-800 italic">
                        {paragraph.replace(/^\*|\*$/g, '')}
                      </p>
                    </div>
                  );
                }
                return (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Engagement Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful (24)</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>Comment</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Share Article</span>
              </button>
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 bg-gray-50 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Author</h3>
                <p className="text-gray-600 mb-3">
                  {post.author} is a research specialist with extensive experience in compound analysis and laboratory protocols. 
                  They contribute regularly to our research insights and maintain active involvement in the global research community.
                </p>
                <Link to="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
                  View all articles by {post.author} →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Related Articles</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${relatedPost.id}`}>
                      <article className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{relatedPost.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{relatedPost.readTime}</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4">{relatedPost.excerpt.slice(0, 100)}...</p>
                        
                        <span className="text-blue-600 font-medium text-sm group-hover:underline">
                          Read More →
                        </span>
                      </article>
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
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;