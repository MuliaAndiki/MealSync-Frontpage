'use client';
import OrderHeroSection from '@/components/section/private/user/order/hero-section';
import { OrderSkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useCancelOrder } from '@/hooks/mutation/user/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';

const OrderContainer = () => {
  const { alert } = useAppNameSpase();
  const data = DatasQuery.User();
  const cancel = useCancelOrder();

  const handleCancelOrder = (orderId: string) => {
    return cancel.mutate(orderId);
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
        />
      </Container>
    </SidebarLayout>
  );
};

export default OrderContainer;
