import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import Product from '@/components/products';
import { ParentModalType, ProductsType } from '@/types/components';
import React, { useState } from 'react';
import PopUp from '@/core/components/pop-up';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { FormCreateProducts } from '@/types/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategortProduct } from '@/core/enum';
import { Textarea } from '@/components/ui/textarea';
import UploadsTrigger from '@/utils/uploadsTriger';
import { AlertContexType } from '@/types/ui';
import CardProfile from '@/components/card-profile';
import { CardProfileData, ChairData } from '@/configs/components.config';
import Chair from '@/components/chair';

interface ManageProps {
  isHiden?: any;
  data: ProductsType[];
  formAddProduct: FormCreateProducts;
  setFormAddProduct: React.Dispatch<React.SetStateAction<FormCreateProducts>>;
  onAdd?: () => void;
  isPending?: boolean;
  onPictChange?: (e: any) => void;
  onCategory?: (e: string) => void;
  preview?: string | null;
  setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  isOpenModal: ParentModalType;
  setIsOpenModal: React.Dispatch<React.SetStateAction<ParentModalType>>;
  setSeletId?: React.Dispatch<React.SetStateAction<string>>;
  onDelete?: (_id: string) => void;
  alert?: AlertContexType;
}

const ManageHeroSection: React.FC<ManageProps> = ({
  isHiden,
  data,
  formAddProduct,
  setFormAddProduct,
  onAdd,
  onPictChange,
  isPending,
  onCategory,
  preview,
  isOpenModal,
  setIsOpenModal,
  setSeletId,
  onDelete,
  alert,
}) => {
  return (
    <View>
      <Box className="flex min-h-screen w-full justify-center items-center relative z-0 overflow-hidden">
        <Box className="grid grid-cols-[2fr_0.7fr] grid-rows-1 w-full min-h-screen">
          <Box className="flex justify-start items-start flex-col ">
            <Image
              alt="bg"
              src="/images/banner.svg"
              width={1800}
              height={1800}
              className="rounded-lg "
            />

            <Box className="bg-[#2D1912] w-full rounded-t-2xl flex justify-center items-center p-4 flex-col">
              <Box className="flex justify-end items-center gap-4 w-full ">
                <Button
                  variant={'destructive'}
                  className="flex items-center justify-center"
                  onClick={() => setIsOpenModal('Add')}
                >
                  Add Menu
                  <IconMenu2 />
                </Button>
              </Box>
              <Box className="grid grid-cols-5 grid-rows-1 gap-4 items-center w-full ">
                {data.map((items, key) => (
                  <Product
                    key={key}
                    data={items}
                    hidenRoutes={['/restaurant/dashboard/manage']}
                    isHiden={isHiden}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    setSelectId={setSeletId}
                    onDelete={onDelete}
                    alert={alert}
                  />
                ))}
              </Box>
            </Box>
          </Box>
          <Box className="flex justify-center items-start sticky  h-full max-h-screen px-3">
            <Box className="flex flex-col w-full gap-2">
              {CardProfileData.map((items, key) => (
                <CardProfile key={key} data={items} />
              ))}
              {ChairData.map((items, key) => (
                <Chair key={key} chair={items.chair} />
              ))}
            </Box>
          </Box>
        </Box>

        <PopUp isOpen={isOpenModal === 'Add'} onClose={() => setIsOpenModal(null)}>
          <View className="w-full h-full">
            <Box className="flex justify-center items-center flex-col">
              <Box className="flex justify-between items-center w-full">
                <Label className="text-lg font-extrabold">Bikin Produtcs</Label>
                <IconX onClick={() => setIsOpenModal(null)} className="cursor-pointer" />
              </Box>
              <Box className="flex justify-center items-center w-full flex-col ">
                <Box className="flex justify-center items-start flex-col w-full my-2 ">
                  <Label className="text-lg font-extrabold">Nama :</Label>
                  <Input
                    placeholder="roti"
                    value={formAddProduct.name}
                    onChange={(e) =>
                      setFormAddProduct((prev) => {
                        const newObj = { ...prev, name: e.target.value };
                        return newObj;
                      })
                    }
                  />
                </Box>
                <Box className="flex justify-center items-start flex-col w-full my-2 ">
                  <Label className="text-lg font-extrabold">Harga :</Label>
                  <Input
                    placeholder="000"
                    type="number"
                    inputMode="numeric"
                    onChange={(e) =>
                      setFormAddProduct((prev) => {
                        const newObj = { ...prev, price: Number(e.target.value) };
                        return newObj;
                      })
                    }
                  />
                </Box>
                <Box className="flex justify-center items-start flex-col w-full my-2 ">
                  <Label className="text-lg font-extrabold">Gambar :</Label>
                  <UploadsTrigger
                    onChange={(e) => onPictChange!(e)}
                    accept="image/**"
                    multiple={false}
                    className="w-full"
                  >
                    <Button className="w-full" variant={'native'}>
                      Tambahakan Gambar
                    </Button>
                    {preview && (
                      <Image
                        alt="gambar"
                        width={100}
                        height={100}
                        src={preview}
                        className="mt-2 rounded-lg"
                      />
                    )}
                    <Label className="flex justify-end text-sm font-semibold italic">
                      Format: .jpg .webp .png
                    </Label>
                  </UploadsTrigger>
                </Box>
                <Box className="flex justify-center items-start flex-col w-full my-2 ">
                  <Label className="text-lg font-extrabold">Category :</Label>
                  <Select onValueChange={(e) => onCategory!(e)} value={formAddProduct.category}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="pilih category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CategortProduct.map((items) => (
                        <SelectItem key={items} value={items}>
                          {items}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Box>
                <Box className="flex justify-center items-start flex-col w-full my-2 ">
                  <Label className="text-lg font-extrabold">Deskripsi :</Label>
                  <Textarea
                    placeholder="Masukan Deskripsi"
                    onChange={(e) =>
                      setFormAddProduct((prev) => {
                        const newObj = { ...prev, description: e.target.value };
                        return newObj;
                      })
                    }
                  />
                </Box>
                <Button
                  type="button"
                  className="w-full"
                  variant={'destructive'}
                  disabled={isPending}
                  onClick={() => onAdd!()}
                >
                  {isPending ? 'Tunggu' : 'Bikin'}
                </Button>
              </Box>
            </Box>
          </View>
        </PopUp>
      </Box>
    </View>
  );
};

export default ManageHeroSection;
