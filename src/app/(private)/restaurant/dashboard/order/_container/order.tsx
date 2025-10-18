'use client';
import { useState } from 'react';

import OrderHeroSection from '@/components/section/private/restaurant/order/hero-section';
import { OrderSkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useCancelOrder } from '@/hooks/mutation/user/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { StatusType } from '@/types/components';

const OrderContainer = () => {
  const { alert, currentRole } = useAppNameSpase();
  const cancel = useCancelOrder();
  const data = DatasQuery.Restaurant();
  const [isStatus, setIsStatus] = useState<StatusType>('pending');
  
  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex flex-col">
          <OrderSkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  const handleCancelOrder = (orderId: string) => {
    return cancel.mutate(orderId);
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <OrderHeroSection
          isStatus={isStatus}
          setIsStatus={setIsStatus}
          orderData={data.OrderData ?? []}
          onCancel={handleCancelOrder}
          alert={alert}
          curentRole={currentRole}
        />
      </Container>
    </SidebarLayout>
  );
};

export default OrderContainer;
