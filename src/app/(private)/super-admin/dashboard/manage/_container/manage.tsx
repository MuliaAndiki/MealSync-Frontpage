'use client';
import ManegeSuperAdminHeroSection from '@/components/section/private/superAdmin/manage/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const ManegeSuperAdminContainer = () => {
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <ManegeSuperAdminHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default ManegeSuperAdminContainer;
