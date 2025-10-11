import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { UniqueUrlProfileType } from '@/types/components';
import { Label } from '@radix-ui/react-label';

interface RestaurantOrderProps {
  profileUnique: UniqueUrlProfileType;
}

const RestaurantOrderSection: React.FC<RestaurantOrderProps> = ({ profileUnique }) => {
  return (
    <View>
      <Box className="w-full min-h-screen flex flex-col">
        <Label className="text-2xl font-bold">Restaurant Order</Label>
      </Box>
    </View>
  );
};

export default RestaurantOrderSection;
