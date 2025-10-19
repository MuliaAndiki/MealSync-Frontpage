import { IconReceiptOff } from '@tabler/icons-react';

import { useTranslate } from '@/hooks/useTranslate';

import Box from '../ui/box';
import { Card, CardContent } from '../ui/card';

const FallbackPurchase = () => {
  const { t } = useTranslate();

  return (
    <Card className="w-full">
      <CardContent className="py-12">
        <Box className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <IconReceiptOff size={64} className="opacity-50" />
          <Box className="text-center space-y-1">
            <p className="text-lg font-semibold">{t('fallback.no_purchase')}</p>
            <p className="text-sm">{t('fallback.transactions_appear')}</p>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FallbackPurchase;
