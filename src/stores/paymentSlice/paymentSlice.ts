import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PendingPayment {
  orderId: string;
  snapToken: string;
  timestamp: number;
}

interface PaymentState {
  pendingPayment: PendingPayment | null;
}

const initialState: PaymentState = {
  pendingPayment: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPendingPayment(state, action: PayloadAction<{ orderId: string; snapToken: string }>) {
      state.pendingPayment = {
        orderId: action.payload.orderId,
        snapToken: action.payload.snapToken,
        timestamp: Date.now(),
      };
    },
    clearPendingPayment(state) {
      state.pendingPayment = null;
    },
  },
});

export const { setPendingPayment, clearPendingPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
