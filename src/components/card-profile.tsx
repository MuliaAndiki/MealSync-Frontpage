import Image from 'next/image';
import Box from './ui/box';
import Vector from './svg/private/vector';
import { Label } from '@radix-ui/react-label';
import { IconMapPin, IconPhone } from '@tabler/icons-react';
import { CardProfileProps } from '@/types/props';
const CardProfile: React.FC<CardProfileProps> = ({ data }) => {
  return (
    <Box className="w-full bg-[#2D1912] h-auto  rounded-lg relative border">
      <Image
        alt="restaurant"
        src={data.banner}
        width={300}
        height={300}
        className="rounded-lg overflow-hidden"
      />
      <Box className="absolute top-25">
        <Vector />
      </Box>
      <Box className="w-35 h-35  absolute flex rounded-full items-center justify-center -translate-y-15 ">
        <Image alt="icon" width={200} height={200} src={data.logo} />
      </Box>
      <Box className="flex justify-center items-center gap-2 mt-25 h-full p-2 flex-col">
        <Label className="font-light  text-center">{data.desc}</Label>
        <Box className="w-full bg-foreground rounded-lg p-1">
          <Box className="flex justify-center text-background items-center gap-4">
            <IconMapPin className="text-[var(--label)]" stroke={2} size={40} />
            <Label className="text-[var(--label)]">{data.lokasi}</Label>
          </Box>
        </Box>
        <Box className="w-full bg-foreground rounded-lg p-1">
          <Box className="flex justify-start text-background items-center gap-4">
            <IconPhone stroke={2} size={30} className="text-[var(--label)]" />
            <Label className="text-[var(--label)]">{data.phone}</Label>
          </Box>
        </Box>
        <Box className="flex justify-between items-center gap-4">
          <Image alt="label" src={data.image.label1} width={90} height={90} />
          <Image alt="label" src={data.image.label2} width={90} height={90} />
          <Image alt="label" src={data.image.label3} width={90} height={90} />
        </Box>
      </Box>
    </Box>
  );
};

export default CardProfile;
