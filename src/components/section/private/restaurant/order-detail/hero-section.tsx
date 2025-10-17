import { Label } from '@radix-ui/react-label';

import Box from '@/components/ui/box';
import View from '@/components/ui/view';

const OrderDetailHeroSection = () => {
  return (
    <View>
      <Box className="w-full min-h-screen flex flex-col justify-center items-center relative">
        <Label>Setup Order Restaurant Detail</Label>
      </Box>
    </View>
  );
};

export default OrderDetailHeroSection;
