import Api from '@/services/props.service';
import { useMutation } from '@tanstack/react-query';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateOrder } from '@/types/form';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';

export function useCreateOrder(options?: { affterSuccess?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormCreateOrder>({
    mutationFn: (payload: FormCreateOrder) => Api.User.createOrder(payload),
    onSuccess: () => {
      alert.toast({
        title: 'Success',
        message: 'Order Berhasil Di Buat',
        icon: 'success',
        onVoid: () => {
          options?.affterSuccess?.();
          queryClient.invalidateQueries({ queryKey: ['order', 'history'], exact: false });
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Gagal Membuat Order',
        icon: 'error',
      });
    },
  });
}
