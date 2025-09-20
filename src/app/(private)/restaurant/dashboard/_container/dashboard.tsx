import DashboardRestaurantSection from '@/components/section/private/restaurant/dashboard/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const DashboardRestaurantContainer = () => {
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardRestaurantSection />
      </Container>
    </SidebarLayout>
  );
};

export default DashboardRestaurantContainer;
