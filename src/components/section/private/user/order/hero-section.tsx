import { Label } from '@radix-ui/react-label';
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

interface OrderHeroSectionProps {
  isStatus: StatusType;
  orderData: OrderType[];
  isPending?: boolean;
  onCancel: (orderId: string) => void;
  alert: AlertContexType;
  isOpenModal: ParentModalType;
  setIsOpenModal: React.Dispatch<React.SetStateAction<ParentModalType>>;
  selectedOrderId: string;
  setSelectedOrderId: React.Dispatch<React.SetStateAction<string>>;
  resumePayment: (orderId: string) => void;
}

const OrderHeroSection: React.FC<OrderHeroSectionProps> = ({
  orderData,
  isPending,
  onCancel,
  alert,
  isStatus,
  isOpenModal,
  setIsOpenModal,
  selectedOrderId,
  setSelectedOrderId,
  resumePayment,
}) => {
  return (
    <View>
      <Box className="w-full min-h-screen flex flex-col justify-start items-start overflow-hidden">
        <PendingPaymentIndicator onResume={resumePayment} />
        <Box className="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-2 w-full p-4">
          {orderData && orderData.length > 0 ? (
            orderData
              .filter((item) => item.status.toLowerCase() === isStatus.toLocaleLowerCase())
              .map((items, key) => (
                <OrderCard
                  key={key}
                  data={items}
                  isPending={isPending!}
                  onCancel={onCancel}
                  alert={alert}
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
