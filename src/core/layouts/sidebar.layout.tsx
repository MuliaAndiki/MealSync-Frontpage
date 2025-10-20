'use client';

import React, { useEffect, useState } from 'react';

import Cart from '@/components/cart';
import Box from '@/components/ui/box';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import View from '@/components/ui/view';
import { AppSidebar } from '@/core/components/app-sidebar';
import DatasQuery from '@/hooks/mutation/props.hooks';
import {
  useCreateOrder,
  useDeleteAllCartItem,
  useDeleteCartItem,
  useUpdateCartItem,
} from '@/hooks/mutation/user/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { ParentModalType } from '@/types/components';
import { FormCreateOrder } from '@/types/form';

interface AppLayoutProps {
  children: React.ReactNode;
  uniqueUrl?: string;
}

export function SidebarLayout({ children, uniqueUrl }: AppLayoutProps) {
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);
  const { alert, currentRole } = useAppNameSpase();

  const userData = DatasQuery.User(uniqueUrl);
  const restaurantData = DatasQuery.Restaurant();
  const data =
    currentRole === 'restaurant'
      ? {
          chartData: userData.chartData,
          getRestaurantByUniqueUrlData: restaurantData.ProfileData
            ? {
                chairs: restaurantData.ChairData ?? [],
              }
            : { chairs: [] },
          refetchAll: restaurantData.refetchAll,
        }
      : userData;
  const deleteAll = useDeleteAllCartItem();
  const itemCount = data?.chartData?.items?.length ?? 0;
  const [selectId, setSelectId] = useState<string | null>(null);
  const deleteCart = useDeleteCartItem();
  const updateCart = useUpdateCartItem();
  const orderProdutc = useCreateOrder({
    affterSuccess: () => {
      setIsOpenModal(null);
    },
  });

  const [formCreateOrder, setFormCreateOrder] = useState<FormCreateOrder>({
    items: [],
    chairNo: 0,
    uniqueUrl: '',
  });

  useEffect(() => {
    const newUniqueUrl =
      currentRole === 'restaurant'
        ? (restaurantData.ProfileData?.uniqueUrl ?? '')
        : (uniqueUrl ?? '');

    if (newUniqueUrl && uniqueUrl !== newUniqueUrl) {
      setFormCreateOrder((prev) => ({
        ...prev,
        uniqueUrl: newUniqueUrl,
      }));
    }
  }, [currentRole, restaurantData.ProfileData?.uniqueUrl, uniqueUrl]);

  const handleDeleteAllCart = () => {
    deleteAll.mutate({});
  };

  const handleDeleteCart = () => {
    deleteCart.mutate({ _id: selectId! });
  };

  const handleUpdateQuantity = (_id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCart.mutate({ _id, quantity: newQuantity });
  };

  const handleOrderProdutc = () => {
    if (!formCreateOrder.chairNo || !formCreateOrder.items) {
      alert.toast({
        title: 'Warning',
        message: 'Mohon Coba Lagi',
        icon: 'warning',
      });
      return;
    }
    console.log(formCreateOrder);

    orderProdutc.mutate(formCreateOrder);
  };

  return (
    <SidebarProvider defaultOpen>
      <View className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <Box className="flex h-full flex-col w-full">
            <Box className="flex p-4 items-center gap-2 border-b w-full h-20">
              <Box className="flex items-center justify-end  mx-auto w-full">
                <Box className="flex items-center gap-4">
                  <Cart
                    content={data.chartData}
                    onDeleteAll={() => handleDeleteAllCart()}
                    isPending={deleteAll.isPending || updateCart.isPending}
                    itemCount={itemCount}
                    setSelectId={setSelectId}
                    onDelete={handleDeleteCart}
                    handleUpdate={handleUpdateQuantity}
                    chairs={data.getRestaurantByUniqueUrlData.chairs ?? []}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    formCreateOrder={formCreateOrder}
                    onOrder={() => handleOrderProdutc()}
                    setFormCreateOrder={setFormCreateOrder}
                  />
                </Box>
              </Box>
            </Box>

            <Box className="flex-1 overflow-auto w-full">
              <Box className=" h-full  w-full mx-auto max-w-none p-[1rem]">{children}</Box>
            </Box>
          </Box>
        </SidebarInset>
      </View>
    </SidebarProvider>
  );
}
