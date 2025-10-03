import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateProducts } from '@/types/form';
import AxiosClient from '@/utils/axios.client';

class RestaurantApi {
  async CreateProduct(payload: FormCreateProducts): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/restaurant/products', payload);
    return res.data;
  }
  async GetProduct(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/restaurant/products');
    return res.data;
  }
}

export default new RestaurantApi();
