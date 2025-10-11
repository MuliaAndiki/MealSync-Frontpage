import { Label } from '@radix-ui/react-label';
import { IconDots } from '@tabler/icons-react';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CartType } from '@/types/components';
import { formatCurrency } from '@/utils/format';
import { camelCaseToWords } from '@/utils/string.format';

import Box from './ui/box';
import View from './ui/view';

interface CartContentProps {
  items: CartType['items'];
  setSeletId: React.Dispatch<React.SetStateAction<string | null>>;
  onDelete?: () => void;
  handleUpdate?: (_id: string, newQuantity: number) => void;
  isPending?: boolean;
}

const CartContent: React.FC<CartContentProps> = ({
  items,
  setSeletId,
  onDelete,
  isPending,
  handleUpdate,
}) => {
  return (
    <View className="w-full h-full p-4 flex flex-col gap-4">
      {items.map((item) => (
        <Box
          key={item._id}
          className="bg-neutral-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
        >
          <Box className="flex items-center gap-4 p-4">
            <Image
              src={item.product.pictProduct}
              alt={item.product.name}
              width={90}
              height={90}
              className="rounded-lg aspect-square object-cover border"
            />

            <Box className="flex flex-col justify-between flex-1 h-full">
              <Box>
                <Label className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
                  {item.product.name}
                </Label>
                <Label className="block text-xs text-neutral-500 dark:text-neutral-400">
                  {item.product.description}
                </Label>
              </Box>

              <Label className="text-lg font-bold text-primary mt-2">
                {formatCurrency(item.subtotal)}
              </Label>

              <Label className="text-base font-semibold">
                {camelCaseToWords(item.product.category)}
              </Label>
            </Box>

            <Box className="flex flex-col justify-end items-end gap-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <IconDots />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuGroup
                    onClick={() => {
                      setSeletId(item.product._id);
                    }}
                  >
                    <DropdownMenuItem
                      className="text-destructive font-bold"
                      onClick={() => onDelete!()}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Box className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  disabled={isPending}
                  onClick={() => handleUpdate?.(item.product._id, item.quantity - 1)}
                >
                  {isPending ? '...' : <Minus size={14} />}
                </Button>
                <Label className="text-xs font-semibold w-5 text-center">{item.quantity}</Label>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  disabled={isPending}
                  onClick={() => handleUpdate?.(item.product._id, item.quantity + 1)}
                >
                  {isPending ? '....' : <Plus size={14} />}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </View>
  );
};

export default CartContent;
