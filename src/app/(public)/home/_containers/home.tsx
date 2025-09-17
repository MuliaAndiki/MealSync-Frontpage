'use client';
import { themeConfig } from '@/configs/theme.config';
import NavLayout from '@/core/layouts/nav.layout';
import { useTheme } from '@/core/providers/theme.provider';
import Container from '@/components/ui/container';
import HeroSection from '@/components/section/home/hero-section';

export default function ContainerHome() {
  const { theme } = useTheme();

  return (
    <NavLayout>
      <Container
        className={`w-full min-h-screen flex flex-col bg-[${themeConfig[theme].primary.background}]`}
      >
        <HeroSection />
      </Container>
    </NavLayout>
  );
}
