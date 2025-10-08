'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EditMenuHeroSection from '@/components/section/private/restaurant/edit-menu/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { useGetProductsId } from '@/hooks/mutation/restaurant/query';
import { FormCreateProducts } from '@/types/form';
import { fileToBase64 } from '@/utils/base64';

const EditMenuContainer = () => {
  const params = useParams();
  const id = params?.id as string;
  const data = useGetProductsId(id);
  const datas = data.data?.data || [];
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const [formEditProduct, setFormEditProduct] = useState<FormCreateProducts>({
    category: '',
    pictProduct: null,
    name: '',
    price: 0,
    description: '',
  });

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

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <EditMenuHeroSection
          data={datas}
          formEditProduct={formEditProduct}
          setFormEditProduct={setFormEditProduct}
          onPictChange={handleChangePict}
          preview={preview}
          router={router}
        />
      </Container>
    </SidebarLayout>
  );
};

export default EditMenuContainer;
