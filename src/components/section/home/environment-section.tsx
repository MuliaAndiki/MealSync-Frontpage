import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { SponsorData } from '@/configs/components.config';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';

const EnvironmentSection = () => {
  return (
    <View>
      <Box className="flex min-h-screen justify-center items-center relative z-0 overflow-hidden ">
        <Box className="absolute z-[-5] right-0 top-0">
          <Image alt="Bumbu" src="/images/bumbuv1.svg" width={600} height={600} />
        </Box>
        <Box className="flex justify-center items-center flex-col w-full">
          <Label className="text-3xl font-extrabold">Our Special Environment</Label>
          <Label className="text-red-700 text-2xl font-bold ">Feast your eyes</Label>
          <Box className="grid grid-cols-2 grid-rows-1 w-full mt-6  ">
            <Box className="flex justify-center items-center flex-col">
              <Image alt="chef" src="/images/chef.svg" width={1000} height={1000} />
            </Box>
            <Box className="flex justify-center items-center flex-col p-4  bg-foreground/10 rounded-3xl">
              {SponsorData.map((items, key) => (
                <Box
                  key={key}
                  className=" w-full flex justify-between items-center flex-col h-full"
                >
                  <Box className="flex w-full flex-col items-center">
                    <Image alt="Sponsor" src={items.image} width={150} height={150} />
                    <Label className="text-2xl font-extrabold">{items.title}</Label>
                    <Label className="text-lg font-light w-full max-w-70 text-center">
                      {items.desc}
                    </Label>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default EnvironmentSection;
