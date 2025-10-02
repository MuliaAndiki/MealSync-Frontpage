'use client';
import EditMenuHeroSection from '@/components/section/private/restaurant/edit-menu/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { usePathname } from 'next/navigation';

const EditMenuContainer = () => {
  const pathname = usePathname();
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col ">
        <EditMenuHeroSection isHiden={pathname} />
      </Container>
    </SidebarLayout>
  );
};

export default EditMenuContainer;
