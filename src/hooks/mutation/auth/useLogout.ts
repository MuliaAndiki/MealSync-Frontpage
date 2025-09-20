import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { logout } from '@/stores/authSlice/authSlice';
import { deleteCookie } from 'cookies-next';
import { APP_SESSION_COOKIE_KEY } from '@/configs/cookies.config';
import { useAppDispatch } from '../../dispatch/dispatch';
import { useAlert } from '@/hooks/useAlert/costum-alert';

export default function useLogout() {
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: () => Api.Auth.Logout(),
    onSuccess: (res) => {
      alert.toast({
        title: 'Succes',
        message: 'Logout Succes',
        icon: 'success',
        onVoid: () => {
          queryClient.clear();
          deleteCookie(APP_SESSION_COOKIE_KEY);
          dispatch(logout());
          router.push('/');
        },
      });
    },
    onError: (err) => {
      console.error(err);
      deleteCookie(APP_SESSION_COOKIE_KEY);
      dispatch(logout());
      router.push('/');
      alert.toast({
        title: 'Failed',
        message: 'Logout Failed',
        icon: 'error',
      });
    },
  });
}
