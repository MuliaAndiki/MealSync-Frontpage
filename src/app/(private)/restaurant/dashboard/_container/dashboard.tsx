'use client';
import { useEffect, useState } from 'react';

import DashboardRestaurantSection from '@/components/section/private/restaurant/dashboard/hero-section';
import { DashboardSkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useAddToCart } from '@/hooks/mutation/user/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { ParentModalType } from '@/types/components';
import { OrderType } from '@/types/components';
import { Category } from '@/types/config';
import { FormAddCart } from '@/types/form';
import { getSocket, initSocketConnection, joinRestaurantRoom } from '@/utils/socket.client';

const DashboardRestaurantContainer = () => {
  const { alert } = useAppNameSpase();
  const data = DatasQuery.Restaurant();
  const uniqueUrl = data.ProfileData?.uniqueUrl ?? '';
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);
  const cart = useAddToCart({
    afterSuccess: () => {
      setIsOpenModal(null);
    },
  });

  const [selectId, setSelectId] = useState<string>();
  const [formAddToCart, setFormAddChart] = useState<FormAddCart>({
    quantity: null,
  });
  const [category, setCategory] = useState<Category>('makanan');
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [chairUpdates, setChairUpdates] = useState<{ chairNo: number; status: string }[]>([]);

  const handleAddToCart = (productId: string) => {
    cart.mutate({
      payload: formAddToCart,
      productId,
    });
  };

  useEffect(() => {
    if (data.OrderData && Array.isArray(data.OrderData)) {
      if (JSON.stringify(orders) !== JSON.stringify(data.OrderData)) {
        setOrders(data.OrderData);
      }
    }
  }, [data.OrderData]);

  useEffect(() => {
    const restaurantId = data.ProfileData?._id;
    if (!restaurantId) return;

    const socket = initSocketConnection();
    if (socket) {
      joinRestaurantRoom(restaurantId);

      socket.on('order:new', (data: { order: OrderType }) => {
        console.log('New order received:', data.order);
        setOrders((prev) => [data.order, ...prev]);
        alert.toast({
          title: 'Pesanan Baru',
          message: `Pesanan Dari Meja ${data.order.chairNo} `,
          icon: 'info',
        });
      });

      socket.on('chair:update', (data: { chairNo: number; status: string }) => {
        console.log('Chair update:', data);
        setChairUpdates((prev) => {
          const existing = prev.find((c) => c.chairNo === data.chairNo);
          if (existing) {
            return prev.map((c) =>
              c.chairNo === data.chairNo ? { ...c, status: data.status } : c
            );
          }
          return [...prev, data];
        });
      });
    }

    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off('order:new');
        socket.off('chair:update');
      }
    };
  }, [data.ProfileData?._id]);

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex flex-col">
          <DashboardSkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  if (!uniqueUrl) return null;

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardRestaurantSection
          produtc={data.ProductData ?? []}
          chair={data.ChairData ?? []}
          onAdd={() => handleAddToCart(selectId!)}
          setSelectId={setSelectId}
          isPending={cart.isPending}
          setFormAddChart={setFormAddChart}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          category={category}
          setCategory={setCategory}
          orderData={orders}
          chairUpdates={chairUpdates}
          isLoadingOrders={data.isLoading}
        />
      </Container>
    </SidebarLayout>
  );
};

export default DashboardRestaurantContainer;
