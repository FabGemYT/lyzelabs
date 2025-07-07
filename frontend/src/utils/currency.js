// Currency conversion utility
export const getCurrencyInfo = () => {
  // Get user's location from browser
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = navigator.language || navigator.languages[0] || 'en-US';
  
  // Currency mapping based on common locations/locales
  let currency = 'USD';
  let symbol = '$';
  let rate = 1; // Base rate from USD
  
  // Simple location-based currency detection
  if (timezone.includes('Asia/Kolkata') || locale.includes('hi') || locale.includes('en-IN')) {
    currency = 'INR';
    symbol = '₹';
    rate = 82; // Approximate USD to INR
  } else if (timezone.includes('Europe') || locale.includes('de') || locale.includes('fr') || locale.includes('es') || locale.includes('it')) {
    currency = 'EUR';
    symbol = '€';
    rate = 0.85; // Approximate USD to EUR
  } else if (timezone.includes('London') || locale.includes('en-GB')) {
    currency = 'GBP';
    symbol = '£';
    rate = 0.75; // Approximate USD to GBP
  } else if (timezone.includes('Dubai') || timezone.includes('Asia/Dubai')) {
    currency = 'AED';
    symbol = 'د.إ';
    rate = 3.67; // Approximate USD to AED
  } else if (timezone.includes('Australia') || locale.includes('en-AU')) {
    currency = 'AUD';
    symbol = 'A$';
    rate = 1.45; // Approximate USD to AUD
  } else if (timezone.includes('Canada') || locale.includes('en-CA')) {
    currency = 'CAD';
    symbol = 'C$';
    rate = 1.25; // Approximate USD to CAD
  }
  
  return { currency, symbol, rate };
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
  const { currency, symbol, rate } = getCurrencyInfo();
  const { showOriginal = true, showBoth = true } = options;
  
  // First, round USD price to nearest 0 or 5
  const roundedUsdPrice = roundToNearestFive(usdPrice);
  
  // If user is in USD region, just show the rounded USD price
  if (currency === 'USD') {
    return {
      converted: `$${roundedUsdPrice}`,
      original: `$${roundedUsdPrice}`,
      currency: 'USD',
      rate: 1,
      usdPrice: roundedUsdPrice
    };
  }
  
  // Convert the rounded USD price to local currency
  const convertedPrice = Math.round(roundedUsdPrice * rate);
  
  if (showBoth) {
    return {
      converted: `${symbol}${convertedPrice}`,
      original: `$${roundedUsdPrice}`,
      currency,
      rate,
      usdPrice: roundedUsdPrice
    };
  }
  
  return {
    converted: `${symbol}${convertedPrice}`,
    original: `${symbol}${convertedPrice}`,
    currency,
    rate,
    usdPrice: roundedUsdPrice
  };
};

export const formatPriceSimple = (usdPrice) => {
  const { currency, symbol, rate } = getCurrencyInfo();
  
  // First, round USD price to nearest 0 or 5
  const roundedUsdPrice = roundToNearestFive(usdPrice);
  
  // If user is in USD region, just show the rounded USD price
  if (currency === 'USD') {
    return `$${roundedUsdPrice}`;
  }
  
  // Convert the rounded USD price to local currency
  const convertedPrice = Math.round(roundedUsdPrice * rate);
  
  // For India and other regions, show both USD and local currency
  if (currency === 'INR' || currency === 'EUR' || currency === 'GBP' || currency === 'AED') {
    return `$${roundedUsdPrice} (${symbol}${convertedPrice})`;
  }
  
  return `$${roundedUsdPrice}`;
};