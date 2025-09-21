import View from '@/components/ui/view';
import Box from '@/components/ui/box';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { IconChevronRight } from '@tabler/icons-react';
import { CategoryData } from '@/configs/components.config';
import Product from '@/components/products';
import { ProductsData } from '@/configs/components.config';
const MenuHeroSection = () => {
  return (
    <View>
      <Box className="flex min-h-screen w-full justify-center items-center relative z-0 overflow-x-hidden">
        <Box className="flex justify-center items-center flex-col ">
          <Image
            alt="sss"
            src="/images/banner.svg"
            width={1200}
            height={1200}
            className="rounded-lg"
          />
          <Box className="flex justify-between items-center w-full my-2">
            <Label className="text-3xl font-bold">Category</Label>
            <Button variant="glass" className="flex gap-2 items-center justify-center">
              View All
              <IconChevronRight />
            </Button>
          </Box>
          <Box className="flex justify-between items-center w-full">
            {CategoryData.map((items, key) => (
              <Box
                key={key}
                className="  p-2 bg-amber-800 rounded-lg flex justify-center items-center"
              >
                <items.image />
              </Box>
            ))}
          </Box>

          <Box className="grid grid-cols-4 grid-rows-1 gap-4  items-center w-full my-4">
            {ProductsData.map((items, key) => (
              <Product data={items} key={key} />
            ))}
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default MenuHeroSection;
