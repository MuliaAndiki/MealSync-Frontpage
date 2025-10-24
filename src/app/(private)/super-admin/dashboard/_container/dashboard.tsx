'use client';

import { useEffect } from 'react';

import DashboardSuperAdminSection from '@/components/section/private/superAdmin/dashboard/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';

const DashboardSuperAdminContainer = () => {
  const data = DatasQuery.Admin();

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardSuperAdminSection />
      </Container>
    </SidebarLayout>
  );
};

export default DashboardSuperAdminContainer;
