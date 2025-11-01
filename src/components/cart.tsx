import { Label } from '@radix-ui/react-label';
import { IconBell, IconX } from '@tabler/icons-react';

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
import PopUp from '@/core/components/pop-up';
import { CartType, ChairType, ParentModalType } from '@/types/components';
import { FormCreateOrder } from '@/types/form';
import { formatCurrency } from '@/utils/format';

import CartContent from './cart-content';
import Chairs from './chair';
import FallbackCart from './fallback/cart';
import FallbackChair from './fallback/chair';
import Box from './ui/box';
import { Input } from './ui/input';
import View from './ui/view';

interface CartProps {
  chairs: ChairType[];
  content?: CartType;
  onDeleteAll?: () => void;
  onDelete?: () => void;
  onOrder?: () => void;
  isPending?: boolean;
  itemCount?: any;
  setSelectId?: React.Dispatch<React.SetStateAction<string | null>>;
  handleUpdate?: any;
  isOpenModal?: ParentModalType;
  setIsOpenModal?: React.Dispatch<React.SetStateAction<ParentModalType>>;
  formCreateOrder?: FormCreateOrder;
  setFormCreateOrder?: React.Dispatch<React.SetStateAction<FormCreateOrder>>;
}

const Cart: React.FC<CartProps> = ({
  onDelete,
  onDeleteAll,
  onOrder,
  content,
  isPending,
  itemCount,
  chairs,
  setSelectId,
  formCreateOrder,
  setFormCreateOrder,
  isOpenModal,
  setIsOpenModal,
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

        <Box className="flex-1  overflow-y-auto p-2 ">
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
            <FallbackCart />
          )}
        </Box>

        <SheetFooter className="sticky bottom-0 bg-background border-t p-4 flex flex-col gap-2">
          {content && (
            <Box className="flex justify-between text-sm font-semibold mb-2">
              <Label>Total</Label>
              <Label>{formatCurrency(content.total)}</Label>
            </Box>
          )}

          {/* Ilmu */}
          <Button
            type="submit"
            variant="native"
            onClick={() => {
              setFormCreateOrder!((prev) => ({
                ...prev,
                items:
                  content?.items.map((item) => ({
                    productId: item.product._id,
                    quantity: item.quantity,
                  })) || [],
              }));
              setIsOpenModal!('Order');
            }}
          >
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

        <PopUp isOpen={isOpenModal === 'Order'} onClose={() => setIsOpenModal!(null)}>
          <View className="w-full h-full">
            <Box className="flex justify-center items-center flex-col">
              <Box className="w-full flex justify-between items-center p-2">
                <Label className="text-lg font-bold">Order :</Label>
                <IconX size={20} onClick={() => setIsOpenModal!(null)} />
              </Box>
              <Box className="grid lg:grid-cols-2 grid-rows-1 w-full gap-2">
                {chairs.length > 0 ? <Chairs chairs={chairs} /> : <FallbackChair />}
                <div className="flex justify-start items-start w-full flex-col">
                  <Label className="text-lg font-bold">Nomor Kursi :</Label>
                  <Input
                    value={formCreateOrder?.chairNo}
                    onChange={(e) =>
                      setFormCreateOrder!((prev) => {
                        const newObj = { ...prev, chairNo: Number(e.target.value) };
                        return newObj;
                      })
                    }
                  />

                  <Button
                    className="w-full my-2"
                    variant={'native'}
                    onClick={() => onOrder!()}
                    disabled={isPending}
                  >
                    {isPending ? 'tunggu..' : 'Order'}
                  </Button>
                </div>
              </Box>
            </Box>
          </View>
        </PopUp>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
