import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';

import OrderCard from '@/components/order-card';
import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import PopUp from '@/core/components/pop-up';
import { OrderType, ParentModalType } from '@/types/components';
import { AlertContexType } from '@/types/ui';

interface OrderHeroSectionProps {
  orderData: OrderType | any;
  isPending?: boolean;
  onCancel: (orderId: string) => void;
  alert: AlertContexType;
}

const OrderHeroSection: React.FC<OrderHeroSectionProps> = ({
  orderData,
  isPending,
  onCancel,
  alert,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);
  return (
    <View>
      <Box className="w-full min-h-screen flex justify-center items-start overflow-hidden ">
        <Box className="grid grid-cols-3 grid-rows-1 gap-2 w-full">
          {orderData.map((items: OrderType, key: number) => (
            <OrderCard
              key={key}
              data={items}
              isPending={isPending!}
              onCancel={onCancel}
              alert={alert}
              setIsOpenModal={setIsOpenModal}
            />
          ))}
        </Box>
        <PopUp isOpen={isOpenModal === 'Pay'} onClose={() => setIsOpenModal(null)}>
          <View className="w-full h-full">
            <Box className="flex justify-center items-center">
              <Label>Setup Payment Gateway</Label>
            </Box>
          </View>
        </PopUp>
      </Box>
    </View>
  );
};

export default OrderHeroSection;
