import { Label } from '@radix-ui/react-label';

import Chairs from '@/components/chair';
import FallbackChair from '@/components/fallback/chair';
import Product from '@/components/products';
import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { ChairType, ProductsType, UniqueUrlProfileType } from '@/types/components';
interface RestaurantOrderProps {
  profileUnique: UniqueUrlProfileType;
  Products: ProductsType[];
  chairs: ChairType[];
}

const RestaurantOrderSection: React.FC<RestaurantOrderProps> = ({
  profileUnique,
  Products,
  chairs,
}) => {
  return (
    <View>
      <Box className="w-full min-h-screen flex flex-col">
        <Label className="text-2xl font-bold">{profileUnique.restaurant?.name}</Label>
        <Box className="grid lg:grid-cols-[2fr_1fr] grid-rows-1  ">
          <Box className="grid lg:grid-cols-4 grid-rows-1 gap-4">
            {Products?.map((items, key) => (
              <Product data={items} key={key} />
            ))}
          </Box>
          <Box className="w-full h-full">
            {chairs.length > 0 ? <Chairs chairs={chairs} /> : <FallbackChair />}
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default RestaurantOrderSection;
