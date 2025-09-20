'use client';
import DashboardUserSection from '@/components/section/private/user/dashboard/hero-section';
import Container from '@/components/ui/container';
import { useAppSelector } from '@/hooks/dispatch/dispatch';

import { useEffect } from 'react';

const DashboardUserContainer = () => {
  const current = useAppSelector((state) => state.auth.currentUser);
  useEffect(() => {
    console.log('data User', current);
  }, []);
  return (
    <Container className="w-full min-h-screen flex flex-col">
      <DashboardUserSection />
    </Container>
  );
};

export default DashboardUserContainer;
