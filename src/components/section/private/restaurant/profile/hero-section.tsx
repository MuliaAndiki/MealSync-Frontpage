'use client';
import { IconEdit, IconMail, IconMapPin, IconWorld } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import View from '@/components/ui/view';
import { CardProfileType } from '@/types/components';

interface ProfileHeroSectionProps {
  profile: CardProfileType;
}

const ProfileHeroSection: React.FC<ProfileHeroSectionProps> = ({ profile }) => {
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
          <Box className="relative w-full h-64 bg-gradient-to-br from-[#5B9844] to-[#4D4440]">
            {profile.profile?.banner ? (
              <Image
                src={profile.profile.banner}
                alt="Restaurant Banner"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Box className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">Restaurant Banner</p>
              </Box>
            )}

            <Box className="absolute -bottom-16 left-8">
              <Box className="relative w-32 h-32 rounded-full border-4 border-background overflow-hidden shadow-lg">
                {profile.profile?.logoUrl ? (
                  <Image
                    src={profile.profile.logoUrl}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Box className="w-full h-full bg-gradient-to-br from-[#5B9844] to-[#4D4440] flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {profile.name?.charAt(0).toUpperCase()}
                    </span>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          <CardContent className="pt-20">
            <Box className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <Box className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{profile.name}</h1>
                <Box className="flex items-center gap-2 text-muted-foreground">
                  <IconWorld size={16} />
                  <span className="text-sm">/{profile.uniqueUrl}</span>
                </Box>
              </Box>
              <Button
                variant="native"
                onClick={() => router.push(`/restaurant/dashboard/edit-profile/${profile._id}`)}
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
                    <p className="text-sm text-muted-foreground">Alamat</p>
                    <Box className="flex items-start gap-2">
                      <IconMapPin size={16} className="mt-1 text-[#5B9844] shrink-0" />
                      <p className="font-medium">
                        {profile.profile?.address || 'Belum diatur alamat'}
                      </p>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Deskripsi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">
                    {profile.profile?.description || 'Belum ada deskripsi untuk restaurant ini.'}
                  </p>
                </CardContent>
              </Card>

              {profile.profile?.pitch && (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Pitch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{profile.profile.pitch}</p>
                  </CardContent>
                </Card>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </View>
  );
};

export default ProfileHeroSection;
