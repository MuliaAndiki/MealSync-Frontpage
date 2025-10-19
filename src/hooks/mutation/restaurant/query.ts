import { useQuery } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import Api from '@/services/props.service';

class RestaurantData {
  ProductData: any;
  ChairData: any;
  ProfileData: any;
  ProfileDataUniq: any;
  ProductByIdData: any;
  OrderData: any;
  isLoading: boolean;
  isError: boolean;
  refetchAll: () => void;

  constructor(
    productsQuery: any,
    chairsQuery: any,
    profileQuery: any,
    profileUniqQuery: any,
    orderQuery: any,
    productByIdQuery: any
  ) {
    this.ProductData = productsQuery.data?.data ?? [];
    this.ChairData = chairsQuery.data?.data ?? [];
    this.ProductByIdData = productByIdQuery.data?.data ?? null;
    this.ProfileData = profileQuery.data?.data ?? null;
    this.ProfileDataUniq = profileUniqQuery.data?.data ?? null;
    this.OrderData = orderQuery.data?.data ?? [];
    this.isLoading =
      productsQuery.isLoading ||
      profileQuery.isLoading ||
      profileUniqQuery.isLoading ||
      orderQuery.isLoading;
    this.isError =
      productsQuery.isError ||
      profileQuery.isError ||
      profileUniqQuery.isError ||
      orderQuery.isError;
    this.refetchAll = () => {
      productsQuery.refetch();
      chairsQuery.refetch();
      profileQuery.refetch();
      orderQuery.refetch();
      profileUniqQuery.refetch();
    };
  }
}

export function useRestaurantData(id?: string, uniqueUrl?: string) {
  const { currentRole } = useAppNameSpase();

  const productsQuery = useQuery({
    queryKey: ['products', 'restaurant'],
    queryFn: () => Api.Restaurant.GetProduct(),
    staleTime: 1000 * 60 * 5,
    enabled: currentRole === 'restaurant',
  });

  // Problematic query
  const productByIdQuery = useQuery({
    queryKey: ['products', 'id', id],
    queryFn: () => Api.Restaurant.GetProductId(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const chairsQuery = useQuery({
    queryKey: ['chair', 'restaurant'],
    queryFn: () => Api.Restaurant.GeChair(),
    staleTime: 1000 * 60 * 5,
    enabled: currentRole === 'restaurant',
  });

  const profileQuery = useQuery({
    queryKey: ['profile', 'restaurant'],
    queryFn: () => Api.Restaurant.GetProfileRestaurant(),
    staleTime: 1000 * 60 * 5,
    enabled: currentRole === 'restaurant',
  });

  const profileUniqQuery = useQuery({
    queryKey: ['profile', 'restaurant', uniqueUrl],
    queryFn: () => Api.Restaurant.GetProfileRestaurantUniq(uniqueUrl!),
    enabled: !!uniqueUrl,
    staleTime: 1000 * 60 * 5,
  });

  const orderQuery = useQuery({
    queryKey: ['order', 'restaurant'],
    queryFn: () => Api.Restaurant.GetOrder(),
    staleTime: 1000 * 60 * 5,
    enabled: currentRole === 'restaurant',
  });

  return new RestaurantData(
    productsQuery,
    chairsQuery,
    profileQuery,
    profileUniqQuery,
    orderQuery,
    productByIdQuery
  );
}
