import { Label } from '@radix-ui/react-label';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';

import CardProfile from '@/components/card-profile';
import Chair from '@/components/chair';
import FallbackChair from '@/components/fallback/chair';
import FallbackProduct from '@/components/fallback/product';
import Product from '@/components/products';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import PopUp from '@/core/components/pop-up';
import { CardProfileType, ChairType, ParentModalType, ProductsType } from '@/types/components';
import { FormAddCart } from '@/types/form';

// import OrdersRealtime from './orders-realtime';

interface DashboardRestaurantProps {
  produtc: ProductsType[];
  chair: ChairType[];
  profile: CardProfileType;
  setFormAddChart: React.Dispatch<React.SetStateAction<FormAddCart>>;
  isPending: boolean;
  onAdd: () => void;
  isOpenModal: ParentModalType;
  setIsOpenModal: React.Dispatch<React.SetStateAction<ParentModalType>>;
  setSelectId: any;
}

const DashboardRestaurantSection: React.FC<DashboardRestaurantProps> = ({
  produtc,
  chair,
  profile,
  setFormAddChart,
  isPending,
  onAdd,
  isOpenModal,
  setIsOpenModal,
  setSelectId,
}) => {
  return (
    <View>
      <Box className="flex min-h-screen w-full justify-center items-center relative z-0 overflow-hidden">
        <Box className="grid grid-cols-[2fr_0.7fr] grid-rows-1 gap-2 w-full min-h-screen ">
          <Box className="flex justify-center items-center flex-col ">
            <Image
              alt="banners"
              src="/images/banner.svg"
              width={1200}
              height={1200}
              className="rounded-lg"
            />
            <Box className="flex justify-center items-center p-2 flex-col">
              <Carousel className="w-full max-w-3xl">
                <CarouselContent className="flex items-center justify-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="p-1">
                      <Image alt="" src="/images/card.svg" width={800} height={10} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </Box>
            <Box className="flex justify-center w-full p-4 rounded-lg bg-[#2D1912]">
              <Label className="font-extrabold">Menu Populer</Label>
            </Box>
            <Box className="grid grid-cols-4 grid-rows-1 gap-4 items-center w-full my-4">
              {produtc && produtc.length > 0 ? (
                produtc.map((items, key) => (
                  <Product
                    data={items}
                    key={key}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    setSelectId={setSelectId}
                  />
                ))
              ) : (
                <FallbackProduct />
              )}
            </Box>
          </Box>
          <Box className="flex justify-center items-start sticky  h-fit max-h-screen flex-col overflow-y-auto">
            <Box className="flex flex-col w-full gap-2">
              <CardProfile data={profile} />
              {chair.length > 0 ? <Chair chairs={chair} /> : <FallbackChair />}
              {/* {profile && profile._id && <OrdersRealtime restaurantId={profile._id} />} */}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* @ts-lint fix input refresh  */}
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
    </View>
  );
};

export default DashboardRestaurantSection;
