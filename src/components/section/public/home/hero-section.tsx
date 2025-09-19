import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import View from '@/components/ui/view';
import { Label } from '@radix-ui/react-dropdown-menu';
import { IconPhone } from '@tabler/icons-react';

const HeroSection = () => {
  return (
    <View>
      <Box className="flex min-h-screen justify-center items-center relative z-0 overflow-x-hidden ">
        <Box className="grid grid-cols-[3fr_1fr] grid-rows-1 w-full ">
          <Box className="flex justify-center items-center flex-col">
            <Box className=" w-full max-w-180 ">
              <Label className="text-8xl font-bold text-start">
                Fresh Foods <span className="font-light">with</span> Great taste
              </Label>
              <Label className="font-light text-lg">
                Whether you’re here for a casual lunch, a romantic dinner, or a celebration,
                Baristra’s warm and attentive service promises to make your visit delightful. Enjoy
                the charm of our modern, stylish interior.
              </Label>
              <Button className="flex gap-2 my-2 h-auto w-auto" variant="glass">
                <IconPhone size={40} />
                <Label className="font-light ">Call or Book</Label>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default HeroSection;
