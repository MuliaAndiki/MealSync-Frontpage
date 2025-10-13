import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormAddCart, FormCreateOrder } from '@/types/form';
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
  async getOrders(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/user/orders');
    return res.data;
  }
  async getOrderHistory(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/user/orders/history');
    return res.data;
  }
  async addToCart(payload: FormAddCart, productId: string): Promise<TResponse<any>> {
    const res = await AxiosClient.post(`/api/user/cart/${productId}`, payload);
    return res.data;
  }
  async updateCartItem(_id: string, quantity: number): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/user/cart/${_id}`, { quantity });
    return res.data;
  }
  async deleteCartItem(_id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/user/cart/${_id}`);
    return res.data;
  }
  async deleteAllCartItem(): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/user/cart`);
    return res.data;
  }
  async getCart(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/user/cart');
    return res.data;
  }
}

export default new UserApi();
