import Link from 'next/link';

import { SidebarGroupContent } from '@/components/ui/sidebar';
import { SidebarMenu } from '@/components/ui/sidebar';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/utils/classname';

interface SidebarSectionProps {
  MenuData: any;
  pathname: any;
  isCollapsed: any;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ MenuData, isCollapsed, pathname }) => {
  return (
    <SidebarGroupContent className="flex h-full flex-col justify-between">
      <SidebarMenu className="w-full ">
        {MenuData?.map((item: any) => {
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
    </SidebarGroupContent>
  );
};

export default SidebarSection;
