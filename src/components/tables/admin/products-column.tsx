import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCT_STATUS_LABELS } from "@/constants/products";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { TProduct } from "@/types/api/products";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit, Eye, Trash2, LoaderCircle } from "lucide-react";
import Image from "next/image";

// Table columns definition
export const productsColumns: ColumnDef<TProduct>[] = [
  {
    accessorKey: "image",
    header: "تصویر",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="w-12 h-12">
          {product.image ? (
            <Image
              width={420}
              height={420}
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-xs">بدون تصویر</span>
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "نام محصول",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div>
          <p className="font-medium text-gray-900">{product.name}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.getValue("sku")}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "قیمت",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(row.getValue("price"))}
      </span>
    ),
  },
  {
    accessorKey: "stockQuantity",
    header: "موجودی",
    cell: ({ row }) => {
      const quantity = row.getValue("stockQuantity") as number;
      return (
        <span
          className={`font-medium ${
            quantity < 10 ? "text-red-600" : "text-gray-900"
          }`}
        >
          {quantity}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      const status = row.getValue("status") as TProduct["status"];
      const label = PRODUCT_STATUS_LABELS[status] || status;
      return <Badge variant="default">{label}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {formatDate(row.getValue("createdAt"))}
      </span>
    ),
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => <RowActions row={row} />,
    enableSorting: false,
  },
];

const RowActions = ({ row }: { row: Row<TProduct> }) => {
  const product = row.original;

  const handleDeleteProduct = (id: string) => {
    if (confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      // This will be handled by the parent component
      console.log("Delete product:", id);
    }
  };

  return (
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
  );
};
