'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import EditMenuHeroSection from '@/components/section/private/restaurant/edit-menu/hero-section';
import { EditMenuSkeleton } from '@/components/skeleton/detail-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import { useUpdateProducts } from '@/hooks/mutation/restaurant/mutation';
import { FormCreateProducts } from '@/types/form';
import { fileToBase64 } from '@/utils/base64';

const EditMenuContainer = () => {
  const params = useParams();
  const id = params?.id as string;
  const update = useUpdateProducts(id);
  const data = DatasQuery.Restaurant(id);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const [formEditProduct, setFormEditProduct] = useState<FormCreateProducts>({
    category: '',
    pictProduct: null,
    name: '',
    price: 0,
    description: '',
  });

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex flex-col">
          <EditMenuSkeleton />
        </Container>
      </SidebarLayout>
    );
  }

  const handleChangePict = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setFormEditProduct((prev) => ({
        ...prev,
        pictProduct: base64,
      }));
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  };

  const handleUpdateProduct = () => {
    const payload = Object.fromEntries(
      Object.entries(formEditProduct).filter(
        ([key, value]) =>
          key !== 'number' && value !== '' && value !== null && value !== 0 && value !== undefined
      )
    );

    update.mutate(payload as any);
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <EditMenuHeroSection
          data={data.ProductByIdData || []}
          setFormEditProduct={setFormEditProduct}
          onPictChange={handleChangePict}
          preview={preview}
          router={router}
          onSave={() => handleUpdateProduct()}
          isPending={update.isPending}
        />
      </Container>
    </SidebarLayout>
  );
};

export default EditMenuContainer;
