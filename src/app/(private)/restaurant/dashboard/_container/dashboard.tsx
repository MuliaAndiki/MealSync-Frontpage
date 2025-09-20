import DashboardRestaurantSection from '@/components/section/private/restaurant/dashboard/hero-section';
import Container from '@/components/ui/container';

const DashboardRestaurantContainer = () => {
  return (
    <Container className="w-full min-h-screen flex flex-col">
      <DashboardRestaurantSection />
    </Container>
  );
};

export default DashboardRestaurantContainer;
