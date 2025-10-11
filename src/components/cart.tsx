import { Label } from '@radix-ui/react-label';
import { IconBell } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CartType } from '@/types/components';
import { formatCurrency } from '@/utils/format';

import CartContent from './cart-content';
import Box from './ui/box';

interface CartProps {
  content?: CartType;
  onDeleteAll?: () => void;
  onDelete?: () => void;
  onOrder?: () => void;
  isPending?: boolean;
  itemCount?: any;
  setSelectId?: React.Dispatch<React.SetStateAction<string | null>>;
  handleUpdate?: any;
}

const Cart: React.FC<CartProps> = ({
  onDelete,
  onDeleteAll,
  onOrder,
  content,
  isPending,
  itemCount,
  setSelectId,
  handleUpdate,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <IconBell className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md cursor-none">
              {itemCount}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] sm:w-[500px] flex flex-col h-full p-0">
        <Box className="p-4 border-b">
          <SheetHeader>
            <SheetTitle className="font-bold">Keranjang</SheetTitle>
            <SheetDescription>Lihat dan ubah pesanan kamu sebelum checkout.</SheetDescription>
          </SheetHeader>
        </Box>

        <Box className="flex-1  overflow-y-auto  ">
          {content && content.items?.length > 0 ? (
            <Box className="w-full ">
              <CartContent
                items={content.items}
                setSeletId={setSelectId!}
                onDelete={onDelete}
                handleUpdate={handleUpdate}
                isPending={isPending}
              />
            </Box>
          ) : (
            <p className="text-center text-sm  mt-6">Keranjang kosong</p>
          )}
        </Box>

        <SheetFooter className="sticky bottom-0 bg-background border-t p-4 flex flex-col gap-2">
          {content && (
            <Box className="flex justify-between text-sm font-semibold mb-2">
              <Label>Total</Label>
              <Label>{formatCurrency(content.total)}</Label>
            </Box>
          )}

          <Button type="submit" variant="native" onClick={onOrder}>
            Pesan
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={() => onDeleteAll && onDeleteAll()}
            disabled={isPending}
          >
            {isPending ? 'Tunggu...' : 'Hapus Semua'}
          </Button>

          <SheetClose asChild>
            <Button variant="outline">Tutup</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
