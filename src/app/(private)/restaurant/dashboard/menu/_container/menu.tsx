'use client';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import Container from '@/components/ui/container';
import MenuHeroSection from '@/components/section/private/restaurant/menu/hero-section';
import { useState } from 'react';
import { ProductsType } from '@/types/components';
import { ProductsData } from '@/configs/components.config';

const MenuContainer = () => {
  const [category, setCategory] = useState<'Makanan' | 'Minuman'>('Makanan');
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
        <MenuHeroSection
          products={product}
          category={category}
          setCategory={setCategory}
          onDeccrement={handleDeccrement}
          onIncrement={handleIncrement}
        />
      </Container>
    </SidebarLayout>
  );
};

export default MenuContainer;
