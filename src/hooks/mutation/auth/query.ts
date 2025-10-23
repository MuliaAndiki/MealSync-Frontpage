import { useQuery } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import Api from '@/services/props.service';
class AuthData {
  ProfileData: any;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  refetchAll: () => void;

  constructor(profileQuery: any) {
    this.ProfileData = profileQuery.data?.data ?? null;
    this.isLoading = profileQuery.isLoading;
    this.isPending = profileQuery.isPending;
    this.isError = profileQuery.isError;
    this.refetchAll = () => {
      profileQuery.refetch();
    };
  }
}

export function useAuthData() {
  const { currentRole } = useAppNameSpase();
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => Api.Auth.getProfile(),
    staleTime: 1000 * 60 * 5,
    enabled: currentRole === 'user',
  });
  return new AuthData(profileQuery);
}
