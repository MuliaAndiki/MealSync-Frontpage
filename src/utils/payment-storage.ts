interface PendingPayment {
  orderId: string;
  snapToken: string;
  timestamp: number;
}

const STORAGE_KEY = 'mealsync_pending_payment';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const PaymentStorage = {
  save: (orderId: string, snapToken: string) => {
    if (typeof window === 'undefined') return;

    const payment: PendingPayment = {
      orderId,
      snapToken,
      timestamp: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payment));
  },

  get: (): PendingPayment | null => {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
      const payment: PendingPayment = JSON.parse(stored);

      if (Date.now() - payment.timestamp > TOKEN_EXPIRY) {
        PaymentStorage.clear();
        return null;
      }

      return payment;
    } catch (error) {
      console.error('Failed to parse pending payment:', error);
      PaymentStorage.clear();
      return null;
    }
  },

  getByOrderId: (orderId: string): PendingPayment | null => {
    const payment = PaymentStorage.get();
    if (payment && payment.orderId === orderId) {
      return payment;
    }
    return null;
  },

  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },

  hasPendingPayment: (): boolean => {
    return PaymentStorage.get() !== null;
  },
};
