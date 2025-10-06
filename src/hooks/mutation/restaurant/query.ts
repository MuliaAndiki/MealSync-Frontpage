import { useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';

export function useGetProducts() {
  return useQuery({
    queryKey: ['products', 'all'],
    queryFn: () => Api.Restaurant.GetProduct(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetProductsId(_id: string) {
  return useQuery({
    queryKey: ['product, "id', _id],
    queryFn: () => Api.Restaurant.GetProductId(_id),
    staleTime: 1000 * 60 * 5,
  });
}
