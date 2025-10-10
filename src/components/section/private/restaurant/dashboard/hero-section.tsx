import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import Image from 'next/image';
import Product from '@/components/products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Label } from '@radix-ui/react-label';
import CardProfile from '@/components/card-profile';
import { CardProfileType, ChairType, ParentModalType, ProductsType } from '@/types/components';
import PopUp from '@/core/components/pop-up';
import { useState } from 'react';
import Chair from '@/components/chair';
import FallbackChair from '@/components/fallback/chair';
import FallbackProduct from '@/components/fallback/product';
import OrdersRealtime from './orders-realtime';

interface DashboardRestaurantProps {
  produtc: ProductsType[];
  chair: ChairType[];
  profile: CardProfileType;
}

const DashboardRestaurantSection: React.FC<DashboardRestaurantProps> = ({
  produtc,
  chair,
  profile,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);
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
              {profile && profile._id && <OrdersRealtime restaurantId={profile._id} />}
            </Box>
          </Box>
        </Box>
      </Box>
      <PopUp isOpen={isOpenModal === 'Form'} onClose={() => setIsOpenModal(null)}>
        <View className="w-f h-full">
          <Box className="flex justify-center items-center">
            <Label>Setup Dashboard</Label>
          </Box>
        </View>
      </PopUp>
    </View>
  );
};

export default DashboardRestaurantSection;
