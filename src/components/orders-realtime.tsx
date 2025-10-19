import { Label } from '@radix-ui/react-label';
import { CheckCircle, Clock, Loader2, UtensilsCrossed, XCircle } from 'lucide-react';

import Box from '@/components/ui/box';
import { useTranslate } from '@/hooks/useTranslate';
import { OrderType } from '@/types/components';
import { formatCurrency } from '@/utils/format';
import { formatDate } from '@/utils/string.format';

import View from './ui/view';

interface OrdersRealtimeProps {
  orderData: OrderType[];
  chairUpdates: { chairNo: number; status: string }[];
  isLoading: boolean;
}

const OrdersRealtime: React.FC<OrdersRealtimeProps> = ({ orderData, chairUpdates, isLoading }) => {
  const { t } = useTranslate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />;
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t('purchase.status.pending');
      case 'paid':
      case 'completed':
        return t('purchase.status.completed');
      case 'failed':
        return t('purchase.status.failed');
      default:
        return status;
    }
  };

  const pendingOrders = orderData.filter((o) => o.status === 'pending');

  if (isLoading) {
    return (
      <Box className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </Box>
    );
  }

  return (
    <View className="p-6 border rounded-lg bg-card">
      <Box className="mb-6">
        <Label className="text-2xl font-bold">Pesanan Real-Time</Label>
        <p className="text-muted-foreground text-sm mt-1">
          {pendingOrders.length} pesanan menunggu pembayaran
        </p>
      </Box>

      {orderData.length === 0 ? (
        <Box className="text-center py-12">
          <UtensilsCrossed className="w-16 h-16 mx-auto text-muted-foreground opacity-50 mb-4" />
          <p className="text-muted-foreground">{t('fallback.no_orders')}</p>
        </Box>
      ) : (
        <Box className="space-y-4">
          {orderData.map((order) => (
            <Box
              key={order._id}
              className={`p-4 border-l-4 rounded-lg border bg-card ${
                order.status === 'pending'
                  ? 'border-l-yellow-600 dark:border-l-yellow-500'
                  : order.status === 'paid'
                    ? 'border-l-green-600 dark:border-l-green-500'
                    : 'border-l-destructive'
              }`}
            >
              <Box className="flex justify-between items-start mb-3">
                <Box>
                  <Box className="flex items-center gap-2 mb-1">
                    {getStatusIcon(order.status)}
                    <span className="font-semibold">{getStatusText(order.status)}</span>
                  </Box>
                  <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                </Box>
                <Box className="text-right">
                  <p className="text-sm text-muted-foreground">Meja</p>
                  <p className="text-2xl font-bold">{order.chairNo}</p>
                </Box>
              </Box>

              <Box className="space-y-2 mb-3">
                {order.items.map((item, idx) => (
                  <Box key={idx} className="flex justify-between text-sm bg-muted/50 p-2 rounded">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </Box>
                ))}
              </Box>

              <Box className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(order.total)}
                </span>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {chairUpdates.length > 0 && (
        <Box className="mt-6">
          <Label className="text-lg font-semibold mb-2 block">Status Meja</Label>
          <Box className="grid grid-cols-4 gap-2">
            {chairUpdates.map((chair) => (
              <Box
                key={chair.chairNo}
                className={`p-2 rounded-lg text-center border ${
                  chair.status === 'full'
                    ? 'bg-destructive/10 text-destructive border-destructive/20'
                    : 'bg-green-500/10 text-green-700 dark:text-green-500 border-green-500/20'
                }`}
              >
                <p className="font-bold text-lg">Meja {chair.chairNo}</p>
                <p className="text-xs">
                  {chair.status === 'full' ? t('chair.occupied') : t('chair.empty')}
                </p>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </View>
  );
};

export default OrdersRealtime;
