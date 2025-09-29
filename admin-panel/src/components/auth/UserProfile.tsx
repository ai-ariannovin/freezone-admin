'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { UserIcon, PhoneIcon, ShieldCheckIcon, KeyIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function UserProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile update
    console.log('Update profile:', formData)
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">پروفایل کاربری</h1>
          <p className="mt-2 text-sm text-gray-700">
            مدیریت اطلاعات شخصی و تنظیمات حساب کاربری
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PencilIcon className="h-4 w-4 ml-2" />
            {isEditing ? 'لغو ویرایش' : 'ویرایش پروفایل'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">اطلاعات شخصی</h3>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  نام کامل
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  شماره تلفن
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  لغو
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-400 ml-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">نام کامل</p>
                  <p className="text-sm text-gray-500">{user.name || 'نامشخص'}</p>
                </div>
              </div>

              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-400 ml-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">شماره تلفن</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">تنظیمات امنیتی</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                رمز عبور فعلی
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                رمز عبور جدید
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                تأیید رمز عبور جدید
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                تغییر رمز عبور
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Roles and Permissions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Roles */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">نقش‌ها</h3>
          
          {user.roles && user.roles.length > 0 ? (
            <div className="space-y-2">
              {user.roles.map((role, index) => (
                <div key={index} className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-500 ml-2" />
                  <span className="text-sm text-gray-900">{role}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">هیچ نقشی تعریف نشده است</p>
          )}
        </div>

        {/* Permissions */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">مجوزها</h3>
          
          {user.permissions && user.permissions.length > 0 ? (
            <div className="space-y-2">
              {user.permissions.slice(0, 10).map((permission, index) => (
                <div key={index} className="flex items-center">
                  <KeyIcon className="h-5 w-5 text-green-500 ml-2" />
                  <span className="text-sm text-gray-900">{permission}</span>
                </div>
              ))}
              {user.permissions.length > 10 && (
                <p className="text-sm text-gray-500">
                  و {user.permissions.length - 10} مجوز دیگر...
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">هیچ مجوزی تعریف نشده است</p>
          )}
        </div>
      </div>
    </div>
  )
}
