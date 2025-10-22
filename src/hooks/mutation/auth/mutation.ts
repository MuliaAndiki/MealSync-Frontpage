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
import { setEmail, setSource } from '@/stores/otpSlice/otpSlice';
import { userSchema } from '@/types/api';
import {
  FormForgotPassword,
  FormRegisterType,
  FormResetPassword,
  FormVerifyOtp,
} from '@/types/form';
import { disconnectSocket } from '@/utils/socket.client';

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
          disconnectSocket();
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
  const { alert, router, dispatch } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormRegisterType>({
    mutationFn: (payload) => Api.Auth.Register(payload),
    onSuccess: (res, variables) => {
      alert.toast({
        title: 'Succesfully',
        message: 'Register Successfuly',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
          dispatch(setSource('register'));
          dispatch(setEmail(variables.email));
          router.push('/verify-otp');
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

export function useForgorPassword(optional?: { onAfterSucces: () => void }) {
  const { alert, router, dispatch } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormForgotPassword>({
    mutationFn: (payload) => Api.Auth.forgotPassword(payload),
    onSuccess: (res, variables) => {
      alert.toast({
        title: 'Succesfully',
        message: 'Otp Sending',
        icon: 'success',
        onVoid: () => {
          router.push('/verify-otp');
          optional?.onAfterSucces?.();
          dispatch(setSource('forgotPasswordByEmail'));
          dispatch(setEmail(variables.email ?? ''));
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Email Not Found',
        icon: 'error',
      });
    },
  });
}

export function useVerify(optional?: { onAfterSucces: () => void }) {
  const { alert, router, currentRedirect } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormVerifyOtp>({
    mutationFn: (payload) => Api.Auth.verifyOtp(payload),
    onSuccess: () => {
      alert.toast({
        title: 'Succesfully',
        message: 'Otp Berhasil Di Verify',
        icon: 'success',
        onVoid: () => {
          optional?.onAfterSucces?.();
          if (currentRedirect === 'register') {
            router.push('/login');
          } else if (currentRedirect === 'forgotPasswordByEmail') {
            router.push('/reset-password');
          } else {
            return null;
          }
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Otp not valid',
        icon: 'error',
      });
    },
  });
}

export function useResetPassword(optional?: { onAfterSucces: () => void }) {
  const { alert, router } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormResetPassword>({
    mutationFn: (payload) => Api.Auth.resetPassword(payload),
    onSuccess: () => {
      alert.toast({
        title: 'Succesfully',
        message: 'Password Succesfully',
        icon: 'success',
        onVoid: () => {
          optional?.onAfterSucces?.();
          router.push('/login');
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Failed Create New Password',
        icon: 'error',
      });
    },
  });
}
