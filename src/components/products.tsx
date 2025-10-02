import Box from './ui/box';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { ProductsProps } from '@/types/props';
import { Star } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
interface ProductsPropsV1 {
  onIncrement?: () => void;
  onDeccrement?: () => void;
  hidenRoutes?: string[];
  isHiden?: any;
}

const Product: React.FC<ProductsProps & ProductsPropsV1> = ({
  data,
  onDeccrement,
  onIncrement,
  hidenRoutes,
  isHiden,
}) => {
  const path = hidenRoutes?.includes(isHiden);
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
      <Box className="flex justify-center items-center w-full flex-col  p-2 gap-4">
        <Box className="flex justify-center items-center flex-col  text-center">
          <Label className="text-sm font-extrabold text-nowrap text-[var(--label)]">
            {data.title}
          </Label>
          <Label className="font-light text-xs text-[var(--label)]">
            {formatCurrency(data.price)}
          </Label>
        </Box>
        {!path ? (
          <Box className="flex justify-between items-center rounded-lg gap-2">
            <Button variant={'destructive'} className="h-7 w-7" onClick={() => onDeccrement!()}>
              -
            </Button>
            <Label className="font-bold text-[var(--labelhi)]">{data.count}</Label>
            <Button variant={'native'} className="h-7 w-7" onClick={() => onIncrement!()}>
              +
            </Button>
          </Box>
        ) : (
          <Button className="w-full" variant={'native'}>
            Edits
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Product;
