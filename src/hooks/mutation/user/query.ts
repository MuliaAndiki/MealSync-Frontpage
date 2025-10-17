import { useQuery } from '@tanstack/react-query';
import { stat } from 'fs';

import { useAppSelector } from '@/hooks/dispatch/dispatch';
import Api from '@/services/props.service';

class userData {
  OrderHistoryData: any;
  getRestaurantByUniqueUrlData: any;
  chartData: any;
  orderData: any;
  isLoading: boolean;
  isError: boolean;
  refetchAll: () => void;

  constructor(
    orderHistoryQuery: any,
    getRestaurantByUniqueUrlQuery: any,
    getCartQuery: any,
    getOrdersQuery: any
  ) {
    this.OrderHistoryData = orderHistoryQuery.data?.data ?? [];
    this.getRestaurantByUniqueUrlData = getRestaurantByUniqueUrlQuery.data?.data ?? [];
    this.chartData = getCartQuery.data?.data ?? [];
    this.orderData = getOrdersQuery.data?.data ?? [];
    this.isLoading =
      orderHistoryQuery.isLoading ||
      getRestaurantByUniqueUrlQuery.isLoading ||
      getCartQuery.isLoading ||
      getOrdersQuery.isLoading;
    this.isError =
      orderHistoryQuery.isError ||
      getRestaurantByUniqueUrlQuery.isError ||
      getCartQuery.isError ||
      getOrdersQuery.isError;
    this.refetchAll = () => {
      orderHistoryQuery.refetch();
      getRestaurantByUniqueUrlQuery.refetch();
      getCartQuery.refetch();
      getOrdersQuery.refetch();
    };
  }
}

export function useUserData(uniqueUrl?: string) {
  // Global State
  const role = useAppSelector((state) => state.auth.currentUser?.user.role);
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

  const getOrders = useQuery({
    queryKey: ['order', 'user'],
    queryFn: () => Api.User.getOrders(),
    staleTime: 1000 * 60 * 5,
    enabled: role === 'USER',
  });

  return new userData(orderHistoryQuery, getRestaurantByUniqueUrlQuery, getCartQuery, getOrders);
}
