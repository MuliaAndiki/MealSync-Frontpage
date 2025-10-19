import { Label } from '@radix-ui/react-label';
import { IconCreditCard } from '@tabler/icons-react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/dispatch/dispatch';
import { usePaymentMutation } from '@/hooks/mutation/payment/mutation';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { useSnapPayment } from '@/hooks/useSnapPayment';
import { clearPendingPayment, setPendingPayment } from '@/stores/paymentSlice/paymentSlice';
import { RootState } from '@/stores/store';

import Box from './ui/box';
import { Button } from './ui/button';
import View from './ui/view';

interface PaymentSnapProps {
  orderId: string;
  onClose: () => void;
}

const PaymentSnap: React.FC<PaymentSnapProps> = ({ orderId, onClose }) => {
  const { openSnap, isSnapReady } = useSnapPayment();
  const { alert, queryClient } = useAppNameSpase();
  const dispatch = useAppDispatch();

  const pendingPayment = useAppSelector((state) => state.payment.pendingPayment);
  const snapToken = pendingPayment?.orderId === orderId ? pendingPayment.snapToken : null;

  const payment = usePaymentMutation({
    onSnapToken: (token) => {
      dispatch(setPendingPayment({ orderId, snapToken: token }));
      openSnapWithHandler(token);
    },
    onAfterSucces: () => {
      dispatch(clearPendingPayment());
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      onClose();
    },
  });

  const openSnapWithHandler = (token: string) => {
    openSnap(token, {
      onSuccess: () => {
        dispatch(clearPendingPayment());
        alert.toast({
          title: 'Berhasil',
          message: 'Pembayaran Berhasil',
          icon: 'success',
          onVoid: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            onClose();
          },
        });
      },
      onPending: () => {
        alert.toast({
          title: 'Pending',
          message: 'Pembayaran Sedang Diproses',
          icon: 'warning',
          onVoid: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            onClose();
          },
        });
      },
      onError: () => {
        alert.toast({
          title: 'Error',
          message: 'Pembayaran Gagal',
          icon: 'error',
        });
      },
      onClose: () => {
        onClose();
      },
    });
  };

  useEffect(() => {
    if (isSnapReady && snapToken) {
      openSnapWithHandler(snapToken);
    }
  }, [isSnapReady]);

  const handlePayment = () => {
    if (!isSnapReady) {
      alert.toast({
        title: 'Error',
        message: 'Snap belum siap, tunggu sebentar',
        icon: 'error',
      });
      return;
    }

    if (snapToken) {
      openSnapWithHandler(snapToken);
      return;
    }

    payment.mutate(orderId);
  };

  return (
    <View className="w-full h-full">
      <Box className="flex flex-col justify-center items-center gap-4 p-4">
        <Box className="flex flex-col items-center gap-2">
          <IconCreditCard size={48} className="text-primary" />
          <Label className="text-2xl font-bold">Pembayaran</Label>
          <Label className="text-muted-foreground text-center">
            {snapToken
              ? 'Pembayaran sebelumnya ditemukan. Klik untuk melanjutkan.'
              : 'Klik tombol di bawah untuk melanjutkan pembayaran'}
          </Label>
        </Box>

        <Box className="flex gap-2 w-full mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={payment.isPending}
          >
            Batal
          </Button>
          <Button
            variant="native"
            className="flex-1"
            onClick={handlePayment}
            disabled={payment.isPending || !isSnapReady}
          >
            {payment.isPending
              ? 'Memproses...'
              : snapToken
                ? 'Lanjutkan Pembayaran'
                : 'Bayar Sekarang'}
          </Button>
        </Box>
      </Box>
    </View>
  );
};

export default PaymentSnap;
