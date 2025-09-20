import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { useMutation } from '@tanstack/react-query';
import { useAlert } from '@/hooks/useAlert/costum-alert';
import Api from '@/services/props.service';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { userSchema } from '@/types/api';
import { setCurrentUser } from '@/stores/authSlice/authSlice';
import {
  APP_SESSION_COOKIE_KEY,
  APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN,
} from '@/configs/cookies.config';
import { setCookie } from 'cookies-next';

export default function useLogin(options?: { onAfterSucces?: () => void }) {
  const alert = useAlert();
  const router = useRouter();
  const dispact = useAppDispatch();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: (payload) => Api.Auth.Login(payload),
    onSuccess: (res) => {
      const role = res.data.role;
      const token = res.data.token;
      if (role === 'user') {
        router.push('/user/dashboard');
      } else if (role === 'restaurant') {
        router.push('/restaurant/dashboard');
      } else if (role === 'superadmin') {
        router.push('/super-admin/dashboard');
      } else {
        router.push('/home');
      }

      setCookie(APP_SESSION_COOKIE_KEY, token, {
        maxAge: APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN / 1000,
        path: '/',
      });

      const userPayload: userSchema = {
        user: res.data.data,
      };

      dispact(setCurrentUser(userPayload));
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
