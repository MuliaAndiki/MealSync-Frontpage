import { ChairType } from '@/types/components';
import Box from './ui/box';
import { Label } from '@radix-ui/react-label';

const Chair: React.FC<ChairType> = ({ chair }) => {
  const chairsArray = Array.from({ length: chair });
  return (
    <Box className="bg-[#2D1912] flex justify-center items-center flex-col rounded-lg p-4 ">
      <Label className="text-lg font-bold">Tempat Duduk</Label>
      <Box className="flex justify-evenly items-center w-full text-center flex-col gap-4 ">
        {Array.from({ length: Math.ceil(chairsArray.length / 5) }).map((_, i) => (
          <Box key={i} className="flex justify-evenly items-center w-full text-center">
            {chairsArray.slice(i * 5, i * 5 + 5).map((_: any, key: number) => (
              <Box key={key} className="flex justify-center items-center w-full p-1">
                <Box className="w-7 h-7 bg-foreground rounded-sm flex justify-center items-center ">
                  <Label className="text-background ">{i * 5 + key + 1}</Label>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Chair;
