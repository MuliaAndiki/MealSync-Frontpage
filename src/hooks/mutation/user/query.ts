import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';

import Api from '@/services/props.service';

class userData {
  OrderHistoryData: any;
  getRestaurantByUniqueUrlData: any;
  chartData: any;
  isLoading: boolean;
  isError: boolean;
  refetchAll: () => void;

  constructor(orderHistoryQuery: any, getRestaurantByUniqueUrlQuery: any, getCartQuery: any) {
    this.OrderHistoryData = orderHistoryQuery.data?.data ?? [];
    this.getRestaurantByUniqueUrlData = getRestaurantByUniqueUrlQuery.data?.data ?? [];
    this.chartData = getCartQuery.data?.data ?? [];
    this.isLoading =
      orderHistoryQuery.isLoading ||
      getRestaurantByUniqueUrlQuery.isLoading ||
      getCartQuery.isLoading;
    this.isError =
      orderHistoryQuery.isError || getRestaurantByUniqueUrlQuery.isError || getCartQuery.isError;
    this.refetchAll = () => {
      orderHistoryQuery.refetch();
      getRestaurantByUniqueUrlQuery.refetch();
      getCartQuery.refetch();
    };
  }
}

export function useUserData(uniqueUrl?: string) {
  const orderHistoryQuery = useQuery({
    queryKey: ['order', 'history'],
    queryFn: () => Api.User.getOrderHistory(),
    staleTime: 1000 * 60 * 5,
  });

  const getRestaurantByUniqueUrlQuery = useQuery({
    queryKey: ['restaurant', 'byUniqueUrl', uniqueUrl],
    queryFn: () => Api.User.getRestaurantByUniqueUrl(uniqueUrl!),
    staleTime: 1000 * 60 * 5,
    enabled: !!uniqueUrl,
  });

  const getCartQuery = useQuery({
    queryKey: ['cart', 'items'],
    queryFn: () => Api.User.getCart(),
    staleTime: 1000 * 60 * 5,
  });

  return new userData(orderHistoryQuery, getRestaurantByUniqueUrlQuery, getCartQuery);
}
