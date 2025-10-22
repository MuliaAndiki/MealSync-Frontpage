'use client';

import { useState } from 'react';

import UserSettingsHeroSection from '@/components/section/private/user/settings/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { useTheme } from '@/core/providers/theme.provider';
import { useLogout } from '@/hooks/mutation/auth/mutation';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslate } from '@/hooks/useTranslate';
import { NotififType } from '@/types/config';

const UserSettingsContainer = () => {
  const { setTheme, theme } = useTheme();
  const logout = useLogout();
  const [notifications, setNotifications] = useState<NotififType>({
    newsletter: false,
    orderUpdates: false,
    promotions: false,
  });
  const { changeLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslate();

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex-col flex">
        <UserSettingsHeroSection
          notifications={notifications}
          setNotifications={setNotifications}
          onLogout={() => logout.mutate({})}
          changeLanguage={changeLanguage}
          currentLanguage={currentLanguage}
          isPending={logout.isPending}
          setTheme={setTheme}
          theme={theme}
          t={t}
        />
      </Container>
    </SidebarLayout>
  );
};

export default UserSettingsContainer;
