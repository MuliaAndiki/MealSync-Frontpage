import Api from '@/services/props.service';
import { useQuery } from '@tanstack/react-query';

class userData {
  OrderHistoryData: any;
  getRestaurantByUniqueUrlData: any;
  isLoading: boolean;
  isError: boolean;
  refetchAll: () => void;

  constructor(orderHistoryQuery: any, getRestaurantByUniqueUrlQuery: any) {
    this.OrderHistoryData = orderHistoryQuery.data?.data ?? [];
    this.getRestaurantByUniqueUrlData = getRestaurantByUniqueUrlQuery.data?.data ?? [];
    this.isLoading = orderHistoryQuery.isLoading;
    this.isError = orderHistoryQuery.isError;
    this.refetchAll = orderHistoryQuery.refetch;
  }
}

export function useUserData(uniqueUrl?: string) {
  const orderHistoryQuery = useQuery({
    queryKey: ['order', 'history'],
    queryFn: () => Api.User.getOrderHistory(),
    staleTime: 1000 * 60 * 5,
  });

  const getRestaurantByUniqueUrlQuery = useQuery({
    queryKey: ['restaurant', 'byUniqueUrl'],
    queryFn: () => Api.User.getRestaurantByUniqueUrl(uniqueUrl!),
    staleTime: 1000 * 60 * 5,
  });

  return new userData(orderHistoryQuery, getRestaurantByUniqueUrlQuery);
}
