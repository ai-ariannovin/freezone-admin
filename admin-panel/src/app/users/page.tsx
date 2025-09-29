'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import UserManagement from '@/components/users/UserManagement'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute requiredPermissions={['view.users']}>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="lg:pr-72">
          <Header setSidebarOpen={setSidebarOpen} />
          
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <UserManagement />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
