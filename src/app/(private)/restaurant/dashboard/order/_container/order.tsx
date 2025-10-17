'use client';
import { useState } from 'react';

import OrderHeroSection from '@/components/section/private/restaurant/order/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { StatusType } from '@/types/components';

const OrderContainer = () => {
  const data = DatasQuery.Restaurant();
  const [isStatus, setIsStatus] = useState<StatusType>('pending');

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <OrderHeroSection
          isStatus={isStatus}
          setIsStatus={setIsStatus}
          orderData={data.OrderData ?? []}
        />
      </Container>
    </SidebarLayout>
  );
};

export default OrderContainer;
