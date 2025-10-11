'use client';
import { useParams } from 'next/navigation';
import { use, useEffect } from 'react';

import RestaurantOrderSection from '@/components/section/private/user/restaurant/order-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useAppNameSpase } from '@/hooks/useNameSpace';

const RestaurantOrderContainer = () => {
  const params = useParams();
  const uniqueUrl = params.uniqueUrl as string;
  const userData = DatasQuery.User(uniqueUrl);
  const { alert } = useAppNameSpase();

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

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen">
        <RestaurantOrderSection
          profileUnique={userData.getRestaurantByUniqueUrlData.restaurant ?? []}
          Products={userData.getRestaurantByUniqueUrlData.products ?? []}
          chairs={userData.getRestaurantByUniqueUrlData.chairs ?? []}
        />
      </Container>
    </SidebarLayout>
  );
};

export default RestaurantOrderContainer;
