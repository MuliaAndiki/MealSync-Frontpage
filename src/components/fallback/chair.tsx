import { Label } from '@radix-ui/react-dropdown-menu';
import { IconArmchairOff } from '@tabler/icons-react';

import { ParentModalType } from '@/types/components';

import Box from '../ui/box';
import { Button } from '../ui/button';
import View from '../ui/view';

interface FallbackProps {
  hidenRoutes?: string[];
  isHiden?: any;
  isOpenModal?: ParentModalType;
  setIsOpenModal?: React.Dispatch<React.SetStateAction<ParentModalType>>;
}

const FallbackChair: React.FC<FallbackProps> = ({ hidenRoutes, isHiden, setIsOpenModal }) => {
  const path = hidenRoutes?.includes(isHiden);
  return (
    <View className="w-full h-full">
      <Box className="flex w-full justify-center items-center bg-[#2D1912] rounded-lg">
        <Box className="flex justify-center items-center flex-col gap-3 my-2">
          <Label className="text-lg font-extrabold  ">Kamu Tidak Memiliki Kursi</Label>
          <IconArmchairOff size={70} />
          {path && (
            <Button
              variant={'glass'}
              className="text-lg font-bold"
              onClick={() => setIsOpenModal!('Chair')}
            >
              Tambahkan Kursi
            </Button>
          )}
        </Box>
      </Box>
    </View>
  );
};

export default FallbackChair;
