import { useMutation } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCreateRestaurant } from '@/types/form';

export function useCreateRestaurant(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormCreateRestaurant>({
    mutationFn: (payload) => Api.SuperAdmin.createRestaurant(payload),
    onSuccess: () => {
      alert.toast({
        title: 'Berhasil',
        message: 'Restaurant Berhasil Dibikin',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Gagal',
        message: 'Restaurant Gagal Dibikin',
        icon: 'error',
      });
    },
  });
}
