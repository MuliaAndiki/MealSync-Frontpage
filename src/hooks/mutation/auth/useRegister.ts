import { useAlert } from '@/hooks/useAlert/costum-alert';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormRegisterType } from '@/types/form';

export default function useRegister(options?: { onAfterSucces: () => void }) {
  const alert = useAlert();
  const router = useRouter();
  return useMutation<TResponse<any>, Error, FormRegisterType>({
    mutationFn: (payload) => Api.Auth.Register(payload),
    onSuccess: () => {
      alert.toast({
        title: 'Succesfully',
        message: 'Register Successfuly',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
          router.push('/login');
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Register Failed',
        icon: 'error',
      });
    },
  });
}
