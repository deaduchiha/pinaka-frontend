"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            خطایی رخ داده است
          </h1>
          <p className="text-gray-500 mb-8">
            متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button onClick={reset}>
            <RefreshCw className="ml-2 h-4 w-4" />
            تلاش مجدد
          </Button>
          
          <div className="text-sm text-gray-400">
            یا
          </div>
          
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="ml-2 h-4 w-4" />
              بازگشت به صفحه اصلی
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 