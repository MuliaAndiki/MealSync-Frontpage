'use client';
import UserProfileHeroSection from '@/components/section/private/user/profile/hero-section';
import { ProfileSkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';

const UserProfileContainer = () => {
  const data = DatasQuery.User();

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
        <UserProfileHeroSection profile={data.userProfileData} />
      </Container>
    </SidebarLayout>
  );
};

export default UserProfileContainer;
