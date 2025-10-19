import { Label } from '@radix-ui/react-label';
import { IconClockHour7, IconDots } from '@tabler/icons-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  curentRole?: any;
}

const OrderCard: React.FC<OrderCardProps & OrderCardPropsV2> = ({
  data,
  isPending,
  setIsOpenModal,
  alert,
  onCancel,
  curentRole,
}) => {
  return (
    <Box className="w-full border rounded-lg p-3">
      <Box className="w-full  flex justify-between  items-center   ">
        <Box className="flex justify-center items-center gap-2 ">
          <Box className="w-auto px-3 py-2 bg-[#5B9844] rounded-lg">
            <p>{data.chairNo}</p>
          </Box>
          <Box className="flex justify-center items-start flex-col">
            <Label className="text-lg font-semibold">Pemesanan Makanan</Label>
            <Label className="font-semibold">{getDate(data.createdAt)} </Label>
          </Box>
        </Box>
        <Box className="flex justify-center items-center flex-col">
          <Label
            className={`font-semibold p-2 rounded-lg flex ${data.status === 'pending' ? 'bg-yellow-500' : data.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            <IconClockHour7 />
            {camelCaseToWords(data?.status)}
          </Label>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <IconDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <Link
                href={
                  curentRole === 'restaurant'
                    ? `/restaurant/dashboard/order/detail/${data._id}`
                    : `/user/dashboard/order/detail/${data._id}`
                }
              >
                <DropdownMenuItem className=" font-bold">Lihat Details</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
