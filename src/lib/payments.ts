import type { Package } from '../types/interview';

export type PaymentOption = 'booking' | 'full';

export const RAZORPAY_LINKS: Record<Package['id'], Record<PaymentOption, string>> = {
  tradingview: {
    full: 'https://rzp.io/rzp/ajb8maS',
    booking: 'https://rzp.io/rzp/zBdZPWrH'
  },
  'tradingview-mt5': {
    full: 'https://rzp.io/rzp/nN7jkYhs',
    booking: 'https://rzp.io/rzp/KwlxQtfD'
  },
  full: {
    full: 'https://rzp.io/rzp/jlTP7KP4',
    booking: 'https://rzp.io/rzp/RDu3vyAS'
  }
};

export const PAYMENT_AMOUNTS: Record<Package['id'], { packagePrice: number; bookingAmount: number }> = {
  tradingview: { packagePrice: 19, bookingAmount: 0.95 },
  'tradingview-mt5': { packagePrice: 29, bookingAmount: 1.45 },
  full: { packagePrice: 49, bookingAmount: 2.45 }
};

export const getPaymentLink = (packageId: Package['id'], paymentOption: PaymentOption) => RAZORPAY_LINKS[packageId][paymentOption];
export const getPaymentAmounts = (packageId: Package['id'], paymentOption: PaymentOption) => {
  const amounts = PAYMENT_AMOUNTS[packageId];
  return { packagePrice: amounts.packagePrice, amountDueNow: paymentOption === 'booking' ? amounts.bookingAmount : amounts.packagePrice };
};

export const createLbesOrderId = () => `LBES-${String(Math.floor(1000000 + Math.random() * 9000000))}`;
