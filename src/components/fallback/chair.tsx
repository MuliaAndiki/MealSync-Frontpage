import { IconArmchair, IconPlus } from '@tabler/icons-react';

import { useTranslate } from '@/hooks/useTranslate';
import { ParentModalType } from '@/types/components';

import Box from '../ui/box';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface FallbackProps {
  hidenRoutes?: string[];
  isHiden?: any;
  isOpenModal?: ParentModalType;
  setIsOpenModal?: React.Dispatch<React.SetStateAction<ParentModalType>>;
}

const FallbackChair: React.FC<FallbackProps> = ({ hidenRoutes, isHiden, setIsOpenModal }) => {
  const { t } = useTranslate();
  const path = hidenRoutes?.includes(isHiden);

  return (
    <Card className="w-full">
      <CardContent className="py-12">
        <Box className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <IconArmchair size={64} className="opacity-50" />
          <Box className="text-center space-y-1">
            <p className="text-lg font-semibold">{t('fallback.no_chairs')}</p>
            <p className="text-sm">{t('fallback.add_chairs')}</p>
          </Box>
          {path && (
            <Button variant="native" onClick={() => setIsOpenModal!('Chair')} className="mt-2">
              <IconPlus size={18} />
              {t('chair.add_chair')}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FallbackChair;
