import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateOrder } from '@/types/form';
import AxiosClient from '@/utils/axios.client';

class UserApi {
  async getRestaurantByUniqueUrl(uniqueUrl: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/restaurant/public/${uniqueUrl}`);
    return res.data;
  }

  async createOrder(payload: FormCreateOrder): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/user/order', payload);
    return res.data;
  }

  async getOrderHistory(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/user/orders/history');
    return res.data;
  }
}

export default new UserApi();
