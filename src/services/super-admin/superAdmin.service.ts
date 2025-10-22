import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateRestaurant } from '@/types/form';
import AxiosClient from '@/utils/axios.client';

class SuperAdminApi {
  async createRestaurant(payload: FormCreateRestaurant): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/superAdmin/restaurant', payload);
    return res.data;
  }
  async getRestaurantAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/superAdmin/restaurant');
    return res.data;
  }
}

export default new SuperAdminApi();
