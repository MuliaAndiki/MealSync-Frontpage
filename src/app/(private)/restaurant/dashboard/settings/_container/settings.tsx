'use client';

import { useState } from 'react';

import RestaurantSettingsHeroSection from '@/components/section/private/restaurant/settings/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { useTheme } from '@/core/providers/theme.provider';
import { useLogout } from '@/hooks/mutation/auth/mutation';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslate } from '@/hooks/useTranslate';
import { BusinesType, NotififType } from '@/types/config';

const RestaurantSettingsContainer = () => {
  const { setTheme, theme } = useTheme();
  const logout = useLogout();
  const [businessSettings, setBusinessSettings] = useState<BusinesType>({
    autoAcceptOrders: false,
    maintenanceMode: false,
    notifyNewOrders: true,
  });
  const { changeLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslate();
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex-col flex">
        <RestaurantSettingsHeroSection
          changeLanguage={changeLanguage}
          currentLanguage={currentLanguage}
          isPending={logout.isPending}
          businessSettings={businessSettings}
          setBusinessSettings={setBusinessSettings}
          onLogout={() => logout.mutate({})}
          setTheme={setTheme}
          t={t}
          theme={theme}
        />
      </Container>
    </SidebarLayout>
  );
};

export default RestaurantSettingsContainer;
