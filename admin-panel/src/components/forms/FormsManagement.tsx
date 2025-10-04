'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  CalendarIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DataTable, { Column } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface Form {
  id: number
  name: string
  type: 'business' | 'license' | 'inquiry'
  version: number
  status: 'active' | 'inactive' | 'draft'
  valid_from: string
  valid_to?: string
  description?: string
  fields_count: number
  created_at: string
  updated_at: string
}

// Mock data
const mockForms: Form[] = [
  {
    id: 1,
    name: 'فرم ثبت کسب‌وکار',
    type: 'business',
    version: 2,
    status: 'active',
    valid_from: '2024-01-01',
    valid_to: '2024-12-31',
    description: 'فرم اصلی برای ثبت کسب‌وکارهای جدید',
    fields_count: 15,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'فرم درخواست مجوز تجاری',
    type: 'license',
    version: 1,
    status: 'active',
    valid_from: '2024-01-01',
    valid_to: '2024-12-31',
    description: 'فرم درخواست مجوز فعالیت تجاری',
    fields_count: 20,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-10T14:20:00Z'
  },
  {
    id: 3,
    name: 'فرم استعلام مالیاتی',
    type: 'inquiry',
    version: 1,
    status: 'active',
    valid_from: '2024-01-01',
    valid_to: '2024-12-31',
    description: 'فرم استعلام وضعیت مالیاتی',
    fields_count: 8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-05T09:15:00Z'
  },
  {
    id: 4,
    name: 'فرم درخواست مجوز صنعتی',
    type: 'license',
    version: 3,
    status: 'draft',
    valid_from: '2024-02-01',
    description: 'فرم جدید برای درخواست مجوز صنعتی',
    fields_count: 25,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  }
]

const formTypes = [
  { id: 'all', name: 'همه' },
  { id: 'business', name: 'کسب‌وکار' },
  { id: 'license', name: 'مجوز' },
  { id: 'inquiry', name: 'استعلام' },
]

const formStatuses = [
  { id: 'all', name: 'همه' },
  { id: 'active', name: 'فعال' },
  { id: 'inactive', name: 'غیرفعال' },
  { id: 'draft', name: 'پیش‌نویس' },
]

