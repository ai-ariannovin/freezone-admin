'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">باز کردن منو</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">نمایش اعلان‌ها</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">باز کردن منوی کاربر</span>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">ا</span>
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="mr-4 flex flex-col items-start text-sm leading-6">
                  <span className="font-semibold text-gray-900">{user?.name || 'مدیر سیستم'}</span>
                  <span className="text-gray-500">{user?.phone}</span>
                </span>
                <ChevronDownIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2.5 w-32 origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/profile"
                      className={cn(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                      )}
                    >
                      پروفایل
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={cn(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                      )}
                    >
                      تنظیمات
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={cn(
                        active ? 'bg-gray-50' : '',
                        'block w-full text-right px-3 py-1 text-sm leading-6 text-gray-900'
                      )}
                    >
                      خروج
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}
