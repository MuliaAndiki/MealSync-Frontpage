import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateChair, FormCreateProducts, FormEditProfile } from '@/types/form';
import { useMutation } from '@tanstack/react-query';
import Api from '@/services/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';

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
          queryClient.invalidateQueries({ queryKey: ['products'], exact: false });
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
          queryClient.invalidateQueries({ queryKey: ['products'], exact: false });
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

export function useUpdateProducts(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, string>({
    mutationFn: (_id) => Api.Restaurant.UpdateProducts(_id),
    onSuccess: () => {
      alert.toast({
        title: 'Success',
        message: 'Product Berhasil DiUpdate',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
          queryClient.invalidateQueries({ queryKey: ['products'], exact: false });
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
          queryClient.invalidateQueries({ queryKey: ['chair'], exact: false });
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

// Belum Intergrate
export function useEditProfile(options?: { onAfterSucces?: () => void }) {
  const { alert, queryClient } = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormEditProfile>({
    mutationFn: () => Api.Restaurant.EditProfile(),
    onSuccess: () => {
      alert.toast({
        title: 'Succes',
        message: 'Profile Berhasil DiUpdate',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSucces?.();
          queryClient.invalidateQueries({ queryKey: ['products'], exact: false });
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
