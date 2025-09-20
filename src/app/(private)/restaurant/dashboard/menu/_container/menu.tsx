'use client';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import Container from '@/components/ui/container';
import MenuHeroSection from '@/components/section/private/restaurant/menu/hero-section';
const MenuContainer = () => {
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <MenuHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default MenuContainer;
