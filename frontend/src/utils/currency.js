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

export const formatPrice = (usdPrice, options = {}) => {
  const { currency, symbol, rate } = getCurrencyInfo();
  const { showOriginal = true } = options;
  
  const convertedPrice = Math.round(usdPrice * rate);
  const formattedPrice = `${symbol}${convertedPrice}`;
  
  if (showOriginal && currency !== 'USD') {
    return {
      converted: formattedPrice,
      original: `$${usdPrice}`,
      currency,
      rate: convertedPrice / usdPrice
    };
  }
  
  return {
    converted: formattedPrice,
    original: formattedPrice,
    currency,
    rate: 1
  };
};

export const formatPriceSimple = (usdPrice) => {
  const { symbol, rate } = getCurrencyInfo();
  const convertedPrice = Math.round(usdPrice * rate);
  return `${symbol}${convertedPrice}`;
};