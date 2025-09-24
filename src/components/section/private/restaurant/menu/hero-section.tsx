import View from '@/components/ui/view';
import Box from '@/components/ui/box';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import Product from '@/components/products';
import { Input } from '@/components/ui/input';
import { ProductsType } from '@/types/components';
interface MenuProps {
  category: 'Makanan' | 'Minuman';
  setCategory: React.Dispatch<React.SetStateAction<'Makanan' | 'Minuman'>>;
  products: ProductsType[];
  onIncrement: (key: number) => void;
  onDeccrement: (key: number) => void;
}
const MenuHeroSection: React.FC<MenuProps> = ({
  category,
  setCategory,
  onDeccrement,
  onIncrement,
  products,
}) => {
  return (
    <View>
      <Box className="flex min-h-screen w-full justify-center items-center relative z-0 overflow-x-hidden">
        <Box className="flex justify-center items-center flex-col ">
          <Image
            alt="bg"
            src="/images/banner.svg"
            width={1200}
            height={1200}
            className="rounded-lg "
          />
          <Box className="absolute w-full max-w-200 top-1/5 bg-foreground/90 rounded-lg ">
            <Input className="" />
          </Box>
          <Box className="w-full bg-[#2D1912] rounded-lg p-1">
            <Box className="flex justify-between items-center w-full my-2">
              <Label className="text-3xl font-bold">Category :</Label>
            </Box>
            <Box className="flex justify-center items-center w-full gap-4">
              <Button
                onClick={() => setCategory('Makanan')}
                variant={'glass'}
                className="font-bold"
              >
                Makanan
              </Button>
              <Button
                onClick={() => setCategory('Minuman')}
                variant={'glass'}
                className="font-bold"
              >
                Minuman
              </Button>
            </Box>

            <Box className="grid grid-cols-4 grid-rows-1 gap-4  items-center w-full my-4">
              {products
                .filter((item) => item.category.toLowerCase() === category.toLowerCase())
                .map((items, key) => (
                  <Product
                    data={items}
                    key={key}
                    onDeccrement={() => onDeccrement(key)}
                    onIncrement={() => onIncrement(key)}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default MenuHeroSection;
