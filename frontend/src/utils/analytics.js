// Lyze Labs Analytics Helper - Enhanced E-commerce Tracking
// Usage: Import this in your React components for easy tracking

// Check if gtag is available
const isGtagAvailable = () => typeof window !== 'undefined' && typeof window.gtag !== 'undefined';

// Product tracking functions
export const analytics = {
  // Track product page views
  trackProductView: (product) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'view_item', {
        currency: 'USD',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          category: product.category,
          quantity: 1,
          price: product.price
        }]
      });
    }
  },

  // Track add to cart events
  trackAddToCart: (product, variant, quantity) => {
    if (isGtagAvailable()) {
      const price = variant ? variant.price : product.price;
      window.gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: price * quantity,
        items: [{
          item_id: product.id,
          item_name: product.name,
          category: product.category,
          item_variant: variant ? variant.dose : 'standard',
          quantity: quantity,
          price: price
        }]
      });
    }
  },

  // Track search events
  trackSearch: (searchTerm, resultsCount) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        content_type: 'research_compounds',
        results_count: resultsCount
      });
    }
  },

  // Track category views
  trackCategoryView: (categoryName, productCount) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'view_item_list', {
        item_list_name: categoryName,
        content_type: 'product_category',
        items_count: productCount
      });
    }
  },

  // Track WhatsApp clicks
  trackWhatsAppClick: () => {
    if (isGtagAvailable()) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'customer_support',
        contact_method: 'whatsapp'
      });
    }
  },

  // Track checkout progress
  trackCheckoutProgress: (step, items, value) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: value,
        items: items,
        checkout_step: step
      });
    }
  },

  // Track purchases
  trackPurchase: (transactionId, items, total) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: total,
        currency: 'USD',
        items: items,
        shipping_method: 'stealth_shipping',
        payment_method: 'crypto'
      });
    }
  },

  // Track crypto payment attempts
  trackCryptoPayment: (currency, amount) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'crypto_payment_attempt', {
        event_category: 'ecommerce',
        event_label: currency,
        value: amount,
        currency: 'USD',
        payment_type: 'cryptocurrency'
      });
    }
  },

  // Track lab report downloads
  trackLabReportDownload: (productName) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'file_download', {
        event_category: 'engagement',
        event_label: 'lab_report',
        file_name: `${productName}_lab_report.pdf`,
        file_type: 'lab_verification'
      });
    }
  },

  // Track newsletter signups
  trackNewsletterSignup: (email) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'sign_up', {
        method: 'newsletter',
        event_category: 'engagement',
        event_label: 'newsletter_subscription'
      });
    }
  },

  // Track page views with custom parameters
  trackPageView: (pageName, pageCategory) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        content_group1: pageCategory || 'Research Compounds',
        content_group2: 'E-commerce Store'
      });
    }
  },

  // Track user engagement milestones
  trackEngagement: (engagementType, value) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'engagement', {
        engagement_type: engagementType,
        value: value,
        event_category: 'user_engagement'
      });
    }
  },

  // Track errors for debugging
  trackError: (errorType, errorMessage) => {
    if (isGtagAvailable()) {
      window.gtag('event', 'exception', {
        description: errorMessage,
        fatal: false,
        error_type: errorType
      });
    }
  }
};

// Auto-track external link clicks
if (typeof window !== 'undefined') {
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
      if (isGtagAvailable()) {
        window.gtag('event', 'click', {
          event_category: 'outbound',
          event_label: link.href,
          transport_type: 'sendBeacon'
        });
      }
    }
  });
}

// Export for React components
export default analytics;