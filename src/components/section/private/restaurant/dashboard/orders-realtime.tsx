'use client';
import { Label } from '@radix-ui/react-label';
import { CheckCircle, Clock, Loader2, UtensilsCrossed, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Box from '@/components/ui/box';
import RestaurantApi from '@/services/restaurant/restaurant.service';
import { getSocket, initSocketConnection, joinRestaurantRoom } from '@/utils/socket.client';

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
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'paid':
        return 'Sudah Dibayar';
      case 'failed':
        return 'Gagal';
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
    <Box className="p-6">
      <div className="mb-6">
        <Label className="text-2xl font-bold">Pesanan Real-Time</Label>
        <p className="text-muted-foreground text-sm mt-1">
          {pendingOrders.length} pesanan menunggu pembayaran
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <UtensilsCrossed className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Belum ada pesanan</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Box
              key={order._id}
              className={`p-4 border-l-4 ${
                order.status === 'pending'
                  ? 'border-l-yellow-500 bg-yellow-50'
                  : order.status === 'paid'
                    ? 'border-l-green-500 bg-green-50'
                    : 'border-l-red-500 bg-red-50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(order.status)}
                    <span className="font-semibold">{getStatusText(order.status)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Meja</p>
                  <p className="text-2xl font-bold">{order.chairNo}</p>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm bg-white p-2 rounded">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-blue-600">{formatPrice(order.total)}</span>
              </div>
            </Box>
          ))}
        </div>
      )}

      {chairUpdates.length > 0 && (
        <div className="mt-6">
          <Label className="text-lg font-semibold mb-2 block">Status Meja</Label>
          <div className="grid grid-cols-4 gap-2">
            {chairUpdates.map((chair) => (
              <div
                key={chair.chairNo}
                className={`p-2 rounded-lg text-center ${
                  chair.status === 'full'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                <p className="font-bold text-lg">Meja {chair.chairNo}</p>
                <p className="text-xs">{chair.status === 'full' ? 'Terisi' : 'Kosong'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Box>
  );
};

export default OrdersRealtime;
