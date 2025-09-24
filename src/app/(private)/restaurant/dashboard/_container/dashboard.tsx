'use client';
import DashboardRestaurantSection from '@/components/section/private/restaurant/dashboard/hero-section';
import Container from '@/components/ui/container';
import { ProductsData } from '@/configs/components.config';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { ProductsType } from '@/types/components';
import { useState } from 'react';

const DashboardRestaurantContainer = () => {
  const [product, setProduct] = useState<ProductsType[]>(ProductsData);
  const handleIncrement = (index: number) => {
    setProduct((prev: any) =>
      prev.map((item: ProductsType, i: number) =>
        i === index ? { ...item, count: item.count + 1 } : item
      )
    );
  };
  const handleDeccrement = (index: number) => {
    setProduct((prev: any) =>
      prev.map((item: ProductsType, i: number) =>
        i === index && item.count > 0 ? { ...item, count: item.count - 1 } : item
      )
    );
  };
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardRestaurantSection
          onDeccrement={handleDeccrement}
          onIncrement={handleIncrement}
          produtc={product}
        />
      </Container>
    </SidebarLayout>
  );
};

export default DashboardRestaurantContainer;
