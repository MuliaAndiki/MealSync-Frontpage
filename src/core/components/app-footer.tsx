import { appConfig } from '@/configs/app.config';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Box from '@/components/ui/box';
import View from '@/components/ui/view';

export default function AppFooter() {
  return (
    <footer>
      <View className="container mx-auto">
        <Box className="flex items-center justify-between">
          <Box>
            <Image src={appConfig.logo} alt="Logo" width={150} height={150} />
            <Box className="mt-4">
              <h1 className="text-xl lg:text-2xl font-bold">Follow us on</h1>
              <Box className="flex items-center gap-2">
                {Object.entries(appConfig.social_media).map(([key, value]) => (
                  <Link href={value.url} key={key}>
                    <Icon icon={value.icon} width={24} height={24} />
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </View>
    </footer>
  );
}
