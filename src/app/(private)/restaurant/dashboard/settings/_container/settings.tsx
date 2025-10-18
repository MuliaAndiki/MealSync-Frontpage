'use client';

import RestaurantSettingsHeroSection from '@/components/section/private/restaurant/settings/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const RestaurantSettingsContainer = () => {
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex-col flex">
        <RestaurantSettingsHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default RestaurantSettingsContainer;
