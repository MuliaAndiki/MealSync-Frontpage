import { Label } from '@radix-ui/react-label';

import Box from '../ui/box';
import View from '../ui/view';

interface OrderFallbackProps {}

const OrderFallback: React.FC<OrderFallbackProps> = () => {
  return (
    <View className="w-full h-full">
      <Box className="flex justify-center items-center rounded-lg">
        <Label>Setup FallbackOrder</Label>
      </Box>
    </View>
  );
};

export default OrderFallback;
