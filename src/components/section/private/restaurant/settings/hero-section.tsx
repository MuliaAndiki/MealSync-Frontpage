import {
  IconBell,
  IconClock,
  IconLanguage,
  IconMoon,
  IconPalette,
  IconShield,
  IconSun,
  IconToggleLeft,
} from '@tabler/icons-react';
import React from 'react';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import View from '@/components/ui/view';
import { BusinesType } from '@/types/config';

interface UserSettingsProps {
  onLogout: () => void;
  currentLanguage: any;
  changeLanguage: any;
  businessSettings: BusinesType;
  setBusinessSettings: React.Dispatch<React.SetStateAction<BusinesType>>;
  isPending: boolean;
  theme: any;
  setTheme: (theme: any) => void;
  t: any;
}

const RestaurantSettingsHeroSection: React.FC<UserSettingsProps> = ({
  changeLanguage,
  currentLanguage,
  isPending,
  onLogout,
  setTheme,
  t,
  theme,
  businessSettings,
  setBusinessSettings,
}) => {
  return (
    <View>
      <Box className="flex justify-start items-center flex-col w-full min-h-screen gap-6 p-4">
        <Box className="w-full">
          <h1 className="text-2xl sm:text-3xl font-bold">Pengaturan Restaurant</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Kelola pengaturan bisnis dan preferensi
          </p>
        </Box>

        <Separator />

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconToggleLeft size={24} className="text-primary" />
              Pengaturan Bisnis
            </CardTitle>
            <CardDescription>Kelola operasional restaurant Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">Auto Accept Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Terima order otomatis tanpa konfirmasi manual
                </p>
              </Box>
              <Switch
                checked={businessSettings.autoAcceptOrders}
                onCheckedChange={(checked) =>
                  setBusinessSettings((prev) => ({ ...prev, autoAcceptOrders: checked }))
                }
              />
            </Box>

            <Separator />

            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">Mode Maintenance</Label>
                <p className="text-sm text-muted-foreground">
                  Tutup sementara restaurant dari order baru
                </p>
              </Box>
              <Switch
                checked={businessSettings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setBusinessSettings((prev) => ({ ...prev, maintenanceMode: checked }))
                }
              />
            </Box>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconClock size={24} className="text-primary" />
              Jam Operasional
            </CardTitle>
            <CardDescription>Atur jam buka dan tutup restaurant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Box className="grid md:grid-cols-2 gap-4">
              <Box className="space-y-2">
                <Label>Jam Buka</Label>
                <Input type="time" defaultValue="08:00" />
              </Box>
              <Box className="space-y-2">
                <Label>Jam Tutup</Label>
                <Input type="time" defaultValue="22:00" />
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconPalette size={24} className="text-primary" />
              Tampilan
            </CardTitle>
            <CardDescription>Sesuaikan tema dan tampilan aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">Mode Tema</Label>
                <p className="text-sm text-muted-foreground">Pilih tema terang atau gelap</p>
              </Box>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Pilih tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <Box className="flex items-center gap-2">
                      <IconSun size={16} />
                      Terang
                    </Box>
                  </SelectItem>
                  <SelectItem value="dark">
                    <Box className="flex items-center gap-2">
                      <IconMoon size={16} />
                      Gelap
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
              <IconBell size={24} className="text-primary" />
              Notifikasi
            </CardTitle>
            <CardDescription>Atur preferensi notifikasi restaurant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">Notifikasi Order Baru</Label>
                <p className="text-sm text-muted-foreground">
                  Dapatkan notifikasi saat ada order masuk
                </p>
              </Box>
              <Switch
                checked={businessSettings.notifyNewOrders}
                onCheckedChange={(checked) =>
                  setBusinessSettings((prev) => ({ ...prev, notifyNewOrders: checked }))
                }
              />
            </Box>

            <Separator />

            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">Notifikasi Pembayaran</Label>
                <p className="text-sm text-muted-foreground">
                  Terima notifikasi saat pembayaran berhasil
                </p>
              </Box>
              <Switch defaultChecked />
            </Box>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconLanguage size={24} className="text-primary" />
              Bahasa
            </CardTitle>
            <CardDescription>Pilih bahasa yang Anda inginkan</CardDescription>
          </CardHeader>
          <CardContent>
            <Box className="flex items-center justify-between">
              <Box className="space-y-0.5">
                <Label className="text-base">Bahasa Aplikasi</Label>
                <p className="text-sm text-muted-foreground">
                  Pilih bahasa untuk tampilan aplikasi
                </p>
              </Box>
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Pilih bahasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </Box>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconShield size={24} className="text-primary" />
              Privasi & Keamanan
            </CardTitle>
            <CardDescription>Kelola privasi dan keamanan akun</CardDescription>
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
                <Label className="text-base">Tampilkan di Pencarian</Label>
                <p className="text-sm text-muted-foreground">
                  Izinkan restaurant muncul di hasil pencarian
                </p>
              </Box>
              <Switch defaultChecked />
            </Box>
          </CardContent>
        </Card>
        <Box className="w-full ">
          <Button
            className="w-full"
            variant={'destructive'}
            onClick={() => onLogout()}
            disabled={isPending}
          >
            {isPending ? 'Tunggu' : 'Keluar'}
          </Button>
        </Box>
      </Box>
    </View>
  );
};

export default RestaurantSettingsHeroSection;
