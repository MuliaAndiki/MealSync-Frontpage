'use client';
import FallbackPurchase from '@/components/fallback/purchase';
import Purchase from '@/components/purchase';
import Box from '@/components/ui/box';
import { Separator } from '@/components/ui/separator';
import View from '@/components/ui/view';
import { useTranslate } from '@/hooks/useTranslate';

interface HistoryHeroSectionProps {
  purchaseHistory: any[];
}

const HistoryHeroSection: React.FC<HistoryHeroSectionProps> = ({ purchaseHistory }) => {
  const { t } = useTranslate();

  return (
    <View>
      <Box className="flex justify-start items-center flex-col w-full min-h-screen gap-6 py-4 sm:py-6 px-4 sm:px-0">
        <Box className="w-full">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('purchase.title')}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t('purchase.transaction_history')}
          </p>
        </Box>

        <Separator />

        {purchaseHistory.length > 0 ? (
          <Box className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {purchaseHistory.map((purchase: any) => (
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
