'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  ShieldCheckIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'داشبورد', href: '/', icon: HomeIcon, testId: 'dashboard-menu' },
  { name: 'کاربران', href: '/users', icon: UsersIcon, testId: 'users-menu' },
  { name: 'نقش‌ها و مجوزها', href: '/roles', icon: ShieldCheckIcon, testId: 'roles-menu' },
  { name: 'درختواره ISIC', href: '/isic', icon: Squares2X2Icon, testId: 'isic-menu' },
  { name: 'کسب‌وکارها', href: '/businesses', icon: BuildingOfficeIcon, testId: 'businesses-menu' },
  { name: 'مجوزها', href: '/licenses', icon: DocumentTextIcon, testId: 'licenses-menu' },
  { name: 'کاربرگ‌ها', href: '/forms', icon: ClipboardDocumentListIcon, testId: 'forms-menu' },
  { name: 'گزارش‌ها', href: '/reports', icon: ChartBarIcon, testId: 'reports-menu' },
  { name: 'لاگ‌ها', href: '/logs', icon: DocumentChartBarIcon, testId: 'logs-menu' },
  { name: 'تنظیمات', href: '/settings', icon: CogIcon, testId: 'settings-menu' },
]

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-auto flex h-full w-full max-w-xs flex-1 drop-shadow-2xl">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">بستن منو</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 ring-1 ring-gray-200 px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center border-b border-gray-100">
                    <h1 className="text-xl font-bold text-gray-900">پنل ادمین</h1>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                data-testid={item.testId}
                                aria-current={pathname === item.href ? 'page' : undefined}
                                className={cn(
                                  pathname === item.href
                                    ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100'
                                    : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-50',
                                  'group relative flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-semibold transition-colors'
                                )}
                              >
                                {pathname === item.href && (
                                  <span className="absolute right-0 top-0 h-full w-1 rounded-l-md bg-indigo-600" />
                                )}
                                <item.icon
                                  className={cn(
                                    pathname === item.href ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-l border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 ring-1 ring-gray-100 px-6 pb-4 shadow-xl">
          <div className="flex h-16 shrink-0 items-center border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-900">پنل ادمین</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        data-testid={item.testId}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className={cn(
                          pathname === item.href
                            ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100'
                            : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-50',
                          'group relative flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-semibold transition-colors'
                        )}
                      >
                        {pathname === item.href && (
                          <span className="absolute right-0 top-0 h-full w-1 rounded-l-md bg-indigo-600" />
                        )}
                        <item.icon
                          className={cn(
                            pathname === item.href ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
