import axios, { AxiosError, AxiosResponse } from 'axios';
import { store } from '@/stores/store';
import { env } from '@/configs/env.config';
import { logout } from '@/stores/authSlice/authSlice';

const AxiosClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
});

AxiosClient.interceptors.request.use(
  (config: any): any => {
    const token = store.getState().auth.currentUser?.user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

AxiosClient.interceptors.response.use(
  (reponse: AxiosResponse): AxiosResponse => {
    return reponse;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    const status = (error.response as any)?.status;
    if (status === 401 || status === 403) {
      try {
        store.dispatch(logout());

        if (typeof window !== 'undefined') {
          await fetch('/api/session/delete', { method: 'POST' }).catch(() => {});
        }
      } finally {
        if (typeof window !== 'undefined') {
          const current = window.location.pathname;
          if (current !== '/login') {
            window.location.href = '/login';
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosClient;
