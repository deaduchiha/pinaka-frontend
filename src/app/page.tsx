import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Users, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">پیناکا</h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline">ورود</Button>
              <Button>ثبت نام</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              پلتفرم تجارت الکترونیک مدرن
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              پیناکا یک پلتفرم تجارت الکترونیک کامل است که با استفاده از
              جدیدترین تکنولوژی‌ها ساخته شده است. مدیریت محصولات، سفارشات و
              مشتریان را به راحتی انجام دهید.
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                شروع کنید
              </Button>
              <Button variant="outline" size="lg">
                بیشتر بدانید
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ویژگی‌های کلیدی
            </h2>
            <p className="text-lg text-gray-600">
              تمام ابزارهایی که برای مدیریت کسب و کار آنلاین خود نیاز دارید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-lg p-6 mb-4 inline-block">
                <ShoppingCart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                مدیریت سفارشات
              </h3>
              <p className="text-gray-600">
                سفارشات را به راحتی مدیریت کنید و وضعیت آن‌ها را پیگیری کنید
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-6 mb-4 inline-block">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                مدیریت محصولات
              </h3>
              <p className="text-gray-600">
                محصولات خود را اضافه، ویرایش و مدیریت کنید
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-6 mb-4 inline-block">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                مدیریت مشتریان
              </h3>
              <p className="text-gray-600">
                اطلاعات مشتریان را مدیریت کنید و روابط را تقویت کنید
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-6 mb-4 inline-block">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                گزارش‌گیری
              </h3>
              <p className="text-gray-600">
                گزارش‌های دقیق از عملکرد کسب و کار خود دریافت کنید
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            آماده شروع هستید؟
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            همین امروز پلتفرم تجارت الکترونیک خود را راه‌اندازی کنید
          </p>
          <Button size="lg" variant="secondary">
            شروع رایگان
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">پیناکا</h3>
              <p className="text-gray-400">
                پلتفرم تجارت الکترونیک مدرن برای کسب و کارهای آنلاین
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">محصولات</h4>
              <ul className="space-y-2 text-gray-400">
                <li>مدیریت محصولات</li>
                <li>سفارشات</li>
                <li>مشتریان</li>
                <li>گزارش‌گیری</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">پشتیبانی</h4>
              <ul className="space-y-2 text-gray-400">
                <li>راهنما</li>
                <li>تماس با ما</li>
                <li>سوالات متداول</li>
                <li>مرکز کمک</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">شرکت</h4>
              <ul className="space-y-2 text-gray-400">
                <li>درباره ما</li>
                <li>شغل‌ها</li>
                <li>اخبار</li>
                <li>حریم خصوصی</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 پیناکا. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
