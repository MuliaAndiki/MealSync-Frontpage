import { Label } from '@radix-ui/react-label';

import Container from '@/components/ui/container';
import View from '@/components/ui/view';

const EditDashboardHeroSection = () => {
  return (
    <View>
      <Container className="flex justify-center items-center w-full min-h-screen flex-col">
        <Label>Setup Edit Dashboards</Label>
      </Container>
    </View>
  );
};

export default EditDashboardHeroSection;
