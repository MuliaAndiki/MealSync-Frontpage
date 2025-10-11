import { Label } from '@radix-ui/react-label';

import { ChairType, ParentModalType } from '@/types/components';
import { AlertContexType } from '@/types/ui';

import Box from './ui/box';
import { Button } from './ui/button';

interface ChairsProps {
  chairs: ChairType[];
  setOpenModal?: React.Dispatch<React.SetStateAction<ParentModalType>>;
  hidenRoutes?: string[];
  isHiden?: any;
  onDeleteChair?: (_id: string) => void;
  alert?: AlertContexType;
}

const Chairs: React.FC<ChairsProps> = ({
  chairs,
  setOpenModal,
  hidenRoutes,
  isHiden,
  onDeleteChair,
  alert,
}) => {
  const path = hidenRoutes?.includes(isHiden);

  return (
    <Box className="bg-[#2D1912] flex justify-center items-center flex-col rounded-lg p-4 ">
      <Box className="w-full flex justify-between items-center p-1">
        <Label className="text-lg font-bold">Tempat Duduk :</Label>
        {path && (
          <Button variant={'glass'} className="font-bold" onClick={() => setOpenModal!('Chair')}>
            +
          </Button>
        )}
      </Box>
      <Box className="flex justify-evenly items-center w-full text-center flex-col gap-4 mt-4">
        {Array.from({ length: Math.ceil(chairs.length / 5) }).map((_, i) => (
          <Box key={i} className="flex justify-evenly items-center w-full text-center">
            {chairs.slice(i * 5, i * 5 + 5).map((chair) => (
              <Box key={chair._id} className="flex justify-center items-center w-full p-1 ">
                <div
                  onClick={() =>
                    alert?.confirm({
                      title: 'Yakin?!',
                      deskripsi: 'Apakah Kamu Yakin Menhapus Product Ini?',
                      icon: 'warning',
                      onConfirm: () => onDeleteChair!(chair._id),
                      onClose: () => {},
                    })
                  }
                >
                  <Box
                    className={`w-12 h-12  rounded-sm flex justify-center items-center ${chair.status === 'empty' ? 'bg-foreground' : 'bg-red-600'} `}
                  >
                    <Label className="text-background font-bold">{chair.noChair}</Label>
                  </Box>
                </div>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Chairs;
