'use client';
import ManageHeroSection from '@/components/section/private/restaurant/manege/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { useCreateProduct, useDeleteProduct } from '@/hooks/mutation/restaurant/mutation';
import { useGetProducts } from '@/hooks/mutation/restaurant/query';
import { useAlert } from '@/hooks/useAlert/costum-alert';
import { FormCreateProducts } from '@/types/form';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { fileToBase64 } from '@/utils/base64';
import { ParentModalType } from '@/types/components';
import { useEffect } from 'react';

const ManageContainer = () => {
  const data = useGetProducts();
  const productData = data.data?.data;
  const pathname = usePathname();
  const deletet = useDeleteProduct();
  const create = useCreateProduct({
    onAfterSucces: () => {
      setIsOpenModal(null);
    },
  });
  const alert = useAlert();
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);
  // Ada Id
  const [selectId, setSelectId] = useState<string>('');
  const [formAddProduct, setFormAddProduct] = useState<FormCreateProducts>({
    category: '',
    pictProduct: null,
    name: '',
    price: 0,
    description: '',
  });

  const handleChangeCategory = (e: string) => {
    setFormAddProduct((prev) => ({
      ...prev,
      category: e,
    }));
  };

  const handleChangePict = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('pict Triger', file);
    if (file) {
      const base64 = await fileToBase64(file);
      setFormAddProduct((prev) => ({
        ...prev,
        pictProduct: base64,
      }));
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  };

  const handleCreateProducts = () => {
    if (
      !formAddProduct.category ||
      !formAddProduct.name ||
      !formAddProduct.price ||
      !formAddProduct.pictProduct
    ) {
      alert.toast({
        title: 'Warning',
        message: 'Mohon Cek Kembali ',
        icon: 'warning',
      });
      return;
    }

    create.mutate(formAddProduct);
  };

  const handleDeleteProduct = (id: string) => {
    if (!id) {
      alert.toast({
        title: 'Warning',
        message: 'Mohon Cek Kembali ',
        icon: 'warning',
      });
      return;
    }
    deletet.mutate(id);
  };
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col ">
        <ManageHeroSection
          isHiden={pathname}
          data={productData ?? []}
          formAddProduct={formAddProduct}
          setFormAddProduct={setFormAddProduct}
          onCategory={handleChangeCategory}
          isPending={create.isPending}
          onAdd={() => handleCreateProducts()}
          onPictChange={handleChangePict}
          preview={preview}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          setSeletId={setSelectId}
          onDelete={handleDeleteProduct}
          alert={alert}
        />
      </Container>
    </SidebarLayout>
  );
};

export default ManageContainer;
