import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import AxiosClient from '@/utils/axios.client';

class PaymentApi {
  async createPayment(orderId: string): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/payment/checkout', { orderId });
    return res.data;
  }
  async getCheckout(orderId: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/payment/checkout/${orderId}`);
    return res.data;
  }
  async getCheckoutStatus(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/payment/status');
    return res.data;
  }
}

export default new PaymentApi();
