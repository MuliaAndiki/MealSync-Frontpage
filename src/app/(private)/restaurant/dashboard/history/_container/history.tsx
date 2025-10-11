'use client';

import { useState } from 'react';

import HistoryHeroSection from '@/components/section/private/restaurant/history/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';

const HistoryContainer = () => {
  const [content, setContent] = useState<'Pending' | 'Paid'>('Pending');
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <HistoryHeroSection content={content} setContent={setContent} />
      </Container>
    </SidebarLayout>
  );
};

export default HistoryContainer;
