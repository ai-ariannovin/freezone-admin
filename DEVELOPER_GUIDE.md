## راهنمای توسعه – FreeZone Admin (Next.js + React + TS)

### معماری و لایه‌ها
- App Router (src/app) برای صفحات
- Components: اتم‌ها و مولکول‌های UI در `src/components/ui/*`
- Feature Components: هر فیچر پوشه خودش (مثلاً `components/roles/`)
  - tables/, modals/ و Container (RoleManagement)
- Contexts: سشن و مجوزها در `src/contexts/AuthContext.tsx`
- Lib: api.ts، utils.ts و سرویس‌های بعدی
- Validators: zod schemas در `src/validators/*`

### الگوهای طراحی
- Container-Presenter: جداسازی orchestration از نمایش
- Repository/Facade (آتی): جداسازی دیتاسورس از UI
- Custom Hooks (آتی): use[Feature]Management برای منطق دامین
- Schema-based Validation: zod + RHF

### کامپوننت‌های مشترک
- DataTable: جست‌وجو، سورت، صفحه‌بندی، RTL
- Dropdown: RTL، truncate/wrap، tooltip، هم‌اندازه تریگر
- Dialog, Input, Select, Badge, Button

### RBAC
- `ProtectedRoute` برای کنترل دسترسی صفحات
- اسلاگ‌ها هم‌راستا با دیتامدل: view.users, view.roles, edit.permissions, …

### گردش توسعه فیچر جدید
1) تعریف types و schema در `src/validators/*`
2) ساخت فرم با RHF + zodResolver (پیام‌های فارسی)
3) نمایش لیست با DataTable (ستون‌های اصلی، ستون ردیف، عملیات)
4) مودال Upsert/حذف/اکشن‌ها در `components/[feature]/modals`
5) اتصال به سرویس/ریپو (فعلاً mock؛ بعداً API)
6) گارد دسترسی در صفحه (requiredPermissions)

### نام‌گذاری و کنوانسیون‌ها
- اسلاگ‌ها: حروف کوچک با نقطه/خط‌تیره (view.users)
- فایل‌ها: PascalCase برای کامپوننت، kebab-case در URL
- متن‌ها: فارسی، RTL رعایت شود

### تست و کیفیت
- TypeScript strict-friendly
- Lint قبل از PR
- تست دستی: CRUD، مجوزها، RTL، DataTable

### استقرار و تنظیمات
- NEXT_PUBLIC_API_URL در `.env.local`
- اگر از GitHub CLI استفاده می‌کنید: `gh repo create ...`




