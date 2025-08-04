"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "sonner";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    setIsUpdating(itemId);
    try {
      updateQuantity(itemId, newQuantity);
      toast.success("تعداد محصول به‌روزرسانی شد");
    } catch (error) {
      toast.error("خطا در به‌روزرسانی تعداد");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    toast.success("محصول از سبد خرید حذف شد");
  };

  const handleClearCart = () => {
    if (confirm("آیا از خالی کردن سبد خرید اطمینان دارید؟")) {
      clearCart();
      toast.success("سبد خرید خالی شد");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">سبد خرید خالی است</h2>
          <p className="text-gray-600 mb-6">محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="ml-2 h-4 w-4" />
              مشاهده محصولات
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">سبد خرید</h1>
          <p className="text-gray-600 mt-2">
            {getTotalItems()} محصول در سبد خرید شما
          </p>
        </div>
        <Button variant="outline" onClick={handleClearCart}>
          <Trash2 className="ml-2 h-4 w-4" />
          خالی کردن سبد
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-xs">بدون تصویر</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
                        <div className="flex items-center space-x-2 space-x-reverse mt-2">
                          <span className="text-lg font-bold text-gray-900">
                            {formatCurrency(item.price)}
                          </span>
                          {item.stockQuantity < 10 && item.stockQuantity > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              کم‌موجودی
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isUpdating === item.id}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 border border-gray-300 rounded-md min-w-[3rem] text-center">
                          {isUpdating === item.id ? "..." : item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stockQuantity || isUpdating === item.id}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-lg font-bold text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>خلاصه سفارش</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">تعداد محصولات:</span>
                  <span className="font-medium">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">مجموع:</span>
                  <span className="font-bold text-lg">{formatCurrency(getTotalPrice())}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">هزینه ارسال:</span>
                  <span className="font-medium">رایگان</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">مجموع کل:</span>
                  <span className="text-lg font-bold text-indigo-600">
                    {formatCurrency(getTotalPrice())}
                  </span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                ادامه خرید
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/products">
                  <ArrowLeft className="ml-2 h-4 w-4" />
                  ادامه خرید
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 