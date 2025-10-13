'use client';
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import DashboardUserSection from '@/components/section/private/user/dashboard/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import UserApi from '@/services/user/user.service';

const DashboardUserContainer = () => {
  const { alert } = useAppNameSpase();
  const router = useRouter();
  const qrRegionRef = useRef<HTMLDivElement>(null);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [scannerStarted, setScannerStarted] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const startScanner = async () => {
    if (!qrRegionRef.current) return;

    try {
      const html5QrCode = new Html5Qrcode('qr-scanner');
      html5QrcodeRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 270, aspectRatio: 100 },
        (decodedText) => {
          setQrResult(decodedText);
          html5QrCode.stop().catch(console.error);
          setScannerStarted(false);
        },
        (errorMessage) => {
          console.error(errorMessage);
          alert.toast({
            title: 'Error',
            message: 'Mohon Coba Lagi',
            icon: 'error',
          });
          return;
        }
      );

      setScannerStarted(true);
    } catch (err) {
      console.error('Error start QR scanner:', err);
      alert.toast({
        title: 'Error',
        message: 'Gagal Mengizinkan Camera',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    if (qrResult) {
      validateAndRedirect(qrResult);
    }
  }, [qrResult]);

  const validateAndRedirect = async (decodedText: string) => {
    setIsValidating(true);

    try {
      let uniqueUrl = decodedText;

      try {
        const url = new URL(decodedText);

        const pathSegments = url.pathname.split('/').filter(Boolean);
        uniqueUrl = pathSegments[pathSegments.length - 1];
      } catch {
        uniqueUrl = decodedText;
      }

      const response = await UserApi.getRestaurantByUniqueUrl(uniqueUrl);

      if (response?.data?.restaurant) {
        toast.success(`Mengarahkan ke ${response.data.restaurant.name}...`);
        router.push(`/user/dashboard/restaurant/${uniqueUrl}`);
      } else {
        alert.toast({
          title: 'Error',
          message: 'QR Code tidak valid. Restaurant tidak ditemukan.',
          icon: 'error',
        });
        setQrResult(null);
      }
    } catch (error: any) {
      console.error('Validation error:', error);
      if (error.response?.status === 404) {
        alert.toast({
          title: 'Error',
          message: 'QR Code tidak valid. Restaurant tidak ditemukan.',
          icon: 'error',
        });
      } else {
        alert.toast({
          title: 'Error',
          message: 'Gagal memvalidasi QR Code. Silakan coba lagi',
          icon: 'error',
        });
      }
      setQrResult(null);
    } finally {
      setIsValidating(false);
    }
  };

  const resetScanner = () => {
    setQrResult(null);
    setScannerStarted(false);
    if (html5QrcodeRef.current) {
      html5QrcodeRef.current.stop().catch(console.error);
    }
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardUserSection
          qrRegionRef={qrRegionRef}
          qrResult={qrResult}
          scannerStarted={scannerStarted}
          startScanner={startScanner}
          isValidating={isValidating}
          resetScanner={resetScanner}
        />
      </Container>
    </SidebarLayout>
  );
};

export default DashboardUserContainer;
