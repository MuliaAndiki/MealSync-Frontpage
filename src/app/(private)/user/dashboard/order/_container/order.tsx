import OrderHeroSection from '@/components/section/private/user/order/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const OrderContainer = () => {
  return (
    <SidebarLayout>
      <Container className="w-full h-full flex flex-col">
        <OrderHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default OrderContainer;
