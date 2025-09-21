import Phone from '@/components/svg/home/phone';
import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import { MobileProps } from '@/types/hooks';

const EventsSection: React.FC<MobileProps> = ({ isMobile }) => {
  return (
    <View className="relative min-h-screen flex flex-col justify-center">
      <Box className="absolute inset-0 -z-10 overflow-hidden">
        <Image alt="bg-about" src="/images/events.svg" fill className="object-cover" priority />
      </Box>
      <Box className="flex justify-center items-center h-screen w-full  ">
        <Box className="bg-black h-full w-full max-h-[400px]">
          <Box className="grid lg:grid-cols-[2fr_1fr] lg:grid-rows-1 w-full h-full">
            <Box className="flex justify-center items-center w-full ">
              <Box className="flex justify-center items-start w-full  flex-col lg:max-w-[500px]">
                <Label className="text-red-800 font-bold text-center w-full lg:text-start  text-2xl lg:text-3xl  ">
                  Discount
                </Label>
                <Label className=" text-2xl lg:text-4xl text-center lg:text-start w-full font-extrabold">
                  Upcoming Events
                </Label>
                <Label className="font-light text-center lg:text-start">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                  velit interdum, ac aliquet odio mattis.
                </Label>
              </Box>
            </Box>

            <Box className=" flex justify-center items-center w-full">
              <Phone />
            </Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default EventsSection;
