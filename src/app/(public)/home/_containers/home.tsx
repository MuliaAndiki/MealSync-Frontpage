'use client';
import AboutSection from '@/components/section/public/home/about-section';
import EnvironmentSection from '@/components/section/public/home/environment-section';
import EventsSection from '@/components/section/public/home/events-section';
import HeroSection from '@/components/section/public/home/hero-section';
import RestaurantSection from '@/components/section/public/home/restaurant-section';
import Container from '@/components/ui/container';
import NavLayout from '@/core/layouts/nav.layout';
import { useIsMobile } from '@/hooks/use-mobile';

export default function ContainerHome() {
  const mobile = useIsMobile();
  return (
    <NavLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <HeroSection />
        <AboutSection />
        <RestaurantSection isMobile={mobile} />
        <EnvironmentSection isMobile={mobile} />
        <EventsSection />
      </Container>
    </NavLayout>
  );
}
