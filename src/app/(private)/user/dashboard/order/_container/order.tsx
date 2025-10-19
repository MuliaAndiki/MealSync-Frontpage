'use client';
import { useState } from 'react';

import OrderHeroSection from '@/components/section/private/user/order/hero-section';
import { OrderSkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useCancelOrder } from '@/hooks/mutation/user/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { ParentModalType, StatusType } from '@/types/components';

const OrderContainer = () => {
  const { alert } = useAppNameSpase();
  const data = DatasQuery.User();
  const cancel = useCancelOrder();
  const [isStatus, setIsStatus] = useState<StatusType>('pending');
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');

  const handleCancelOrder = (orderId: string) => {
    return cancel.mutate(orderId);
  };
  const handlePayment = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsOpenModal('Pay');
  };

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex flex-col">
          <OrderSkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <OrderHeroSection
          orderData={data.orderData || []}
          onCancel={handleCancelOrder}
          isPending={cancel.isPending}
          alert={alert}
          isStatus={isStatus}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
          resumePayment={handlePayment}
        />
      </Container>
    </SidebarLayout>
  );
};

export default OrderContainer;
