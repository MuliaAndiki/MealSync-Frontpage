'use client';
import { IconCalendar, IconClock, IconCreditCard, IconReceipt } from '@tabler/icons-react';
import { format } from 'date-fns';

import { useTranslate } from '@/hooks/useTranslate';
import { PurchaseProps } from '@/types/props';

import { Badge } from './ui/badge';
import Box from './ui/box';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

const Purchase: React.FC<PurchaseProps> = ({ data, onViewDetail }) => {
  const { t } = useTranslate();

  const statusVariant = {
    completed: 'default' as const,
    failed: 'destructive' as const,
  };

  const statusText = {
    completed: t('purchase.status.completed'),
    failed: t('purchase.status.failed'),
  };

  if (!data) return null;

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader>
        <Box className="flex justify-between items-start">
          <Box className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base">
              <IconReceipt size={20} className="text-primary" />
              Order #{data.orderId?.slice(-8) || 'N/A'}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs">
              <IconCalendar size={14} />
              {data.createdAt ? format(new Date(data.createdAt), 'dd MMM yyyy') : 'N/A'}
              <IconClock size={14} className="ml-2" />
              {data.createdAt ? format(new Date(data.createdAt), 'HH:mm') : 'N/A'}
            </CardDescription>
          </Box>
          <Badge variant={statusVariant[data.status]}>{statusText[data.status]}</Badge>
        </Box>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4 space-y-4">
        {data.items && data.items.length > 0 && (
          <Box className="space-y-2">
            {data.items.slice(0, 2).map((item, idx) => (
              <Box key={idx} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium">Rp {item.price?.toLocaleString('id-ID') || 0}</span>
              </Box>
            ))}
            {data.items.length > 2 && (
              <p className="text-xs text-muted-foreground">
                {t('purchase.more_items', { count: data.items.length - 2 })}
              </p>
            )}
          </Box>
        )}

        <Separator />

        <Box className="space-y-2">
          <Box className="flex justify-between items-center">
            <Box className="flex items-center gap-2">
              <IconCreditCard size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{data.paymentMethod || 'N/A'}</span>
            </Box>
            <span className="text-lg font-bold text-primary">
              Rp {data.amount?.toLocaleString('id-ID') || 0}
            </span>
          </Box>
        </Box>

        {onViewDetail && data._id && (
          <Button variant="outline" className="w-full" onClick={() => onViewDetail(data._id)}>
            {t('purchase.view_detail')}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Purchase;
