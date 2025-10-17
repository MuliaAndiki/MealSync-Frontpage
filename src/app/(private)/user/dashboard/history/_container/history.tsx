'use client';

import HistoryHeroSection from '@/components/section/private/user/history/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const HistoryContainer = () => {
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <HistoryHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default HistoryContainer;
