'use client'

import { useAuth } from '@/contexts/AuthContext'
import { UserIcon, ShieldCheckIcon, KeyIcon } from '@heroicons/react/24/outline'

export default function UserInfo() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">اطلاعات کاربر</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <UserIcon className="h-5 w-5 text-gray-400 ml-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">نام کاربری</p>
            <p className="text-sm text-gray-500">{user.name || 'نامشخص'}</p>
          </div>
        </div>

        <div className="flex items-center">
          <UserIcon className="h-5 w-5 text-gray-400 ml-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">شماره تلفن</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>
        </div>

        {user.roles && user.roles.length > 0 && (
          <div className="flex items-start">
            <ShieldCheckIcon className="h-5 w-5 text-gray-400 ml-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">نقش‌ها</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.roles.map((role, index) => (
                  <span
                    key={index}
                    className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {user.permissions && user.permissions.length > 0 && (
          <div className="flex items-start">
            <KeyIcon className="h-5 w-5 text-gray-400 ml-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">مجوزها</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.permissions.slice(0, 5).map((permission, index) => (
                  <span
                    key={index}
                    className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    {permission}
                  </span>
                ))}
                {user.permissions.length > 5 && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    +{user.permissions.length - 5} بیشتر
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
