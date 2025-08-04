# Pinaka E-commerce Frontend

یک پلتفرم تجارت الکترونیک مدرن ساخته شده با Next.js 15، TypeScript، و Bun.

## 🚀 ویژگی‌ها

### ✨ ویژگی‌های اصلی
- **احراز هویت کامل**: ورود، ثبت نام، و مدیریت پروفایل
- **مدیریت محصولات**: CRUD کامل برای محصولات با فیلتر و جستجو
- **مدیریت سفارشات**: پیگیری و مدیریت سفارشات
- **سبد خرید**: مدیریت سبد خرید با ذخیره‌سازی محلی
- **داشبورد مدیریت**: آمار و گزارش‌گیری
- **پشتیبانی از RTL**: طراحی شده برای زبان فارسی
- **Responsive Design**: سازگار با تمام دستگاه‌ها

### 🛠️ تکنولوژی‌های استفاده شده
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Package Manager**: Bun
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Form Management**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Notifications**: Sonner
- **Icons**: Lucide React

## 📦 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+ یا Bun
- Backend API (در حال اجرا روی پورت 3000)

### نصب وابستگی‌ها
```bash
# با استفاده از Bun
bun install

# یا با استفاده از npm
npm install
```

### تنظیم متغیرهای محیطی
فایل `.env.local` را ایجاد کنید:
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_VERSION=v1

# Authentication
NEXT_PUBLIC_AUTH_TOKEN_KEY=pinaka_auth_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=pinaka_refresh_token

# Application Configuration
NEXT_PUBLIC_APP_NAME=Pinaka E-commerce
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### اجرای پروژه
```bash
# Development
bun run dev

# Build
bun run build

# Start production
bun run start
```

## 🏗️ ساختار پروژه

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # صفحات احراز هویت
│   ├── (dashboard)/       # صفحات داشبورد
│   ├── (shop)/           # صفحات فروشگاه
│   └── layout.tsx        # Layout اصلی
├── components/            # کامپوننت‌های React
│   ├── ui/              # کامپوننت‌های UI پایه
│   ├── forms/           # فرم‌ها
│   └── layout/          # کامپوننت‌های Layout
├── lib/                  # کتابخانه‌ها و utilities
│   ├── api/             # سرویس‌های API
│   ├── store/           # Zustand stores
│   ├── utils/           # توابع کمکی
│   └── hooks/           # Custom hooks
└── types/               # تعاریف TypeScript
```

## 🔐 احراز هویت

### نقش‌های کاربری
- **Admin**: دسترسی کامل به تمام بخش‌ها
- **Manager**: مدیریت محصولات و سفارشات
- **Customer**: خرید و مدیریت پروفایل

### تست کاربران
```
Admin: 09123456789 / Admin123!
Manager: 09123456788 / Manager123!
Customer: 09123456787 / Customer123!
```

## 📱 صفحات اصلی

### 🏠 صفحه اصلی
- معرفی پلتفرم
- ویژگی‌های کلیدی
- لینک‌های سریع

### 🔐 صفحات احراز هویت
- `/login` - ورود به سیستم
- `/register` - ثبت نام
- `/forgot-password` - فراموشی رمز عبور

### 🛍️ فروشگاه
- `/products` - مشاهده محصولات
- `/cart` - سبد خرید
- `/product/[id]` - جزئیات محصول

### 📊 داشبورد مدیریت
- `/admin` - داشبورد اصلی
- `/admin/products` - مدیریت محصولات
- `/admin/orders` - مدیریت سفارشات
- `/admin/customers` - مدیریت مشتریان
- `/admin/analytics` - گزارش‌گیری

## 🔧 API Integration

### Endpoints اصلی
```typescript
// Authentication
POST /api/v1/auth/login
POST /api/v1/auth/register
GET /api/v1/auth/me

// Products
GET /api/v1/products
POST /api/v1/products
PUT /api/v1/products/:id
DELETE /api/v1/products/:id

// Orders
GET /api/v1/orders
POST /api/v1/orders
PUT /api/v1/orders/:id
DELETE /api/v1/orders/:id
```

## 🎨 UI Components

### کامپوننت‌های پایه
- `Button` - دکمه‌های مختلف
- `Input` - فیلدهای ورودی
- `Card` - کارت‌های محتوا
- `Badge` - نشان‌های وضعیت
- `Modal` - پنجره‌های پاپ‌آپ

### فرم‌ها
- `LoginForm` - فرم ورود
- `RegisterForm` - فرم ثبت نام
- `ProductForm` - فرم محصولات

## 📊 State Management

### Zustand Stores
- `authStore` - مدیریت احراز هویت
- `cartStore` - مدیریت سبد خرید
- `uiStore` - مدیریت UI state

### TanStack Query
- مدیریت cache و state server
- Optimistic updates
- Error handling

## 🧪 تست

### اجرای تست‌ها
```bash
# تمام تست‌ها
bun run test

# تست با watch mode
bun run test:watch

# تست با coverage
bun run test:coverage
```

### تست‌های موجود
- Unit tests برای utilities
- Component tests
- Integration tests
- API mocking با MSW

## 🐳 Docker

### Development
```bash
docker-compose --profile dev up
```

### Production
```bash
docker-compose up
```

## 🔒 امنیت

### ویژگی‌های امنیتی
- JWT token authentication
- CSRF protection
- XSS prevention
- Secure localStorage usage
- Input validation با Zod
- Rate limiting

## 📈 Performance

### بهینه‌سازی‌ها
- Code splitting
- Image optimization
- Lazy loading
- Bundle optimization
- Caching strategies

## 🌐 Internationalization

### پشتیبانی از زبان‌ها
- فارسی (RTL)
- فرمت‌بندی ارز (ریال ایران)
- تاریخ شمسی
- شماره تلفن ایرانی

## 🚀 Deployment

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker build -t pinaka-frontend .
docker run -p 3001:3001 pinaka-frontend
```

## 📝 Contributing

### مراحل مشارکت
1. Fork پروژه
2. ایجاد feature branch
3. Commit تغییرات
4. Push به branch
5. ایجاد Pull Request

### Coding Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits

## 📄 License

این پروژه تحت مجوز MIT منتشر شده است.

## 🤝 Support

برای پشتیبانی و سوالات:
- ایجاد Issue در GitHub
- تماس با تیم توسعه
- مستندات کامل در Wiki

## 🗺️ Roadmap

### نسخه‌های آینده
- [ ] پشتیبانی از چندین زبان
- [ ] سیستم امتیازدهی و نظرات
- [ ] سیستم تخفیف و کوپن
- [ ] پیگیری سفارشات
- [ ] سیستم اطلاع‌رسانی
- [ ] PWA support
- [ ] Mobile app

---

**توسعه داده شده با ❤️ توسط تیم Pinaka**
