import EditDashboardHeroSection from '@/components/section/private/restaurant/edit-dashboard/hero-sectiom';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const EditDashboardContainer = () => {
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <EditDashboardHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default EditDashboardContainer;
