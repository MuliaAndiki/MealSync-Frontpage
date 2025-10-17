import { Label } from '@radix-ui/react-label';

import Box from '../ui/box';
import View from '../ui/view';

const FallbackCart = () => {
  return (
    <View className="w-full h-full">
      <Box className="flex justify-center items-center">
        <Label className="text-center text-sm">Keranjang kosong</Label>
      </Box>
    </View>
  );
};

export default FallbackCart;
