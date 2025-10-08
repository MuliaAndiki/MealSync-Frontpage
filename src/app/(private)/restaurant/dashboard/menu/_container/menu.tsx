'use client';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import Container from '@/components/ui/container';
import MenuHeroSection from '@/components/section/private/restaurant/menu/hero-section';
import { useState } from 'react';
import { useGetProducts } from '@/hooks/mutation/restaurant/query';

const MenuContainer = () => {
  const data = useGetProducts();
  const ProductData = data.data?.data;
  const [category, setCategory] = useState<'Makanan' | 'Minuman'>('Makanan');

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <MenuHeroSection
          products={ProductData ?? []}
          category={category}
          setCategory={setCategory}
        />
      </Container>
    </SidebarLayout>
  );
};

export default MenuContainer;
