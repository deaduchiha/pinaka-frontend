import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">
            صفحه مورد نظر پیدا نشد
          </h1>
          <p className="text-gray-500 mb-8">
            صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild>
            <Link href="/">
              <Home className="ml-2 size-5" />
              بازگشت به صفحه اصلی
            </Link>
          </Button>

          <div className="text-sm text-gray-400">یا</div>

          <Button variant="outline" asChild>
            <Link href="/products">
              مشاهده محصولات
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
