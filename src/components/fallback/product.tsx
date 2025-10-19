import { IconChefHat } from '@tabler/icons-react';

import { useTranslate } from '@/hooks/useTranslate';

import Box from '../ui/box';
import { Card, CardContent } from '../ui/card';

const FallbackProduct: React.FC = () => {
  const { t } = useTranslate();

  return (
    <Card className="w-full col-span-4">
      <CardContent className="py-12">
        <Box className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <IconChefHat size={64} className="opacity-50" />
          <Box className="text-center space-y-1">
            <p className="text-lg font-semibold">{t('fallback.no_menu')}</p>
            <p className="text-sm">{t('fallback.menu_appear')}</p>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FallbackProduct;
