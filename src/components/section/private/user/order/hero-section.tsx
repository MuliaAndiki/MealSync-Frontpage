import { Label } from '@radix-ui/react-label';

import Box from '@/components/ui/box';
import View from '@/components/ui/view';

const OrderHeroSection = () => {
  return (
    <View>
      <Box className="w-full min-h-screen flex justify-center items-center overflow-hidden ">
        <Label>Setup Ordering User</Label>
      </Box>
    </View>
  );
};

export default OrderHeroSection;
