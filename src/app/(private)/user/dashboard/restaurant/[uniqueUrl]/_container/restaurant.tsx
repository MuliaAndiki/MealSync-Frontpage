'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import RestaurantOrderSection from '@/components/section/private/user/restaurant/order-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useAddToCart } from '@/hooks/mutation/user/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { ParentModalType } from '@/types/components';
import { FormAddCart } from '@/types/form';

const RestaurantOrderContainer = () => {
  const params = useParams();
  const uniqueUrl = params.uniqueUrl as string;
  const userData = DatasQuery.User(uniqueUrl);
  const cart = useAddToCart({
    afterSuccess: () => {
      setIsOpenModal(null);
    },
  });
  const { alert } = useAppNameSpase();
  const [selectId, setSelectId] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);
  const [formAddToCart, setFormAddToCart] = useState<FormAddCart>({
    quantity: null,
  });
  useEffect(() => {
    if (userData.isError) {
      alert.toast({
        title: 'Failed',
        message: 'Gagal Memuat Data Restaurant',
        icon: 'error',
      });
    }
    return;
  }, [userData.isError]);

  const handleAddToCart = (productId: string) => {
    cart.mutate({
      payload: formAddToCart,
      productId,
    });
  };

  return (
    <SidebarLayout uniqueUrl={uniqueUrl}>
      <Container className="w-full min-h-screen">
        <RestaurantOrderSection
          setFormAddChart={setFormAddToCart}
          isOpenModal={isOpenModal}
          setSelectId={setSelectId}
          isPending={cart.isPending}
          onAdd={() => handleAddToCart(selectId)}
          setIsOpenModal={setIsOpenModal}
          profileUnique={userData.getRestaurantByUniqueUrlData.restaurant ?? []}
          Products={userData.getRestaurantByUniqueUrlData.products ?? []}
          chairs={userData.getRestaurantByUniqueUrlData.chairs ?? []}
        />
      </Container>
    </SidebarLayout>
  );
};

export default RestaurantOrderContainer;
