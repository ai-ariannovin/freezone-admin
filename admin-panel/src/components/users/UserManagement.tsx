'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { User, UserType, UserStatus } from '@/types'
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

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    user_type_id: 1,
    phone: '09123456789',
    due_date: '2025-12-31',
    status_id: 1,
    last_login: '2024-01-15T10:30:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    user_type: {
      id: 1,
      name: 'شخص حقیقی',
      slug: 'individual',
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
    person_details: {
      id: 1,
      user_id: 1,
      national_code: '1234567890',
      first_name: 'احمد',
      last_name: 'محمدی',
      father_name: 'علی',
      birth_certificate_no: '123456',
      birthday: '1990-01-01',
      gender_id: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  },
  {
    id: 2,
    user_type_id: 2,
    phone: '09123456788',
    due_date: '2025-12-31',
    status_id: 1,
    last_login: '2024-01-14T15:45:00Z',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-14T15:45:00Z',
    user_type: {
      id: 2,
      name: 'شخص حقوقی',
      slug: 'legal',
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
    company_details: {
      id: 1,
      user_id: 2,
      national_id: '1234567890123',
      register_date: '2020-01-01',
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z'
    }
  }
]

const userTypes: UserType[] = [
  { id: 1, name: 'شخص حقیقی', slug: 'individual', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'شخص حقوقی', slug: 'legal', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
]

const userStatuses: UserStatus[] = [
  { id: 1, name: 'فعال', slug: 'active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'غیرفعال', slug: 'inactive', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'مسدود', slug: 'blocked', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUserType, setSelectedUserType] = useState<number | ''>('')
  const [selectedStatus, setSelectedStatus] = useState<number | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  useEffect(() => {
    setUsers(mockUsers)
    setFilteredUsers(mockUsers)
  }, [])

  useEffect(() => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.phone.includes(searchTerm) ||
        (user.person_details?.first_name + ' ' + user.person_details?.last_name).includes(searchTerm) ||
        user.company_details?.national_id.includes(searchTerm)
      )
    }

    if (selectedUserType) {
      filtered = filtered.filter(user => user.user_type_id === selectedUserType)
    }

    if (selectedStatus) {
      filtered = filtered.filter(user => user.status_id === selectedStatus)
    }

    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedUserType, selectedStatus, users])

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    national_code: '',
    user_type_id: 1,
    status_id: 1
  })

  const handleDeleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      setSelectedUser(user)
      setShowDeleteModal(true)
    }
  }

  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id))
      setShowDeleteModal(false)
      setSelectedUser(null)
    }
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setFormData({
      first_name: user.person_details?.first_name || '',
      last_name: user.person_details?.last_name || '',
      phone: user.phone,
      national_code: user.person_details?.national_code || '',
      user_type_id: user.user_type_id,
      status_id: user.status_id
    })
    setShowEditModal(true)
  }

  const handleAddUser = () => {
    resetForm()
    setShowAddModal(true)
  }

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      phone: '',
      national_code: '',
      user_type_id: 1,
      status_id: 1
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (selectedUser) {
      // Edit existing user
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id 
          ? {
              ...user,
              phone: formData.phone,
              user_type_id: formData.user_type_id,
              status_id: formData.status_id,
              person_details: user.person_details ? {
                ...user.person_details,
                first_name: formData.first_name,
                last_name: formData.last_name,
                national_code: formData.national_code
              } : undefined
            }
          : user
      )
      setUsers(updatedUsers)
      setShowEditModal(false)
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now(),
        user_type_id: formData.user_type_id,
        phone: formData.phone,
        due_date: '2025-12-31',
        status_id: formData.status_id,
        last_login: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_type: userTypes.find(t => t.id === formData.user_type_id)!,
        status: userStatuses.find(s => s.id === formData.status_id)!,
        person_details: {
          id: Date.now(),
          user_id: Date.now(),
          national_code: formData.national_code,
          first_name: formData.first_name,
          last_name: formData.last_name,
          father_name: '',
          birth_certificate_no: '',
          birthday: '1990-01-01',
          gender_id: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }
      setUsers([...users, newUser])
      setShowAddModal(false)
    }
    
    setSelectedUser(null)
    resetForm()
    setLoading(false)
  }

  const getUserDisplayName = (user: User) => {
    if (user.person_details) {
      return `${user.person_details.first_name} ${user.person_details.last_name}`
    }
    if (user.company_details) {
      return `شرکت ${user.company_details.national_id}`
    }
    return user.phone
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت کاربران</h1>
          <p className="mt-2 text-sm text-gray-700">
            مدیریت کاربران سیستم و دسترسی‌های آن‌ها
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={handleAddUser}>
            <PlusIcon className="h-4 w-4 ml-2" />
            افزودن کاربر
          </Button>
        </div>
      </div>

      {/* Filters removed; DataTable provides built-in search/sort */}

      {/* Users table */}
      <Card>
        <CardHeader>
          <CardTitle>لیست کاربران</CardTitle>
          <CardDescription>
            مدیریت و ویرایش اطلاعات کاربران سیستم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredUsers}
            columns={[
              { key: 'name', title: 'کاربر', sortable: true, render: (user: any) => (
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {getUserDisplayName(user).charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="mr-4">
                    <div className="text-sm font-medium text-gray-900">
                      {getUserDisplayName(user)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.person_details?.national_code || user.company_details?.national_id}
                    </div>
                  </div>
                </div>
              )},
              { key: 'user_type_id', title: 'نوع کاربر', sortable: true, render: (user: any) => (
                <span className="text-sm text-gray-900">{user.user_type?.name}</span>
              )},
              { key: 'phone', title: 'شماره تلفن', sortable: true },
              { key: 'status_id', title: 'وضعیت', sortable: true, render: (user: any) => (
                <Badge 
                  variant={user.status?.slug === 'active' ? 'default' : user.status?.slug === 'inactive' ? 'secondary' : 'destructive'}
                >
                  {user.status?.name}
                </Badge>
              )},
              { key: 'last_login', title: 'آخرین ورود', sortable: true, render: (user: any) => (
                <span className="text-sm text-gray-500">{user.last_login ? formatDate(user.last_login) : 'هرگز'}</span>
              )},
              { key: 'created_at', title: 'تاریخ ثبت', sortable: true, render: (user: any) => (
                <span className="text-sm text-gray-500">{formatDate(user.created_at)}</span>
              )},
              { key: 'actions', title: 'عملیات', align: 'left', sortable: false, render: (user: any) => (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditUser(user)}
                    title="ویرایش"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    title="حذف"
                    className="text-red-600 hover:text-red-900"
                  >
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

      {/* Add/Edit User Modal */}
      <Dialog open={showAddModal || showEditModal} onOpenChange={(open) => {
        if (!open) {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedUser(null)
          resetForm()
        }
      }}>
        <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={() => {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedUser(null)
          resetForm()
        }}>
          <DialogHeader className="text-right">
            <DialogTitle>
              {showAddModal ? 'افزودن کاربر جدید' : 'ویرایش کاربر'}
            </DialogTitle>
            <DialogDescription>
              {showAddModal ? 'اطلاعات کاربر جدید را وارد کنید' : 'اطلاعات کاربر را ویرایش کنید'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">نام *</Label>
                <Input
                  id="first_name"
                  required
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">نام خانوادگی *</Label>
                <Input
                  id="last_name"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">شماره تلفن *</Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="09123456789"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="national_code">کد ملی *</Label>
              <Input
                id="national_code"
                required
                placeholder="1234567890"
                value={formData.national_code}
                onChange={(e) => setFormData({...formData, national_code: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user_type_id">نوع کاربر *</Label>
                <Select value={formData.user_type_id.toString()} onValueChange={(value) => setFormData({...formData, user_type_id: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map(type => (
                      <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status_id">وضعیت *</Label>
                <Select value={formData.status_id.toString()} onValueChange={(value) => setFormData({...formData, status_id: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {userStatuses.map(status => (
                      <SelectItem key={status.id} value={status.id.toString()}>{status.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
                  setSelectedUser(null)
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
          setSelectedUser(null)
        }
      }}>
        <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={() => {
          setShowDeleteModal(false)
          setSelectedUser(null)
        }}>
          <DialogHeader className="text-right">
            <DialogTitle>تأیید حذف</DialogTitle>
            <DialogDescription>
              آیا مطمئن هستید که می‌خواهید کاربر <strong>{selectedUser ? getUserDisplayName(selectedUser) : ''}</strong> را حذف کنید؟
              <br />
              <span className="text-red-600 text-sm">این عمل قابل بازگشت نیست.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedUser(null)
              }}
            >
              انصراف
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteUser}
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
