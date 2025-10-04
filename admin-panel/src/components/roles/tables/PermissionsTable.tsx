"use client"

import DataTable, { Column } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export type PermissionLite = { id: number; name: string; slug: string; permission_category_id: number; description?: string; model?: string }
export type CategoryLite = { id: number; title: string }

type Props = {
  data: PermissionLite[]
  categories: CategoryLite[]
  onEdit: (p: PermissionLite) => void
  onDelete: (id: number) => void
}

export default function PermissionsTable({ data, categories, onEdit, onDelete }: Props) {
  return (
    <DataTable
      data={data}
      columns={[
        { key: 'id', title: 'شناسه', sortable: true },
        { key: 'name', title: 'نام دسترسی', sortable: true },
        { key: 'slug', title: 'شناسه دسترسی (slug)', sortable: true },
        { key: 'permission_category_id', title: 'گروه دسترسی', sortable: false, render: (p: any) => (
          <Badge variant="outline">{categories.find(cat => cat.id === p.permission_category_id)?.title}</Badge>
        )},
        { key: 'actions', title: 'عملیات', sortable: false, render: (p: any) => (
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button variant="ghost" size="sm" onClick={() => onEdit(p)} title="ویرایش" className="text-indigo-600 hover:text-indigo-800">
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(p.id)} title="حذف" className="text-red-600 hover:text-red-900">
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        )},
      ] as Column<any>[]}
      rtl
      searchable
      sortable
      paginated
      showRowIndex
      hiddenKeys={['id']}
    />
  )
}


