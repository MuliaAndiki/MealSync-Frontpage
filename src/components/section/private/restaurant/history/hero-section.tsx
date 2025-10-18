'use client';

import FallbackPurchase from '@/components/fallback/purchase';
import Purchase from '@/components/purchase';
import { Badge } from '@/components/ui/badge';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import View from '@/components/ui/view';
import { useTranslate } from '@/hooks/useTranslate';

interface HistoryHeroSectionProps {
  content?: 'Pending' | 'Paid';
  setContent?: (content: 'Pending' | 'Paid') => void;
  orderHistory?: any[];
}

const HistoryHeroSection: React.FC<HistoryHeroSectionProps> = ({
  content,
  setContent,
  orderHistory = [],
}) => {
  const { t } = useTranslate();

  const filteredHistory = orderHistory.filter((order: any) => {
    if (content === 'Pending') {
      return order.status === 'pending' || order.status === 'processing';
    }
    return order.status === 'completed' || order.status === 'paid';
  });

  const pendingCount = orderHistory.filter(
    (o: any) => o.status === 'pending' || o.status === 'processing'
  ).length;
  const completedCount = orderHistory.filter(
    (o: any) => o.status === 'completed' || o.status === 'paid'
  ).length;

  return (
    <View>
      <Box className="flex justify-start items-center flex-col w-full min-h-screen gap-6 py-4 sm:py-6 px-4 sm:px-0">
        <Box className="w-full">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('purchase.title')}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t('purchase.restaurant_transaction_history')}
          </p>
        </Box>

        <Separator />

        <Box className="w-full flex gap-2 flex-wrap">
          <Button
            variant={content === 'Pending' ? 'default' : 'outline'}
            onClick={() => setContent!('Pending')}
            className="relative"
          >
            {t('purchase.filter.pending')}
            {pendingCount > 0 && (
              <Badge className="ml-2" variant="destructive">
                {pendingCount}
              </Badge>
            )}
          </Button>
          <Button
            variant={content === 'Paid' ? 'default' : 'outline'}
            onClick={() => setContent!('Paid')}
            className="relative"
          >
            {t('purchase.filter.completed')}
            {completedCount > 0 && (
              <Badge className="ml-2" variant="secondary">
                {completedCount}
              </Badge>
            )}
          </Button>
        </Box>

        {filteredHistory.length > 0 ? (
          <Box className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHistory.map((purchase: any) => (
              <Purchase key={purchase._id} data={purchase} />
            ))}
          </Box>
        ) : (
          <FallbackPurchase />
        )}
      </Box>
    </View>
  );
};

export default HistoryHeroSection;
