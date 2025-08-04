"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  lowStockProducts: number;
  pendingOrders: number;
  completedOrders: number;
  newCustomers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    pendingOrders: 0,
    completedOrders: 0,
    newCustomers: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch dashboard stats from API
    const fetchStats = async () => {
      try {
        // Mock data for now
        setStats({
          totalProducts: 156,
          totalOrders: 89,
          totalCustomers: 234,
          totalRevenue: 12500000,
          lowStockProducts: 12,
          pendingOrders: 23,
          completedOrders: 66,
          newCustomers: 45,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">داشبورد مدیریت</h1>
        <p className="text-gray-600 mt-2">نمای کلی از عملکرد سیستم</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل محصولات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.lowStockProducts} محصول کم‌موجودی
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل سفارشات</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex items-center space-x-2 space-x-reverse mt-1">
              <Badge variant="secondary" className="text-xs">
                {stats.pendingOrders} در انتظار
              </Badge>
              <Badge variant="outline" className="text-xs">
                {stats.completedOrders} تکمیل شده
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل مشتریان</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newCustomers} مشتری جدید
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">درآمد کل</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +12% از ماه گذشته
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>سفارشات اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock recent orders */}
              {[
                { id: "1", customer: "احمد محمدی", amount: 250000, status: "pending" },
                { id: "2", customer: "فاطمه احمدی", amount: 180000, status: "completed" },
                { id: "3", customer: "علی رضایی", amount: 320000, status: "processing" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-500">{formatCurrency(order.amount)}</p>
                  </div>
                  <Badge
                    variant={
                      order.status === "completed"
                        ? "default"
                        : order.status === "pending"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {order.status === "completed"
                      ? "تکمیل شده"
                      : order.status === "pending"
                      ? "در انتظار"
                      : "در حال پردازش"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>محصولات کم‌موجودی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock low stock products */}
              {[
                { name: "لپ‌تاپ اپل", stock: 3, threshold: 10 },
                { name: "گوشی سامسونگ", stock: 5, threshold: 15 },
                { name: "تبلت آیپد", stock: 2, threshold: 8 },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      موجودی: {product.stock} از {product.threshold}
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    کم‌موجودی
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>عملیات سریع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Package className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
              <p className="text-sm font-medium">افزودن محصول</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ShoppingCart className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">مشاهده سفارشات</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">مدیریت مشتریان</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">گزارشات</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 