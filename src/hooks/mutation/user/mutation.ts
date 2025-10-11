import { useMutation } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormAddCart, FormCreateOrder } from '@/types/form';

//  belum intergrate
export function useCreateOrder(options?: { affterSuccess?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormCreateOrder>({
    mutationFn: (payload: FormCreateOrder) => Api.User.createOrder(payload),
    onSuccess: () => {
      alert.toast({
        title: 'Success',
        message: 'Order Berhasil Di Buat',
        icon: 'success',
        onVoid: () => {
          options?.affterSuccess?.();
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'order' });
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Gagal Membuat Order',
        icon: 'error',
      });
    },
  });
}

export function useAddToCart(options?: { afterSuccess?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();

  return useMutation<TResponse<any>, Error, { payload: FormAddCart; productId: string }>({
    mutationFn: ({ payload, productId }) => Api.User.addToCart(payload, productId),
    onSuccess: () => {
      alert.toast({
        title: 'Success',
        message: 'Berhasil Menambahkan Ke Keranjang',
        icon: 'success',
        onVoid: () => {
          options?.afterSuccess?.();
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'cart' });
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Gagal Menambahkan Ke Keranjang',
        icon: 'error',
      });
    },
  });
}

export function useUpdateCartItem(options?: { affterSuccess?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, { _id: string; quantity: number }>({
    mutationFn: ({ _id, quantity }) => Api.User.updateCartItem(_id, quantity),
    onSuccess: () => {
      alert.toast({
        title: 'Success',
        message: 'Berhasil Memperbarui Item Keranjang',
        icon: 'success',
        onVoid: () => {
          options?.affterSuccess?.();
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'cart' });
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Gagal Memperbarui Item Keranjang',
        icon: 'error',
      });
    },
  });
}

export function useDeleteCartItem(options?: { affterSuccess?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, { _id: string }>({
    mutationFn: ({ _id }) => Api.User.deleteCartItem(_id),
    onSuccess: () => {
      alert.toast({
        title: 'Success',
        message: 'Berhasil Menghapus Item Keranjang',

        icon: 'success',
        onVoid: () => {
          options?.affterSuccess?.();
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'cart' });
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Gagal Menghapus Item Keranjang',
        icon: 'error',
      });
    },
  });
}

export const useDeleteAllCartItem = (options?: { affterSuccess?: () => void }) => {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: () => Api.User.deleteAllCartItem(),
    onSuccess: () => {
      alert.toast({
        title: 'Success',
        message: 'Berhasil Menghapus Semua Item Keranjang',
        icon: 'success',
        onVoid: () => {
          options?.affterSuccess?.();
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'cart' });
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Gagal Menghapus Semua Item Keranjang',
        icon: 'error',
      });
    },
  });
};
