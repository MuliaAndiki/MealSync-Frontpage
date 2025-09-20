import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import Image from 'next/image';
import { ProductsData } from '@/configs/components.config';
import Product from '@/components/products';
const DashboardRestaurantSection = () => {
  return (
    <View>
      <Box className="flex min-h-screen w-full justify-center items-center relative z-0 overflow-x-hidden">
        <Box className="grid grid-cols-[2fr_0.7fr] grid-rows-1 gap-2 w-full  ">
          <Box className="flex justify-center items-center flex-col ">
            <Image
              alt="sss"
              src="/images/banner.svg"
              width={1200}
              height={1200}
              className="rounded-lg"
            />
            {/* Fix */}

            <Box className="grid grid-cols-4 grid-rows-1 gap-4 items-center w-full my-4">
              {ProductsData.map((items, key) => (
                <Product data={items} key={key} />
              ))}
            </Box>
          </Box>
          <Box className="flex justify-center items-center  ">
            <Box className="">aaa</Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default DashboardRestaurantSection;
