"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { roleSchema } from '@/validators/role.schema'
import { permissionSchema } from '@/validators/permission.schema'
import { categorySchema } from '@/validators/category.schema'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Dropdown from '@/components/ui/dropdown'

type Tabs = 'roles' | 'permissions' | 'categories'

export type UpsertEntityFormData = {
  name: string
  slug: string
  description: string
  level: number
  permission_category_id: number
  model: string
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'add' | 'edit'
  activeTab: Tabs
  formData: UpsertEntityFormData
  setFormData: (d: UpsertEntityFormData) => void
  permissionCategories: { id: number; title: string }[]
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  handleInvalid: (e: React.InvalidEvent<HTMLInputElement>) => void
  handleInput: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function UpsertEntityModal({ open, onOpenChange, mode, activeTab, formData, setFormData, permissionCategories, onSubmit, onCancel, handleInvalid, handleInput }: Props) {
  // Prepare resolver per tab
  const resolver = activeTab === 'roles' ? zodResolver(roleSchema) : activeTab === 'permissions' ? zodResolver(permissionSchema) : zodResolver(categorySchema)
  const form = useForm({ resolver, values: formData as any })
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-right">
          <DialogTitle>
            {mode === 'add' ? `افزودن ${activeTab === 'roles' ? 'نقش' : activeTab === 'permissions' ? 'دسترسی' : 'گروه دسترسی'} جدید` : `ویرایش ${activeTab === 'roles' ? 'نقش' : activeTab === 'permissions' ? 'دسترسی' : 'گروه دسترسی'}`}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' ? `اطلاعات ${activeTab === 'roles' ? 'نقش' : activeTab === 'permissions' ? 'دسترسی' : 'گروه دسترسی'} جدید را وارد کنید` : `اطلاعات ${activeTab === 'roles' ? 'نقش' : activeTab === 'permissions' ? 'دسترسی' : 'گروه دسترسی'} را ویرایش کنید`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => { onSubmit(e) }} className="space-y-4">
          {activeTab !== 'categories' && (
            <div className="space-y-2">
              <Label htmlFor="name">{activeTab === 'roles' ? 'نام نقش *' : 'نام دسترسی *'}</Label>
              <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} onInvalid={handleInvalid} onInput={handleInput} data-testid="role-name" />
            </div>
          )}

          {activeTab !== 'categories' && (
            <div className="space-y-2">
              <Label htmlFor="slug">{activeTab === 'roles' ? 'شناسه نقش *' : 'شناسه دسترسی *'}</Label>
              <Input id="slug" required placeholder={activeTab === 'permissions' ? 'view.users' : 'admin'} value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} onInvalid={handleInvalid} onInput={handleInput} data-testid="role-slug" />
            </div>
          )}

          {activeTab !== 'categories' && (
            <div className="space-y-2">
              <Label htmlFor="description">توضیحات</Label>
              <Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} data-testid="role-description" />
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-2">
              <Label htmlFor="level">سطح *</Label>
              <Dropdown id="level" value={formData.level.toString()} onChange={(v) => setFormData({ ...formData, level: parseInt(v) })} required options={[{ value: '1', label: 'سطح ۱' }, { value: '2', label: 'سطح ۲' }, { value: '3', label: 'سطح ۳' }, { value: '4', label: 'سطح ۴' }, { value: '5', label: 'سطح ۵' }]} data-testid="role-level" />
            </div>
          )}

          {activeTab === 'permissions' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="permission_category_id">گروه دسترسی *</Label>
                <Dropdown id="permission_category_id" value={formData.permission_category_id.toString()} onChange={(v) => setFormData({ ...formData, permission_category_id: parseInt(v) })} required options={permissionCategories.map((c) => ({ value: c.id.toString(), label: c.title }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">مدل سیستم *</Label>
                <Input id="model" required placeholder="User" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} onInvalid={handleInvalid} onInput={handleInput} />
              </div>
            </>
          )}

          {activeTab === 'categories' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="description">عنوان گروه *</Label>
                <Input id="description" required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} onInvalid={handleInvalid} onInput={handleInput} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">نام گروه (name) *</Label>
                <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} onInvalid={handleInvalid} onInput={handleInput} />
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>انصراف</Button>
            <Button type="submit" data-testid="save-role">{mode === 'add' ? 'افزودن' : 'ویرایش'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


