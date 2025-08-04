"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, Download, Upload, Edit, Trash2, Eye } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Product, productsApi } from "@/lib/api/products";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productsApi.getProducts({
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
      });
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("خطا در بارگذاری محصولات");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      try {
        await productsApi.deleteProduct(id);
        toast.success("محصول با موفقیت حذف شد");
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
        toast.error("خطا در حذف محصول");
      }
    }
  };

  const getStatusBadge = (status: Product["status"]) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      draft: "outline",
    } as const;

    const labels = {
      active: "فعال",
      inactive: "غیرفعال",
      draft: "پیش‌نویس",
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
          <h1 className="text-3xl font-bold text-gray-900">مدیریت محصولات</h1>
          <p className="text-gray-600 mt-2">مدیریت و ویرایش محصولات سیستم</p>
        </div>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          افزودن محصول
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فیلترها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                جستجو
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="جستجو در محصولات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                دسته‌بندی
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">همه دسته‌بندی‌ها</option>
                <option value="electronics">الکترونیک</option>
                <option value="clothing">پوشاک</option>
                <option value="books">کتاب</option>
              </select>
            </div>
            <div className="flex items-end space-x-2 space-x-reverse">
              <Button variant="outline">
                <Filter className="ml-2 h-4 w-4" />
                اعمال فیلتر
              </Button>
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                خروجی
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>لیست محصولات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-900">تصویر</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">نام محصول</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">SKU</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">قیمت</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">موجودی</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">وضعیت</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">تاریخ ایجاد</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-xs">بدون تصویر</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{product.sku}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">
                        {formatCurrency(product.price)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        product.stockQuantity < 10 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {product.stockQuantity}
                      </span>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(product.createdAt)}
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
                          onClick={() => handleDeleteProduct(product.id)}
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