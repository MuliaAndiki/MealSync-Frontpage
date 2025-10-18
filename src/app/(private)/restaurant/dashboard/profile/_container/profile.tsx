'use client';
import ProfileHeroSection from '@/components/section/private/restaurant/profile/hero-section';
import { ProfileSkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';

const ProfileRestaurantContainer = () => {
  const data = DatasQuery.Restaurant();

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex-col flex">
          <ProfileSkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex-col flex">
        <ProfileHeroSection profile={data.ProfileData} />
      </Container>
    </SidebarLayout>
  );
};

export default ProfileRestaurantContainer;
