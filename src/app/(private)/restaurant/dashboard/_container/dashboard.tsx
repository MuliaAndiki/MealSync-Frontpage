'use client';
import { useState } from 'react';

import DashboardRestaurantSection from '@/components/section/private/restaurant/dashboard/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useAddToCart } from '@/hooks/mutation/user/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { ParentModalType } from '@/types/components';
import { FormAddCart } from '@/types/form';

const DashboardRestaurantContainer = () => {
  const data = DatasQuery.Restaurant();
  const { alert } = useAppNameSpase();
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

  const handleAddToCart = (productId: string) => {
    cart.mutate({
      payload: formAddToCart,
      productId,
    });
  };
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardRestaurantSection
          produtc={data.ProductData ?? []}
          chair={data.ChairData ?? []}
          profile={data.ProfileData ?? []}
          onAdd={() => handleAddToCart(selectId!)}
          setSelectId={setSelectId}
          isPending={cart.isPending}
          setFormAddChart={setFormAddChart}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </Container>
    </SidebarLayout>
  );
};

export default DashboardRestaurantContainer;
