'use client';

import { useParams } from 'next/navigation';

import EditProfileHeroSection from '@/components/section/private/restaurant/edit-profile/hero-sectiom';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const EditProfileRestaurantContainer = () => {
  const params = useParams();
  const id = params.id as string;
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <EditProfileHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default EditProfileRestaurantContainer;
