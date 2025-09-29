'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Logs from '@/components/logs/Logs'

export default function LogsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="lg:pr-72">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Logs />
          </div>
        </main>
      </div>
    </div>
  )
}
