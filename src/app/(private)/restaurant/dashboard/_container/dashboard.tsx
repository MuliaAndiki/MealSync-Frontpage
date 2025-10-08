'use client';
import DashboardRestaurantSection from '@/components/section/private/restaurant/dashboard/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { useGetProducts } from '@/hooks/mutation/restaurant/query';

const DashboardRestaurantContainer = () => {
  const data = useGetProducts();
  const productsData = data.data?.data;

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardRestaurantSection produtc={productsData ?? []} />
      </Container>
    </SidebarLayout>
  );
};

export default DashboardRestaurantContainer;
