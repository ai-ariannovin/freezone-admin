'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  FunnelIcon,
  UsersIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Mock data for charts
const userRegistrationData = [
  { month: 'فروردین', users: 120 },
  { month: 'اردیبهشت', users: 150 },
  { month: 'خرداد', users: 180 },
  { month: 'تیر', users: 200 },
  { month: 'مرداد', users: 220 },
  { month: 'شهریور', users: 250 },
]

const licenseStatusData = [
  { name: 'فعال', value: 65, color: '#10B981' },
  { name: 'غیرفعال', value: 20, color: '#F59E0B' },
  { name: 'منقضی', value: 15, color: '#EF4444' },
]

const businessTypeData = [
  { type: 'تجاری', count: 45 },
  { type: 'صنعتی', count: 30 },
  { type: 'خدماتی', count: 25 },
]

const requestTrendData = [
  { month: 'فروردین', requests: 45, approved: 40, rejected: 5 },
  { month: 'اردیبهشت', requests: 52, approved: 48, rejected: 4 },
  { month: 'خرداد', requests: 48, approved: 44, rejected: 4 },
  { month: 'تیر', requests: 61, approved: 55, rejected: 6 },
  { month: 'مرداد', requests: 55, approved: 50, rejected: 5 },
  { month: 'شهریور', requests: 67, approved: 60, rejected: 7 },
]

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [selectedReportType, setSelectedReportType] = useState('overview')

  const reportTypes = [
    { id: 'overview', name: 'نمای کلی', icon: ChartBarIcon },
    { id: 'users', name: 'گزارش کاربران', icon: UsersIcon },
    { id: 'licenses', name: 'گزارش مجوزها', icon: DocumentTextIcon },
    { id: 'businesses', name: 'گزارش کسب‌وکارها', icon: BuildingOfficeIcon },
  ]

  const periods = [
    { id: '1month', name: '1 ماه گذشته' },
    { id: '3months', name: '3 ماه گذشته' },
    { id: '6months', name: '6 ماه گذشته' },
    { id: '1year', name: '1 سال گذشته' },
  ]

  const handleExportReport = (format: 'excel' | 'pdf') => {
    console.log(`Exporting ${selectedReportType} report as ${format}`)
    // TODO: Implement export functionality
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">گزارش‌گیری و آمار</h1>
          <p className="mt-2 text-sm text-gray-700">
            گزارش‌های تحلیلی و آمار عملکرد سیستم
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2 space-x-reverse">
          <button
            onClick={() => handleExportReport('excel')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DocumentArrowDownIcon className="h-4 w-4 ml-1" />
            خروجی Excel
          </button>
          <button
            onClick={() => handleExportReport('pdf')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DocumentArrowDownIcon className="h-4 w-4 ml-1" />
            خروجی PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">
              نوع گزارش
            </label>
            <select
              id="report-type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700">
              بازه زمانی
            </label>
            <select
              id="period"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              {periods.map(period => (
                <option key={period.id} value={period.id}>{period.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FunnelIcon className="h-4 w-4 ml-1" />
              اعمال فیلتر
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">کل کاربران</dt>
                  <dd className="text-lg font-medium text-gray-900">1,234</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BuildingOfficeIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">کل کسب‌وکارها</dt>
                  <dd className="text-lg font-medium text-gray-900">856</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">کل مجوزها</dt>
                  <dd className="text-lg font-medium text-gray-900">2,456</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">درخواست‌های در انتظار</dt>
                  <dd className="text-lg font-medium text-gray-900">89</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* User Registration Trend */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            روند ثبت‌نام کاربران
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* License Status Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            توزیع وضعیت مجوزها
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={licenseStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {licenseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Request Trends */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            روند درخواست‌ها
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3B82F6" name="کل درخواست‌ها" />
                <Bar dataKey="approved" fill="#10B981" name="تایید شده" />
                <Bar dataKey="rejected" fill="#EF4444" name="رد شده" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Business Types */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            انواع کسب‌وکار
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={businessTypeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="type" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            گزارش تفصیلی
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    شاخص
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    مقدار فعلی
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تغییر نسبت به ماه قبل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    روند
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ثبت‌نام کاربران جدید
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    250
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    +12%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      صعودی
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    درخواست‌های مجوز
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    67
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    +8%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      صعودی
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    نرخ تایید درخواست‌ها
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    89.5%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    -2%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      نزولی
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
