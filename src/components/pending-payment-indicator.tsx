import { IconAlertCircle } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

import { RootState } from '@/stores/store';

import Box from './ui/box';
import { Button } from './ui/button';

interface PendingPaymentIndicatorProps {
  onResume: (orderId: string) => void;
}

const PendingPaymentIndicator: React.FC<PendingPaymentIndicatorProps> = ({ onResume }) => {
  const pendingPayment = useSelector((state: RootState) => state.payment.pendingPayment);

  if (!pendingPayment) return null;

  const isExpired = Date.now() - pendingPayment.timestamp > 24 * 60 * 60 * 1000;
  if (isExpired) return null;

  return (
    <Box className="mb-4 border border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4">
      <Box className="flex items-center gap-3">
        <IconAlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
        <Box className="flex-1">
          <p className="font-semibold text-yellow-800 dark:text-yellow-300">Pembayaran Tertunda</p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Anda memiliki pembayaran yang belum selesai. Klik untuk melanjutkan.
          </p>
        </Box>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onResume(pendingPayment.orderId)}
          className="border-yellow-500 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-600 dark:text-yellow-300 dark:hover:bg-yellow-900/20"
        >
          Lanjutkan Pembayaran
        </Button>
      </Box>
    </Box>
  );
};

export default PendingPaymentIndicator;
