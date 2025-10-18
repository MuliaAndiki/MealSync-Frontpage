'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import EditUserProfileHeroSection from '@/components/section/private/user/edit-profile/hero-section';
import { EditProfileSkeleton } from '@/components/skeleton/detail-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useUpdateUserProfile } from '@/hooks/mutation/user/mutation';
import { FormEditUserProfile } from '@/types/form';

const EditUserProfileContainer = () => {
  const router = useRouter();
  const data = DatasQuery.User();
  const profile = data.userProfileData;

  const [formData, setFormData] = useState<FormEditUserProfile>({
    fullName: profile?.fullName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    fotoProfile: profile?.fotoProfile || '',
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const updateProfileMutation = useUpdateUserProfile({
    affterSuccess: () => {
      router.push('/user/dashboard/profile');
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData((prev) => ({ ...prev, fotoProfile: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfileMutation.mutate(formData);
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <EditUserProfileHeroSection
          profile={profile}
          formData={formData}
          setFormData={setFormData}
          photoPreview={photoPreview}
          onPhotoChange={handlePhotoChange}
          onSave={handleSave}
          isPending={updateProfileMutation.isPending}
          router={router}
        />
      </Container>
    </SidebarLayout>
  );
};

export default EditUserProfileContainer;
