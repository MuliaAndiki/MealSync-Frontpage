import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import Image from 'next/image';
import { CardProfileData } from '@/configs/components.config';
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
import { ParentModalType, ProductsType } from '@/types/components';
import PopUp from '@/core/components/pop-up';
import { useState } from 'react';

interface DashboardRestaurantProps {
  produtc: ProductsType[];
}

const DashboardRestaurantSection: React.FC<DashboardRestaurantProps> = ({ produtc }) => {
  const data = Array.from({ length: 20 });
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
              {produtc.map((items, key) => (
                <Product
                  data={items}
                  key={key}
                  isOpenModal={isOpenModal}
                  setIsOpenModal={setIsOpenModal}
                />
              ))}
            </Box>
          </Box>
          <Box className="flex justify-center items-start sticky  h-fit max-h-screen">
            <Box className="flex flex-col w-full gap-4">
              {CardProfileData.map((items, key) => (
                <CardProfile key={key} data={items} />
              ))}
              <Box className="bg-[#2D1912] flex justify-center items-center flex-col rounded-lg p-4 ">
                <Label className="text-lg font-bold">Tempat Duduk</Label>
                <Box className="flex justify-evenly items-center w-full text-center flex-col gap-4 ">
                  {Array.from({ length: Math.ceil(data.length / 5) }).map((_, i) => (
                    <Box key={i} className="flex justify-evenly items-center w-full text-center">
                      {data.slice(i * 5, i * 5 + 5).map((_, key) => (
                        <Box key={key} className="flex justify-center items-center w-full">
                          <Box className="w-5 h-5 bg-foreground rounded-xs"></Box>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              </Box>
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
