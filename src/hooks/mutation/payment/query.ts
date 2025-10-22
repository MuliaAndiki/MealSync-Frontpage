import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

class PaymentData {
  paymentData: any;
  paymentStatusData: any;
  isLoading: boolean;
  isError: boolean;
  refetchAll: () => void;
  constructor(paymentQuery: any, paymentStatusQuery: any) {
    this.paymentData = paymentQuery.data?.data ?? [];
    this.paymentStatusData = paymentStatusQuery.data?.data ?? [];
    this.isLoading = paymentQuery.isLoading || paymentStatusQuery.isFetching;
    this.isError = paymentQuery.isError || paymentStatusQuery.isFetching;
    this.refetchAll = () => {
      paymentQuery.refetch();
      paymentStatusQuery.refetch();
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
  const paymentStatusQuery = useQuery({
    queryKey: ['payment', 'status'],
    queryFn: () => Api.Payment.getCheckoutStatus(),
    staleTime: 1000 * 60 * 5,
  });
  return new PaymentData(paymentQuery, paymentStatusQuery);
}
