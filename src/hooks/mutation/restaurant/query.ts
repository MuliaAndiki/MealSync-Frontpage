import { useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';

export function useGetProducts() {
  return useQuery({
    queryKey: ['products', 'all'],
    queryFn: () => Api.Restaurant.GetProduct(),
    staleTime: 1000 * 60 * 5,
  });
}
