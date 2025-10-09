import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateChair, FormCreateProducts } from '@/types/form';
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
  async DeleteProduct(_id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/restaurant/products/${_id}`);
    return res.data;
  }
  async GetProductId(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/restaurant/products/${id}`);
    return res.data;
  }
  async UpdateProducts(_id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/restaurant/products/${_id}`);
    return res.data;
  }
  async GeChair(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/restaurant/chair');
    return res.data;
  }
  async CreateChair(payload: FormCreateChair): Promise<TResponse<any>> {
    const res = await AxiosClient.post(`/api/restaurant/chair`, payload);
    return res.data;
  }
  // Min Intergrate
  async EditProfile(): Promise<TResponse<any>> {
    const res = await AxiosClient.put('/api/restaurant/products/profile');
    return res.data;
  }

  async GetOrder(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/restaurant/products/orders');
    return res.data;
  }
  async GetOrderHistory(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/restaurant/products/orders/history');
    return res.data;
  }
}

export default new RestaurantApi();
