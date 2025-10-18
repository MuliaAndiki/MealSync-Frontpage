'use client';
import { IconPhoto, IconUpload } from '@tabler/icons-react';
import Image from 'next/image';
import { useState } from 'react';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import View from '@/components/ui/view';
import { CardProfileType } from '@/types/components';
import { FormEditProfile } from '@/types/form';
import UploadsTrigger from '@/utils/uploadsTriger';

interface EditProfileHeroSectionProps {
  profile: CardProfileType | null;
  formData: FormEditProfile;
  setFormData: React.Dispatch<React.SetStateAction<FormEditProfile>>;
  logoPreview: string | null;
  bannerPreview: string | null;
  onLogoChange: (e: any) => void;
  onBannerChange: (e: any) => void;
  onSave: () => void;
  isPending: boolean;
  router: any;
}

const EditProfileHeroSection: React.FC<EditProfileHeroSectionProps> = ({
  profile,
  formData,
  setFormData,
  logoPreview,
  bannerPreview,
  onLogoChange,
  onBannerChange,
  onSave,
  isPending,
  router,
}) => {
  const handleInputChange = (field: keyof FormEditProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View>
      <Box className="flex justify-start items-center flex-col w-full min-h-screen gap-6 py-4 sm:py-6 px-4 sm:px-0">
        <Box className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Box>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Profile Restaurant</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Perbarui informasi restaurant Anda
            </p>
          </Box>
          <Box className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
              className="flex-1 sm:flex-none"
            >
              Batal
            </Button>
            <Button
              variant="native"
              onClick={onSave}
              disabled={isPending}
              className="flex-1 sm:flex-none"
            >
              {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </Box>
        </Box>

        <Separator />

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconPhoto size={24} className="text-[#5B9844]" />
              Banner Restaurant
            </CardTitle>
            <CardDescription>Ukuran rekomendasi: 1200x400px</CardDescription>
          </CardHeader>
          <CardContent>
            <Box className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-muted hover:border-[#5B9844] transition-colors">
              {bannerPreview || profile?.profile?.banner ? (
                <>
                  <Image
                    src={bannerPreview || profile?.profile?.banner || ''}
                    alt="Banner Preview"
                    fill
                    className="object-cover"
                  />
                  <Box className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <UploadsTrigger onChange={onBannerChange} accept="image/*" multiple={false}>
                      <Button variant="secondary">
                        <IconUpload size={18} />
                        Ganti Banner
                      </Button>
                    </UploadsTrigger>
                  </Box>
                </>
              ) : (
                <Box className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <IconPhoto size={48} className="text-muted-foreground" />
                  <UploadsTrigger onChange={onBannerChange} accept="image/*" multiple={false}>
                    <Button variant="outline">
                      <IconUpload size={18} />
                      Upload Banner
                    </Button>
                  </UploadsTrigger>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconPhoto size={24} className="text-[#5B9844]" />
              Logo Restaurant
            </CardTitle>
            <CardDescription>Ukuran rekomendasi: 400x400px (Square)</CardDescription>
          </CardHeader>
          <CardContent>
            <Box className="flex items-center gap-6">
              <Box className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-muted hover:border-[#5B9844] transition-colors">
                {logoPreview || profile?.profile?.logoUrl ? (
                  <Image
                    src={logoPreview || profile?.profile?.logoUrl || ''}
                    alt="Logo Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Box className="w-full h-full bg-gradient-to-br from-[#5B9844] to-[#4D4440] flex items-center justify-center">
                    <IconPhoto size={40} className="text-white" />
                  </Box>
                )}
              </Box>
              <UploadsTrigger onChange={onLogoChange} accept="image/*" multiple={false}>
                <Button variant="outline">
                  <IconUpload size={18} />
                  {logoPreview || profile?.profile?.logoUrl ? 'Ganti Logo' : 'Upload Logo'}
                </Button>
              </UploadsTrigger>
            </Box>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Informasi Dasar</CardTitle>
            <CardDescription>Informasi umum tentang restaurant Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Box className="grid md:grid-cols-2 gap-4">
              <Box className="space-y-2">
                <Label htmlFor="name">Nama Restaurant</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama restaurant"
                  defaultValue={profile?.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </Box>
              <Box className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@restaurant.com"
                  defaultValue={profile?.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </Box>
            </Box>

            <Box className="space-y-2">
              <Label htmlFor="address">Alamat Lengkap</Label>
              <Textarea
                id="address"
                placeholder="Masukkan alamat lengkap restaurant"
                defaultValue={profile?.profile?.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
              />
            </Box>

            <Box className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Ceritakan tentang restaurant Anda"
                defaultValue={profile?.profile?.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
              />
            </Box>

            <Box className="space-y-2">
              <Label htmlFor="pitch">Pitch / Tagline</Label>
              <Input
                id="pitch"
                placeholder="Tagline menarik untuk restaurant Anda"
                defaultValue={profile?.profile?.pitch || ''}
                onChange={(e) => handleInputChange('pitch', e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>

        <Box className="w-full flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.back()} disabled={isPending}>
            Batal
          </Button>
          <Button variant="native" onClick={onSave} disabled={isPending}>
            {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </Box>
      </Box>
    </View>
  );
};

export default EditProfileHeroSection;
