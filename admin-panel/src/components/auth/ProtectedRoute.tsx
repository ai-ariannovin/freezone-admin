'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  requiredPermissions?: string[]
}

export default function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  requiredPermissions = [] 
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated, hasRole, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login')
        return
      }

      // Check roles
      if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => hasRole(role))
        if (!hasRequiredRole) {
          router.push('/unauthorized')
          return
        }
      }

      // Check permissions
      if (requiredPermissions.length > 0) {
        const hasRequiredPermission = requiredPermissions.some(permission => hasPermission(permission))
        if (!hasRequiredPermission) {
          router.push('/unauthorized')
          return
        }
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRoles, requiredPermissions, hasRole, hasPermission, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
