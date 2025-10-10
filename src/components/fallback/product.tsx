import Box from '../ui/box';
import View from '../ui/view';
import { Label } from '@radix-ui/react-label';

const FallbackProduct: React.FC = () => {
  return (
    <View className="w-full h-full">
      <Box className="flex justify-center items-center w-full">
        <Label>Setup</Label>
      </Box>
    </View>
  );
};

export default FallbackProduct;
