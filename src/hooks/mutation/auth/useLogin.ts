import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { useMutation } from '@tanstack/react-query';
import { useAlert } from '@/hooks/useAlert/costum-alert';
import Api from '@/services/props.service';

export default function useLogin(options?: { onAfterSucces?: () => void }) {
  const alert = useAlert();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: (payload) => Api.Auth.Login(payload),
    onSuccess: () => {
      alert.toast({
        title: 'Succesfully',
        message: 'Login Succesfully',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Failed Login',
        icon: 'error',
      });
    },
  });
}
