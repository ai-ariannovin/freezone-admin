'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { License, LicenseBase, RequestType, Status } from '@/types'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import DataTable, { Column } from '@/components/ui/data-table'

// Mock data
const mockLicenses: License[] = [
  {
    id: 1,
    license_base_id: 1,
    license_code: 'LIC001',
    license_title: 'مجوز فعالیت تجاری',
    status_id: 1,
    request_type_id: 1,
    license_version: 1,
    duration_time: 365,
    validity_time: 1095,
    validity_description: '3 سال',
    duration_description: '1 سال',
    hint: 'این مجوز برای فعالیت‌های تجاری عمومی صادر می‌شود',
    notes: 'مدارک مورد نیاز: شناسنامه، کارت ملی، مدارک تجاری',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    license_base: {
      id: 1,
      license_code: 'LIC001',
      license_title: 'مجوز فعالیت تجاری',
      status_id: 1,
      license_version: 1,
      hint: 'مجوز پایه برای فعالیت تجاری',
      notes: 'مجوز پایه',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    status: {
      id: 1,
      name: 'فعال',
      slug: 'active',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    request_type: {
      id: 1,
      name: 'صدور مجوز',
      slug: 'issue',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  },
  {
    id: 2,
    license_base_id: 2,
    license_code: 'LIC002',
    license_title: 'مجوز صنعتی',
    status_id: 1,
    request_type_id: 1,
    license_version: 1,
    duration_time: 730,
    validity_time: 1825,
    validity_description: '5 سال',
    duration_description: '2 سال',
    hint: 'مجوز فعالیت صنعتی برای واحدهای تولیدی',
    notes: 'مدارک مورد نیاز: پروانه بهره‌برداری، مدارک محیط زیست',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-14T15:45:00Z',
    license_base: {
      id: 2,
      license_code: 'LIC002',
      license_title: 'مجوز صنعتی',
      status_id: 1,
      license_version: 1,
      hint: 'مجوز پایه برای فعالیت صنعتی',
      notes: 'مجوز پایه صنعتی',
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z'
    },
    status: {
      id: 1,
      name: 'فعال',
      slug: 'active',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    request_type: {
      id: 1,
      name: 'صدور مجوز',
      slug: 'issue',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  }
]

const requestTypes: RequestType[] = [
  { id: 1, name: 'صدور مجوز', slug: 'issue', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'تمدید مجوز', slug: 'renew', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'تغییر مجوز', slug: 'modify', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
]

const statuses: Status[] = [
  { id: 1, name: 'فعال', slug: 'active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'غیرفعال', slug: 'inactive', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'منقضی', slug: 'expired', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
]

export default function LicenseManagement() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [filteredLicenses, setFilteredLicenses] = useState<License[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRequestType, setSelectedRequestType] = useState<number | ''>('')
  const [selectedStatus, setSelectedStatus] = useState<number | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [licensesPerPage] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    license_code: '',
    license_title: '',
    request_type_id: 1,
    status_id: 1,
    license_version: 1,
    duration_time: 365,
    validity_time: 1095,
    validity_description: '',
    duration_description: '',
    hint: '',
    notes: ''
  })

  useEffect(() => {
    setLicenses(mockLicenses)
    setFilteredLicenses(mockLicenses)
  }, [])

  useEffect(() => {
    let filtered = licenses

    if (searchTerm) {
      filtered = filtered.filter(license => 
        license.license_code.includes(searchTerm) ||
        license.license_title.includes(searchTerm) ||
        license.license_base?.license_title.includes(searchTerm)
      )
    }

    if (selectedRequestType) {
      filtered = filtered.filter(license => license.request_type_id === selectedRequestType)
    }

    if (selectedStatus) {
      filtered = filtered.filter(license => license.status_id === selectedStatus)
    }

    setFilteredLicenses(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedRequestType, selectedStatus, licenses])

  const indexOfLastLicense = currentPage * licensesPerPage
  const indexOfFirstLicense = indexOfLastLicense - licensesPerPage
  const currentLicenses = filteredLicenses.slice(indexOfFirstLicense, indexOfLastLicense)
  const totalPages = Math.ceil(filteredLicenses.length / licensesPerPage)

  const handleDeleteLicense = (licenseId: number) => {
    const license = licenses.find(l => l.id === licenseId)
    if (license) {
      setSelectedLicense(license)
      setShowDeleteModal(true)
    }
  }

  const handleEditLicense = (license: License) => {
    setSelectedLicense(license)
    setFormData({
      license_code: license.license_code,
      license_title: license.license_title,
      request_type_id: license.request_type_id || 1,
      status_id: license.status_id || 1,
      license_version: license.license_version || 1,
      duration_time: license.duration_time || 365,
      validity_time: license.validity_time || 1095,
      validity_description: license.validity_description || '',
      duration_description: license.duration_description || '',
      hint: license.hint || '',
      notes: license.notes || ''
    })
    setShowEditModal(true)
  }

  const handleAddLicense = () => {
    resetForm()
    setShowAddModal(true)
  }

  const resetForm = () => {
    setFormData({
      license_code: '',
      license_title: '',
      request_type_id: 1,
      status_id: 1,
      license_version: 1,
      duration_time: 365,
      validity_time: 1095,
      validity_description: '',
      duration_description: '',
      hint: '',
      notes: ''
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (selectedLicense) {
      // Edit existing license
      const updatedLicenses = licenses.map(license => 
        license.id === selectedLicense.id 
          ? {
              ...license,
              license_code: formData.license_code,
              license_title: formData.license_title,
              request_type_id: formData.request_type_id,
              status_id: formData.status_id,
              license_version: formData.license_version,
              duration_time: formData.duration_time,
              validity_time: formData.validity_time,
              validity_description: formData.validity_description,
              duration_description: formData.duration_description,
              hint: formData.hint,
              notes: formData.notes,
              updated_at: new Date().toISOString()
            }
          : license
      )
      setLicenses(updatedLicenses)
      setShowEditModal(false)
    } else {
      // Add new license
      const newLicense: License = {
        id: Date.now(),
        license_base_id: 1,
        license_code: formData.license_code,
        license_title: formData.license_title,
        status_id: formData.status_id,
        request_type_id: formData.request_type_id,
        license_version: formData.license_version,
        duration_time: formData.duration_time,
        validity_time: formData.validity_time,
        validity_description: formData.validity_description,
        duration_description: formData.duration_description,
        hint: formData.hint,
        notes: formData.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        license_base: {
          id: 1,
          license_code: formData.license_code,
          license_title: formData.license_title,
          status_id: formData.status_id,
          license_version: formData.license_version,
          hint: formData.hint,
          notes: formData.notes,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        status: statuses.find(s => s.id === formData.status_id)!,
        request_type: requestTypes.find(r => r.id === formData.request_type_id)!
      }
      setLicenses([...licenses, newLicense])
      setShowAddModal(false)
    }
    
    setSelectedLicense(null)
    resetForm()
    setLoading(false)
  }

  const confirmDelete = () => {
    if (selectedLicense) {
      setLicenses(licenses.filter(license => license.id !== selectedLicense.id))
      setShowDeleteModal(false)
      setSelectedLicense(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'inactive':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      case 'expired':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت مجوزها</h1>
          <p className="mt-2 text-sm text-gray-700">
            مدیریت مجوزهای کسب‌وکار و تنظیمات آن‌ها
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={handleAddLicense}>
            <PlusIcon className="h-4 w-4 ml-2" />
            افزودن مجوز
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل مجوزها</CardTitle>
            <DocumentTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{licenses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مجوزهای فعال</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {licenses.filter(l => l.status?.slug === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مجوزهای غیرفعال</CardTitle>
            <ClockIcon className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {licenses.filter(l => l.status?.slug === 'inactive').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مجوزهای منقضی</CardTitle>
            <XCircleIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {licenses.filter(l => l.status?.slug === 'expired').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters removed; DataTable provides built-in search/sort */}

      {/* Licenses table */}
      <Card>
        <CardHeader>
          <CardTitle>لیست مجوزها</CardTitle>
          <CardDescription>
            مدیریت و ویرایش مجوزهای کسب‌وکار
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredLicenses}
            columns={[
              { key: 'license_title', title: 'مجوز', sortable: true, render: (license: any) => (
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="mr-4">
                    <div className="text-sm font-medium text-gray-900">{license.license_title}</div>
                    <div className="text-sm text-gray-500">{license.license_code}</div>
                  </div>
                </div>
              )},
              { key: 'request_type_id', title: 'نوع درخواست', sortable: true, render: (l: any) => (
                <span className="text-sm text-gray-900">{l.request_type?.name}</span>
              )},
              { key: 'license_version', title: 'نسخه', sortable: true, render: (l: any) => (
                <span className="text-sm text-gray-900">v{l.license_version}</span>
              )},
              { key: 'validity_description', title: 'مدت اعتبار', sortable: true, render: (l: any) => (
                <div>
                  <div className="text-sm">{l.validity_description}</div>
                  <div className="text-xs text-gray-500">{l.duration_description}</div>
                </div>
              )},
              { key: 'status_id', title: 'وضعیت', sortable: true, render: (l: any) => (
                <div className="flex items-center">
                  {getStatusIcon(l.status?.slug || '')}
                  <Badge variant={l.status?.slug === 'active' ? 'default' : l.status?.slug === 'inactive' ? 'secondary' : 'destructive'} className="mr-2">
                    {l.status?.name}
                  </Badge>
                </div>
              )},
              { key: 'created_at', title: 'تاریخ ایجاد', sortable: true, render: (l: any) => (
                <span className="text-sm text-gray-500">{formatDate(l.created_at)}</span>
              )},
              { key: 'actions', title: 'عملیات', align: 'left', sortable: false, render: (l: any) => (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button variant="ghost" size="sm" onClick={() => handleEditLicense(l)} title="ویرایش">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteLicense(l.id)} title="حذف" className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              )},
            ] as Column<any>[]}
            rtl
            searchable
            sortable
            paginated
          />
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={showAddModal || showEditModal} onOpenChange={(open) => {
        if (!open) {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedLicense(null)
          resetForm()
        }
      }}>
        <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={() => {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedLicense(null)
          resetForm()
        }}>
          <DialogHeader className="text-right">
            <DialogTitle>
              {showAddModal ? 'افزودن مجوز جدید' : 'ویرایش مجوز'}
            </DialogTitle>
            <DialogDescription>
              {showAddModal ? 'اطلاعات مجوز جدید را وارد کنید' : 'اطلاعات مجوز را ویرایش کنید'}
            </DialogDescription>
          </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="license_code" className="block text-sm font-medium text-gray-700">
                    کد مجوز *
                  </label>
                  <input
                    type="text"
                    id="license_code"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="LIC001"
                    value={formData.license_code}
                    onChange={(e) => setFormData({...formData, license_code: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="license_title" className="block text-sm font-medium text-gray-700">
                    عنوان مجوز *
                  </label>
                  <input
                    type="text"
                    id="license_title"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.license_title}
                    onChange={(e) => setFormData({...formData, license_title: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="request_type_id" className="block text-sm font-medium text-gray-700">
                    نوع درخواست *
                  </label>
                  <select
                    id="request_type_id"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.request_type_id}
                    onChange={(e) => setFormData({...formData, request_type_id: parseInt(e.target.value)})}
                  >
                    {requestTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="status_id" className="block text-sm font-medium text-gray-700">
                    وضعیت *
                  </label>
                  <select
                    id="status_id"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.status_id}
                    onChange={(e) => setFormData({...formData, status_id: parseInt(e.target.value)})}
                  >
                    {statuses.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="license_version" className="block text-sm font-medium text-gray-700">
                    نسخه *
                  </label>
                  <input
                    type="number"
                    id="license_version"
                    min="1"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.license_version}
                    onChange={(e) => setFormData({...formData, license_version: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label htmlFor="duration_time" className="block text-sm font-medium text-gray-700">
                    مدت زمان (روز) *
                  </label>
                  <input
                    type="number"
                    id="duration_time"
                    min="1"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.duration_time}
                    onChange={(e) => setFormData({...formData, duration_time: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label htmlFor="validity_time" className="block text-sm font-medium text-gray-700">
                    مدت اعتبار (روز) *
                  </label>
                  <input
                    type="number"
                    id="validity_time"
                    min="1"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.validity_time}
                    onChange={(e) => setFormData({...formData, validity_time: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="validity_description" className="block text-sm font-medium text-gray-700">
                    توضیح اعتبار
                  </label>
                  <input
                    type="text"
                    id="validity_description"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="3 سال"
                    value={formData.validity_description}
                    onChange={(e) => setFormData({...formData, validity_description: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="duration_description" className="block text-sm font-medium text-gray-700">
                    توضیح مدت
                  </label>
                  <input
                    type="text"
                    id="duration_description"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="1 سال"
                    value={formData.duration_description}
                    onChange={(e) => setFormData({...formData, duration_description: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hint" className="block text-sm font-medium text-gray-700">
                  راهنمایی
                </label>
                <textarea
                  id="hint"
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.hint}
                  onChange={(e) => setFormData({...formData, hint: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  یادداشت‌ها
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setShowEditModal(false)
                    setSelectedLicense(null)
                    resetForm()
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'در حال ذخیره...' : (showAddModal ? 'افزودن' : 'ویرایش')}
                </button>
              </div>
            </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedLicense && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                تأیید حذف
              </h3>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedLicense(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                آیا مطمئن هستید که می‌خواهید مجوز <strong>{selectedLicense?.license_title}</strong> را حذف کنید؟
              </p>
              <p className="text-xs text-red-600 mt-2">
                این عمل قابل بازگشت نیست.
              </p>
            </div>
            <div className="flex justify-end space-x-3 space-x-reverse">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedLicense(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                انصراف
              </button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? 'در حال حذف...' : 'حذف'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
