'use client';
import NavLayout from '@/core/layouts/nav.layout';
import Container from '@/components/ui/container';
import HeroSection from '@/components/section/home/hero-section';
import AboutSection from '@/components/section/home/about-section';
import RestaurantSection from '@/components/section/home/restaurant-section';
import EnvironmentSection from '@/components/section/home/environment-section';
import EventsSection from '@/components/section/home/events-section';

export default function ContainerHome() {
  return (
    <NavLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <HeroSection />
        <AboutSection />
        <RestaurantSection />
        <EnvironmentSection />
        <EventsSection />
      </Container>
    </NavLayout>
  );
}
