"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Order, ordersApi } from "@/lib/api/orders";
import { toast } from "sonner";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchTerm, selectedStatus, selectedPaymentStatus]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await ordersApi.getOrders({
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined,
        status: selectedStatus as Order["status"] || undefined,
        paymentStatus: selectedPaymentStatus as Order["paymentStatus"] || undefined,
      });
      setOrders(response.orders);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("خطا در بارگذاری سفارشات");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (confirm("آیا از حذف این سفارش اطمینان دارید؟")) {
      try {
        await ordersApi.deleteOrder(id);
        toast.success("سفارش با موفقیت حذف شد");
        fetchOrders();
      } catch (error) {
        console.error("Failed to delete order:", error);
        toast.error("خطا در حذف سفارش");
      }
    }
  };

  const getStatusBadge = (status: Order["status"]) => {
    const variants = {
      pending: "secondary",
      processing: "outline",
      shipped: "default",
      delivered: "default",
      cancelled: "destructive",
    } as const;

    const labels = {
      pending: "در انتظار",
      processing: "در حال پردازش",
      shipped: "ارسال شده",
      delivered: "تحویل داده شده",
      cancelled: "لغو شده",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getPaymentStatusBadge = (status: Order["paymentStatus"]) => {
    const variants = {
      pending: "secondary",
      paid: "default",
      failed: "destructive",
      refunded: "outline",
    } as const;

    const labels = {
      pending: "در انتظار پرداخت",
      paid: "پرداخت شده",
      failed: "ناموفق",
      refunded: "بازگشت وجه",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت سفارشات</h1>
          <p className="text-gray-600 mt-2">مدیریت و پیگیری سفارشات مشتریان</p>
        </div>
        <Button>
          <Download className="ml-2 h-4 w-4" />
          خروجی
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فیلترها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                جستجو
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="جستجو در سفارشات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وضعیت سفارش
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="pending">در انتظار</option>
                <option value="processing">در حال پردازش</option>
                <option value="shipped">ارسال شده</option>
                <option value="delivered">تحویل داده شده</option>
                <option value="cancelled">لغو شده</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وضعیت پرداخت
              </label>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="pending">در انتظار پرداخت</option>
                <option value="paid">پرداخت شده</option>
                <option value="failed">ناموفق</option>
                <option value="refunded">بازگشت وجه</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="ml-2 h-4 w-4" />
                اعمال فیلتر
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>لیست سفارشات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-900">شماره سفارش</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">مشتری</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">مبلغ کل</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">وضعیت سفارش</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">وضعیت پرداخت</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">تاریخ سفارش</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">#{order.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-3 px-4">{getPaymentStatusBadge(order.paymentStatus)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                صفحه {currentPage} از {totalPages}
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  قبلی
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  بعدی
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 