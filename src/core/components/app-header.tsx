'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navigationMenuConfig } from '@/configs/app.config';
import { cn } from '@/utils/classname';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import LanguageDropdown from './language.dropdown';
// @ts-nocheck
import NotificationDropdown from './notification.dropdown';
import ThemeToggle from './theme-toggle';
import View from '@/components/ui/view';
import Box from '@/components/ui/box';
import Shape from '@/components/ui/shape';
import Slider from '@/components/svg/home/slider';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AppHeader() {
  const mobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container className="w-full relative">
      <Shape className="rounded-full right-0 top-0 z-[-5]">
        <Slider />
      </Shape>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm p-6 border-b transition-all duration-200',
          isScrolled ? 'border-b-border shadow-md' : 'border-b-transparent'
        )}
      >
        <View className="flex items-center justify-between max-w-7xl mx-auto relative">
          <Box className="flex items-center gap-4">
            <Link href="/">
              <Image src="/images/logo.svg" alt="Logo" width={100} height={100} />
            </Link>
          </Box>
          {!mobile && (
            <NavigationMenu>
              <NavigationMenuList>
                {navigationMenuConfig?.items?.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          <Box className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageDropdown />
            <Link href="/login">
              <Button variant="glass">Login</Button>
            </Link>

            {/* <NotificationDropdown /> */}
          </Box>
        </View>
      </nav>
    </Container>
  );
}
