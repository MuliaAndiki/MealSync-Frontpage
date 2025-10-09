import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import HistoryCard from '@/components/history';
import { HistoryData } from '@/configs/components.config';
import { Button } from '@/components/ui/button';

interface HistoryCardProps {
  content: 'Pending' | 'Paid';
  setContent: React.Dispatch<React.SetStateAction<'Pending' | 'Paid'>>;
}

const HistoryHeroSection: React.FC<HistoryCardProps> = ({ content, setContent }) => {
  return (
    <View>
      <Box className="flex min-h-screen w-full justify-center items-center relative z-0 overflow-x-hidden flex-col">
        <Box className="bg-[#2D1912] w-full min-h-screen max-h-full rounded-lg">
          <Box className="w-full h-full flex justify-center items-center p-2 gap-3">
            <Button variant={'carosel'} onClick={() => setContent('Pending')} className="font-bold">
              Pending
            </Button>
            <Button variant={'carosel'} onClick={() => setContent('Paid')} className="font-bold">
              Lunas
            </Button>
          </Box>
          <Box className="flex justify-center items-center flex-col p-2">
            <Box className="w-full rounded-lg flex-col flex p-4 my-4 ">
              {HistoryData.map((items, key) => (
                <Box key={key} className="my-2 p-1">
                  <HistoryCard data={items} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default HistoryHeroSection;
