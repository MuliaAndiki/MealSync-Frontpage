'use client';
import Box from './ui/box';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { ProductsProps } from '@/types/props';
import { Star } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

interface ProductsPropsV1 {
  onIncrement: () => void;
  onDeccrement: () => void;
}

const Product: React.FC<ProductsProps & ProductsPropsV1> = ({
  data,
  onDeccrement,
  onIncrement,
}) => {
  return (
    <Box className="w-auto h-auto bg-foreground/10 p-4 rounded-lg flex justify-center flex-col items-center border border-foreground/50">
      <Image alt="product" src={data.image} height={200} width={200} />
      <Box className="flex mt-2 gap-1">
        {Array.from({ length: 5 }).map((_, key) => (
          <Star
            key={key}
            size={20}
            className={key < data.rating ? 'text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </Box>
      <Box className="flex justify-center items-center w-full  p-2 gap-4 flex-wrap">
        <Box className="flex justify-center items-center flex-col">
          <Label className="text-lg font-extrabold">{data.title}</Label>
          <Label className="font-light text-xs "> {formatCurrency(data.price)}</Label>
        </Box>
        <Box className="flex justify-between items-center rounded-lg gap-2">
          <Button variant={'destructive'} className="h-7 w-7" onClick={() => onDeccrement()}>
            -
          </Button>
          <Label className="font-bold">{data.count}</Label>
          <Button variant={'outline'} className="h-7 w-7" onClick={() => onIncrement()}>
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
