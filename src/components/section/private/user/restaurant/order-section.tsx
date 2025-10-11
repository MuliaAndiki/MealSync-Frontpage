import { Label } from '@radix-ui/react-label';
import { IconX } from '@tabler/icons-react';

import Chairs from '@/components/chair';
import FallbackChair from '@/components/fallback/chair';
import Product from '@/components/products';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import PopUp from '@/core/components/pop-up';
import { ChairType, ParentModalType, ProductsType, UniqueUrlProfileType } from '@/types/components';
import { FormAddCart } from '@/types/form';
interface RestaurantOrderProps {
  profileUnique: UniqueUrlProfileType;
  Products: ProductsType[];
  chairs: ChairType[];
  isOpenModal?: ParentModalType;
  setIsOpenModal?: React.Dispatch<React.SetStateAction<ParentModalType>>;
  onAdd?: () => void;
  setFormAddChart?: React.Dispatch<React.SetStateAction<FormAddCart>>;
  setSelectId?: any;
  isPending?: boolean;
}

const RestaurantOrderSection: React.FC<RestaurantOrderProps> = ({
  profileUnique,
  Products,
  chairs,
  isOpenModal,
  onAdd,
  setFormAddChart,
  setSelectId,
  isPending,
  setIsOpenModal,
}) => {
  return (
    <View>
      <Box className="w-full min-h-screen flex flex-col">
        <Label className="text-2xl font-bold">{profileUnique.restaurant?.name}</Label>
        <Box className="grid lg:grid-cols-[2fr_1fr] grid-rows-1  ">
          <Box className="grid lg:grid-cols-4 grid-rows-1 gap-4">
            {Products?.map((items, key) => (
              <Product
                data={items}
                key={key}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                setSelectId={setSelectId}
              />
            ))}
          </Box>
          <Box className="w-full h-full">
            {chairs.length > 0 ? <Chairs chairs={chairs} /> : <FallbackChair />}
          </Box>
        </Box>
        <PopUp isOpen={isOpenModal === 'Form'} onClose={() => setIsOpenModal!(null)}>
          <View className="w-full h-full ">
            <Box className="flex justify-center items-center flex-col">
              <Box className="flex justify-between items-center w-full">
                <Label className="text-lg font-bold">Tambahkan Ke Keranjang</Label>
                <IconX onClick={() => setIsOpenModal!(null)} />
              </Box>
              <Box className="w-full flex justify-center items-start flex-col gap-2">
                <Label className="text-sm font-bold">Jumlah :</Label>
                <Input
                  inputMode="numeric"
                  type="number"
                  onChange={(e) =>
                    setFormAddChart!((prev) => {
                      const newObj = { ...prev, quantity: Number(e.target.value) };
                      return newObj;
                    })
                  }
                />
                <Button
                  className="w-full"
                  disabled={isPending}
                  variant={'destructive'}
                  onClick={() => onAdd!()}
                >
                  {isPending ? 'Tunggu Sebentar' : 'Tambahakan Ke Keranjang'}
                </Button>
              </Box>
            </Box>
          </View>
        </PopUp>
      </Box>
    </View>
  );
};

export default RestaurantOrderSection;
