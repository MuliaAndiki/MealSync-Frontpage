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
  orderData?: OrderType[];
  onCancel?: (orderId: string) => void;
  alert?: AlertContexType;
  curentRole: any;
  isOpenModal: ParentModalType;
  setIsOpenModal: React.Dispatch<React.SetStateAction<ParentModalType>>;
  selectedOrderId: string;
  setSelectedOrderId: React.Dispatch<React.SetStateAction<string>>;
  resumePayment: (orderId: string) => void;
}

const OrderHeroSection: React.FC<OrderHeroRestaurantProps> = ({
  orderData,
  onCancel,
  alert,
  curentRole,
  isStatus,
  isOpenModal,
  setIsOpenModal,
  resumePayment,
  selectedOrderId,
  setSelectedOrderId,
}) => {
  return (
    <View>
      <Box className="w-full flex flex-col justify-start items-start min-h-screen p-4">
        <PendingPaymentIndicator onResume={resumePayment} />
        {orderData && orderData.length > 0 ? (
          orderData
            .filter((item) => item.status.toLowerCase() === isStatus?.toLocaleLowerCase())
            .map((items, key) => (
              <Box className="grid  lg:grid-cols-3 grid-rows-1  gap-4 w-full" key={key}>
                <OrderCard
                  data={items}
                  onCancel={onCancel!}
                  alert={alert}
                  curentRole={curentRole}
                  setIsOpenModal={(modal) => {
                    setIsOpenModal(modal);
                    setSelectedOrderId(items._id);
                  }}
                />
              </Box>
            ))
        ) : (
          <OrderFallback />
        )}

        <PopUp isOpen={isOpenModal === 'Pay'} onClose={() => setIsOpenModal(null)}>
          <PaymentSnap orderId={selectedOrderId} onClose={() => setIsOpenModal(null)} />
        </PopUp>
      </Box>
    </View>
  );
};

export default OrderHeroSection;
