// Simple test to verify currency formatting
import { formatPriceSimple, getCurrencyInfo } from './utils/currency';

// Test the currency functions
console.log('Testing currency functions...');

// Test getCurrencyInfo
const currencyInfo = getCurrencyInfo();
console.log('Currency info:', currencyInfo);

// Test formatPriceSimple with different prices
console.log('$125 formatted:', formatPriceSimple(125));
console.log('$150 formatted:', formatPriceSimple(150));
console.log('$123 formatted:', formatPriceSimple(123));
console.log('$127 formatted:', formatPriceSimple(127));
console.log('$138 formatted:', formatPriceSimple(138));

// Test timezone and locale detection
console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
console.log('Locale:', navigator.language);