'use client'

import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  BugAntIcon,
  CalendarIcon,
  UserIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import { LogEntry } from '@/types'
import { formatDateTime } from '@/lib/utils'

// Mock data
const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    level: 'info',
    message: 'کاربر جدید ثبت نام کرد',
    context: {
      user_id: 123,
      user_type: 'individual',
      ip_address: '192.168.1.100'
    },
    user_id: 123,
    request_id: 'req_001'
  },
  {
    id: '2',
    timestamp: '2024-01-15T10:25:00Z',
    level: 'warning',
    message: 'تلاش ناموفق برای ورود',
    context: {
      user_id: 456,
      ip_address: '192.168.1.101',
      attempt_count: 3
    },
    user_id: 456,
    request_id: 'req_002'
  },
  {
    id: '3',
    timestamp: '2024-01-15T10:20:00Z',
    level: 'error',
    message: 'خطا در پردازش درخواست مجوز',
    context: {
      license_id: 789,
      error_code: 'LICENSE_001',
      error_details: 'Missing required documents'
    },
    user_id: 123,
    request_id: 'req_003'
  },
  {
    id: '4',
    timestamp: '2024-01-15T10:15:00Z',
    level: 'debug',
    message: 'API call completed successfully',
    context: {
      endpoint: '/api/licenses',
      method: 'POST',
      response_time: 150
    },
    request_id: 'req_004'
  },
  {
    id: '5',
    timestamp: '2024-01-15T10:10:00Z',
    level: 'info',
    message: 'مجوز جدید صادر شد',
    context: {
      license_id: 790,
      license_code: 'LIC001',
      user_id: 123
    },
    user_id: 123,
    request_id: 'req_005'
  }
]

const logLevels = [
  { id: 'all', name: 'همه', color: 'gray' },
  { id: 'info', name: 'اطلاعات', color: 'blue' },
  { id: 'warning', name: 'هشدار', color: 'yellow' },
  { id: 'error', name: 'خطا', color: 'red' },
  { id: 'debug', name: 'اشکال‌زدایی', color: 'purple' },
]

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedUser, setSelectedUser] = useState<number | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [logsPerPage] = useState(20)

  useEffect(() => {
    setLogs(mockLogs)
    setFilteredLogs(mockLogs)
  }, [])

  useEffect(() => {
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.message.includes(searchTerm) ||
        log.context?.user_id?.toString().includes(searchTerm) ||
        log.request_id?.includes(searchTerm)
      )
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(log => log.level === selectedLevel)
    }

    if (selectedUser) {
      filtered = filtered.filter(log => log.user_id === selectedUser)
    }

    setFilteredLogs(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedLevel, selectedUser, logs])

  const indexOfLastLog = currentPage * logsPerPage
  const indexOfFirstLog = indexOfLastLog - logsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      case 'debug':
        return <BugAntIcon className="h-5 w-5 text-purple-500" />
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info':
        return 'bg-blue-100 text-blue-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      case 'debug':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelName = (level: string) => {
    const levelObj = logLevels.find(l => l.id === level)
    return levelObj?.name || level
  }

  const handleViewInKibana = (log: LogEntry) => {
    // TODO: Implement Kibana integration
    console.log('View in Kibana:', log)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">لاگ‌ها و رخدادها</h1>
          <p className="mt-2 text-sm text-gray-700">
            مشاهده و تحلیل لاگ‌های سیستم و رخدادها
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <LinkIcon className="h-4 w-4 inline ml-1" />
            باز کردن Kibana
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <InformationCircleIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">اطلاعات</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {logs.filter(l => l.level === 'info').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">هشدارها</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {logs.filter(l => l.level === 'warning').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-6 w-6 text-red-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">خطاها</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {logs.filter(l => l.level === 'error').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BugAntIcon className="h-6 w-6 text-purple-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">اشکال‌زدایی</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {logs.filter(l => l.level === 'debug').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              جستجو
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="جستجو در پیام‌ها، کاربر یا درخواست"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              سطح لاگ
            </label>
            <select
              id="level"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {logLevels.map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
              کاربر
            </label>
            <input
              type="number"
              id="user"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="شناسه کاربر"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value ? Number(e.target.value) : '')}
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setSearchTerm('')
                setSelectedLevel('all')
                setSelectedUser('')
              }}
            >
              <FunnelIcon className="h-4 w-4 ml-1" />
              پاک کردن فیلترها
            </button>
          </div>
        </div>
      </div>

      {/* Logs table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    زمان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    سطح
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    پیام
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    کاربر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    درخواست
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">عملیات</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-gray-400 ml-1" />
                        {formatDateTime(log.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getLevelIcon(log.level)}
                        <span className={`mr-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(log.level)}`}>
                          {getLevelName(log.level)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate" title={log.message}>
                        {log.message}
                      </div>
                      {log.context && Object.keys(log.context).length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {Object.entries(log.context).slice(0, 2).map(([key, value]) => (
                            <span key={key} className="ml-2">
                              {key}: {String(value)}
                            </span>
                          ))}
                          {Object.keys(log.context).length > 2 && (
                            <span className="text-gray-400">...</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user_id ? (
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 text-gray-400 ml-1" />
                          {log.user_id}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.request_id ? (
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {log.request_id}
                        </code>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewInKibana(log)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="مشاهده در Kibana"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  قبلی
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  بعدی
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    نمایش <span className="font-medium">{indexOfFirstLog + 1}</span> تا{' '}
                    <span className="font-medium">{Math.min(indexOfLastLog, filteredLogs.length)}</span> از{' '}
                    <span className="font-medium">{filteredLogs.length}</span> نتیجه
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
