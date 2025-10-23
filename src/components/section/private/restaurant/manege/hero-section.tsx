import { Label } from '@radix-ui/react-label';
import { IconMenu2, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

import Chairs from '@/components/chair';
import FallbackChair from '@/components/fallback/chair';
import FallbackProduct from '@/components/fallback/product';
import Product from '@/components/products';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import View from '@/components/ui/view';
import PopUp from '@/core/components/pop-up';
import { CategortProduct } from '@/core/enum';
import { ChairType, ParentModalType, ProductsType } from '@/types/components';
import { FormCreateChair, FormCreateProducts } from '@/types/form';
import { AlertContexType } from '@/types/ui';
import UploadsTrigger from '@/utils/uploadsTriger';

interface ManageProps {
  isHiden?: any;
  product: ProductsType[];
  chair: ChairType[];
  formAddProduct: FormCreateProducts;
  setFormAddProduct: React.Dispatch<React.SetStateAction<FormCreateProducts>>;
  formCreateChair: FormCreateChair;
  setFormCreateChair: React.Dispatch<React.SetStateAction<FormCreateChair>>;
  onAdd?: () => void;
  isPending?: boolean;
  onPictChange?: (e: any) => void;
  onCategory?: (e: string) => void;
  preview?: string | null;
  setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  isOpenModal: ParentModalType;
  setIsOpenModal: React.Dispatch<React.SetStateAction<ParentModalType>>;
  setSeletIdProduct?: React.Dispatch<React.SetStateAction<string>>;
  onDelete?: (_id: string) => void;
  alert?: AlertContexType;
  onChair?: () => void;
  onDeleteChair?: (_id: string) => void;
}

const ManageHeroSection: React.FC<ManageProps> = ({
  isHiden,
  product,
  formAddProduct,
  setFormAddProduct,
  onAdd,
  onPictChange,
  isPending,
  onCategory,
  preview,
  isOpenModal,
  setIsOpenModal,
  setSeletIdProduct,
  onDelete,
  alert,
  chair,
  onChair,
  formCreateChair,
  setFormCreateChair,
  onDeleteChair,
}) => {
  return (
    <View>
      <Box className="flex min-h-screen w-full justify-center items-center relative z-0 overflow-hidden">
        <Box className="grid grid-cols-1 lg:grid-cols-[2fr_0.7fr] grid-rows-1 w-full min-h-screen">
          <Box className="flex justify-start items-start flex-col ">
            <Image
              alt="bg"
              src="/images/banner.svg"
              width={1800}
              height={1800}
              className="rounded-lg "
            />

            <Box className=" w-full  flex justify-center items-center p-4 flex-col">
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
              <Box className="grid grid-cols-1 lg:grid-cols-4 grid-rows-1 gap-4 items-center w-full ">
                {product && product.length > 0 ? (
                  product.map((items, key) => (
                    <Product
                      key={key}
                      data={items}
                      hidenRoutes={['/restaurant/dashboard/manage']}
                      isHiden={isHiden}
                      isOpenModal={isOpenModal}
                      setIsOpenModal={setIsOpenModal}
                      setSelectId={setSeletIdProduct}
                      onDelete={onDelete}
                      alert={alert}
                    />
                  ))
                ) : (
                  <FallbackProduct />
                )}
              </Box>
            </Box>
          </Box>
          <Box className="flex justify-center items-start sticky  h-full max-h-screen px-3">
            <Box className="flex flex-col w-full gap-2">
              {chair.length > 0 ? (
                <Chairs
                  chairs={chair}
                  hidenRoutes={['/restaurant/dashboard/manage']}
                  isHiden={isHiden}
                  setOpenModal={setIsOpenModal}
                  alert={alert}
                  onDeleteChair={onDeleteChair}
                />
              ) : (
                <FallbackChair
                  hidenRoutes={['/restaurant/dashboard/manage']}
                  setIsOpenModal={setIsOpenModal}
                  isOpenModal={isOpenModal}
                  isHiden={isHiden}
                />
              )}
            </Box>
          </Box>
        </Box>

        <PopUp isOpen={isOpenModal === 'Chair'} onClose={() => setIsOpenModal(null)}>
          <View className="w-full h-full p-1">
            <Box className="flex justify-center items-center flex-col space-y-4">
              <Box className="flex justify-between items-center w-full">
                <Box>
                  <h3 className="text-xl font-bold">Tambah Kursi Baru</h3>
                  <p className="text-sm text-muted-foreground">
                    Masukkan nomor kursi yang akan ditambahkan
                  </p>
                </Box>
                <Button variant="ghost" size="icon" onClick={() => setIsOpenModal(null)}>
                  <IconX size={20} />
                </Button>
              </Box>

              <Box className="w-full space-y-3">
                <Box className="space-y-2">
                  <Label htmlFor="chair-number" className="text-sm font-medium">
                    Nomor Kursi
                  </Label>
                  <Input
                    id="chair-number"
                    inputMode="numeric"
                    value={formCreateChair.noChair}
                    type="number"
                    placeholder="Contoh: 1"
                    onChange={(e) =>
                      setFormCreateChair((prev) => ({
                        ...prev,
                        noChair: Number(e.target.value),
                      }))
                    }
                  />
                </Box>

                <Box className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpenModal(null)}
                    disabled={isPending}
                    className="flex-1"
                  >
                    Batal
                  </Button>
                  <Button
                    variant="native"
                    onClick={() => onChair!()}
                    disabled={isPending}
                    className="flex-1"
                  >
                    {isPending ? 'Menambahkan...' : 'Tambah Kursi'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </View>
        </PopUp>

        <PopUp isOpen={isOpenModal === 'Add'} onClose={() => setIsOpenModal(null)}>
          <View className="w-full h-full p-1">
            <Box className="flex justify-center items-center flex-col space-y-4">
              <Box className="flex justify-between items-center w-full">
                <Box>
                  <h3 className="text-xl font-bold">Tambah Menu Baru</h3>
                  <p className="text-sm text-muted-foreground">
                    Lengkapi informasi menu yang akan ditambahkan
                  </p>
                </Box>
                <Button variant="ghost" size="icon" onClick={() => setIsOpenModal(null)}>
                  <IconX size={20} />
                </Button>
              </Box>

              <Box className="w-full space-y-4 max-h-[60vh] overflow-y-auto">
                <Box className="space-y-2">
                  <Label htmlFor="product-name" className="text-sm font-medium">
                    Nama Menu
                  </Label>
                  <Input
                    id="product-name"
                    placeholder="Contoh: Nasi Goreng Special"
                    value={formAddProduct.name}
                    onChange={(e) =>
                      setFormAddProduct((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </Box>

                <Box className="space-y-2">
                  <Label htmlFor="product-price" className="text-sm font-medium">
                    Harga (Rp)
                  </Label>
                  <Input
                    id="product-price"
                    placeholder="25000"
                    type="number"
                    inputMode="numeric"
                    onChange={(e) =>
                      setFormAddProduct((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                  />
                </Box>

                <Box className="space-y-2">
                  <Label htmlFor="product-category" className="text-sm font-medium">
                    Kategori
                  </Label>
                  <Select onValueChange={(e) => onCategory!(e)} value={formAddProduct.category}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kategori" />
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

                <Box className="space-y-2">
                  <Label className="text-sm font-medium">Foto Menu</Label>
                  <Box className="border-2 border-dashed border-muted rounded-lg p-4">
                    <UploadsTrigger
                      onChange={(e) => onPictChange!(e)}
                      accept="image/*"
                      multiple={false}
                      className="w-full"
                    >
                      <Button className="w-full" variant="outline" type="button">
                        <IconMenu2 className="mr-2" size={18} />
                        Pilih Gambar
                      </Button>
                    </UploadsTrigger>
                    {preview && (
                      <Box className="mt-3 flex justify-center">
                        <Image
                          alt="Preview"
                          width={150}
                          height={150}
                          src={preview}
                          className="rounded-lg object-cover"
                        />
                      </Box>
                    )}
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Format: JPG, PNG, WebP (Max 5MB)
                    </p>
                  </Box>
                </Box>

                <Box className="space-y-2">
                  <Label htmlFor="product-description" className="text-sm font-medium">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="product-description"
                    placeholder="Jelaskan menu Anda dengan detail..."
                    rows={4}
                    onChange={(e) =>
                      setFormAddProduct((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </Box>
              </Box>

              <Box className="flex gap-2 w-full pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsOpenModal(null)}
                  disabled={isPending}
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  variant="native"
                  disabled={isPending}
                  onClick={() => onAdd!()}
                >
                  {isPending ? 'Menambahkan...' : 'Tambah Menu'}
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
