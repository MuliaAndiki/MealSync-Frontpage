import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import HistoryCard from '@/components/history';
import { HistoryData } from '@/configs/components.config';

const HistoryHeroSection = () => {
  return (
    <View>
      <Box className="flex min-h-screen w-full justify-center items-center relative z-0 overflow-x-hidden flex-col">
        <Image
          alt="bg"
          src="/images/banner.svg"
          width={1800}
          height={1800}
          className="rounded-lg"
        />
        <Box className="absolute w-full max-w-200  flex  top-1/5 bg-foreground/90 rounded-lg  ">
          <Input className="" />
        </Box>
        <Box className="bg-[#2D1912] w-full max-h-full rounded-lg">
          <Box className="flex justify-center items-center flex-col p-2">
            <Label className="text-3xl font-extrabold">Riwayat Pembelian :</Label>
            <Box className="w-full rounded-lg flex-col flex p-4 my-4 ">
              {HistoryData.map((items, key) => (
                <Box key={key} className="my-2 p-1">
                  <HistoryCard data={items} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default HistoryHeroSection;
