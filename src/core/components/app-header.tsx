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
import NotificationDropdown from './notification.dropdown';
import ThemeToggle from './theme-toggle';
import View from '@/components/ui/view';
import Box from '@/components/ui/box';

export default function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm p-6 border-b transition-all duration-200',
        isScrolled ? 'border-b-border shadow-md' : 'border-b-transparent'
      )}
    >
      <View className="flex items-center justify-between max-w-7xl mx-auto">
        <Box className="flex items-center gap-4">
          <Link href="/">
            <Image src="/images/logo.svg" alt="Logo" width={100} height={100} />
          </Link>
        </Box>

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

        <Box className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageDropdown />
          <NotificationDropdown />
        </Box>
      </View>
    </nav>
  );
}
