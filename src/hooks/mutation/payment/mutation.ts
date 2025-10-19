import { useMutation } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';

interface PaymentMutationOptions {
  onAfterSucces?: () => void;
  onSnapToken?: (snapToken: string) => void;
}

export function usePaymentMutation(options?: PaymentMutationOptions) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: (orderId: string) => Api.Payment.createPayment(orderId),
    onSuccess: (res) => {
      if (res.data?.snapToken) {
        options?.onSnapToken?.(res.data.snapToken);
      } else {
        alert.toast({
          title: 'Succesfully',
          message: 'Payment Succesfully',
          icon: 'success',
          onVoid: () => {
            options?.onAfterSucces?.();
            //setup
            // queryClient.invalidateQueries.
          },
        });
      }
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: err.message,
        icon: 'error',
      });
    },
  });
}
