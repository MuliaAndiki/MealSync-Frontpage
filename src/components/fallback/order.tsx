import { IconClipboardOff } from '@tabler/icons-react';

import { useTranslate } from '@/hooks/useTranslate';

import Box from '../ui/box';
import { Card, CardContent } from '../ui/card';

interface OrderFallbackProps {}

const OrderFallback: React.FC<OrderFallbackProps> = () => {
  const { t } = useTranslate();
  
  return (
    <Card className="w-full">
      <CardContent className="py-12">
        <Box className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <IconClipboardOff size={64} className="opacity-50" />
          <Box className="text-center space-y-1">
            <p className="text-lg font-semibold">{t('fallback.no_orders')}</p>
            <p className="text-sm">{t('fallback.orders_appear')}</p>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderFallback;
