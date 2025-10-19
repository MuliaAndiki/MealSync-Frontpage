import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

class PaymentData {
  paymentData: any;
  isLoading: boolean;
  isError: boolean;
  refetchAll: () => void;
  constructor(paymentQuery: any) {
    this.paymentData = paymentQuery.data?.data ?? [];
    this.isLoading = paymentQuery.isLoading;
    this.isError = paymentQuery.isError;
    this.refetchAll = () => {
      paymentQuery.refetch();
    };
  }
}

export function usePaymentData(orderId?: string) {
  const paymentQuery = useQuery({
    queryKey: ['payment', 'order', orderId],
    queryFn: () => Api.Payment.getCheckout(orderId!),
    staleTime: 1000 * 60 * 5,
    enabled: !!orderId,
  });
  return new PaymentData(paymentQuery);
}
