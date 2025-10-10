'use client';
import DashboardUserSection from '@/components/section/private/user/dashboard/hero-section';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import { useRef, useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import UserApi from '@/services/user/user.service';
import toast from 'react-hot-toast';

const DashboardUserContainer = () => {
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
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setQrResult(decodedText);
          html5QrCode.stop().catch(console.error);
          setScannerStarted(false);
        },
        (errorMessage) => {}
      );

      setScannerStarted(true);
    } catch (err) {
      console.error('Error start QR scanner:', err);
      toast.error(
        'Tidak bisa mengakses kamera. Pastikan izin diberikan dan kamera tidak digunakan aplikasi lain.'
      );
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

      if (decodedText.includes('http') || decodedText.includes('restaurant')) {
        const urlParts = decodedText.split('/');
        uniqueUrl = urlParts[urlParts.length - 1];
      }

      const response = await UserApi.getRestaurantByUniqueUrl(uniqueUrl);

      if (response && response.data && response.data.restaurant) {
        toast.success(`Mengarahkan ke ${response.data.restaurant.name}...`);

        router.push(`/user/restaurant/${uniqueUrl}`);
      } else {
        toast.error('QR Code tidak valid. Restaurant tidak ditemukan.');
        setQrResult(null);
      }
    } catch (error: any) {
      console.error('Validation error:', error);
      if (error.response?.status === 404) {
        toast.error('QR Code tidak valid. Restaurant tidak ditemukan.');
      } else {
        toast.error('Gagal memvalidasi QR Code. Silakan coba lagi.');
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
