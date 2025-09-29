'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Reports from '@/components/reports/Reports'

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="lg:pr-72">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Reports />
          </div>
        </main>
      </div>
    </div>
  )
}
