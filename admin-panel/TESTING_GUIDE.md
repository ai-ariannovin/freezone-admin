# راهنمای تست‌های اتوماتیک - FreeZone Admin Panel

## 📋 خلاصه

این پروژه شامل سه نوع تست اتوماتیک است با توزیع منطقی زیر:

| نوع تست | درصد منطقی | وضعیت فعلی |
| --- | --- | --- |
| Unit (50–60٪) | تست منطق خالص و توابع | ✅ اجرا و پاس (22 تست) |
| Integration (25–30٪) | تست تعامل چند بخش UI/logic | ✅ اجرا و پاس (UpsertEntityModal, DataTable) |
| E2E (10–15٪) | مسیرهای حیاتی کاربر | 🔄 در حال پایدارسازی (Role Management, Navigation) |

---

## 🛠️ ابزارهای تست

### Jest + React Testing Library (Unit/Integration)
- jest, jest-environment-jsdom
- @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
- babel-jest با presets: @babel/preset-env, @babel/preset-react (runtime: automatic), @babel/preset-typescript

### Playwright (E2E)
- @playwright/test (Chromium فعال؛ مرورگرهای دیگر قابل افزودن)

---

## 📁 ساختار تست‌ها

```
admin-panel/
├── jest.config.js                 # تنظیمات Jest (به‌روزشده با testMatch جدید)
├── playwright.config.ts           # تنظیمات Playwright (Chromium فعال)
├── src/
│   ├── __tests__/setup.ts         # setup فایل Jest (تست نیست)
│   ├── __tests__/test-utils.tsx   # ابزارهای کمکی (تست نیست)
│   ├── validators/__tests__/
│   │   ├── role.schema.test.ts
│   │   ├── permission.schema.test.ts
│   │   └── category.schema.test.ts
│   └── components/
│       ├── ui/__tests__/data-table.test.tsx
│       └── roles/modals/__tests__/UpsertEntityModal.test.tsx
└── e2e/
    ├── role-management.spec.ts
    └── navigation.spec.ts
```

نکته: setup.ts و test-utils.tsx «فایل تست» نیستند و با testMatch جدید اجرا نمی‌شوند.

---

## 🎯 تست‌های پیاده‌سازی‌شده

### 1) Unit Tests (22 تست)
- validators
  - role.schema.test.ts: اعتبارسنجی داده معتبر/نامعتبر، پیام‌های فارسی، edge cases
  - permission.schema.test.ts: اعتبارسنجی slug/model/category، پیام‌های فارسی
  - category.schema.test.ts: اعتبارسنجی name/title، پیام‌های فارسی

### 2) Integration Tests
- UpsertEntityModal.test.tsx: رندر مودال، فیلدهای تب‌ها، تعامل کاربر، جلوگیری از submit روی ولیدیشن نامعتبر
- data-table.test.tsx: رندر جدول، جستجو، سورت، ایندکس سطر، RTL، pagination

Best practices که رعایت شده:
- استفاده از getByRole برای عناصر معنی‌دار (heading, button, table)
- پرهیز از وابستگی به متن‌های شکننده در صورت وجود role قابل اتکا
- Mock لایه Auth در تست‌های واحد/اینtegration در صورت نیاز

### 3) E2E Tests (در حال پایدارسازی)
- role-management.spec.ts: نمایش صفحه نقش‌ها، افزودن/ویرایش/حذف نقش، جستجو، سوییچ تب‌ها
- navigation.spec.ts: ناوبری سایدبار، آیتم فعال، دسترسی غیرمجاز

نکات مهم E2E:
- از getByRole برای انتخاب المان‌های پایدار استفاده کنید (مثلاً heading صفحه).
- در صورت چندتایی بودن متن، از role/label/placeholder یا محل‌نمایی دقیق‌تر استفاده کنید؛ فقط در صورت نیاز سراغ data-testid بروید.
- اگر مسیرها محافظت‌شده‌اند، انتظار ریدایرکت به login را بنویسید.

---

## 🚀 نحوه اجرای تست‌ها

همیشه ابتدا در پوشه `admin-panel` باشید.

### Unit/Integration (Jest)
```bash
# PowerShell
cd admin-panel
npm test                 # اجرای همه تست‌های واحد/یکپارچه
npm run test:watch       # حالت تماشای تغییرات
npm run test:coverage    # همراه با پوشش کد
```

### E2E (Playwright)
```bash
# PowerShell
cd admin-panel
npm run dev              # در یک ترمینال جدا اجرا شود
# در ترمینال دوم:
npm run test:e2e         # اجرای تست‌های E2E (Chromium)
# یا با UI
npm run test:e2e:ui
# یا هدلس/هدد
npm run test:e2e:headed
```

نکته:
- اگر پورت 3000 اشغال بود، ابتدا پردازش قبلی را متوقف کنید (Windows):
```powershell
netstat -ano | findstr :3000
# سپس
taskkill /PID <PID> /F
```

---

## ⚙️ پیکربندی‌ها (گزیده)

### jest.config.js (به‌روز)
```js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testMatch: ['<rootDir>/src/**/*.{test,spec}.{ts,tsx}'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript'
      ]
    }]
  }
}
```

### playwright.config.ts (گزیده)
```ts
export default defineConfig({
  testDir: './e2e',
  retries: 1,
  use: { baseURL: 'http://localhost:3000', trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: { command: 'npm run dev', url: 'http://localhost:3000', reuseExistingServer: true, cwd: './' },
})
```

---

## ✅ نکات عملی برای نوشتن تست‌های پایدار
- ترجیح: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > `data-testid`
- در صورت چندتایی شدن locatorها، به role/label محدود کنید (strict mode را رعایت کنید).
- برای Action‌ها از نام دکمه‌ها استفاده کنید (Role/Name) و از متن‌های تزیینی پرهیز کنید.
- تست‌های E2E را به مسیرهای حیاتی محدود نگه دارید تا هزینه نگه‌داری کم شود.

---

## جمع‌بندی
- Unit/Integration پایدار و قابل اجرا هستند.
- E2E در حال پایدارسازی است؛ انتخابگرها به `getByRole` مهاجرت یافته‌اند و فقط در صورت نیاز از `data-testid` استفاده شده است.
- دستورهای اجرا و تروبل‌شوتینگ در این راهنما ثبت شد.

