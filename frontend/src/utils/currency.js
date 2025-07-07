// Currency conversion utility
// Currency conversion utility

// Helper function to detect user's actual location more accurately
const detectUserLocation = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = navigator.language || navigator.languages[0] || 'en-US';
  
  console.log('Debug - Timezone:', timezone);
  console.log('Debug - Locale:', locale);
  
  // More precise India detection
  if (timezone.includes('Asia/Kolkata') || 
      timezone.includes('Asia/Calcutta') || 
      locale.includes('hi') || 
      locale.includes('en-IN') ||
      timezone.includes('Asia/Mumbai') ||
      timezone.includes('Asia/Delhi')) {
    return { country: 'IN', currency: 'INR', symbol: '₹', rate: 82 };
  }
  
  // More precise Europe detection
  if (timezone.includes('Europe/') && 
      (locale.includes('de') || locale.includes('fr') || locale.includes('es') || locale.includes('it'))) {
    return { country: 'EU', currency: 'EUR', symbol: '€', rate: 0.85 };
  }
  
  // UK detection
  if (timezone.includes('Europe/London') || locale.includes('en-GB')) {
    return { country: 'GB', currency: 'GBP', symbol: '£', rate: 0.75 };
  }
  
  // UAE detection
  if (timezone.includes('Asia/Dubai') || timezone.includes('Asia/UAE')) {
    return { country: 'AE', currency: 'AED', symbol: 'د.إ', rate: 3.67 };
  }
  
  // Australia detection
  if (timezone.includes('Australia/') || locale.includes('en-AU')) {
    return { country: 'AU', currency: 'AUD', symbol: 'A$', rate: 1.45 };
  }
  
  // Canada detection
  if (timezone.includes('America/') && locale.includes('en-CA')) {
    return { country: 'CA', currency: 'CAD', symbol: 'C$', rate: 1.25 };
  }
  
  // Default to USD for US and other regions
  return { country: 'US', currency: 'USD', symbol: '$', rate: 1 };
};

export const getCurrencyInfo = () => {
  const locationInfo = detectUserLocation();
  console.log('Debug - Detected location:', locationInfo);
  
  return {
    currency: locationInfo.currency,
    symbol: locationInfo.symbol,
    rate: locationInfo.rate,
    country: locationInfo.country
  };
};

// Helper function to round price to nearest 0 or 5
const roundToNearestFive = (price) => {
  const rounded = Math.round(price);
  const lastDigit = rounded % 10;
  
  if (lastDigit === 0 || lastDigit === 5) {
    return rounded;
  } else if (lastDigit < 3) {
    return rounded - lastDigit; // Round down to nearest 0
  } else if (lastDigit < 8) {
    return rounded - lastDigit + 5; // Round to nearest 5
  } else {
    return rounded - lastDigit + 10; // Round up to nearest 10 (0)
  }
};

export const formatPrice = (usdPrice, options = {}) => {
  const { currency, symbol, rate, country } = getCurrencyInfo();
  const { showOriginal = true, showBoth = true } = options;
  
  // First, round USD price to nearest 0 or 5
  const roundedUsdPrice = roundToNearestFive(usdPrice);
  
  // ALWAYS show USD as the primary currency
  const usdDisplay = `$${roundedUsdPrice}`;
  
  // If user is in USD region, just show the rounded USD price
  if (currency === 'USD') {
    return {
      converted: usdDisplay,
      original: usdDisplay,
      currency: 'USD',
      rate: 1,
      usdPrice: roundedUsdPrice
    };
  }
  
  // Convert the rounded USD price to local currency
  const convertedPrice = Math.round(roundedUsdPrice * rate);
  const localDisplay = `${symbol}${convertedPrice}`;
  
  if (showBoth) {
    return {
      converted: `${usdDisplay} (${localDisplay})`,
      original: usdDisplay,
      currency,
      rate,
      usdPrice: roundedUsdPrice
    };
  }
  
  return {
    converted: localDisplay,
    original: usdDisplay,
    currency,
    rate,
    usdPrice: roundedUsdPrice
  };
};

export const formatPriceSimple = (usdPrice) => {
  const { currency, symbol, rate, country } = getCurrencyInfo();
  
  // First, round USD price to nearest 0 or 5
  const roundedUsdPrice = roundToNearestFive(usdPrice);
  
  // ALWAYS show USD first as the base currency
  const usdDisplay = `$${roundedUsdPrice}`;
  
  // If user is in USD region, just show USD
  if (currency === 'USD') {
    return usdDisplay;
  }
  
  // Convert the rounded USD price to local currency
  const convertedPrice = Math.round(roundedUsdPrice * rate);
  
  // Show USD with local currency in parentheses
  return `${usdDisplay} (${symbol}${convertedPrice})`;
};