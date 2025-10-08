'use client';

import Link from 'next/link';
import { MenuData } from '@/configs/components.config';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/classname';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { kebabCaseToWords } from '@/utils/string.format';
import { useLogout } from '@/hooks/mutation/auth/mutation';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { IconDoorExit } from '@tabler/icons-react';

// Menu items with proper routes

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const logout = useLogout();
  const last = pathname.split('/').pop();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4 h-20 flex justify-center">
        {isCollapsed ? (
          <SidebarTrigger className="flex justify-center items-center">
            <Image src="/images/logo.svg" alt="Logo" width={200} height={200} />
          </SidebarTrigger>
        ) : (
          <div className="flex gap-2 items-center">
            <SidebarTrigger>
              <Image src="/images/logo.svg" alt="Logo" width={70} height={70} />
            </SidebarTrigger>
            <Label className="text-xl text-[var(--label)] font-semibold">
              {kebabCaseToWords(last!)}
            </Label>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="h-screen">
          <SidebarGroupContent className="flex h-full flex-col justify-between">
            <SidebarMenu className="w-full ">
              {MenuData.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                      <Link
                        href={item.url}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 h-10',
                          isActive && 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
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
            <SidebarMenu className="w-full">
              <Button
                variant={'destructive'}
                className="font-semibold"
                onClick={() => logout.mutate({})}
                disabled={logout.isPending}
              >
                {!isCollapsed ? 'Keluar' : <IconDoorExit />}
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
