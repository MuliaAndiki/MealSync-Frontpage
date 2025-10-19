import { useCallback, useEffect, useState } from 'react';

interface SnapPaymentOptions {
  onSuccess?: (result: any) => void;
  onPending?: (result: any) => void;
  onError?: (result: any) => void;
  onClose?: () => void;
}

export const useSnapPayment = () => {
  const [isSnapReady, setIsSnapReady] = useState(false);

  useEffect(() => {
    const checkSnap = () => {
      if (typeof window !== 'undefined' && window.snap) {
        setIsSnapReady(true);
      } else {
        setTimeout(checkSnap, 100);
      }
    };
    checkSnap();
  }, []);

  const openSnap = useCallback(
    (snapToken: string, options?: SnapPaymentOptions) => {
      if (!isSnapReady || !window.snap) {
        console.error('Snap is not ready');
        return;
      }

      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log('Payment success:', result);
          options?.onSuccess?.(result);
        },
        onPending: (result) => {
          console.log('Payment pending:', result);
          options?.onPending?.(result);
        },
        onError: (result) => {
          console.error('Payment error:', result);
          options?.onError?.(result);
        },
        onClose: () => {
          console.log('Payment popup closed');
          options?.onClose?.();
        },
      });
    },
    [isSnapReady]
  );

  return { openSnap, isSnapReady };
};
