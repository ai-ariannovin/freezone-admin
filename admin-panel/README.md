# پنل ادمین - پنجره واحد صدور مجوزهای کسب‌وکار

پنل مدیریتی برای سیستم پنجره واحد صدور مجوزهای کسب‌وکار که با Next.js 15 و TypeScript ساخته شده است.

## ویژگی‌ها

### ✅ پیاده‌سازی شده
- **داشبورد اصلی** با آمار و نمودارهای کلی
- **مدیریت کاربران** با قابلیت جستجو، فیلتر و عملیات CRUD
- **مدیریت درختواره ISIC** با نمایش سلسله مراتبی
- **Layout ریسپانسیو** با Sidebar و Header
- **پشتیبانی کامل از RTL** برای زبان فارسی
- **UI مدرن** با Tailwind CSS و Headless UI

### 🔄 در حال توسعه
- سیستم احراز هویت و مدیریت نقش‌ها
- مدیریت مجوزها و کاربرگ‌ها
- گزارش‌گیری و داشبوردهای تحلیلی
- نمایش لاگ‌ها و رخدادها

## تکنولوژی‌ها

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **State Management**: React Hooks
- **API Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **Date Handling**: date-fns

## نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+ 
- npm یا yarn

### مراحل نصب

1. **کلون کردن پروژه**
```bash
git clone <repository-url>
cd admin-panel
```

2. **نصب وابستگی‌ها**
```bash
npm install
```

3. **اجرای پروژه در حالت توسعه**
```bash
npm run dev
```

4. **باز کردن مرورگر**
```
http://localhost:3000
```

## ساختار پروژه

```
admin-panel/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── globals.css        # استایل‌های全局
│   │   ├── layout.tsx         # Layout اصلی
│   │   ├── page.tsx           # صفحه اصلی (داشبورد)
│   │   ├── users/             # صفحات مدیریت کاربران
│   │   └── isic/              # صفحات مدیریت ISIC
│   ├── components/            # کامپوننت‌های قابل استفاده مجدد
│   │   ├── layout/            # کامپوننت‌های Layout
│   │   ├── dashboard/         # کامپوننت‌های داشبورد
│   │   ├── users/             # کامپوننت‌های مدیریت کاربران
│   │   └── isic/              # کامپوننت‌های مدیریت ISIC
│   ├── lib/                   # توابع کمکی و تنظیمات
│   │   ├── utils.ts           # توابع کمکی
│   │   └── api.ts             # تنظیمات API
│   └── types/                 # تعریف انواع TypeScript
│       └── index.ts           # انواع اصلی
├── public/                    # فایل‌های استاتیک
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## صفحات موجود

### 1. داشبورد (`/`)
- نمایش آمار کلی سیستم
- فعالیت‌های اخیر
- اقدامات سریع

### 2. مدیریت کاربران (`/users`)
- لیست کاربران با قابلیت جستجو و فیلتر
- عملیات CRUD برای کاربران
- نمایش جزئیات کاربران (حقیقی/حقوقی)

### 3. مدیریت ISIC (`/isic`)
- نمایش درختواره سلسله مراتبی ISIC
- جستجو و فیلتر بر اساس سطح و وضعیت
- عملیات ویرایش و حذف گره‌ها

## API Integration

پروژه برای ارتباط با API Laravel طراحی شده است:

```typescript
// مثال استفاده از API
import api from '@/lib/api'

// دریافت لیست کاربران
const users = await api.get('/users')

// ایجاد کاربر جدید
const newUser = await api.post('/users', userData)
```

## تنظیمات محیط

برای تنظیم متغیرهای محیطی، فایل `.env.local` ایجاد کنید:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## استایل‌دهی

پروژه از Tailwind CSS استفاده می‌کند و پشتیبانی کامل از RTL دارد:

```css
/* مثال استفاده از کلاس‌های RTL */
<div className="text-right space-x-2 space-x-reverse">
  <span>متن راست‌چین</span>
  <span>با فاصله‌گذاری صحیح</span>
</div>
```

## توسعه

### افزودن صفحه جدید

1. **ایجاد فایل صفحه** در `src/app/`
2. **ایجاد کامپوننت** در `src/components/`
3. **اضافه کردن به منوی Sidebar**

### افزودن کامپوننت جدید

```typescript
// src/components/MyComponent.tsx
'use client'

interface MyComponentProps {
  title: string
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
    </div>
  )
}
```

## تست

```bash
# اجرای تست‌ها
npm run test

# اجرای تست‌ها با coverage
npm run test:coverage
```

## Build

```bash
# Build برای production
npm run build

# اجرای نسخه production
npm start
```

## مشارکت

1. Fork کنید
2. Branch جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Branch را push کنید (`git push origin feature/amazing-feature`)
5. Pull Request ایجاد کنید

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## پشتیبانی

برای پشتیبانی و سوالات، با تیم توسعه تماس بگیرید.