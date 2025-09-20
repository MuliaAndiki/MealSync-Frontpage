'use client';
import DashboardSuperAdminSection from '@/components/section/private/superAdmin/dashboard/hero-section';
import Container from '@/components/ui/container';

const DashboardSuperAdminContainer = () => {
  return (
    <Container className="w-full min-h-screen flex flex-col">
      <DashboardSuperAdminSection />
    </Container>
  );
};

export default DashboardSuperAdminContainer;
