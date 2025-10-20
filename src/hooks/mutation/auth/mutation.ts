import { useMutation } from '@tanstack/react-query';
import { deleteCookie, setCookie } from 'cookies-next';

import {
  APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN,
  APP_SESSION_COOKIE_KEY,
} from '@/configs/cookies.config';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { setCurrentUser } from '@/stores/authSlice/authSlice';
import { logout } from '@/stores/authSlice/authSlice';
import { userSchema } from '@/types/api';
import { FormRegisterType } from '@/types/form';

export function useLogin(options?: { onAfterSucces?: () => void }) {
  const { alert, router, dispatch } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: (payload) => Api.Auth.Login(payload),
    onSuccess: (res) => {
      const userData = res.data;
      const role = userData.role;
      const token = userData.token;
      setCookie(APP_SESSION_COOKIE_KEY, token, {
        maxAge: APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN / 1000,
        path: '/',
      });

      const userPayload: userSchema = {
        user: userData,
      };

      dispatch(setCurrentUser(userPayload));
      alert.toast({
        title: 'Succesfully',
        message: 'Login Succesfully',
        icon: 'success',
        onVoid: () => {
          if (role === 'user') {
            router.push('/user/dashboard');
          } else if (role === 'restaurant') {
            router.push('/restaurant/dashboard');
          } else if (role === 'superadmin') {
            router.push('/super-admin/dashboard');
          } else {
            router.push('/home');
          }
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

export function useLogout(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient, dispatch, router } = useAppNameSpase();
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
          router.push('/login');
          options?.onAfterSucces?.();
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

export function useRegister(options?: { onAfterSucces: () => void }) {
  const { alert, router } = useAppNameSpase();
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
