'use client';

import { AppSidebar } from '@/core/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import View from '@/components/ui/view';
import Box from '@/components/ui/box';

import ThemeToggle from '../components/theme-toggle';
import LanguageDropdown from '../components/language.dropdown';
import NotificationDropdown from '../components/notification.dropdown';
// import UserDropdown from '../components/user.dropdown';

// import AppBar from "../components/app-bar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: AppLayoutProps) {
  //   const [isScrolled, setIsScrolled] = useState(false);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (window.scrollY > 0) {
  //         setIsScrolled(true);
  //       } else {
  //         setIsScrolled(false);
  //       }
  //     };

  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }, []);

  return (
    <SidebarProvider defaultOpen>
      <View className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <Box className="flex h-full flex-col w-full">
            <Box className="flex p-4 items-center gap-2 border-b w-full h-20">
              <Box className="flex items-center justify-end  mx-auto w-full">
                <Box className="flex items-center gap-4">
                  <ThemeToggle />
                  <LanguageDropdown />
                  <NotificationDropdown />
                  {/* <UserDropdown /> */}
                </Box>
              </Box>
            </Box>

            {/* Content */}
            <Box className="flex-1 overflow-auto w-full">
              <Box className=" h-full  w-full mx-auto max-w-none p-[1rem]">{children}</Box>
            </Box>
          </Box>
        </SidebarInset>
      </View>
    </SidebarProvider>
  );
}
