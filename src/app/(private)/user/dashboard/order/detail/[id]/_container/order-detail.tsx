'use client';
import { useParams } from 'next/navigation';

import OrderDetailHeroSection from '@/components/section/private/user/order-detail/hero-section';
import { OrderDetailSkeleton } from '@/components/skeleton/detail-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';

const OrderDetailContainer = () => {
  const params = useParams();
  const id = params.id as string;
  const data = DatasQuery.User();

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex flex-col">
          <OrderDetailSkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  const order = data.OrderHistoryData?.find((o: any) => o._id === id);

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <OrderDetailHeroSection order={order} />
      </Container>
    </SidebarLayout>
  );
};

export default OrderDetailContainer;
