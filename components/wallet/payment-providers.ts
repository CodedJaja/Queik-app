// Mock payment provider adapters
export const paymentProviders = {
  stripe: {
    name: "Stripe",
    fee: (amount: number) => amount * 0.029 + 0.3,
    currencies: ["USD", "EUR", "GBP"],
    processingTime: "Instant",
  },
  flutterwave: {
    name: "Flutterwave",
    fee: (amount: number) => amount * 0.014,
    currencies: ["USD", "NGN", "GHS"],
    processingTime: "1-5 minutes",
  },
  paystack: {
    name: "Paystack",
    fee: (amount: number) => amount * 0.015 + 50,
    currencies: ["USD", "NGN"],
    processingTime: "Instant",
  },
  payoneer: {
    name: "Payoneer",
    fee: (amount: number) => amount * 0.02,
    currencies: ["USD", "EUR"],
    processingTime: "24-48 hours",
  },
  wise: {
    name: "Wise",
    fee: (amount: number) => amount * 0.005,
    currencies: ["USD", "EUR", "GBP", "INR", "NGN"],
    processingTime: "1-2 business days",
  },
}
