import { Separator } from '@radix-ui/react-separator';
import { IconLanguage, IconMoon, IconPalette, IconShield, IconSun } from '@tabler/icons-react';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import View from '@/components/ui/view';

interface AdminSettingsProps {
  onLogout: () => void;
  currentLanguage: any;
  changeLanguage: any;
  isPending: boolean;
  theme: any;
  setTheme: (theme: any) => void;
  t: any;
}

const AdminSettingsHeroSection: React.FC<AdminSettingsProps> = ({
  changeLanguage,
  currentLanguage,
  isPending,
  onLogout,
  setTheme,
  t,
  theme,
}) => {
  return (
    <View>
      <Box className="flex justify-start items-center flex-col w-full min-h-screen gap-6 p-4">
        <Box className="w-full">
          <h1 className="text-2xl sm:text-3xl font-bold ">{t('settings.title')}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t('settings.manage_preferences')}
          </p>
        </Box>

        <Separator />

        <Card className="w-full ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconPalette size={24} className="text-primary" />
              {t('settings.appearance')}
            </CardTitle>
            <CardDescription>{t('settings.theme_settings')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">{t('settings.theme_mode')}</Label>
                <p className="text-sm text-muted-foreground">{t('settings.choose_theme')}</p>
              </Box>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t('settings.select_theme')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <Box className="flex items-center gap-2">
                      <IconSun size={16} />
                      {t('settings.light')}
                    </Box>
                  </SelectItem>
                  <SelectItem value="dark">
                    <Box className="flex items-center gap-2">
                      <IconMoon size={16} />
                      {t('settings.dark')}
                    </Box>
                  </SelectItem>
                </SelectContent>
              </Select>
            </Box>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconLanguage size={24} className="text-primary" />
              {t('settings.app_language')}
            </CardTitle>
            <CardDescription>{t('settings.choose_language')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">{t('settings.app_language')}</Label>
                <p className="text-sm text-muted-foreground">{t('settings.choose_language')}</p>
              </Box>
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t('settings.select_language')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">{t('settings.indonesian')}</SelectItem>
                  <SelectItem value="en">{t('settings.english')}</SelectItem>
                </SelectContent>
              </Select>
            </Box>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconShield size={24} className="text-primary" />
              {t('settings.privacy_security')}
            </CardTitle>
            <CardDescription>{t('settings.manage_privacy')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">Verifikasi 2 Langkah</Label>
                <p className="text-sm text-muted-foreground">Tambahkan lapisan keamanan ekstra</p>
              </Box>
              <Switch />
            </Box>

            <Separator />

            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">Tampilkan Aktivitas</Label>
                <p className="text-sm text-muted-foreground">
                  Izinkan orang lain melihat aktivitas Anda
                </p>
              </Box>
              <Switch defaultChecked />
            </Box>
          </CardContent>
        </Card>
        <Box className="w-full">
          <Button
            className="w-full"
            variant={'destructive'}
            disabled={isPending}
            onClick={() => onLogout()}
          >
            {isPending ? 'Tunggu' : 'Keluar'}
          </Button>
        </Box>
      </Box>
    </View>
  );
};

export default AdminSettingsHeroSection;
