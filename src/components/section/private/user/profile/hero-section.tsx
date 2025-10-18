'use client';
import { IconEdit, IconMail, IconMapPin, IconPhone, IconUser } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import View from '@/components/ui/view';

interface UserProfileHeroSectionProps {
  profile: any;
}

const UserProfileHeroSection: React.FC<UserProfileHeroSectionProps> = ({ profile }) => {
  const router = useRouter();

  if (!profile) {
    return (
      <View>
        <Box className="flex justify-center items-center flex-col w-full min-h-screen">
          <p className="text-muted-foreground">Loading profile...</p>
        </Box>
      </View>
    );
  }

  return (
    <View>
      <Box className="flex justify-start items-center flex-col w-full min-h-screen gap-6 py-6">
        <Card className="w-full overflow-hidden">
          <Box className="relative w-full h-48 bg-gradient-to-br from-[#5B9844] to-[#4D4440]">
            <Box className="absolute -bottom-16 left-8">
              <Box className="relative w-32 h-32 rounded-full border-4 border-background overflow-hidden shadow-lg">
                {profile?.fotoProfile ? (
                  <Image
                    src={profile.fotoProfile}
                    alt={profile.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Box className="w-full h-full bg-gradient-to-br from-[#5B9844] to-[#4D4440] flex items-center justify-center">
                    <IconUser size={48} className="text-white" />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          <CardContent className="pt-20">
            <Box className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <Box className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{profile.fullName || 'User'}</h1>
                <p className="text-muted-foreground">Member MealSync</p>
              </Box>
              <Button
                variant="native"
                onClick={() => router.push('/user/dashboard/edit-profile')}
                className="w-full sm:w-auto"
              >
                <IconEdit size={18} />
                Edit Profile
              </Button>
            </Box>

            <Separator className="my-6" />

            <Box className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <IconMail size={20} className="text-[#5B9844]" />
                    Informasi Kontak
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Box>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile.email || 'Belum diatur'}</p>
                  </Box>
                  <Box>
                    <p className="text-sm text-muted-foreground">Nomor Telepon</p>
                    <Box className="flex items-center gap-2">
                      <IconPhone size={16} className="text-[#5B9844]" />
                      <p className="font-medium">{profile.phone || 'Belum diatur'}</p>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <IconMapPin size={20} className="text-[#5B9844]" />
                    Alamat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">
                    {profile.address || 'Belum mengatur alamat'}
                  </p>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </View>
  );
};

export default UserProfileHeroSection;
