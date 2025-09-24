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
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { kebabCaseToWords } from '@/utils/string.format';
import useLogout from '@/hooks/mutation/auth/useLogout';
import { Button } from '@/components/ui/button';

// Menu items with proper routes

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const logout = useLogout();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4 h-20 flex justify-center">
        {isCollapsed ? (
          // <LayoutDashboard className="size-4" />
          <Image src="/images/logo.svg" alt="Logo" width={200} height={200} />
        ) : (
          <div className="flex gap-2 items-center">
            <Image src="/images/logo.svg" alt="Logo" width={70} height={70} />
            <span className="text-xl font-semibold">{kebabCaseToWords(pathname)}</span>
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
                {!isCollapsed && 'Logout'}
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
