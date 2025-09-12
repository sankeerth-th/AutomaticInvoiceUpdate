'use client';

import {
  LayoutDashboard,
  FileText,
  Warehouse,
  Users,
  Plug,
  BarChart,
  ChevronDown,
  Settings,
  LifeBuoy,
} from 'lucide-react';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../logo';
import { Separator } from '../ui/separator';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/invoices', label: 'Invoices', icon: FileText },
  { href: '/inventory', label: 'Inventory', icon: Warehouse },
  { href: '/vendors', label: 'Vendors', icon: Users, adminOnly: true },
  { href: '/pos-settings', label: 'POS Settings', icon: Plug, adminOnly: true },
  { href: '/reports', label: 'Reports', icon: BarChart, adminOnly: true },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  };

  return (
    <SidebarPrimitive variant="inset" collapsible="icon">
      <SidebarHeader>
        <Logo className="text-sidebar-primary transition-all group-data-[collapsible=icon]:-ml-4 group-data-[collapsible=icon]:opacity-0" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={{ children: item.label }}
                className={item.adminOnly ? 'text-sidebar-foreground/70' : ''}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label} {item.adminOnly && <span className='text-xs'>(Admin)</span>}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className='mb-2' />
        <SidebarMenu>
        <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={{ children: 'Settings' }}
              >
                <Link href="#">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={{ children: 'Support' }}
              >
                <Link href="#">
                  <LifeBuoy />
                  <span>Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
