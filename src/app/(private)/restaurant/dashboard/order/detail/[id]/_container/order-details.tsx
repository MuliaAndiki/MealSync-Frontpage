'use client';
import { useParams } from 'next/navigation';

import OrderDetailHeroSection from '@/components/section/private/restaurant/order-detail/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const OrderDetailContainer = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <OrderDetailHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default OrderDetailContainer;
