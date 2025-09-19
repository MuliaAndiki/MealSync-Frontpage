'use client';
import DashboardUserSection from '@/components/section/private/user/dashboard/hero-section';
import Container from '@/components/ui/container';

const DashboardUserContainer = () => {
  return (
    <Container className="w-full min-h-screen flex flex-col">
      <DashboardUserSection />
    </Container>
  );
};

export default DashboardUserContainer;
