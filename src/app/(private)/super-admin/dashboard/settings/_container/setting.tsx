'use client';
import AdminSettingsHeroSection from '@/components/section/private/superAdmin/settings/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { useTheme } from '@/core/providers/theme.provider';
import { useLogout } from '@/hooks/mutation/auth/mutation';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslate } from '@/hooks/useTranslate';

const SettingsContainer = () => {
  const { setTheme, theme } = useTheme();
  const logout = useLogout();
  const { changeLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslate();
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <AdminSettingsHeroSection
          changeLanguage={changeLanguage}
          currentLanguage={currentLanguage}
          isPending={logout.isPending}
          onLogout={() => logout.mutate({})}
          setTheme={setTheme}
          t={t}
          theme={theme}
        />
      </Container>
    </SidebarLayout>
  );
};

export default SettingsContainer;
