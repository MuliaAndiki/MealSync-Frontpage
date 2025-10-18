'use client';

import UserSettingsHeroSection from '@/components/section/private/user/settings/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const UserSettingsContainer = () => {
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex-col flex">
        <UserSettingsHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default UserSettingsContainer;
