'use client';

import { Label } from '@radix-ui/react-label';
import { IconDoorExit } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { MenuDataRestaurant, MenuDataUser } from '@/configs/components.config';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { cn } from '@/utils/classname';
import { kebabCaseToWords } from '@/utils/string.format';

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const last = pathname.split('/').pop();
  const { currentRole } = useAppNameSpase();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4 h-20 flex justify-center">
        {/* <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger className="flex items-center">
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} loading="lazy" />
          </SidebarTrigger>
          <Label className="text-lg font-semibold truncate max-w-[120px]">
            {kebabCaseToWords(last!)}
          </Label>
        </div> */}
        {isCollapsed ? (
          <SidebarTrigger className="flex justify-center  items-center">
            <Image src="/images/logo.svg" alt="Logo" width={200} height={200} loading="lazy" />
          </SidebarTrigger>
        ) : (
          <div className="flex gap-2 items-center">
            <SidebarTrigger>
              <Image src="/images/logo.svg" alt="Logo" width={70} height={70} loading="lazy" />
            </SidebarTrigger>
            <Label className="text-xl font-semibold">{kebabCaseToWords(last!)}</Label>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="h-screen w-full ">
          {currentRole === 'user' && (
            <SidebarGroupContent className="flex h-full flex-col justify-between">
              <SidebarMenu className="w-full ">
                {MenuDataUser.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                        <Link
                          href={item.url}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 h-10',
                            isActive &&
                              'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                          )}
                        >
                          <item.icon className="h-6 w-6 lg:h-10 lg:w-10" />
                          <span className="text-base lg:text-lg">{!isCollapsed && item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          )}

          {currentRole === 'restaurant' && (
            <SidebarGroupContent className="flex h-full flex-col justify-between">
              <SidebarMenu className="w-full ">
                {MenuDataRestaurant.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                        <Link
                          href={item.url}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 h-10',
                            isActive &&
                              'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                          )}
                        >
                          <item.icon className="h-6 w-6 lg:h-10 lg:w-10" />
                          <span className="text-base lg:text-lg">{!isCollapsed && item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
