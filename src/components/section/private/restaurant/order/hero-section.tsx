import React from 'react';

import OrderFallback from '@/components/fallback/order';
import OrderCard from '@/components/order-card';
import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { OrderType, StatusType } from '@/types/components';
import { AlertContexType } from '@/types/ui';

interface OrderHeroRestaurantProps {
  isStatus?: StatusType;
  setIsStatus?: React.Dispatch<React.SetStateAction<StatusType>>;
  orderData?: OrderType[];
  onCancel?: (orderId: string) => void;
  alert?: AlertContexType;
  curentRole: any;
}

const OrderHeroSection: React.FC<OrderHeroRestaurantProps> = ({
  isStatus,
  setIsStatus,
  orderData,
  onCancel,
  alert,
  curentRole,
}) => {
  return (
    <View>
      <Box className="w-full flex justify-center items-start min-h-screen relative ">
        <Box className="grid grid-cols-3 grid-rows-1  w-full">
          {orderData && orderData.length > 0 ? (
            orderData.map((items, key) => (
              <OrderCard
                data={items}
                key={key}
                onCancel={onCancel!}
                alert={alert}
                curentRole={curentRole}
              />
            ))
          ) : (
            <OrderFallback />
          )}
        </Box>
      </Box>
    </View>
  );
};

export default OrderHeroSection;
