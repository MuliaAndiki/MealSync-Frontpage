import Box from './ui/box';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { Star } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { HistoryProps } from '@/types/props';

const HistoryCard: React.FC<HistoryProps> = ({ data }) => {
  return (
    <Box className="flex justify-between items-center ">
      <Box className="flex gap-2 ">
        <Image alt="food" src={data.image} width={200} height={200} className="rounded-lg" />
        <Box className="flex justify-evenly items-start flex-col ">
          <Label className="text-3xl font-bold">{data.title}</Label>
          <Label className="text-lg font-bold">{formatCurrency(data.price)}</Label>
          <Box className="flex">
            {Array.from({ length: 5 }).map((_, key) => (
              <Star
                key={key}
                size={20}
                className={key < data.rating ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box className="flex flex-col">
        <Box className="flex justify-center items-end flex-col">
          <Label className="text-2xl font-bold">{data.date}</Label>
          <Label className="text-lg font-bold">{data.time}</Label>
          <Box className="flex p-2 rounded-lg border">
            <Label>Total:{formatCurrency(data.totalprice)}</Label>
          </Box>
          <Box className="flex">
            <Label>{data.status}</Label>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryCard;
