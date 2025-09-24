'use client';

import HistoryHeroSection from '@/components/section/private/restaurant/history/hero-section';
import Container from '@/components/ui/container';
import { SidebarProvider } from '@/components/ui/sidebar';
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
