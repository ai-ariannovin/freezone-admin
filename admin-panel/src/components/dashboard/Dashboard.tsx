'use client'

import { useState, useEffect } from 'react'
import { 
  UsersIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { formatDate } from '@/lib/utils'

interface DashboardStats {
  total_users: number
  total_businesses: number
  total_licenses: number
  total_requests: number
  pending_requests: number
  approved_requests: number
  rejected_requests: number
}

const stats = [
  {
    name: 'کل کاربران',
    value: '1,234',
    change: '+12%',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'کل کسب‌وکارها',
    value: '856',
    change: '+8%',
    changeType: 'positive',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'کل مجوزها',
    value: '2,456',
    change: '+15%',
    changeType: 'positive',
    icon: DocumentTextIcon,
  },
  {
    name: 'درخواست‌های در انتظار',
    value: '89',
    change: '-5%',
    changeType: 'negative',
    icon: ClockIcon,
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'user_registered',
    user: 'احمد محمدی',
    description: 'کاربر جدید ثبت نام کرد',
    time: '2 ساعت پیش',
    icon: UsersIcon,
    iconColor: 'text-green-500',
  },
  {
    id: 2,
    type: 'license_approved',
    user: 'شرکت فناوری پارس',
    description: 'مجوز کسب‌وکار تایید شد',
    time: '4 ساعت پیش',
    icon: CheckCircleIcon,
    iconColor: 'text-blue-500',
  },
  {
    id: 3,
    type: 'request_rejected',
    user: 'علی رضایی',
    description: 'درخواست مجوز رد شد',
    time: '6 ساعت پیش',
    icon: XCircleIcon,
    iconColor: 'text-red-500',
  },
  {
    id: 4,
    type: 'business_created',
    user: 'شرکت تجاری تهران',
    description: 'کسب‌وکار جدید ایجاد شد',
    time: '8 ساعت پیش',
    icon: BuildingOfficeIcon,
    iconColor: 'text-purple-500',
  },
]

export default function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    // Simulate API call
    setDashboardStats({
      total_users: 1234,
      total_businesses: 856,
      total_licenses: 2456,
      total_requests: 3456,
      pending_requests: 89,
      approved_requests: 3200,
      rejected_requests: 167,
    })
  }, [])

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">داشبورد</h1>
        <p className="mt-2 text-sm text-gray-700">
          نمای کلی از وضعیت سیستم و آمار مهم
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                </div>
                <div className="mr-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {item.value}
                      </div>
                      <div
                        className={`mr-2 flex items-baseline text-sm font-semibold ${
                          item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and activities */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent activities */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              فعالیت‌های اخیر
            </h3>
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {recentActivities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.length - 1 ? (
                        <span
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3 space-x-reverse">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              activity.iconColor
                            }`}
                          >
                            <activity.icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4 space-x-reverse">
                          <div>
                            <p className="text-sm text-gray-500">
                              {activity.description}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {activity.user}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              اقدامات سریع
            </h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <UsersIcon className="h-5 w-5 ml-2" />
                مدیریت کاربران
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <DocumentTextIcon className="h-5 w-5 ml-2" />
                مدیریت مجوزها
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <ClipboardDocumentListIcon className="h-5 w-5 ml-2" />
                گزارش‌گیری
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
