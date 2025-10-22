import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import {
  FormForgotPassword,
  FormLoginType,
  FormRegisterType,
  FormResetPassword,
  FormVerifyOtp,
} from '@/types/form';
import AxiosClient from '@/utils/axios.client';

class AuthApi {
  async Login(payload: FormLoginType): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/login', payload);
    return res.data;
  }
  async Register(payload: FormRegisterType): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/', payload);
    return res.data;
  }
  async Logout(): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/logout');
    return res.data;
  }
  async getProfile(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/auth/profile');
    return res.data;
  }
  async forgotPassword(payload: FormForgotPassword): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/email', payload);
    return res.data;
  }
  async verifyOtp(payload: FormVerifyOtp): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/verify', payload);
    return res.data;
  }
  async resetPassword(payload: FormResetPassword): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/resetPassword', payload);
    return res.data;
  }
}

export default new AuthApi();
