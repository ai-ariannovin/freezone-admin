'use client'

import { useRouter } from 'next/navigation'
import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            دسترسی غیرمجاز
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            شما دسترسی لازم برای مشاهده این صفحه را ندارید
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeftIcon className="h-4 w-4 ml-2" />
            بازگشت
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            بازگشت به داشبورد
          </button>
        </div>
      </div>
    </div>
  )
}
