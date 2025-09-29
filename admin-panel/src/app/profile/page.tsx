'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import UserProfile from '@/components/auth/UserProfile'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="lg:pr-72">
          <Header setSidebarOpen={setSidebarOpen} />
          
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <UserProfile />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
