'use client';
import { useState } from 'react';

import MenuHeroSection from '@/components/section/private/restaurant/menu/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';

const MenuContainer = () => {
  const Restaurant = DatasQuery.Restaurant();
  const [category, setCategory] = useState<'Makanan' | 'Minuman'>('Makanan');

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <MenuHeroSection
          products={Restaurant.ProductData ?? []}
          category={category}
          setCategory={setCategory}
        />
      </Container>
    </SidebarLayout>
  );
};

export default MenuContainer;
