import { Label } from '@radix-ui/react-label';

import Container from '@/components/ui/container';
import View from '@/components/ui/view';

interface EditProfileHeroSectionProps {}

const EditProfileHeroSection: React.FC<EditProfileHeroSectionProps> = () => {
  return (
    <View>
      <Container className="flex justify-center items-center w-full min-h-screen flex-col">
        <Label className="text-sm font-extrabold">Setup Edit Profile</Label>
      </Container>
    </View>
  );
};

export default EditProfileHeroSection;
