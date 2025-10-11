'use client';
import { useParams } from 'next/navigation';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import RestaurantOrderSection from '@/components/section/private/user/restaurant/order-section';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useEffect } from 'react';
import { useAppNameSpase } from '@/hooks/useNameSpace';

const RestaurantOrderContainer = () => {
  const params = useParams();
  const uniqueUrl = params.uniqueUrl as string;
  const { alert } = useAppNameSpase();
  const userData = DatasQuery.User(uniqueUrl);

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
        <RestaurantOrderSection profileUnique={userData.getRestaurantByUniqueUrlData} />
      </Container>
    </SidebarLayout>
  );
};

export default RestaurantOrderContainer;
