import { Label } from '@radix-ui/react-label';
import { IconMail,IconMapPin } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { CardProfileProps } from '@/types/props';

import Vector from './svg/private/vector';
import Box from './ui/box';
import { Button } from './ui/button';

interface CardProfilePropsV1 {
  hidenRoutes?: string[];
  isHiden?: any;
}

const CardProfile: React.FC<CardProfileProps & CardProfilePropsV1> = ({
  data,
  hidenRoutes,
  isHiden,
}) => {
  const path = hidenRoutes?.includes(isHiden);
  return (
    <Box className="w-full bg-[#2D1912] h-auto  rounded-lg relative ">
      <Box className="relative">
        <Image
          alt="restaurant"
          src={data.profile?.pitch}
          width={450}
          height={450}
          className="rounded-lg overflow-hidden"
        />
        <Box className="absolute bottom-0 w-full translate-y-1 ">
          <Vector />
        </Box>
      </Box>

      <Box className="w-35 h-35  absolute flex rounded-full items-center justify-center -translate-y-15 ">
        <Image alt="icon" width={200} height={200} src={data.profile?.logoUrl} />
      </Box>
      {path && (
        <Link href="/restaurant/dashboard/edit-profile">
          <Button variant="glass" className="absolute right-1/12 translate-y-5">
            Manajemnt Profile
          </Button>
        </Link>
      )}
      <Box className="flex justify-center items-center gap-2 mt-15 h-full p-2 flex-col ">
        <Box className="flex justify-between items-center p-2 w-full">
          <Label className="text-lg font-extrabold">{data.name}</Label>

          <Link href="#">
            <Label className="text-lg">QR</Label>
          </Link>
        </Box>
        <Label className="font-light  text-center">{data.profile?.description}</Label>
        <Box className="w-full bg-foreground rounded-lg p-1">
          <Box className="flex justify-start text-background items-center">
            <IconMapPin className="text-[var(--label)]" stroke={2} size={40} />
            <Label className="text-[var(--label)]">{data.profile?.address}</Label>
          </Box>
        </Box>
        <Box className="w-full bg-foreground rounded-lg p-1">
          <Box className="flex justify-start text-background items-center gap-4">
            <IconMail stroke={2} size={30} className="text-[var(--label)]" />
            <Label className="text-[var(--label)]">{data.email}</Label>
          </Box>
        </Box>
        {/* Certi */}
        {/* <Box className="flex justify-between items-center gap-4">
          <Image alt="label" src={data.image.label1} width={90} height={90} />
          <Image alt="label" src={data.image.label2} width={90} height={90} />
          <Image alt="label" src={data.image.label3} width={90} height={90} />
        </Box> */}
      </Box>
    </Box>
  );
};

export default CardProfile;
