import { useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';

export function useGetProfile() {
  return useQuery({
    queryKey: ['profile', 'all'],
    queryFn: () => Api.Auth.GetProfile(),
    staleTime: 1000 * 60 * 5,
  });
}
