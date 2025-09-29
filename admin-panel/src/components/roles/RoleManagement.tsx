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
  FunnelIcon
} from '@heroicons/react/24/outline'
import { Role, Permission, PermissionCategory } from '@/types'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
  { id: 1, title: 'مدیریت کاربران', name: 'user_management', created_at: '2025-09-22 06:42:40', updated_at: '2025-09-22 06:42:40' },
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
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    level: 1,
    permission_category_id: 1,
    model: ''
  })

  useEffect(() => {
    let filtered: any[] = []
    if (activeTab === 'roles') filtered = roles
    if (activeTab === 'permissions') filtered = permissions
    if (activeTab === 'categories') filtered = permissionCategories

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (activeTab === 'permissions' && selectedCategory) {
      filtered = filtered.filter(item => 
        'permission_category_id' in item && item.permission_category_id === selectedCategory
      )
    }

    if (activeTab === 'roles') {
      setFilteredRoles(filtered as Role[])
    } else if (activeTab === 'permissions') {
      setFilteredPermissions(filtered as Permission[])
    } else {
      setFilteredCategories(filtered as PermissionCategory[])
    }
  }, [roles, permissions, permissionCategories, searchTerm, selectedCategory, activeTab])

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
      model: permission.model
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
        const newRole: Role = {
          id: Math.max(...roles.map(r => r.id)) + 1,
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          level: formData.level,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setRoles([...roles, newRole])
      } else if (activeTab === 'permissions') {
        const newPermission: Permission = {
          id: Math.max(...permissions.map(p => p.id)) + 1,
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
        const newCategory: PermissionCategory = {
          id: Math.max(...permissionCategories.map(c => c.id)) + 1,
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
            {activeTab === 'roles' ? 'افزودن نقش' : 'افزودن مجوز'}
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
            دسته‌بندی مجوزها
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>فیلترها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="search">جستجو</Label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder={activeTab === 'roles' ? 'جستجو در نقش‌ها' : 'جستجو در دسترسی‌ها'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>

              {activeTab === 'permissions' && (
                <div className="space-y-2">
                  <Label htmlFor="category">دسته‌بندی</Label>
                  <Select value={selectedCategory ? selectedCategory.toString() : undefined} onValueChange={(value) => setSelectedCategory(value ? Number(value) : '')}>
                    <SelectTrigger>
                      <SelectValue placeholder="همه" />
                    </SelectTrigger>
                    <SelectContent>
                      {permissionCategories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                  }}
                >
                  <FunnelIcon className="h-4 w-4 ml-2" />
                  پاک کردن فیلترها
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">نقش</TableHead>
                      <TableHead className="text-right">سطح</TableHead>
                      <TableHead className="text-right">توضیحات</TableHead>
                      <TableHead className="text-right">تاریخ ایجاد</TableHead>
                      <TableHead className="text-right">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                              </div>
                            </div>
                            <div className="mr-4">
                              <div className="text-sm font-medium text-gray-900">
                                {role.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {role.slug}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            سطح {role.level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {role.description}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(role.created_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Button variant="ghost" size="sm" title="مشاهده">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => openAssignPermissions(role)}
                              title="انتساب دسترسی"
                            >
                              <KeyIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditRole(role)}
                              title="ویرایش"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRole(role.id)}
                              title="حذف"
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">دسترسی</TableHead>
                      <TableHead className="text-right">دسته‌بندی</TableHead>
                      <TableHead className="text-right">مدل</TableHead>
                      <TableHead className="text-right">توضیحات</TableHead>
                      <TableHead className="text-right">تاریخ ایجاد</TableHead>
                      <TableHead className="text-right">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPermissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <KeyIcon className="h-6 w-6 text-green-600" />
                              </div>
                            </div>
                            <div className="mr-4">
                              <div className="text-sm font-medium text-gray-900">
                                {permission.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {permission.slug}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {permissionCategories.find(cat => cat.id === permission.permission_category_id)?.title}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {permission.model}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {permission.description}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(permission.created_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Button variant="ghost" size="sm" title="مشاهده">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPermission(permission)}
                              title="ویرایش"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePermission(permission.id)}
                              title="حذف"
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>لیست دسته‌بندی‌های دسترسی</CardTitle>
              <CardDescription>
                مدیریت دسته‌بندی‌های دسترسی (permission_categories)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">عنوان</TableHead>
                      <TableHead className="text-right">نام (name)</TableHead>
                      <TableHead className="text-right">تاریخ ایجاد</TableHead>
                      <TableHead className="text-right">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="text-sm font-medium text-gray-900">{category.title}</div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">{category.name}</TableCell>
                        <TableCell className="text-sm text-gray-500">{formatDate(category.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)} title="ویرایش">
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)} title="حذف" className="text-red-600 hover:text-red-900">
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Modal */}
      <Dialog open={showAddModal || showEditModal} onOpenChange={(open) => {
        if (!open) {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedItem(null)
          resetForm()
        }
      }}>
        <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={() => {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedItem(null)
          resetForm()
        }}>
          <DialogHeader className="text-right">
            <DialogTitle>
              {showAddModal ? `افزودن ${activeTab === 'roles' ? 'نقش' : 'دسترسی'} جدید` : `ویرایش ${activeTab === 'roles' ? 'نقش' : 'دسترسی'}`}
            </DialogTitle>
            <DialogDescription>
              {showAddModal ? `اطلاعات ${activeTab === 'roles' ? 'نقش' : 'دسترسی'} جدید را وارد کنید` : `اطلاعات ${activeTab === 'roles' ? 'نقش' : 'دسترسی'} را ویرایش کنید`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">نام *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">شناسه *</Label>
              <Input
                id="slug"
                required
                placeholder="user.create"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">توضیحات</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {activeTab === 'roles' && (
              <div className="space-y-2">
                <Label htmlFor="level">سطح *</Label>
                <Select value={formData.level.toString()} onValueChange={(value) => setFormData({...formData, level: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">سطح 1</SelectItem>
                    <SelectItem value="2">سطح 2</SelectItem>
                    <SelectItem value="3">سطح 3</SelectItem>
                    <SelectItem value="4">سطح 4</SelectItem>
                    <SelectItem value="5">سطح 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab === 'permissions' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="permission_category_id">دسته‌بندی *</Label>
                  <Select value={formData.permission_category_id.toString()} onValueChange={(value) => setFormData({...formData, permission_category_id: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {permissionCategories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">مدل *</Label>
                  <Input
                    id="model"
                    required
                    placeholder="User"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                  />
                </div>
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
                  setSelectedItem(null)
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
          setSelectedItem(null)
        }
      }}>
        <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={() => {
          setShowDeleteModal(false)
          setSelectedItem(null)
        }}>
          <DialogHeader className="text-right">
            <DialogTitle>تأیید حذف</DialogTitle>
            <DialogDescription>
              آیا مطمئن هستید که می‌خواهید {activeTab === 'roles' ? 'نقش' : 'دسترسی'} <strong>{selectedItem?.name}</strong> را حذف کنید؟
              <br />
              <span className="text-red-600 text-sm">این عمل قابل بازگشت نیست.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedItem(null)
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

      {/* Assign Permissions Modal */}
      <Dialog open={showAssignModal} onOpenChange={(open) => {
        if (!open) {
          setShowAssignModal(false)
          setSelectedRoleForAssign(null)
          setSelectedPermissionIds([])
        }
      }}>
        <DialogContent className="sm:max-w-[700px]"><DialogHeader className="text-right">
          <DialogTitle>انتساب دسترسی‌ها به نقش {selectedRoleForAssign?.name}</DialogTitle>
          <DialogDescription>دسترسی‌های مورد نظر را انتخاب کنید</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {permissionCategories.map(category => (
            <div key={category.id} className="border rounded-md p-3">
              <div className="font-medium mb-2">{category.title}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {permissions.filter(p => p.permission_category_id === category.id).map(p => {
                  const checked = selectedPermissionIds.includes(p.id)
                  return (
                    <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setSelectedPermissionIds(prev => checked ? prev.filter(id => id !== p.id) : [...prev, p.id])
                        }}
                      />
                      <span className="text-sm">{p.name} <span className="text-xs text-gray-500">({p.slug})</span></span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => {
            setShowAssignModal(false)
            setSelectedRoleForAssign(null)
            setSelectedPermissionIds([])
          }}>انصراف</Button>
          <Button onClick={() => {
            // در حالت mock این تنظیمات را فقط در حافظه نگه می‌داریم
            // در اتصال واقعی، اینجا API: POST /roles/{id}/permissions
            setShowAssignModal(false)
          }}>ذخیره</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