export default function FormsManagement() {
  const [forms, setForms] = useState<Form[]>([])
  const [filteredForms, setFilteredForms] = useState<Form[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [formsPerPage] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedForm, setSelectedForm] = useState<Form | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'business' as 'business' | 'license' | 'inquiry',
    version: 1,
    status: 'draft' as 'active' | 'inactive' | 'draft',
    valid_from: '',
    valid_to: '',
    description: '',
    fields_count: 0
  })

  useEffect(() => {
    setForms(mockForms)
    setFilteredForms(mockForms)
  }, [])

  useEffect(() => {
    let filtered = forms

    if (searchTerm) {
      filtered = filtered.filter(form => 
        form.name.includes(searchTerm) ||
        form.description?.includes(searchTerm)
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(form => form.type === selectedType)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(form => form.status === selectedStatus)
    }

    setFilteredForms(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedType, selectedStatus, forms])

  const indexOfLastForm = currentPage * formsPerPage
  const indexOfFirstForm = indexOfLastForm - formsPerPage
  const currentForms = filteredForms.slice(indexOfFirstForm, indexOfLastForm)
  const totalPages = Math.ceil(filteredForms.length / formsPerPage)

  const handleDeleteForm = (formId: number) => {
    const form = forms.find(f => f.id === formId)
    if (form) {
      setSelectedForm(form)
      setShowDeleteModal(true)
    }
  }

  const handleEditForm = (form: Form) => {
    setSelectedForm(form)
    setFormData({
      name: form.name,
      type: form.type,
      version: form.version,
      status: form.status,
      valid_from: form.valid_from,
      valid_to: form.valid_to || '',
      description: form.description || '',
      fields_count: form.fields_count
    })
    setShowEditModal(true)
  }

  const handleAddForm = () => {
    resetForm()
    setShowAddModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'business',
      version: 1,
      status: 'draft',
      valid_from: '',
      valid_to: '',
      description: '',
      fields_count: 0
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (selectedForm) {
      // Edit existing form
      const updatedForms = forms.map(form => 
        form.id === selectedForm.id 
          ? {
              ...form,
              name: formData.name,
              type: formData.type,
              version: formData.version,
              status: formData.status,
              valid_from: formData.valid_from,
              valid_to: formData.valid_to || undefined,
              description: formData.description,
              fields_count: formData.fields_count,
              updated_at: new Date().toISOString()
            }
          : form
      )
      setForms(updatedForms)
      setShowEditModal(false)
    } else {
      // Add new form
      const newForm: Form = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        version: formData.version,
        status: formData.status,
        valid_from: formData.valid_from,
        valid_to: formData.valid_to || undefined,
        description: formData.description,
        fields_count: formData.fields_count,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setForms([...forms, newForm])
      setShowAddModal(false)
    }
    
    setSelectedForm(null)
    resetForm()
    setLoading(false)
  }

  const confirmDelete = () => {
    if (selectedForm) {
      setForms(forms.filter(form => form.id !== selectedForm.id))
      setShowDeleteModal(false)
      setSelectedForm(null)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'business':
        return <ClipboardDocumentListIcon className="h-5 w-5 text-blue-500" />
      case 'license':
        return <DocumentTextIcon className="h-5 w-5 text-green-500" />
      case 'inquiry':
        return <MagnifyingGlassIcon className="h-5 w-5 text-purple-500" />
      default:
        return <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeName = (type: string) => {
    const typeObj = formTypes.find(t => t.id === type)
    return typeObj?.name || type
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusName = (status: string) => {
    const statusObj = formStatuses.find(s => s.id === status)
    return statusObj?.name || status
  }

  const isFormValid = (form: Form) => {
    const now = new Date()
    const validFrom = new Date(form.valid_from)
    const validTo = form.valid_to ? new Date(form.valid_to) : null
    
    return now >= validFrom && (!validTo || now <= validTo)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت کاربرگ‌ها</h1>
          <p className="mt-2 text-sm text-gray-700">
            مدیریت فرم‌های کسب‌وکار، مجوزها و استعلامات
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleAddForm}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-4 w-4 inline ml-1" />
            افزودن فرم
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardDocumentListIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">کل فرم‌ها</dt>
                  <dd className="text-lg font-medium text-gray-900">{forms.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">فرم‌های فعال</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {forms.filter(f => f.status === 'active').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">فرم‌های مجوز</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {forms.filter(f => f.type === 'license').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardDocumentListIcon className="h-6 w-6 text-purple-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">فرم‌های کسب‌وکار</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {forms.filter(f => f.type === 'business').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters removed; DataTable provides built-in search/sort */}

      {/* Forms table */}
      <Card>
        <CardHeader>
          <CardTitle>لیست کاربرگ‌ها</CardTitle>
          <CardDescription>
            مدیریت فرم‌ها و نسخه‌ها
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredForms}
            columns={[
              { key: 'name', title: 'فرم', sortable: true, render: (form: any) => (
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      {getTypeIcon(form.type)}
                    </div>
                  </div>
                  <div className="mr-4">
                    <div className="text-sm font-medium text-gray-900">{form.name}</div>
                    <div className="text-sm text-gray-500">{form.description}</div>
                  </div>
                </div>
              )},
              { key: 'type', title: 'نوع', sortable: true, render: (form: any) => (
                <span className="text-sm text-gray-900">{getTypeName(form.type)}</span>
              )},
              { key: 'version', title: 'نسخه', sortable: true, render: (form: any) => (
                <span className="text-sm text-gray-900">v{form.version}</span>
              )},
              { key: 'status', title: 'وضعیت', sortable: true, render: (form: any) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(form.status)}`}>
                  {getStatusName(form.status)}
                </span>
              )},
              { key: 'valid_from', title: 'اعتبار', sortable: true, render: (form: any) => (
                <div className="flex items-center">
                  {isFormValid(form) ? (
                    <CheckCircleIcon className="h-4 w-4 text-green-500 ml-1" />
                  ) : (
                    <CalendarIcon className="h-4 w-4 text-red-500 ml-1" />
                  )}
                  <div>
                    <div className="text-sm">{form.valid_from}</div>
                    {form.valid_to && (
                      <div className="text-xs text-gray-500">تا {form.valid_to}</div>
                    )}
                  </div>
                </div>
              )},
              { key: 'fields_count', title: 'فیلدها', sortable: true, render: (form: any) => (
                <span className="text-sm text-gray-900">{form.fields_count} فیلد</span>
              )},
              { key: 'actions', title: 'عملیات', align: 'left', sortable: false, render: (form: any) => (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEditForm(form)} title="ویرایش">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteForm(form.id)} title="حذف">
                    <TrashIcon className="h-4 w-4" />
                  </button>
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
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {showAddModal ? 'افزودن فرم جدید' : 'ویرایش فرم'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
                  setSelectedForm(null)
                  resetForm()
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  نام فرم *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    نوع فرم *
                  </label>
                  <select
                    id="type"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as 'business' | 'license' | 'inquiry'})}
                  >
                    <option value="business">کسب‌وکار</option>
                    <option value="license">مجوز</option>
                    <option value="inquiry">استعلام</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    وضعیت *
                  </label>
                  <select
                    id="status"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive' | 'draft'})}
                  >
                    <option value="draft">پیش‌نویس</option>
                    <option value="active">فعال</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="version" className="block text-sm font-medium text-gray-700">
                    نسخه *
                  </label>
                  <input
                    type="number"
                    id="version"
                    min="1"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label htmlFor="fields_count" className="block text-sm font-medium text-gray-700">
                    تعداد فیلدها *
                  </label>
                  <input
                    type="number"
                    id="fields_count"
                    min="0"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.fields_count}
                    onChange={(e) => setFormData({...formData, fields_count: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="valid_from" className="block text-sm font-medium text-gray-700">
                    تاریخ شروع اعتبار *
                  </label>
                  <input
                    type="date"
                    id="valid_from"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.valid_from}
                    onChange={(e) => setFormData({...formData, valid_from: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="valid_to" className="block text-sm font-medium text-gray-700">
                    تاریخ پایان اعتبار
                  </label>
                  <input
                    type="date"
                    id="valid_to"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.valid_to}
                    onChange={(e) => setFormData({...formData, valid_to: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  توضیحات
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setShowEditModal(false)
                    setSelectedForm(null)
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
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                تأیید حذف
              </h3>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedForm(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                آیا مطمئن هستید که می‌خواهید فرم <strong>{selectedForm.name}</strong> را حذف کنید؟
              </p>
              <p className="text-xs text-red-600 mt-2">
                این عمل قابل بازگشت نیست.
              </p>
            </div>
            <div className="flex justify-end space-x-3 space-x-reverse">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedForm(null)
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
