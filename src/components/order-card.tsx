import { Label } from '@radix-ui/react-label';
import { IconDots } from '@tabler/icons-react';
import Image from 'next/image';

import { ParentModalType } from '@/types/components';
import { OrderCardProps } from '@/types/props';
import { AlertContexType } from '@/types/ui';
import { formatCurrency } from '@/utils/format';
import { camelCaseToWords, getDate, getTime } from '@/utils/string.format';

import Box from './ui/box';
import { Button } from './ui/button';
import Spreed from './ui/spread';

interface OrderCardPropsV2 {
  isPending?: boolean;
  setIsOpenModal?: React.Dispatch<React.SetStateAction<ParentModalType>>;
  alert?: AlertContexType;
  onCancel: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps & OrderCardPropsV2> = ({
  data,
  isPending,
  setIsOpenModal,
  alert,
  onCancel,
}) => {
  return (
    <Box className="w-full border rounded-lg p-3">
      <Box className="w-full  flex justify-between  items-center   ">
        <Box className="flex justify-center items-center gap-2 ">
          <Image
            src="/images/Kopi.jpeg"
            alt="chair"
            width={50}
            height={50}
            className="aspect-square object-cover rounded-lg"
          />
          <Box className="flex justify-center items-start flex-col">
            <Label className="text-lg font-semibold">Pemesanan Makanan</Label>
            <Label className="font-semibold">{getDate(data.createdAt)} </Label>
          </Box>
        </Box>
        <Box className="flex justify-center items-center flex-col">
          <Label className="font-semibold">{camelCaseToWords(data?.status)}</Label>
          <Label className="font-semibold">{getTime(data?.createdAt)}</Label>
        </Box>
      </Box>
      <Spreed orientation="horizontal" className="my-2 overflow-hidden " />
      <Box className="flex justify-between items-center">
        <Box className="flex flex-col justify-center items-start">
          <Label className="font-semibold">Nama </Label>
          {data?.items.map((items, key) => (
            <Label className="font-semibold" key={key}>
              {items.name}
            </Label>
          ))}
        </Box>
        <Box className="flex flex-col justify-center items-start">
          <Label className="font-semibold">Jumlah </Label>
          {data?.items.map((items, key) => (
            <Label key={key} className="font-semibold">
              {items.quantity}
            </Label>
          ))}
        </Box>
        <Box className="flex flex-col justify-center items-center">
          <Label className="font-semibold">Harga </Label>
          {data?.items.map((items, key) => (
            <Label key={key} className="font-semibold">
              {formatCurrency(items.price)}
            </Label>
          ))}
        </Box>
      </Box>
      <Spreed orientation="horizontal" className="my-2 overflow-hidden " />
      <Box className="flex justify-between items-center">
        <Label className="font-semibold">Total :</Label>
        <Label className="font-semibold">{formatCurrency(data?.total)}</Label>
      </Box>
      <Box className="flex justify-between items-center gap-2 overflow-hidden">
        <Button variant={'glass'}>
          <IconDots />
        </Button>
        <Box className="w-full ">
          <Button
            variant={'destructive'}
            className="w-full"
            disabled={isPending}
            onClick={() => {
              alert?.confirm({
                title: 'Warning',
                deskripsi: 'Apakah Anda Yakin Mencancel Orderan Ini?',
                icon: 'warning',
                onConfirm: () => {
                  onCancel(data._id);
                },
                onClose: () => {},
              });
            }}
          >
            {isPending ? 'Tunggu' : 'Batalkan'}
          </Button>
        </Box>

        <Box className="w-full">
          <Button
            variant={'native'}
            className="w-full"
            disabled={isPending}
            onClick={() => setIsOpenModal!('Pay')}
          >
            {isPending ? 'Tunggu' : 'Bayar'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderCard;
