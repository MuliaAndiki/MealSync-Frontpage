'use client';
import DashboardRestaurantSection from '@/components/section/private/restaurant/dashboard/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';

const DashboardRestaurantContainer = () => {
  const data = DatasQuery.Restaurant();

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardRestaurantSection
          produtc={data.ProductData ?? []}
          noChair={data.ChairData ?? []}
        />
      </Container>
    </SidebarLayout>
  );
};

export default DashboardRestaurantContainer;
