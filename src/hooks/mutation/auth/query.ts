import { dataTagErrorSymbol, useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';

class AuthData {
  ProfileData: any;
  isLoading: boolean;
  isPending: boolean;

  constructor(profileQuery: any) {
    this.ProfileData = profileQuery.data.data ?? null;
    this.isLoading = profileQuery.isLoading;
    this.isPending = profileQuery.isPending;
  }
}
export function useAuthData() {
  const profileQuery = useQuery({
    queryFn: () => Api.Auth.GetProfile(),
    queryKey: ['profile', 'all'],
    staleTime: 1000 * 60 * 5,
  });

  return new AuthData(profileQuery);
}
