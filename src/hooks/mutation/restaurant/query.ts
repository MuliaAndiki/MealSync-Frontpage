import { useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';

class RestaurantData {
  ProductData: any;
  ProductDataId: any;
  ChairData: any;
  isLoading: boolean;
  isError: boolean;
  refetchAll: () => void;
  refetchById: () => void;

  constructor(productsQuery: any, productByIdQuery: any, chairsQuery: any) {
    this.ProductData = productsQuery.data?.data ?? [];
    this.ChairData = chairsQuery.data?.data ?? [];
    this.ProductDataId = productByIdQuery.data?.data ?? null;
    this.isLoading = productsQuery.isLoading || productByIdQuery.isLoading;
    this.isError = productsQuery.isError || productByIdQuery.isError;
    this.refetchAll = productsQuery.refetch;
    this.refetchById = productByIdQuery.refetch;
  }
}

export function useRestaurantData(id?: string) {
  const productsQuery = useQuery({
    queryKey: ['restaurant', 'products'],
    queryFn: () => Api.Restaurant.GetProduct(),
    staleTime: 1000 * 60 * 5,
  });

  const productByIdQuery = useQuery({
    queryKey: ['restaurant', 'product', id],
    queryFn: () => Api.Restaurant.GetProductId(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const chairsQuery = useQuery({
    queryKey: ['chair', 'restaurant'],
    queryFn: () => Api.Restaurant.GeChair(),
    staleTime: 1000 * 60 * 5,
  });

  return new RestaurantData(productsQuery, productByIdQuery, chairsQuery);
}
