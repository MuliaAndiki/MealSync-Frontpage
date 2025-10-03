import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateProducts } from '@/types/form';
import { useMutation } from '@tanstack/react-query';
import Api from '@/services/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';

export function useCreateProduct(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormCreateProducts>({
    mutationFn: (payload: FormCreateProducts) => Api.Restaurant.CreateProduct(payload),
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Product Berhasil Dibikin',
        icon: 'success',
        onVoid: () => {
          queryClient.invalidateQueries({ queryKey: ['products'], exact: false });
          options?.onAfterSucces?.();
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Gagal',
        message: 'Product Gagal Dibuat',
        icon: 'error',
      });
    },
  });
}
