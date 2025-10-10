'use client';
import { useParams } from 'next/navigation';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import RestaurantOrderSection from '@/components/section/private/user/restaurant/order-section';
import DatasQuery from '@/hooks/mutation/props.hooks';

const RestaurantOrderContainer = () => {
  const params = useParams();
  const uniqueUrl = params.uniqueUrl as string;
  const data = DatasQuery.User();

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen">
        <RestaurantOrderSection />
      </Container>
    </SidebarLayout>
  );
};

export default RestaurantOrderContainer;
