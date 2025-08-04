import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCT_STATUS_LABELS } from "@/constants/products";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { TProduct, TProductsQuery } from "@/types/api/products";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit, Eye, Trash2, LoaderCircle } from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "@/lib/api/products";
import { toast } from "sonner";
import { queryClient, queryKeys } from "@/lib/hooks/use-query-client";

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
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["products", "delete"],
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      toast.success("محصول با موفقیت حذف شد");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("خطا در حذف محصول");
    },
  });

  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <Button variant="ghost" size="sm">
        <Eye className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm">
        <Edit className="h-4 w-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
            disabled={isPending}
          >
            {isPending ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              آیا از حذف این محصول اطمینان دارید؟
            </AlertDialogTitle>
            <AlertDialogDescription>
              این عمل برای همیشه حذف محصول و حذف داده های مربوط به آن از سرورها
              است.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 min-w-20"
              onClick={() => mutate(product.id)}
              disabled={isPending}
            >
              {isPending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                "حذف"
              )}
            </AlertDialogAction>

            <AlertDialogCancel>انصراف</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
