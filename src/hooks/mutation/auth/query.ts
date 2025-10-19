import { dataTagErrorSymbol, useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

class AuthData {
  ProfileData: any;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  refetchAll: () => void;

  constructor(profileQuery: any) {
    this.ProfileData = profileQuery.data.data ?? null;
    this.isLoading = profileQuery.isLoading;
    this.isPending = profileQuery.isPending;
    this.isError = profileQuery.isError;
    this.refetchAll = () => {
      profileQuery.refetch();
    };
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
