'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import ManageHeroSection from '@/components/section/private/restaurant/manege/hero-section';
import { ManageSkeleton } from '@/components/skeleton/dashboard-skeleton';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DatasQuery from '@/hooks/mutation/props.hooks';
import {
  useCreateChair,
  useCreateProduct,
  useDeleteChair,
  useDeleteProduct,
} from '@/hooks/mutation/restaurant/mutation';
import { useAlert } from '@/hooks/useAlert/costum-alert';
import { ParentModalType } from '@/types/components';
import { FormCreateChair, FormCreateProducts } from '@/types/form';
import { fileToBase64 } from '@/utils/base64';

const ManageContainer = () => {
  const data = DatasQuery.Restaurant();
  const pathname = usePathname();

  const deletet = useDeleteProduct();
  const deleteChair = useDeleteChair();
  const createProduct = useCreateProduct({
    onAfterSucces: () => {
      setIsOpenModal(null);
    },
  });
  const createChair = useCreateChair({
    onAfterSucces: () => {
      setIsOpenModal(null);
    },
  });
  const alert = useAlert();
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);
  // Ada Id
  const [selectIdProduct, setSelectIdProduct] = useState<string>('');

  const [formAddProduct, setFormAddProduct] = useState<FormCreateProducts>({
    category: '',
    pictProduct: null,
    name: '',
    price: 0,
    description: '',
  });

  const [formCreateChair, setFormCreateChair] = useState<FormCreateChair>({
    noChair: undefined,
  });

  if (data.isLoading) {
    return (
      <SidebarLayout>
        <Container className="w-full min-h-screen flex flex-col">
          <ManageSkeleton />
        </Container>
      </SidebarLayout>
    );
  }

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

    createProduct.mutate(formAddProduct);
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

  const handleCreateChair = () => {
    if (!formCreateChair.noChair) {
      alert.toast({
        title: 'Warning',
        message: 'Mohon Cek Kembali',
        icon: 'warning',
      });
      return;
    }
    return createChair.mutate(formCreateChair);
  };

  const handleDeleteChair = (id: string) => {
    if (!id) {
      alert.toast({
        title: 'Warning',
        message: 'Mohon Cek Kembali ',
        icon: 'warning',
      });
      return;
    }
    deleteChair.mutate(id);
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col ">
        <ManageHeroSection
          chair={data.ChairData ?? []}
          isHiden={pathname}
          product={data.ProductData ?? []}
          formAddProduct={formAddProduct}
          setFormAddProduct={setFormAddProduct}
          onCategory={handleChangeCategory}
          isPending={createProduct.isPending}
          onAdd={() => handleCreateProducts()}
          onPictChange={handleChangePict}
          preview={preview}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          setSeletIdProduct={setSelectIdProduct}
          onDelete={handleDeleteProduct}
          alert={alert}
          formCreateChair={formCreateChair}
          setFormCreateChair={setFormCreateChair}
          onChair={() => handleCreateChair()}
          onDeleteChair={handleDeleteChair}
        />
      </Container>
    </SidebarLayout>
  );
};

export default ManageContainer;
