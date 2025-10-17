import { Label } from '@radix-ui/react-label';

import Box from '@/components/ui/box';
import View from '@/components/ui/view';

const OrderDetailHeroSection = () => {
  return (
    <View>
      <Box className="w-full min-h-screen flex flex-col relative overflow-x-hidden justify-center items-center">
        <Label>Setup Order Detail User</Label>
      </Box>
    </View>
  );
};

export default OrderDetailHeroSection;
