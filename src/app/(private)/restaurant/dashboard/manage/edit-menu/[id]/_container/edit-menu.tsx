'use client';
import EditMenuHeroSection from '@/components/section/private/restaurant/edit-menu/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { Label } from '@radix-ui/react-label';
import { useSearchParams } from 'next/navigation';

const EditMenuContainer = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <EditMenuHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default EditMenuContainer;
