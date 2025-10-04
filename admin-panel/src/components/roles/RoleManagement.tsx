'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  ShieldCheckIcon,
  UsersIcon,
  KeyIcon,
  XMarkIcon,
  FunnelIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline'
import { Role, Permission, PermissionCategory } from '@/types'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Dropdown, { DropdownOption } from '@/components/ui/dropdown'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DataTable, { Column } from '@/components/ui/data-table'
import RolesTable, { RoleLite } from '@/components/roles/tables/RolesTable'
import PermissionsTable, { PermissionLite } from '@/components/roles/tables/PermissionsTable'
import CategoriesTable, { CategoryLite } from '@/components/roles/tables/CategoriesTable'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import UpsertEntityModal, { UpsertEntityFormData } from '@/components/roles/modals/UpsertEntityModal'
import DeleteConfirmModal from '@/components/roles/modals/DeleteConfirmModal'
import AssignPermissionsModal from '@/components/roles/modals/AssignPermissionsModal'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data
const mockRoles: Role[] = [
  {
    id: 1,
    name: 'مدیر سیستم',
    slug: 'admin',
    description: 'دسترسی کامل به تمامی بخش‌های پنل مدیریت',
    level: 5,
    created_at: '2025-09-22 06:42:40',
    updated_at: '2025-09-22 06:42:40'
  },
  {
    id: 2,
    name: 'کاربر حقیقی',
    slug: 'personuser',
    description: 'کاربر حقیقی ثبت‌شده در سامانه',
    level: 1,
    created_at: '2025-09-22 06:42:40',
    updated_at: '2025-09-22 06:42:40'
  },
  {
    id: 3,
    name: 'کاربر حقوقی',
    slug: 'companyuser',
    description: 'شرکت یا سازمان ثبت‌شده در سامانه',
    level: 2,
    created_at: '2025-09-22 06:42:40',
    updated_at: '2025-09-22 06:42:40'
  },
  {
    id: 4,
    name: 'مدیر منطقه آزاد',
    slug: 'freezonemanager',
    description: 'مدیر مسئول نظارت بر مناطق آزاد',
    level: 3,
    created_at: '2025-09-22 06:42:40',
    updated_at: '2025-09-22 06:42:40'
  }
]

