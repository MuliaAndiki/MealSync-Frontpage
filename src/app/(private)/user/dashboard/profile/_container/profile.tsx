'use client';

import UserProfileHeroSection from '@/components/section/private/user/profile/hero-section';
import { OrderSkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';

const UserProfileContainer = () => {
  const data = DatasQuery.Auth();

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex flex-col">
          <OrderSkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <Container className="w-full flex flex-col min-h-screen">
        <UserProfileHeroSection profile={data.ProfileData ?? null} />
      </Container>
    </SidebarLayout>
  );
};

export default UserProfileContainer;
