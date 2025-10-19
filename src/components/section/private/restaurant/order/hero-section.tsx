import React, { useState } from 'react';

import OrderFallback from '@/components/fallback/order';
import OrderCard from '@/components/order-card';
import PaymentSnap from '@/components/payment-snap';
import PendingPaymentIndicator from '@/components/pending-payment-indicator';
import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import PopUp from '@/core/components/pop-up';
import { OrderType, ParentModalType, StatusType } from '@/types/components';
import { AlertContexType } from '@/types/ui';

interface OrderHeroRestaurantProps {
  isStatus: StatusType;
  setIsStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  orderData?: OrderType[];
  onCancel?: (orderId: string) => void;
  alert?: AlertContexType;
  curentRole: any;
}

const OrderHeroSection: React.FC<OrderHeroRestaurantProps> = ({
  orderData,
  onCancel,
  alert,
  curentRole,
  isStatus,
  setIsStatus,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<ParentModalType>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  
  const handleResumePayment = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsOpenModal('Pay');
  };

  return (
    <View>
      <Box className="w-full flex flex-col justify-start items-start min-h-screen">
        <PendingPaymentIndicator onResume={handleResumePayment} />
        <Box className="grid grid-cols-3 grid-rows-1  gap-4 w-full">
          {orderData && orderData.length > 0 ? (
            orderData
              .filter((item) => item.status.toLowerCase() === isStatus?.toLocaleLowerCase())
              .map((items, key) => (
                <OrderCard
                  data={items}
                  key={key}
                  onCancel={onCancel!}
                  alert={alert}
                  curentRole={curentRole}
                  setIsOpenModal={(modal) => {
                    setIsOpenModal(modal);
                    setSelectedOrderId(items._id);
                  }}
                />
              ))
          ) : (
            <OrderFallback />
          )}
        </Box>
        <PopUp isOpen={isOpenModal === 'Pay'} onClose={() => setIsOpenModal(null)}>
          <PaymentSnap orderId={selectedOrderId} onClose={() => setIsOpenModal(null)} />
        </PopUp>
      </Box>
    </View>
  );
};

export default OrderHeroSection;
