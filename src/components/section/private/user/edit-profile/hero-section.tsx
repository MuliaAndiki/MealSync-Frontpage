'use client';
import { IconPhoto, IconUpload, IconUser } from '@tabler/icons-react';
import Image from 'next/image';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import View from '@/components/ui/view';
import { FormEditUserProfile } from '@/types/form';
import UploadsTrigger from '@/utils/uploadsTriger';

interface EditUserProfileHeroSectionProps {
  profile: any;
  formData: FormEditUserProfile;
  setFormData: React.Dispatch<React.SetStateAction<FormEditUserProfile>>;
  photoPreview: string | null;
  onPhotoChange: (e: any) => void;
  onSave: () => void;
  isPending: boolean;
  router: any;
}

const EditUserProfileHeroSection: React.FC<EditUserProfileHeroSectionProps> = ({
  profile,
  formData,
  setFormData,
  photoPreview,
  onPhotoChange,
  onSave,
  isPending,
  router,
}) => {
  const handleInputChange = (field: keyof FormEditUserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View>
      <Box className="flex justify-start items-center flex-col w-full min-h-screen gap-6 py-4 sm:py-6 px-4 sm:px-0">
        <Box className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Box>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Profile</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Perbarui informasi profile Anda
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
              Foto Profile
            </CardTitle>
            <CardDescription>Upload foto profile Anda (400x400px)</CardDescription>
          </CardHeader>
          <CardContent>
            <Box className="flex items-center gap-6">
              <Box className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-muted hover:border-[#5B9844] transition-colors">
                {photoPreview || profile?.fotoProfile ? (
                  <Image
                    src={photoPreview || profile?.fotoProfile || ''}
                    alt="Photo Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Box className="w-full h-full bg-gradient-to-br from-[#5B9844] to-[#4D4440] flex items-center justify-center">
                    <IconUser size={48} className="text-white" />
                  </Box>
                )}
              </Box>
              <UploadsTrigger onChange={onPhotoChange} accept="image/*" multiple={false}>
                <Button variant="outline">
                  <IconUpload size={18} />
                  {photoPreview || profile?.fotoProfile ? 'Ganti Foto' : 'Upload Foto'}
                </Button>
              </UploadsTrigger>
            </Box>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Informasi Dasar</CardTitle>
            <CardDescription>Informasi personal Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Box className="grid md:grid-cols-2 gap-4">
              <Box className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  placeholder="Masukkan nama lengkap"
                  defaultValue={profile?.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </Box>
              <Box className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  defaultValue={profile?.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </Box>
            </Box>

            <Box className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="08xx-xxxx-xxxx"
                defaultValue={profile?.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </Box>

            <Box className="space-y-2">
              <Label htmlFor="address">Alamat Lengkap</Label>
              <Textarea
                id="address"
                placeholder="Masukkan alamat lengkap Anda"
                defaultValue={profile?.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
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

export default EditUserProfileHeroSection;
