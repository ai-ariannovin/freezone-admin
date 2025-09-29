'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { mockApi } from '@/lib/mockApi'

interface User {
  id: number
  phone: string
  name?: string
  roles: string[]
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (phone: string, password: string) => Promise<boolean>
  logout: () => void
  hasRole: (role: string) => boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setIsLoading(false)
        return
      }

      // استفاده از Mock API برای تست
      try {
        const user = await mockApi.getCurrentUser(token)
        setUser(user)
      } catch (error) {
        // اگر Mock API کار نکرد، سعی کن از API واقعی استفاده کن
        const response = await api.get('/admin/me')
        if (response.data.status === 'success') {
          setUser(response.data.user)
        } else {
          localStorage.removeItem('admin_token')
          localStorage.removeItem('admin_user')
        }
      }
    } catch (error) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      // ابتدا سعی کن از Mock API استفاده کن
      try {
        const { token, user } = await mockApi.login(phone, password)
        localStorage.setItem('admin_token', token)
        localStorage.setItem('admin_user', JSON.stringify(user))
        setUser(user)
        return true
      } catch (mockError) {
        // اگر Mock API کار نکرد، سعی کن از API واقعی استفاده کن
        const response = await api.post('/admin/login', { phone, password })
        
        if (response.data.status === 'success') {
          const { token, user } = response.data
          localStorage.setItem('admin_token', token)
          localStorage.setItem('admin_user', JSON.stringify(user))
          setUser(user)
          return true
        }
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setUser(null)
    router.push('/login')
  }

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) || false
  }

  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.includes(permission) || false
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
    hasPermission
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
