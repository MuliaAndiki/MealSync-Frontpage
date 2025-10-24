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
import { MenuDataRestaurant, MenuDataUser, MenuSuperAdmin } from '@/configs/components.config';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { kebabCaseToWords } from '@/utils/string.format';

import SidebarSection from './sidebar-content';

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const last = pathname.split('/').pop();
  const { currentRole } = useAppNameSpase();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4 h-20 flex justify-center">
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
            <SidebarSection MenuData={MenuDataUser} isCollapsed={isCollapsed} pathname={pathname} />
          )}

          {currentRole === 'restaurant' && (
            <SidebarSection
              MenuData={MenuDataRestaurant}
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
          )}

          {currentRole === 'superadmin' && (
            <SidebarSection
              MenuData={MenuSuperAdmin}
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
