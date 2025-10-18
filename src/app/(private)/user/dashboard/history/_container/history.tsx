'use client';

import HistoryHeroSection from '@/components/section/private/user/history/hero-section';
import { HistorySkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';

const HistoryContainer = () => {
  const data = DatasQuery.User();
  const purchaseHistory = data.OrderHistoryData || [];

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex-col flex">
          <HistorySkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex-col flex">
        <HistoryHeroSection purchaseHistory={purchaseHistory} />
      </Container>
    </SidebarLayout>
  );
};

export default HistoryContainer;
