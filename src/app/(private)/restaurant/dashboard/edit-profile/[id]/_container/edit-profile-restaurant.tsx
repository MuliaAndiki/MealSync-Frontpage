'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import EditProfileHeroSection from '@/components/section/private/restaurant/edit-profile/hero-sectiom';
import { EditProfileSkeleton } from '@/components/skeleton/detail-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useEditProfile } from '@/hooks/mutation/restaurant/mutation';
import { FormEditProfile } from '@/types/form';

const EditProfileRestaurantContainer = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const data = DatasQuery.Restaurant();
  const profile = data.ProfileData;

  const [formData, setFormData] = useState<FormEditProfile>({
    name: profile?.name || '',
    email: profile?.email || '',
    address: profile?.profile?.address || '',
    description: profile?.profile?.description || '',
    logoUrl: profile?.profile?.logoUrl || '',
    banner: profile?.profile?.banner || '',
    pitch: profile?.profile?.pitch || '',
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const editProfileMutation = useEditProfile({
    onAfterSucces: () => {
      router.push('/restaurant/dashboard/profile');
    },
  });

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex flex-col">
          <EditProfileSkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData((prev) => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBannerPreview(result);
        setFormData((prev) => ({ ...prev, banner: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    editProfileMutation.mutate(formData);
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <EditProfileHeroSection
          profile={profile}
          formData={formData}
          setFormData={setFormData}
          logoPreview={logoPreview}
          bannerPreview={bannerPreview}
          onLogoChange={handleLogoChange}
          onBannerChange={handleBannerChange}
          onSave={handleSave}
          isPending={editProfileMutation.isPending}
          router={router}
        />
      </Container>
    </SidebarLayout>
  );
};

export default EditProfileRestaurantContainer;
