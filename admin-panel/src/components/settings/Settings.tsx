'use client'

import { useState } from 'react'
import { 
  CogIcon,
  ServerIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  GlobeAltIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

interface SettingSection {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
}

const settingSections: SettingSection[] = [
  {
    id: 'general',
    name: 'عمومی',
    description: 'تنظیمات کلی سیستم',
    icon: CogIcon
  },
  {
    id: 'api',
    name: 'API و اتصالات',
    description: 'تنظیمات API و اتصالات خارجی',
    icon: ServerIcon
  },
  {
    id: 'security',
    name: 'امنیت',
    description: 'تنظیمات امنیتی و احراز هویت',
    icon: ShieldCheckIcon
  },
  {
    id: 'notifications',
    name: 'اعلان‌ها',
    description: 'تنظیمات اعلان‌ها و اطلاع‌رسانی',
    icon: BellIcon
  },
  {
    id: 'database',
    name: 'پایگاه داده',
    description: 'تنظیمات پایگاه داده و پشتیبان‌گیری',
    icon: CircleStackIcon
  },
  {
    id: 'logging',
    name: 'لاگ‌ها',
    description: 'تنظیمات لاگ‌گیری و مانیتورینگ',
    icon: DocumentTextIcon
  }
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general')

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">تنظیمات عمومی</h3>
        <p className="mt-1 text-sm text-gray-500">
          تنظیمات کلی سیستم و نمایش
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="app-name" className="block text-sm font-medium text-gray-700">
            نام برنامه
          </label>
          <input
            type="text"
            id="app-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="پنل ادمین - پنجره واحد"
          />
        </div>

        <div>
          <label htmlFor="app-version" className="block text-sm font-medium text-gray-700">
            نسخه برنامه
          </label>
          <input
            type="text"
            id="app-version"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="1.0.0"
          />
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
            منطقه زمانی
          </label>
          <select
            id="timezone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="Asia/Tehran">تهران (GMT+3:30)</option>
            <option value="UTC">UTC (GMT+0)</option>
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            زبان سیستم
          </label>
          <select
            id="language"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="fa">فارسی</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderAPISettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">تنظیمات API</h3>
        <p className="mt-1 text-sm text-gray-500">
          تنظیمات اتصالات API و سرویس‌های خارجی
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="api-url" className="block text-sm font-medium text-gray-700">
            URL پایه API
          </label>
          <input
            type="url"
            id="api-url"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="http://localhost:8000/api"
          />
        </div>

        <div>
          <label htmlFor="api-timeout" className="block text-sm font-medium text-gray-700">
            زمان انتظار API (ثانیه)
          </label>
          <input
            type="number"
            id="api-timeout"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="30"
          />
        </div>

        <div>
          <label htmlFor="elk-url" className="block text-sm font-medium text-gray-700">
            URL سرور ELK
          </label>
          <input
            type="url"
            id="elk-url"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="http://localhost:9200"
          />
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">تنظیمات امنیت</h3>
        <p className="mt-1 text-sm text-gray-500">
          تنظیمات امنیتی و احراز هویت
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="enable-2fa"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="enable-2fa" className="mr-2 block text-sm text-gray-900">
            فعال‌سازی احراز هویت دو مرحله‌ای
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="enable-session-timeout"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            defaultChecked
          />
          <label htmlFor="enable-session-timeout" className="mr-2 block text-sm text-gray-900">
            فعال‌سازی انقضای خودکار جلسه
          </label>
        </div>

        <div>
          <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700">
            مدت زمان جلسه (دقیقه)
          </label>
          <input
            type="number"
            id="session-timeout"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="60"
          />
        </div>

        <div>
          <label htmlFor="password-policy" className="block text-sm font-medium text-gray-700">
            سیاست رمز عبور
          </label>
          <select
            id="password-policy"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="basic">پایه (حداقل 6 کاراکتر)</option>
            <option value="medium">متوسط (حداقل 8 کاراکتر + اعداد)</option>
            <option value="strong">قوی (حداقل 12 کاراکتر + اعداد + نمادها)</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">تنظیمات اعلان‌ها</h3>
        <p className="mt-1 text-sm text-gray-500">
          تنظیمات اعلان‌ها و اطلاع‌رسانی
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="email-notifications"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            defaultChecked
          />
          <label htmlFor="email-notifications" className="mr-2 block text-sm text-gray-900">
            اعلان‌های ایمیل
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="sms-notifications"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="sms-notifications" className="mr-2 block text-sm text-gray-900">
            اعلان‌های پیامک
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="push-notifications"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            defaultChecked
          />
          <label htmlFor="push-notifications" className="mr-2 block text-sm text-gray-900">
            اعلان‌های مرورگر
          </label>
        </div>

        <div>
          <label htmlFor="notification-email" className="block text-sm font-medium text-gray-700">
            ایمیل اعلان‌ها
          </label>
          <input
            type="email"
            id="notification-email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="admin@freezone.ir"
          />
        </div>
      </div>
    </div>
  )

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">تنظیمات پایگاه داده</h3>
        <p className="mt-1 text-sm text-gray-500">
          تنظیمات پایگاه داده و پشتیبان‌گیری
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="db-host" className="block text-sm font-medium text-gray-700">
            میزبان پایگاه داده
          </label>
          <input
            type="text"
            id="db-host"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="localhost"
          />
        </div>

        <div>
          <label htmlFor="db-name" className="block text-sm font-medium text-gray-700">
            نام پایگاه داده
          </label>
          <input
            type="text"
            id="db-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="freezone"
          />
        </div>

        <div className="flex items-center">
          <input
            id="auto-backup"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            defaultChecked
          />
          <label htmlFor="auto-backup" className="mr-2 block text-sm text-gray-900">
            پشتیبان‌گیری خودکار
          </label>
        </div>

        <div>
          <label htmlFor="backup-frequency" className="block text-sm font-medium text-gray-700">
            فرکانس پشتیبان‌گیری
          </label>
          <select
            id="backup-frequency"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="daily">روزانه</option>
            <option value="weekly">هفتگی</option>
            <option value="monthly">ماهانه</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderLoggingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">تنظیمات لاگ‌گیری</h3>
        <p className="mt-1 text-sm text-gray-500">
          تنظیمات لاگ‌گیری و مانیتورینگ
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="log-level" className="block text-sm font-medium text-gray-700">
            سطح لاگ
          </label>
          <select
            id="log-level"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            id="enable-audit-log"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            defaultChecked
          />
          <label htmlFor="enable-audit-log" className="mr-2 block text-sm text-gray-900">
            فعال‌سازی لاگ‌های حسابرسی
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="enable-performance-log"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="enable-performance-log" className="mr-2 block text-sm text-gray-900">
            فعال‌سازی لاگ‌های عملکرد
          </label>
        </div>

        <div>
          <label htmlFor="log-retention" className="block text-sm font-medium text-gray-700">
            مدت نگهداری لاگ‌ها (روز)
          </label>
          <input
            type="number"
            id="log-retention"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="30"
          />
        </div>
      </div>
    </div>
  )

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings()
      case 'api':
        return renderAPISettings()
      case 'security':
        return renderSecuritySettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'database':
        return renderDatabaseSettings()
      case 'logging':
        return renderLoggingSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">تنظیمات سیستم</h1>
        <p className="mt-2 text-sm text-gray-700">
          مدیریت تنظیمات و پیکربندی سیستم
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Settings navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {settingSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === section.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <section.icon className="h-5 w-5 ml-3" />
                <div className="text-right">
                  <div>{section.name}</div>
                  <div className="text-xs text-gray-500">{section.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings content */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {renderActiveSection()}
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ذخیره تغییرات
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  بازنشانی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
