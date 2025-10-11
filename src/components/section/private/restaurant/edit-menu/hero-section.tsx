import { Label } from '@radix-ui/react-label';
import Image from 'next/image';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import View from '@/components/ui/view';
import { FormCreateProducts } from '@/types/form';
import { ProductsProps } from '@/types/props';
import UploadsTrigger from '@/utils/uploadsTriger';

interface EditMenuProps {
  formEditProduct?: FormCreateProducts;
  setFormEditProduct?: React.Dispatch<React.SetStateAction<FormCreateProducts>>;
  isPending?: boolean;
  preview?: string | null;
  onPictChange?: (e: any) => void;
  onSave?: () => void;
  router?: any;
}

const EditMenuHeroSection: React.FC<EditMenuProps & ProductsProps> = ({
  data,
  formEditProduct,
  isPending,
  preview,
  setFormEditProduct,
  onPictChange,
  onSave,
  router,
}) => {
  return (
    <View>
      <Box className="flex justify-center items-center w-full min-h-screen flex-col">
        <Box className="grid grid-cols-2 grid-rows-1  w-full">
          <Box className="flex justify-between items-start w-full flex-col p-4 ">
            <Box className="flex justify-center items-center w-full max-w-100">
              <Label className="text-lg font-bold w-full">Nama Menu :</Label>
              <Input defaultValue={data.name} />
            </Box>
            <Box className="flex justify-center items-center w-full max-w-100">
              <Label className="text-lg font-bold w-full">Deskripsi :</Label>
              <Input defaultValue={data.description} />
            </Box>
            <Box className="flex justify-center items-center w-full max-w-100">
              <Label className="text-lg font-bold w-full">Kategori :</Label>
              <Input defaultValue={data.category} />
            </Box>
            <Box className="flex justify-center items-center w-full max-w-100">
              <Label className="text-lg font-bold w-full">Price :</Label>
              <Input defaultValue={data.price} />
            </Box>
          </Box>
          <Box className="flex justify-center items-center w-full flex-col">
            <Box className="grid grid-cols-1 grid-rows-2 w-full h-full ">
              <Box className="flex justify-center items-center w-full h-full p-2 gap-2 ">
                {preview ? (
                  <Image
                    alt="gambar"
                    width={170}
                    height={170}
                    src={preview}
                    className="rounded-lg aspect-square"
                  />
                ) : (
                  <Image
                    alt="food"
                    src={data?.pictProduct}
                    width={170}
                    height={170}
                    className="rounded-lg aspect-square"
                  />
                )}

                <Box className="flex justify-center  items-center flex-col">
                  <Label className="text-2xl font-extrabold">Gambar Menu</Label>
                  <UploadsTrigger
                    onChange={(e) => onPictChange!(e)}
                    accept="image/**"
                    multiple={false}
                    className="w-full"
                  >
                    <Button className="w-full" variant={'native'}>
                      Ganti Gambar
                    </Button>
                  </UploadsTrigger>
                </Box>
              </Box>
              <Box className="flex justify-center items-ends w-full h-full flex-col p-2 gap-2 ">
                <Label className="text-lg font-bold">Status Menu :</Label>
                <Box className="flex justify-end items-center gap-2">
                  <Label className="text-lg font-bold">Aktif</Label>
                  <Switch />
                </Box>
                <Box className="flex justify-end items-center gasp-2">
                  <Label className="text-lg font-bold">Habis</Label>
                  <Switch />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="flex justify-around items-center  w-full">
          <Button variant={'native'} className="text-lg" onClick={() => onSave!()}>
            Saves
          </Button>
          <Button variant={'destructive'} className="text-lg" onClick={() => router.back()}>
            Batal
          </Button>
        </Box>
      </Box>
    </View>
  );
};

export default EditMenuHeroSection;
