'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  BuildingOfficeIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
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
import { PersianDatePicker } from '@/components/ui/persian-datepicker'

interface Business {
  id: number
  name: string
  owner_name: string
  owner_phone: string
  owner_email?: string
  business_type: string
  isic_code: string
  address: string
  city: string
  province: string
  postal_code: string
  status: string
  registration_date: string
  license_count: number
  created_at: string
  updated_at: string
}

const mockBusinesses: Business[] = [
  {
    id: 1,
    name: 'شرکت فناوری پارس',
    owner_name: 'احمد محمدی',
    owner_phone: '09123456789',
    owner_email: 'ahmad@parstech.ir',
    business_type: 'شرکت',
    isic_code: '62010',
    address: 'تهران، خیابان ولیعصر، پلاک 123',
    city: 'تهران',
    province: 'تهران',
    postal_code: '1234567890',
    status: 'active',
    registration_date: '2024-01-15',
    license_count: 3,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'مغازه خواربارفروشی رضایی',
    owner_name: 'علی رضایی',
    owner_phone: '09123456788',
    business_type: 'مغازه',
    isic_code: '47110',
    address: 'اصفهان، خیابان چهارباغ، پلاک 456',
    city: 'اصفهان',
    province: 'اصفهان',
    postal_code: '1234567891',
    status: 'active',
    registration_date: '2024-01-10',
    license_count: 1,
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 3,
    name: 'کارگاه تولیدی کفش',
    owner_name: 'حسن کریمی',
    owner_phone: '09123456787',
    business_type: 'کارگاه',
    isic_code: '15200',
    address: 'شیراز، خیابان زند، پلاک 789',
    city: 'شیراز',
    province: 'فارس',
    postal_code: '1234567892',
    status: 'inactive',
    registration_date: '2024-01-20',
    license_count: 0,
    created_at: '2024-01-20T11:00:00Z',
    updated_at: '2024-01-20T11:00:00Z'
  }
]

const businessTypes = [
  { id: 1, name: 'شرکت' },
  { id: 2, name: 'مغازه' },
  { id: 3, name: 'کارگاه' },
  { id: 4, name: 'دفتر' },
  { id: 5, name: 'سایر' }
]

const businessStatuses = [
  { id: 1, name: 'فعال', slug: 'active' },
  { id: 2, name: 'غیرفعال', slug: 'inactive' },
  { id: 3, name: 'تعلیق', slug: 'suspended' },
  { id: 4, name: 'لغو شده', slug: 'cancelled' }
]

