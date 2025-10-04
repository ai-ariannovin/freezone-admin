"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type Role = { id: number; name: string }
type Permission = { id: number; name: string; slug: string; permission_category_id: number }
type Category = { id: number; title: string }

type Props = {
  open: boolean
  role?: Role | null
  categories: Category[]
  permissions: Permission[]
  selectedPermissionIds: number[]
  setSelectedPermissionIds: (ids: number[]) => void
  onClose: () => void
}

export default function AssignPermissionsModal({ open, role, categories, permissions, selectedPermissionIds, setSelectedPermissionIds, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader className="text-right">
          <DialogTitle>انتساب دسترسی‌ها به نقش {role?.name}</DialogTitle>
          <DialogDescription>دسترسی‌های مورد نظر را انتخاب کنید</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {categories.map(category => (
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
                          setSelectedPermissionIds(checked ? selectedPermissionIds.filter(id => id !== p.id) : [...selectedPermissionIds, p.id])
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
          <Button variant="outline" onClick={onClose}>انصراف</Button>
          <Button onClick={onClose}>ذخیره</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




