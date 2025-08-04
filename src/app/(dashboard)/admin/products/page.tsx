"use client";

import { useState, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, Download, ChevronDown } from "lucide-react";
import { productsApi } from "@/lib/api/products";
import { TProduct, TProductsQuery } from "@/types/api/products";
import { queryKeys } from "@/lib/hooks/use-query-client";
import { productsColumns } from "@/components/tables/admin/products-column";
import ProductsTable from "@/components/tables/admin/products-table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminProductsPage() {
  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Build query parameters
  const queryParams: TProductsQuery = useMemo(() => {
    const params: TProductsQuery = {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    };

    // Add global search
    if (globalFilter) {
      params.search = globalFilter;
    }

    // Add column filters
    columnFilters.forEach((filter) => {
      if (filter.id === "category" && filter.value) {
        params.category = filter.value as string;
      }
      if (filter.id === "status" && filter.value) {
        params.status = filter.value as TProduct["status"];
      }
    });

    // Add sorting
    if (sorting.length > 0) {
      const sort = sorting[0];
      params.sortBy = sort.id as "name" | "price" | "createdAt";
      params.sortOrder = sort.desc ? "desc" : "asc";
    }

    return params;
  }, [pagination, globalFilter, columnFilters, sorting]);

  // Fetch products query
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.products.list(queryParams),
    queryFn: () => productsApi.getProducts(queryParams),
    placeholderData: keepPreviousData,
  });

  // Initialize table
  const table = useReactTable({
    data: (productsData?.products || []) as TProduct[],
    columns: productsColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    manualPagination: true,
    manualFiltering: true,
    pageCount: productsData?.totalPages || 0,
    globalFilterFn: "includesString",
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">خطا در بارگذاری محصولات</p>
          <Button onClick={() => window.location.reload()}>تلاش مجدد</Button>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm font-medium">
                جستجو
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="جستجو در محصولات..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                وضعیت
              </Label>
              <Select
                value={
                  (table.getColumn("status")?.getFilterValue() as string) ??
                  "all"
                }
                onValueChange={(value) =>
                  table
                    .getColumn("status")
                    ?.setFilterValue(value === "all" ? "" : value)
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="همه وضعیت‌ها" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                  <SelectItem value="active">فعال</SelectItem>
                  <SelectItem value="inactive">غیرفعال</SelectItem>
                </SelectContent>
              </Select>
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
          <div className="flex items-center justify-between">
            <CardTitle>لیست محصولات</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="mr-auto">
                  ستون‌ها <ChevronDown className="mr-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id === "name" && "نام محصول"}
                        {column.id === "sku" && "SKU"}
                        {column.id === "price" && "قیمت"}
                        {column.id === "stockQuantity" && "موجودی"}
                        {column.id === "status" && "وضعیت"}
                        {column.id === "createdAt" && "تاریخ ایجاد"}
                        {column.id === "actions" && "عملیات"}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <ProductsTable
            table={table}
            isLoading={isLoading}
            columns={productsColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
}
