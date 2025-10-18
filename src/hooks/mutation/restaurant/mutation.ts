import { useMutation } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCreateChair, FormCreateProducts, FormEditProfile } from '@/types/form';

export function useCreateProduct(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormCreateProducts>({
    mutationFn: (payload: FormCreateProducts) => Api.Restaurant.CreateProduct(payload),
    onSuccess: (res) => {
      alert.toast({
        title: 'Berhasil',
        message: 'Product Berhasil Dibikin',
        icon: 'success',
        onVoid: () => {
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'products' });
          options?.onAfterSucces?.();
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Gagal',
        message: 'Product Gagal Dibuat',
        icon: 'error',
      });
    },
  });
}

export function useDeleteProduct(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, string>({
    mutationFn: (id) => Api.Restaurant.DeleteProduct(id),
    onSuccess: () => {
      alert.toast({
        title: 'Success',
        message: 'Berhasil Delete Product',
        icon: 'success',
        onVoid: () => {
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'products' });
          options?.onAfterSucces?.();
        },
      });
    },

    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Failed Delete Product',
        icon: 'error',
      });
    },
  });
}

export function useUpdateProducts(_id: string, options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient, router } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormCreateProducts>({
    mutationFn: (payload) => Api.Restaurant.UpdateProducts(_id, payload),
    onSuccess: () => {
      alert.toast({
        title: 'Success',
        message: 'Product Berhasil DiUpdate',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'products' });
          router.push('/restaurant/dashboard/manage');
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Failed Update Product',
        icon: 'error',
      });
    },
  });
}

export function useCreateChair(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormCreateChair>({
    mutationFn: (payload) => Api.Restaurant.CreateChair(payload),
    onSuccess: () => {
      alert.toast({
        title: 'Succes',
        message: 'Kursi Berhasil Di Bikin',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'chair' });
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Gagal Bikin Kursi',
        icon: 'error',
      });
    },
  });
}

export function useDeleteChair(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, string>({
    mutationFn: (_id) => Api.Restaurant.DeleteChair(_id),
    onSuccess: () => {
      alert.toast({
        title: 'Succes',
        message: 'Kursi Berhasil Di Hapus',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'chair' });
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Gagal Delete Kursi',
        icon: 'error',
      });
    },
  });
}

export function useEditProfile(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormEditProfile>({
    mutationFn: (payload: FormEditProfile) => Api.Restaurant.EditProfile(payload),
    onSuccess: () => {
      alert.toast({
        title: 'Succes',
        message: 'Profile Berhasil DiUpdate',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'profile' });
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Error',
        message: 'Failed Update Profile',
        icon: 'error',
      });
    },
  });
}
