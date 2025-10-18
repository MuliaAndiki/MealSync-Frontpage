'use client';
import { useState } from 'react';

import DashboardRestaurantSection from '@/components/section/private/restaurant/dashboard/hero-section';
import { DashboardSkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useAddToCart } from '@/hooks/mutation/user/mutation';
import { ParentModalType } from '@/types/components';
import { Category } from '@/types/config';
import { FormAddCart } from '@/types/form';

const DashboardRestaurantContainer = () => {
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

  const handleAddToCart = (productId: string) => {
    cart.mutate({
      payload: formAddToCart,
      productId,
    });
  };

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
          restaurantId={data.ProfileData?._id ?? ''}
        />
      </Container>
    </SidebarLayout>
  );
};

export default DashboardRestaurantContainer;
