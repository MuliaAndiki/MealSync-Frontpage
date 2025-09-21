import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import View from '@/components/ui/view';
import { RestaurantCardData } from '@/configs/components.config';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import { MobileProps } from '@/types/hooks';

const RestaurantSection: React.FC<MobileProps> = ({ isMobile }) => {
  return (
    <View>
      <Box className="flex min-h-screen justify-center items-center relative z-0 overflow-hidden flex-col ">
        {!isMobile && (
          <Box className="absolute z-[-5] left-0 ">
            <Image alt="Bumbu" src="/images/bumbu.svg" width={800} height={800} />
          </Box>
        )}

        <Box className="lg:absolute z-[-5] top-0 lg:right-0 lg:top-0 ">
          <Image
            alt="Bumbu"
            src="/favicon/logo.svg"
            width={isMobile ? 350 : 400}
            height={isMobile ? 350 : 400}
          />
        </Box>
        <Box className="flex justify-center items-center flex-col w-full p-6 ">
          <Label className="text-4xl font-bold text-red-600">Slice of Heaven</Label>
          <Label className="text-4xl font-bold mt-4 text-center ">
            Essence of Traditional Flavors
          </Label>
          <Box className="flex  justify-center lg:justify-between items-center gap-4 w-full bg-foreground/20 p-4 rounded-lg my-4 flex-wrap lg:flex-nowrap ">
            {RestaurantCardData.slice(0, 4).map((items, key) => (
              <Box key={key} className="flex justify-center items-center flex-col p-4 ">
                <Box className="flex justify-center items-center flex-col bg-black p-4 rounded-lg">
                  <Image
                    alt="restaurant"
                    src={items.image}
                    width={230}
                    height={230}
                    className="rounded-lg"
                  />
                  <Label className="text-lg font-bold">{items.title}</Label>
                  <Button variant="destructive" className="font-extrabold text-lg">
                    {items.button}
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default RestaurantSection;