const mockPermissions: Permission[] = [
  { id: 1, name: 'نمایش کاربران', slug: 'view.users', description: 'مشاهده لیست کاربران', permission_category_id: 1, model: 'User', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 2, name: 'ساخت کاربر جدید', slug: 'create.users', description: 'افزودن کاربر جدید به سیستم', permission_category_id: 1, model: 'User', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 3, name: 'نمایش نقش‌ها', slug: 'view.roles', description: 'دسترسی به لیست نقش‌ها', permission_category_id: 2, model: 'Role', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 4, name: 'ویرایش دسترسی‌ها', slug: 'edit.permissions', description: 'ویرایش یا تغییر مجوزهای نقش', permission_category_id: 2, model: 'Permission', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 5, name: 'مشاهده مجوزها', slug: 'view.licenses', description: 'نمایش لیست مجوزهای فعال', permission_category_id: 3, model: 'License', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 6, name: 'ثبت درخواست مجوز', slug: 'request.license', description: 'ارسال فرم صدور مجوز', permission_category_id: 3, model: 'LicenseRequest', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 7, name: 'مدیریت مناطق آزاد', slug: 'manage.freezones', description: 'ایجاد، ویرایش و حذف مناطق آزاد', permission_category_id: 4, model: 'FreeZone', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 8, name: 'اتصال کسب‌و‌کار به منطقه آزاد', slug: 'link.business.freezone', description: 'اتصال کسب‌وکارها به مناطق آزاد', permission_category_id: 4, model: 'FreeZoneActiveBusiness', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' }
]

const mockPermissionCategories: PermissionCategory[] = [
  { id: 1, title: 'مدیریت کاربران و تنظیمات پیشرفته کاربران با عنوان خیلی خیلی طولانی برای تست نمایش دراپ‌دان و رفتار برش متن در لیست گزینه‌ها', name: 'user_management', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 2, title: 'مدیریت نقش ها و دسترسی ها', name: 'role_permission_management', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 3, title: 'مدیریت مجوز ها', name: 'license_management', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
  { id: 4, title: 'مدیریت کاربران و مناطق آزاد', name: 'user_freezone_management', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' }
]

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions)
  const [permissionCategories, setPermissionCategories] = useState<PermissionCategory[]>(mockPermissionCategories)
  const [filteredRoles, setFilteredRoles] = useState<Role[]>(mockRoles)
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>(mockPermissions)
  const [filteredCategories, setFilteredCategories] = useState<PermissionCategory[]>(mockPermissionCategories)
  const [sortBy, setSortBy] = useState<string>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('')
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions' | 'categories'>('roles')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Role | Permission | PermissionCategory | null>(null)
  const [selectedRoleForAssign, setSelectedRoleForAssign] = useState<Role | null>(null)
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([])
  // Pagination for roles list (to match the reference UI)
  const [rolesPage, setRolesPage] = useState<number>(1)
  const [perPageRoles, setPerPageRoles] = useState<number>(10)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<UpsertEntityFormData>({
    name: '',
    slug: '',
    description: '',
    level: 1,
    permission_category_id: 1,
    model: ''
  })
  // پیام‌های فارسی اعتبارسنجی برای ورودی‌های اجباری
  const requiredMessage = 'پر کردن این فیلد الزامی است'
  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity(requiredMessage)
  }
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity('')
  }

  useEffect(() => {
    let filtered: any[] = []
    if (activeTab === 'roles') filtered = roles
    if (activeTab === 'permissions') filtered = permissions
    if (activeTab === 'categories') filtered = permissionCategories

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      if (activeTab === 'categories') {
        filtered = filtered.filter((item: PermissionCategory) =>
          item.title.toLowerCase().includes(term) ||
          item.name.toLowerCase().includes(term)
        )
      } else if (activeTab === 'roles') {
        filtered = filtered.filter((item: Role) =>
          item.name.toLowerCase().includes(term) ||
          item.slug.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term))
        )
      } else {
        filtered = filtered.filter((item: Permission) =>
          item.name.toLowerCase().includes(term) ||
          item.slug.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term))
        )
      }
    }

    if (activeTab === 'permissions' && selectedCategory) {
      filtered = filtered.filter(item => 
        'permission_category_id' in item && item.permission_category_id === selectedCategory
      )
    }

    // sort
    const compare = (a: any, b: any) => {
      const dir = sortDir === 'asc' ? 1 : -1
      const av = (a as any)[sortBy]
      const bv = (b as any)[sortBy]
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
      return String(av).localeCompare(String(bv)) * dir
    }
    filtered = [...filtered].sort(compare)

    if (activeTab === 'roles') {
      setFilteredRoles(filtered as Role[])
    } else if (activeTab === 'permissions') {
      setFilteredPermissions(filtered as Permission[])
    } else {
      setFilteredCategories(filtered as PermissionCategory[])
    }
  }, [roles, permissions, permissionCategories, searchTerm, selectedCategory, activeTab, sortBy, sortDir])

  const handleDeleteRole = (id: number) => {
    const role = roles.find(r => r.id === id)
    if (role) {
      setSelectedItem(role)
      setShowDeleteModal(true)
    }
  }

  const handleDeletePermission = (id: number) => {
    const permission = permissions.find(p => p.id === id)
    if (permission) {
      setSelectedItem(permission)
      setShowDeleteModal(true)
    }
  }

  const handleDeleteCategory = (id: number) => {
    const category = permissionCategories.find(c => c.id === id)
    if (category) {
      setSelectedItem(category)
      setShowDeleteModal(true)
    }
  }

  const handleEditRole = (role: Role) => {
    setSelectedItem(role)
    setFormData({
      name: role.name,
      slug: role.slug,
      description: role.description || '',
      level: role.level,
      permission_category_id: 1,
      model: ''
    })
    setShowEditModal(true)
  }

  const handleEditPermission = (permission: Permission) => {
    setSelectedItem(permission)
    setFormData({
      name: permission.name,
      slug: permission.slug,
      description: permission.description || '',
      level: 1,
      permission_category_id: permission.permission_category_id,
      model: permission.model || ''
    })
    setShowEditModal(true)
  }

  const handleEditCategory = (category: PermissionCategory) => {
    setSelectedItem(category)
    setFormData({
      name: category.name,
      slug: category.name,
      description: category.title,
      level: 1,
      permission_category_id: 1,
      model: ''
    })
    setShowEditModal(true)
  }

  const handleAdd = () => {
    resetForm()
    setShowAddModal(true)
  }

  const openAssignPermissions = (role: Role) => {
    setSelectedRoleForAssign(role)
    // در mock: نگهداری ارتباط نقش-مجوز داخل حافظه محلی
    // برای شروع، اگر نقش مدیر سیستم است همه مجوزها انتخاب شود، وگرنه خالی
    const preselected = role.slug === 'admin' ? mockPermissions.map(p => p.id) : []
    setSelectedPermissionIds(preselected)
    setShowAssignModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      level: 1,
      permission_category_id: 1,
      model: ''
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (selectedItem) {
      // Edit existing item
      if (activeTab === 'roles') {
        const updatedRoles = roles.map(role => 
          role.id === selectedItem.id 
            ? {
                ...role,
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                level: formData.level,
                updated_at: new Date().toISOString()
              }
            : role
        )
        setRoles(updatedRoles)
      } else if (activeTab === 'permissions') {
        const updatedPermissions = permissions.map(permission => 
          permission.id === selectedItem.id 
            ? {
                ...permission,
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                permission_category_id: formData.permission_category_id,
                model: formData.model,
                updated_at: new Date().toISOString()
              }
            : permission
        )
        setPermissions(updatedPermissions)
      } else {
        const updatedCategories = permissionCategories.map(category => 
          category.id === selectedItem.id 
            ? {
                ...category,
                title: formData.description || category.title,
                name: formData.name,
                updated_at: new Date().toISOString()
              }
            : category
        )
        setPermissionCategories(updatedCategories)
      }
      setShowEditModal(false)
    } else {
      // Add new item
      if (activeTab === 'roles') {
        const newRoleId = roles.length ? Math.max(...roles.map(r => r.id)) + 1 : 1
        const newRole: Role = {
          id: newRoleId,
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          level: formData.level,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setRoles([...roles, newRole])
      } else if (activeTab === 'permissions') {
        const newPermissionId = permissions.length ? Math.max(...permissions.map(p => p.id)) + 1 : 1
        const newPermission: Permission = {
          id: newPermissionId,
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          permission_category_id: formData.permission_category_id,
          model: formData.model,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setPermissions([...permissions, newPermission])
      } else {
        const newCategoryId = permissionCategories.length ? Math.max(...permissionCategories.map(c => c.id)) + 1 : 1
        const newCategory: PermissionCategory = {
          id: newCategoryId,
          title: formData.description || formData.name,
          name: formData.name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setPermissionCategories([...permissionCategories, newCategory])
      }
      setShowAddModal(false)
    }
    
    setSelectedItem(null)
    resetForm()
    setLoading(false)
  }

  const confirmDelete = () => {
    if (selectedItem) {
      if (activeTab === 'roles') {
        const updatedRoles = roles.filter(role => role.id !== selectedItem.id)
        setRoles(updatedRoles)
      } else if (activeTab === 'permissions') {
        const updatedPermissions = permissions.filter(permission => permission.id !== selectedItem.id)
        setPermissions(updatedPermissions)
      } else {
        const updatedCategories = permissionCategories.filter(category => category.id !== selectedItem.id)
        setPermissionCategories(updatedCategories)
      }
      setShowDeleteModal(false)
      setSelectedItem(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت نقش‌ها و دسترسی‌ها</h1>
          <p className="mt-2 text-sm text-gray-700">
            مدیریت نقش‌ها و دسترسی‌های کاربران
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={handleAdd}>
            <PlusIcon className="h-4 w-4 ml-2" />
            {activeTab === 'roles' ? 'افزودن نقش' : 
             activeTab === 'permissions' ? 'افزودن دسترسی' : 
             'افزودن گروه'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'roles' | 'permissions' | 'categories')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles" className="flex items-center">
            <ShieldCheckIcon className="h-4 w-4 ml-2" />
            نقش‌ها
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center">
            <KeyIcon className="h-4 w-4 ml-2" />
            دسترسی‌ها
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center">
            <UsersIcon className="h-4 w-4 ml-2" />
            گروه‌بندی دسترسی‌ها
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        {/* فیلتر جداگانه حذف شد */}

        {/* Content */}
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>لیست نقش‌ها</CardTitle>
              <CardDescription>
                مدیریت نقش‌ها و دسترسی‌های کاربران
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RolesTable
                data={filteredRoles as unknown as RoleLite[]}
                onAssign={openAssignPermissions as any}
                onEdit={handleEditRole as any}
                onDelete={handleDeleteRole}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
            <CardTitle>لیست دسترسی‌ها</CardTitle>
              <CardDescription>
                مدیریت دسترسی‌های سیستم
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PermissionsTable
                data={filteredPermissions as unknown as PermissionLite[]}
                categories={permissionCategories.map(c => ({ id: c.id, title: c.title })) as any}
                onEdit={handleEditPermission as any}
                onDelete={handleDeletePermission}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>لیست گروه‌بندی دسترسی‌ها</CardTitle>
              <CardDescription>
                مدیریت گروه‌بندی دسترسی‌ها (permission_categories)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategoriesTable
                data={filteredCategories as unknown as CategoryLite[]}
                onEdit={handleEditCategory as any}
                onDelete={handleDeleteCategory}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <UpsertEntityModal
        open={showAddModal || showEditModal}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddModal(false)
            setShowEditModal(false)
            setSelectedItem(null)
            resetForm()
          }
        }}
        mode={showAddModal ? 'add' : 'edit'}
        activeTab={activeTab}
        formData={formData}
        setFormData={setFormData}
        permissionCategories={permissionCategories.map(c => ({ id: c.id, title: c.title }))}
        onSubmit={handleSubmit}
        onCancel={() => {
          setShowAddModal(false); setShowEditModal(false); setSelectedItem(null); resetForm()
        }}
        handleInvalid={handleInvalid}
        handleInput={handleInput}
      />

      <DeleteConfirmModal
        open={showDeleteModal}
        activeTab={activeTab}
        name={selectedItem?.name}
        loading={loading}
        onCancel={() => { setShowDeleteModal(false); setSelectedItem(null) }}
        onConfirm={confirmDelete}
        onOpenChange={(open) => { if (!open) { setShowDeleteModal(false); setSelectedItem(null) }}}
      />

      <AssignPermissionsModal
        open={showAssignModal}
        role={selectedRoleForAssign}
        categories={permissionCategories.map(c => ({ id: c.id, title: c.title }))}
        permissions={permissions.map(p => ({ id: p.id, name: p.name, slug: p.slug, permission_category_id: p.permission_category_id }))}
        selectedPermissionIds={selectedPermissionIds}
        setSelectedPermissionIds={setSelectedPermissionIds}
        onClose={() => { setShowAssignModal(false); setSelectedRoleForAssign(null); setSelectedPermissionIds([]) }}
      />
    </div>
  )
}
