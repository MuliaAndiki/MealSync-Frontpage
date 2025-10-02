import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import Product from '@/components/products';
import { ProductsData } from '@/configs/components.config';

interface EditsProps {
  isHiden?: any;
}

const EditMenuHeroSection: React.FC<EditsProps> = ({ isHiden }) => {
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
        <Label className="text-2xl font-bold">Edit Menu Makanan</Label>
        <Box className="bg-[#2D1912] w-full rounded-t-2xl flex justify-center items-center p-4">
          <Box className="grid grid-cols-4 grid-rows-1 gap-4 items-center w-full ">
            {ProductsData.map((items, key) => (
              <Product
                key={key}
                data={items}
                hidenRoutes={['/restaurant/dashboard/edit-menu']}
                isHiden={isHiden}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default EditMenuHeroSection;
