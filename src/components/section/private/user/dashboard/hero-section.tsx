import { Label } from '@radix-ui/react-label';
import { Loader2, Scan } from 'lucide-react';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import View from '@/components/ui/view';

interface DashboardUserProps {
  qrResult: string | null;
  scannerStarted: boolean;
  startScanner: () => void;
  qrRegionRef: any;
  isValidating: boolean;
  resetScanner: () => void;
}

const DashboardUserSection: React.FC<DashboardUserProps> = ({
  qrResult,
  scannerStarted,
  startScanner,
  qrRegionRef,
  isValidating,
  resetScanner,
}) => {
  return (
    <View>
      <Box className="flex min-h-screen flex-col justify-center items-center gap-6 p-4">
        <Box className="text-center  flex flex-col">
          <Label className="text-4xl md:text-5xl font-extrabold">Scan QR Restaurant</Label>
          <Label className="text-muted-foreground mt-2">
            Scan QR code untuk mengakses menu restaurant
          </Label>
        </Box>
        {!scannerStarted && !qrResult && (
          <Button
            onClick={startScanner}
            className="px-8 py-4  rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <Scan className="w-5 h-5" />
            Mulai Scan QR Code
          </Button>
        )}
        {scannerStarted && (
          <Box className="text-center">
            <Label className="text-sm text-muted-foreground mb-2">
              Arahkan kamera ke QR Code restaurant
            </Label>
          </Box>
        )}

        <div
          ref={qrRegionRef}
          id="qr-scanner"
          className="border-2 border-dashed border-gray-300 w-[320px] h-[320px] rounded-lg overflow-hidden"
          style={{ aspectRatio: '1 / 1' }}
        ></div>
        {isValidating && (
          <Box className="flex items-center gap-2 p-4 bg-blue-50 text-blue-700 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin" />
            <Label>Memvalidasi QR Code...</Label>
          </Box>
        )}
        {qrResult && !isValidating && (
          <Box className="mt-4 space-y-3">
            <Box className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
              <Label className="font-semibold">QR Code terdeteksi!</Label>
              <Label className="text-sm mt-1 break-all">{qrResult}</Label>
            </Box>
            <Button
              onClick={resetScanner}
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              Scan Ulang
            </Button>
          </Box>
        )}
      </Box>
    </View>
  );
};

export default DashboardUserSection;