export default function BusinessManagement() {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses)
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(mockBusinesses)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBusinessType, setSelectedBusinessType] = useState<number | ''>('')
  const [selectedStatus, setSelectedStatus] = useState<number | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    owner_name: '',
    owner_phone: '',
    owner_email: '',
    business_type: '',
    isic_code: '',
    address: '',
    city: '',
    province: '',
    postal_code: '',
    status: 'active'
  })

  useEffect(() => {
    let filtered = businesses

    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.owner_phone.includes(searchTerm) ||
        business.isic_code.includes(searchTerm)
      )
    }

    if (selectedBusinessType) {
      const businessType = businessTypes.find(bt => bt.id === selectedBusinessType)
      if (businessType) {
        filtered = filtered.filter(business => business.business_type === businessType.name)
      }
    }

    if (selectedStatus) {
      const status = businessStatuses.find(s => s.id === selectedStatus)
      if (status) {
        filtered = filtered.filter(business => business.status === status.slug)
      }
    }

    setFilteredBusinesses(filtered)
    setCurrentPage(1)
  }, [businesses, searchTerm, selectedBusinessType, selectedStatus])

  const indexOfFirstBusiness = (currentPage - 1) * itemsPerPage
  const indexOfLastBusiness = indexOfFirstBusiness + itemsPerPage
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstBusiness, indexOfLastBusiness)
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage)

  const handleEditBusiness = (business: Business) => {
    setFormData({
      name: business.name,
      owner_name: business.owner_name,
      owner_phone: business.owner_phone,
      owner_email: business.owner_email || '',
      business_type: business.business_type,
      isic_code: business.isic_code,
      address: business.address,
      city: business.city,
      province: business.province,
      postal_code: business.postal_code,
      status: business.status
    })
    setSelectedBusiness(business)
    setShowEditModal(true)
  }

  const handleAddBusiness = () => {
    resetForm()
    setShowAddModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      owner_name: '',
      owner_phone: '',
      owner_email: '',
      business_type: '',
      isic_code: '',
      address: '',
      city: '',
      province: '',
      postal_code: '',
      status: 'active'
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (selectedBusiness) {
      // Edit existing business
      const updatedBusinesses = businesses.map(business => 
        business.id === selectedBusiness.id 
          ? {
              ...business,
              ...formData,
              updated_at: new Date().toISOString()
            }
          : business
      )
      setBusinesses(updatedBusinesses)
      setShowEditModal(false)
    } else {
      // Add new business
      const newBusiness: Business = {
        id: Math.max(...businesses.map(b => b.id)) + 1,
        name: formData.name,
        owner_name: formData.owner_name,
        owner_phone: formData.owner_phone,
        owner_email: formData.owner_email,
        business_type: formData.business_type,
        isic_code: formData.isic_code,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postal_code: formData.postal_code,
        status: formData.status,
        registration_date: new Date().toISOString().split('T')[0],
        license_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setBusinesses([...businesses, newBusiness])
      setShowAddModal(false)
    }
    
    setSelectedBusiness(null)
    resetForm()
    setLoading(false)
  }

  const confirmDelete = () => {
    if (selectedBusiness) {
      const updatedBusinesses = businesses.filter(business => business.id !== selectedBusiness.id)
      setBusinesses(updatedBusinesses)
      setShowDeleteModal(false)
      setSelectedBusiness(null)
    }
  }

  const handleDeleteBusiness = (id: number) => {
    const business = businesses.find(b => b.id === id)
    if (business) {
      setSelectedBusiness(business)
      setShowDeleteModal(true)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />
      case 'inactive':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />
      case 'suspended':
        return <XCircleIcon className="h-4 w-4 text-orange-500" />
      case 'cancelled':
        return <XCircleIcon className="h-4 w-4 text-red-500" />
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'inactive':
        return 'secondary'
      case 'suspended':
        return 'destructive'
      case 'cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت کسب‌وکارها</h1>
          <p className="mt-2 text-sm text-gray-700">
            مدیریت اطلاعات کسب‌وکارها و مجوزهای آن‌ها
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={handleAddBusiness}>
            <PlusIcon className="h-4 w-4 ml-2" />
            افزودن کسب‌وکار
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل کسب‌وکارها</CardTitle>
            <BuildingOfficeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businesses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کسب‌وکارهای فعال</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {businesses.filter(b => b.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کسب‌وکارهای غیرفعال</CardTitle>
            <ClockIcon className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {businesses.filter(b => b.status === 'inactive').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مجموع مجوزها</CardTitle>
            <UserIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {businesses.reduce((sum, b) => sum + b.license_count, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters removed; DataTable provides built-in search/sort */}

      {/* Businesses table */}
      <Card>
        <CardHeader>
          <CardTitle>لیست کسب‌وکارها</CardTitle>
          <CardDescription>
            مدیریت و ویرایش اطلاعات کسب‌وکارها
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredBusinesses}
            columns={[
              { key: 'name', title: 'کسب‌وکار', sortable: true, render: (business: any) => (
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="mr-4">
                    <div className="text-sm font-medium text-gray-900">{business.name}</div>
                    <div className="text-sm text-gray-500">{business.license_count} مجوز</div>
                  </div>
                </div>
              )},
              { key: 'owner_name', title: 'مالک', sortable: true, render: (business: any) => (
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 text-gray-400 ml-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{business.owner_name}</div>
                    <div className="text-sm text-gray-500">{business.owner_phone}</div>
                  </div>
                </div>
              )},
              { key: 'business_type', title: 'نوع', sortable: true },
              { key: 'isic_code', title: 'کد ISIC', sortable: true },
              { key: 'address', title: 'آدرس', sortable: false, render: (business: any) => (
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 text-gray-400 ml-2" />
                  <div>
                    <div className="text-sm text-gray-900">{business.city}</div>
                    <div className="text-xs text-gray-500">{business.province}</div>
                  </div>
                </div>
              )},
              { key: 'status', title: 'وضعیت', sortable: true, render: (business: any) => (
                <div className="flex items-center">
                  {getStatusIcon(business.status)}
                  <Badge variant={getStatusBadgeVariant(business.status)} className="mr-2">
                    {businessStatuses.find((s: any) => s.slug === business.status)?.name}
                  </Badge>
                </div>
              )},
              { key: 'registration_date', title: 'تاریخ ثبت', sortable: true, render: (business: any) => (
                <span className="text-sm text-gray-500">{formatDate(business.registration_date)}</span>
              )},
              { key: 'actions', title: 'عملیات', align: 'left', sortable: false, render: (business: any) => (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button variant="ghost" size="sm" onClick={() => handleEditBusiness(business)} title="ویرایش">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteBusiness(business.id)} title="حذف" className="text-red-600 hover:text-red-900">
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
          setSelectedBusiness(null)
          resetForm()
        }
      }}>
        <DialogContent className="sm:max-w-[600px]" onEscapeKeyDown={() => {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedBusiness(null)
          resetForm()
        }}>
          <DialogHeader className="text-right">
            <DialogTitle>
              {showAddModal ? 'افزودن کسب‌وکار جدید' : 'ویرایش کسب‌وکار'}
            </DialogTitle>
            <DialogDescription>
              {showAddModal ? 'اطلاعات کسب‌وکار جدید را وارد کنید' : 'اطلاعات کسب‌وکار را ویرایش کنید'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">نام کسب‌وکار *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner_name">نام مالک *</Label>
                <Input
                  id="owner_name"
                  required
                  value={formData.owner_name}
                  onChange={(e) => setFormData({...formData, owner_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner_phone">تلفن مالک *</Label>
                <Input
                  id="owner_phone"
                  type="tel"
                  required
                  value={formData.owner_phone}
                  onChange={(e) => setFormData({...formData, owner_phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner_email">ایمیل مالک</Label>
                <Input
                  id="owner_email"
                  type="email"
                  value={formData.owner_email}
                  onChange={(e) => setFormData({...formData, owner_email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business_type">نوع کسب‌وکار *</Label>
                <Select value={formData.business_type} onValueChange={(value) => setFormData({...formData, business_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map(type => (
                      <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="isic_code">کد ISIC *</Label>
                <Input
                  id="isic_code"
                  required
                  placeholder="62010"
                  value={formData.isic_code}
                  onChange={(e) => setFormData({...formData, isic_code: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">وضعیت *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {businessStatuses.map(status => (
                      <SelectItem key={status.id} value={status.slug}>{status.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">آدرس *</Label>
              <Input
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">شهر *</Label>
                <Input
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">استان *</Label>
                <Input
                  id="province"
                  required
                  value={formData.province}
                  onChange={(e) => setFormData({...formData, province: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">کد پستی *</Label>
                <Input
                  id="postal_code"
                  required
                  value={formData.postal_code}
                  onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
                  setSelectedBusiness(null)
                  resetForm()
                }}
              >
                انصراف
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'در حال ذخیره...' : (showAddModal ? 'افزودن' : 'ویرایش')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={(open) => {
        if (!open) {
          setShowDeleteModal(false)
          setSelectedBusiness(null)
        }
      }}>
        <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={() => {
          setShowDeleteModal(false)
          setSelectedBusiness(null)
        }}>
          <DialogHeader className="text-right">
            <DialogTitle>تأیید حذف</DialogTitle>
            <DialogDescription>
              آیا مطمئن هستید که می‌خواهید کسب‌وکار <strong>{selectedBusiness?.name}</strong> را حذف کنید؟
              <br />
              <span className="text-red-600 text-sm">این عمل قابل بازگشت نیست.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedBusiness(null)
              }}
            >
              انصراف
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading ? 'در حال حذف...' : 'حذف'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
