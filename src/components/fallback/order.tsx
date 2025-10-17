import { Label } from '@radix-ui/react-label';
import { ListOrdered } from 'lucide-react';

import Box from '../ui/box';
import View from '../ui/view';

// Setup Props
interface OrderFallbackProps {}

// Initial Component Fallback
const OrderFallback: React.FC<OrderFallbackProps> = () => {
  return (
    <View className="w-full h-full">
      <Box className="flex justify-center items-center rounded-lg flex-col">
        <Label className="text-lg font-bold">Sekarang Kamu Tidak Memiliki Order</Label>
        <ListOrdered size={50} />
      </Box>
    </View>
  );
};

export default OrderFallback;
