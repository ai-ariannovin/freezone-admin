import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Mock AuthProvider for testing
const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

// Mock data for testing
export const mockUser = {
  id: 1,
  name: 'تست کاربر',
  email: 'test@example.com',
  role: 'admin',
  permissions: ['view.roles', 'edit.roles', 'delete.roles']
}

export const mockRoles = [
  { id: 1, name: 'مدیر', slug: 'admin', description: 'دسترسی کامل', level: 5 },
  { id: 2, name: 'کاربر', slug: 'user', description: 'دسترسی محدود', level: 1 }
]

export const mockPermissions = [
  { id: 1, name: 'مشاهده نقش‌ها', slug: 'view.roles', description: 'مشاهده لیست نقش‌ها', model: 'Role' },
  { id: 2, name: 'ویرایش نقش‌ها', slug: 'edit.roles', description: 'ویرایش نقش‌ها', model: 'Role' }
]

export const mockCategories = [
  { id: 1, name: 'مدیریت نقش‌ها', description: 'دسترسی‌های مربوط به نقش‌ها' },
  { id: 2, name: 'مدیریت کاربران', description: 'دسترسی‌های مربوط به کاربران' }
]

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MockAuthProvider>
      {children}
    </MockAuthProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
