"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Shield,
  Crown,
} from "lucide-react";

interface SidebarProps {
  className?: string;
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

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

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
    <div
      className={cn(
        "flex flex-col bg-white border-l border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">پیناکا</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-gray-200">
          {!isCollapsed ? (
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
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                {getRoleIcon()}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-4 w-4 ml-2" />
                {!isCollapsed && item.title}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 ml-2" />
          {!isCollapsed && "خروج"}
        </Button>
      </div>
    </div>
  );
} 