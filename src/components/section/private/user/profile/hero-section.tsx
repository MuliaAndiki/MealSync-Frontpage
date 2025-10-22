import { Label } from '@radix-ui/react-label';
import { IconMail } from '@tabler/icons-react';

import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { ProfileType } from '@/types/config';
import { camelCaseToWords } from '@/utils/string.format';
interface UserProfileProps {
  profile: ProfileType;
}

const UserProfileHeroSection: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <View>
      <Box className="flex justify-center items-start w-full min-h-screen relative ">
        <Box className="w-full flex justify-between items-start  p-2 ">
          <Box className="flex items-start justify-center flex-col">
            <Label className="text-2xl font-bold flex justify-center items-center gap-2">
              Informasi Kontak <IconMail size={35} />
            </Label>
            <Box className="flex justify-center items-center flex-col">
              <Box className="w-full">
                <Label className="text-lg font-semibold">Email:</Label>
                <Label className="text-lg font-semibold text-[#5B9844]">
                  {camelCaseToWords(profile.email)}
                </Label>
              </Box>
              <Box className="w-full">
                <Label className="text-lg font-semibold">Username:</Label>
                <Label className="text-lg font-semibold text-[#5B9844]">{profile.fullName}</Label>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default UserProfileHeroSection;
