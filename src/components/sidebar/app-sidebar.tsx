"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/lib/store/auth-store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  User,
  Crown,
  Shield,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const getNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case "admin":
        return adminNavItems;
      case "manager":
        return managerNavItems;
      case "customer":
        return customerNavItems;
      default:
        return customerNavItems;
    }
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getRoleIcon = () => {
    if (!user) return null;

    switch (user.role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case "manager":
        return <Shield className="h-4 w-4 text-blue-500" />;
      case "customer":
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleText = () => {
    if (!user) return "";

    switch (user.role) {
      case "admin":
        return "مدیر سیستم";
      case "manager":
        return "مدیر";
      case "customer":
        return "مشتری";
      default:
        return "کاربر";
    }
  };

  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarHeader>
        {user && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                {getRoleIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{getRoleText()}</p>
              </div>
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        isActive &&
                          "bg-jetblack-500 text-white hover:bg-jetblack-600 hover:text-white"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4 ml-2" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOutIcon className="h-4 w-4 ml-2" />
          خروج
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

const adminNavItems = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "محصولات",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "سفارشات",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "مشتریان",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "گزارشات",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "تنظیمات",
    href: "/admin/settings",
    icon: Settings,
  },
];

const managerNavItems = [
  {
    title: "داشبورد",
    href: "/manager",
    icon: LayoutDashboard,
  },
  {
    title: "محصولات",
    href: "/manager/products",
    icon: Package,
  },
  {
    title: "سفارشات",
    href: "/manager/orders",
    icon: ShoppingCart,
  },
  {
    title: "گزارشات",
    href: "/manager/analytics",
    icon: BarChart3,
  },
];

const customerNavItems = [
  {
    title: "داشبورد",
    href: "/customer",
    icon: LayoutDashboard,
  },
  {
    title: "محصولات",
    href: "/customer/products",
    icon: Package,
  },
  {
    title: "سفارشات من",
    href: "/customer/orders",
    icon: ShoppingCart,
  },
  {
    title: "پروفایل",
    href: "/customer/profile",
    icon: User,
  },
];
