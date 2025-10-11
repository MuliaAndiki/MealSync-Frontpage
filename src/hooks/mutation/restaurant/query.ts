import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

class RestaurantData {
  ProductData: any;
  ProductDataId: any;
  ChairData: any;
  ProfileData: any;
  ProfileDataUniq: any;
  OrderData: any;
  isLoading: boolean;
  isError: boolean;
  refetchAll: () => void;
  refetchById: () => void;

  constructor(
    productsQuery: any,
    productByIdQuery: any,
    chairsQuery: any,
    profileQuery: any,
    profileUniqQuery: any,
    orderQuery: any
  ) {
    this.ProductData = productsQuery.data?.data ?? [];
    this.ChairData = chairsQuery.data?.data ?? [];
    this.ProductDataId = productByIdQuery.data?.data ?? null;
    this.ProfileData = profileQuery.data?.data ?? null;
    this.ProfileDataUniq = profileUniqQuery.data?.data ?? null;
    this.OrderData = orderQuery.data?.data ?? [];
    this.isLoading =
      productByIdQuery.isLoading ||
      productsQuery.isLoading ||
      profileQuery.isLoading ||
      profileUniqQuery.isLoading ||
      orderQuery.isLoading;
    this.isError =
      productsQuery.isError ||
      productByIdQuery.isError ||
      profileQuery.isError ||
      profileUniqQuery.isError ||
      orderQuery.isError;
    this.refetchAll =
      productsQuery.refetch() ||
      chairsQuery.refetch() ||
      profileQuery.refetch() ||
      orderQuery.refetch() ||
      profileUniqQuery.refetch();
    this.refetchById = productByIdQuery.refetch();
  }
}

export function useRestaurantData(id?: string, uniqueUrl?: string) {
  const productsQuery = useQuery({
    queryKey: ['products', 'restaurant'],
    queryFn: () => Api.Restaurant.GetProduct(),
    staleTime: 1000 * 60 * 5,
  });

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
  });

  const profileQuery = useQuery({
    queryKey: ['profile', 'restaurant'],
    queryFn: () => Api.Restaurant.GetProfileRestaurant(),
    staleTime: 1000 * 60 * 5,
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
  });

  return new RestaurantData(
    productsQuery,
    productByIdQuery,
    chairsQuery,
    profileQuery,
    profileUniqQuery,
    orderQuery
  );
}
