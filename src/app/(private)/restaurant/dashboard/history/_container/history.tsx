'use client';

import { useState } from 'react';

import HistoryHeroSection from '@/components/section/private/restaurant/history/hero-section';
import { HistorySkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';

const HistoryContainer = () => {
  const [content, setContent] = useState<'Failed' | 'Paid'>('Paid');
  const data = DatasQuery.Pay();

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex flex-col">
          <HistorySkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <HistoryHeroSection
          content={content}
          setContent={setContent}
          orderHistory={data.paymentStatusData}
        />
      </Container>
    </SidebarLayout>
  );
};

export default HistoryContainer;
