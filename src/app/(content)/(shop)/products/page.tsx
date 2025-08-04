"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ShoppingCart, Heart, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { Product, productsApi } from "@/lib/api/products";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productsApi.getProducts({
        page: currentPage,
        limit: 12,
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
        status: "active",
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

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      sku: product.sku,
      stockQuantity: product.stockQuantity,
    });
    toast.success("محصول به سبد خرید اضافه شد");
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">محصولات</h1>
        <p className="text-gray-600 mt-2">محصولات با کیفیت و قیمت مناسب</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
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
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {products.length} محصول یافت شد
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="p-4">
              <div className="relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">بدون تصویر</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                {product.stockQuantity < 10 && product.stockQuantity > 0 && (
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    کم‌موجودی
                  </Badge>
                )}
                {product.stockQuantity === 0 && (
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    ناموجود
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                </div>
                
                <div className="flex items-center space-x-1 space-x-reverse">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 mr-2">(4.0)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stockQuantity === 0}
                    className="flex items-center space-x-1 space-x-reverse"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>افزودن</span>
                  </Button>
                </div>

                {product.stockQuantity > 0 && (
                  <p className="text-sm text-gray-600">
                    موجودی: {product.stockQuantity} عدد
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              قبلی
            </Button>
            <span className="px-4 py-2 text-sm text-gray-600">
              صفحه {currentPage} از {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              بعدی
            </Button>
          </div>
        </div>
      )}

      {products.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">محصولی یافت نشد</p>
        </div>
      )}
    </div>
  );
} 