import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { Label } from '@radix-ui/react-label';

const RestaurantOrderSection = () => {
  return (
    <View>
      <Box className="w-full min-h-screen flex flex-col">
        <Label className="text-2xl font-bold">Restaurant Order</Label>
      </Box>
    </View>
  );
};

export default RestaurantOrderSection;
