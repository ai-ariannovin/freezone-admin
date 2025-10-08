"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type Tabs = 'roles' | 'permissions' | 'categories'

type Props = {
  open: boolean
  activeTab: Tabs
  name?: string
  loading?: boolean
  onCancel: () => void
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
}

export default function DeleteConfirmModal({ open, activeTab, name, loading, onCancel, onConfirm, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-right">
          <DialogTitle>تأیید حذف</DialogTitle>
          <DialogDescription>
            آیا مطمئن هستید که می‌خواهید {activeTab === 'roles' ? 'نقش' : activeTab === 'permissions' ? 'دسترسی' : 'گروه دسترسی'} <strong>{name}</strong> را حذف کنید؟
            <br />
            <span className="text-red-600 text-sm">این عمل قابل بازگشت نیست.</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>انصراف</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={!!loading} data-testid="confirm-delete">{loading ? 'در حال حذف...' : 'حذف'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




