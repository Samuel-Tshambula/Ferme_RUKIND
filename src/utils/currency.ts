export type Currency = 'CDF' | 'USD';

export const CURRENCY_SYMBOLS = {
  CDF: 'FC',
  USD: '$'
} as const;

export const CURRENCY_RATES = {
  CDF: 2500, // 1 EUR = 2500 CDF (taux approximatif)
  USD: 1.1   // 1 EUR = 1.1 USD (taux approximatif)
} as const;

// Devise par défaut
export const DEFAULT_CURRENCY: Currency = 'CDF';

export const formatPrice = (price: number, currency: Currency = DEFAULT_CURRENCY): string => {
  const symbol = CURRENCY_SYMBOLS[currency];
  
  if (currency === 'CDF') {
    return `${Math.round(price)} ${symbol}`;
  } else {
    return `${symbol}${price.toFixed(2)}`;
  }
};

