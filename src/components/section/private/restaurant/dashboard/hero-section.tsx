import { Label } from '@radix-ui/react-label';
import { IconX } from '@tabler/icons-react';
import { Coffee, Cookie } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Suspense } from 'react';

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
import { Category } from '@/types/config';
import { FormAddCart } from '@/types/form';

const OrdersRealtime = dynamic(() => import('@/components/orders-realtime'), {
  ssr: false,
  loading: () => <Box className="w-full p-6 animate-pulse bg-muted rounded-lg h-32" />,
});

interface DashboardRestaurantProps {
  produtc: ProductsType[];
  chair: ChairType[];
  setFormAddChart: React.Dispatch<React.SetStateAction<FormAddCart>>;
  isPending: boolean;
  onAdd: () => void;
  isOpenModal: ParentModalType;
  setIsOpenModal: React.Dispatch<React.SetStateAction<ParentModalType>>;
  setSelectId: any;
  category?: Category;
  setCategory?: React.Dispatch<React.SetStateAction<Category>>;
  restaurantId?: string;
}

const DashboardRestaurantSection: React.FC<DashboardRestaurantProps> = ({
  produtc,
  chair,
  setFormAddChart,
  isPending,
  onAdd,
  isOpenModal,
  setIsOpenModal,
  setSelectId,
  category,
  setCategory,
  restaurantId,
}) => {
  return (
    <View>
      <Box className="flex min-h-screen w-full justify-center items-center relative z-0 overflow-hidden">
        <Box className="grid grid-cols-[2fr_0.7fr] grid-rows-1 gap-2 w-full min-h-screen ">
          <Box className="flex justify-center items-center flex-col ">
            <Image
              alt="banners"
              src="/images/banner.svg"
              width={800}
              height={400}
              className="rounded-lg w-full h-auto"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            />
            <Box className="flex justify-center items-center p-2 flex-col w-full ">
              <Carousel className="w-full max-w-5xl">
                <CarouselContent className="flex items-center justify-center ">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index} className="p-1">
                      <Image
                        alt={`Promo ${index + 1}`}
                        src="/images/card.svg"
                        width={400}
                        height={200}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </Box>
            <Box className="flex justify-center w-full gap-4 p-4 rounded-lg bg-card border">
              <Button
                variant={'native'}
                className="flex justify-center items-center"
                onClick={() => setCategory!('makanan')}
              >
                <Cookie size={32} />
                Makanan
              </Button>

              <Button
                variant={'native'}
                className="flex justify-center items-center"
                onClick={() => setCategory!('minuman')}
              >
                <Coffee size={32} />
                Minuman
              </Button>
            </Box>
            <Box className="grid grid-cols-4 grid-rows-1 gap-4 items-center w-full my-4">
              {produtc && produtc.length > 0 ? (
                produtc
                  .filter((item) => item.category.toLowerCase() === category?.toLocaleLowerCase())
                  .map((items, key) => (
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
          <Box className="flex justify-center items-start sticky top-0 h-fit max-h-screen flex-col overflow-y-hidden gap-4">
            <Box className="flex flex-col w-full gap-2">
              {chair.length > 0 ? <Chair chairs={chair} /> : <FallbackChair />}
            </Box>
            <Suspense
              fallback={<Box className="w-full p-4 animate-pulse bg-muted rounded-lg h-32" />}
            >
              <Box className="w-full h-full ">
                {restaurantId && <OrdersRealtime restaurantId={restaurantId} />}
              </Box>
            </Suspense>
          </Box>
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
    </View>
  );
};

export default DashboardRestaurantSection;
