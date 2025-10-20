import { useQuery } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import Api from '@/services/props.service';

class SuperAdminData {
  RestaurantData: any;
  isLoading: boolean;
  isPending: boolean;
  refetchAll: () => void;
  constructor(restaurantQuery: any) {
    this.RestaurantData = restaurantQuery.data?.data ?? null;
    this.isLoading = restaurantQuery.isLoading;
    this.isPending = restaurantQuery.isPending;
    this.refetchAll = () => {
      restaurantQuery.refetch();
    };
  }
}

export function useSuperAdminData() {
  const { currentRole } = useAppNameSpase();
  const restaurantQuery = useQuery({
    queryKey: ['restaurant', 'superAdmin'],
    queryFn: () => Api.SuperAdmin.getRestaurantAll(),
    staleTime: 1000 * 60 * 5,
  });
  return new SuperAdminData(restaurantQuery);
}
