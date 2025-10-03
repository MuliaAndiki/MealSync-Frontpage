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
}) => {
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);

  return (
    <View>
      <Box className="flex justify-center items-center min-h-screen flex-col relative ">
        <Image
          alt="bg"
          src="/images/banner.svg"
          width={1800}
          height={1800}
          className="rounded-lg "
        />
        <Box className="absolute w-full max-w-200 top-40  bg-foreground/90 rounded-lg ">
          <Input className="" />
        </Box>
        <Box className="bg-[#2D1912] w-full rounded-t-2xl flex justify-center items-center p-4 flex-col">
          <Box className="flex justify-end items-center gap-2 w-full">
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
              />
            ))}
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

        {/* <PopUp isOpen={isOpenModal === 'Edit'} onClose={() => setIsOpenModal(null)}>
          <View className="w-full h-full">
            <Box className="flex justify-center items-center flex-col">
              <Box className="flex justify-between items-center w-full">
                <Label className="text-lg font-bold">Edit Menu :</Label>
                <IconX onClick={() => setIsOpenModal(null)} className="cursor-pointer" />
              </Box>
            </Box>
          </View>
        </PopUp> */}
      </Box>
    </View>
  );
};

export default ManageHeroSection;
