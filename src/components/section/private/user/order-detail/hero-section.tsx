'use client';
import { IconCalendar, IconChefHat,IconClock, IconCreditCard, IconMapPin, IconReceipt } from '@tabler/icons-react';
import { format } from 'date-fns';
import { ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import View from '@/components/ui/view';
import { useTranslate } from '@/hooks/useTranslate';

interface OrderDetailProps {
  order?: any;
}

const OrderDetailHeroSection: React.FC<OrderDetailProps> = ({ order }) => {
  const router = useRouter();
  const { t } = useTranslate();

  if (!order) {
    return (
      <View>
        <Box className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
          <XCircle size={64} className="text-muted-foreground opacity-50" />
          <p className="text-lg text-muted-foreground">Order not found</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </Box>
      </View>
    );
  }

  const statusVariant: Record<string, any> = {
    pending: 'secondary',
    completed: 'default',
    paid: 'default',
    failed: 'destructive',
    cancelled: 'destructive',
  };

  const statusIcon: Record<string, any> = {
    pending: <Clock className="w-5 h-5" />,
    completed: <CheckCircle className="w-5 h-5" />,
    paid: <CheckCircle className="w-5 h-5" />,
    failed: <XCircle className="w-5 h-5" />,
    cancelled: <XCircle className="w-5 h-5" />,
  };

  return (
    <View>
      <Box className="w-full min-h-screen py-6 px-4 sm:px-0">
        {/* Header */}
        <Box className="mb-6">
          <Button onClick={() => router.back()} variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Box className="flex items-start justify-between">
            <Box>
              <h1 className="text-2xl sm:text-3xl font-bold">Order Details</h1>
              <p className="text-muted-foreground">Order #{order.orderId?.slice(-8) || order._id?.slice(-8)}</p>
            </Box>
            <Badge variant={statusVariant[order.status]} className="flex items-center gap-2">
              {statusIcon[order.status]}
              {order.status}
            </Badge>
          </Box>
        </Box>

        <Box className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <Box className="lg:col-span-2 space-y-6">
            {/* Order Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconReceipt size={20} className="text-primary" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Box className="grid sm:grid-cols-2 gap-4">
                  <Box className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <IconCalendar size={16} />
                      Date
                    </p>
                    <p className="font-medium">
                      {order.createdAt ? format(new Date(order.createdAt), 'dd MMM yyyy') : 'N/A'}
                    </p>
                  </Box>
                  <Box className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <IconClock size={16} />
                      Time
                    </p>
                    <p className="font-medium">
                      {order.createdAt ? format(new Date(order.createdAt), 'HH:mm') : 'N/A'}
                    </p>
                  </Box>
                </Box>

                {order.chairNo && (
                  <Box className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <IconMapPin size={16} />
                      Table Number
                    </p>
                    <p className="font-medium text-lg">Table #{order.chairNo}</p>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Items Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconChefHat size={20} className="text-primary" />
                  Order Items
                </CardTitle>
                <CardDescription>
                  {order.items?.length || 0} item(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-3">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item: any, idx: number) => (
                      <Box key={idx}>
                        <Box className="flex justify-between items-start">
                          <Box className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} x Rp {item.price?.toLocaleString('id-ID')}
                            </p>
                          </Box>
                          <p className="font-semibold">
                            Rp {(item.quantity * item.price)?.toLocaleString('id-ID')}
                          </p>
                        </Box>
                        {idx < order.items.length - 1 && <Separator className="mt-3" />}
                      </Box>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No items</p>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Summary */}
          <Box className="space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Box className="space-y-2">
                  <Box className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Rp {order.total?.toLocaleString('id-ID')}</span>
                  </Box>
                  <Separator />
                  <Box className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">Rp {order.total?.toLocaleString('id-ID')}</span>
                  </Box>
                </Box>

                {order.paymentMethod && (
                  <>
                    <Separator />
                    <Box className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <IconCreditCard size={16} />
                        Payment Method
                      </p>
                      <p className="font-medium">{order.paymentMethod}</p>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Restaurant Info (if available) */}
            {order.restaurant && (
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{order.restaurant.name}</p>
                  {order.restaurant.address && (
                    <p className="text-sm text-muted-foreground mt-1">{order.restaurant.address}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default OrderDetailHeroSection;
