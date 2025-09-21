import Nasgor from '@/components/svg/home/nasgor';
import Box from '@/components/ui/box';
import { SosmedData } from '@/configs/components.config';
import { Label } from '@radix-ui/react-label';
import View from '@/components/ui/view';
import Image from 'next/image';
import { MobileProps } from '@/types/hooks';

const AboutSection = () => {
  return (
    <View className="relative min-h-screen flex flex-col overflow-hidden">
      <Box className="absolute inset-0 -z-10 overflow-hidden">
        <Image alt="bg-about" src="/images/about.svg" fill className="object-cover" priority />
      </Box>
      <Box className="absolute z-[-5] inset-x-0 size-130 bottom-0 left-20 ">
        <Nasgor />
      </Box>

      <Box className="grid lg:grid-cols-2 gap-4 h-screen">
        <Box className="flex justify-center  items-center " />
        <Box className="flex justify-center items-center bg-background/85 flex-col p-4">
          <Image alt="icon" src="/favicon/logo.svg" width={350} height={350} />
          <Label className="w-full max-w-[300px] text-center font-light">
            Welcome to Brastra, where the essence of traditional flavors meets modern culinary
            artistry. Our journey began with a simple vision: to create a dining experience that
            brings people together over delicious, carefully crafted dishes inspired by our roots
            and local ingredients. At Brastra, we believe in honoring heritage while embracing
            innovation, resulting in a menu that celebrates both classic favorites and unique,
            original creations.
          </Label>

          <Box className="flex justify-end items-end flex-col w-full mt-10 gap-2">
            {SosmedData.map((items, key) => (
              <Box key={key} className="flex text-end w-full  items-end justify-end gap-2">
                <Label className="font-light">{items.value}</Label>
                <items.icon />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default AboutSection;
