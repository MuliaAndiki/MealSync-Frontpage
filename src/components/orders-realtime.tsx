'use client';
import { Label } from '@radix-ui/react-label';
import { CheckCircle, Clock, Loader2, UtensilsCrossed, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Box from '@/components/ui/box';
import { useTranslate } from '@/hooks/useTranslate';
import RestaurantApi from '@/services/restaurant/restaurant.service';
import { getSocket, initSocketConnection, joinRestaurantRoom } from '@/utils/socket.client';

import View from './ui/view';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'failed';
  chairNo: number;
  createdAt: string;
}

interface OrdersRealtimeProps {
  restaurantId: string;
}

const OrdersRealtime: React.FC<OrdersRealtimeProps> = ({ restaurantId }) => {
  const { t } = useTranslate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [chairUpdates, setChairUpdates] = useState<{ chairNo: number; status: string }[]>([]);

  useEffect(() => {
    if (restaurantId) {
      fetchOrders();
      setupSocket();
    }

    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off('order:new');
        socket.off('chair:update');
      }
    };
  }, [restaurantId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await RestaurantApi.GetOrder();
      if (response && response.data) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Gagal memuat pesanan');
    } finally {
      setLoading(false);
    }
  };

  const setupSocket = () => {
    const socket = initSocketConnection();

    if (socket && restaurantId) {
      joinRestaurantRoom(restaurantId);

      socket.on('order:new', (data: { order: Order }) => {
        console.log('New order received:', data.order);
        setOrders((prev) => [data.order, ...prev]);
        toast.success(`Pesanan baru dari meja ${data.order.chairNo}!`, {
          duration: 5000,
          icon: '🔔',
        });
      });

      socket.on('chair:update', (data: { chairNo: number; status: string }) => {
        console.log('Chair update:', data);
        setChairUpdates((prev) => {
          const existing = prev.find((c) => c.chairNo === data.chairNo);
          if (existing) {
            return prev.map((c) =>
              c.chairNo === data.chairNo ? { ...c, status: data.status } : c
            );
          }
          return [...prev, data];
        });
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

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

  const pendingOrders = orders.filter((o) => o.status === 'pending');

  if (loading) {
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

      {orders.length === 0 ? (
        <Box className="text-center py-12">
          <UtensilsCrossed className="w-16 h-16 mx-auto text-muted-foreground opacity-50 mb-4" />
          <p className="text-muted-foreground">{t('fallback.no_orders')}</p>
        </Box>
      ) : (
        <Box className="space-y-4">
          {orders.map((order) => (
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
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </Box>
                ))}
              </Box>

              <Box className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">{formatPrice(order.total)}</span>
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
