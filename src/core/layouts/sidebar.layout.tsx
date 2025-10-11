'use client';

import { useEffect, useState } from 'react';

import Cart from '@/components/cart';
import Box from '@/components/ui/box';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import View from '@/components/ui/view';
import { AppSidebar } from '@/core/components/app-sidebar';
import DatasQuery from '@/hooks/mutation/props.hooks';
import {
  useDeleteAllCartItem,
  useDeleteCartItem,
  useUpdateCartItem,
} from '@/hooks/mutation/user/mutation';

import LanguageDropdown from '../components/language.dropdown';
import ThemeToggle from '../components/theme-toggle';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: AppLayoutProps) {
  const data = DatasQuery.User();
  const deleteAll = useDeleteAllCartItem();
  const itemCount = data?.chartData?.items?.length ?? 0;
  const [selectId, setSelectId] = useState<string | null>(null);
  const deleteCart = useDeleteCartItem();
  const updateCart = useUpdateCartItem();

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

  return (
    <SidebarProvider defaultOpen>
      <View className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <Box className="flex h-full flex-col w-full">
            <Box className="flex p-4 items-center gap-2 border-b w-full h-20">
              <Box className="flex items-center justify-end  mx-auto w-full">
                <Box className="flex items-center gap-4">
                  <ThemeToggle />
                  <LanguageDropdown />
                  <Cart
                    content={data.chartData}
                    onDeleteAll={() => handleDeleteAllCart()}
                    isPending={deleteAll.isPending || updateCart.isPending}
                    itemCount={itemCount}
                    setSelectId={setSelectId}
                    onDelete={handleDeleteCart}
                    handleUpdate={handleUpdateQuantity}
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
