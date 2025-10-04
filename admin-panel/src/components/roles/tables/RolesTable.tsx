"use client"

import DataTable, { Column } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { KeyIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export type RoleLite = { id: number; name: string; slug: string; level: number; description?: string }

type Props = {
  data: RoleLite[]
  onAssign: (role: RoleLite) => void
  onEdit: (role: RoleLite) => void
  onDelete: (id: number) => void
}

export default function RolesTable({ data, onAssign, onEdit, onDelete }: Props) {
  return (
    <DataTable
      data={data}
      columns={[
        { key: 'id', title: 'شناسه', sortable: true },
        { key: 'name', title: 'نام نقش', sortable: true },
        { key: 'slug', title: 'شناسه نقش (slug)', sortable: true },
        { key: 'level', title: 'سطح', sortable: true, render: (role: any) => (
          <Badge variant="secondary">سطح {role.level}</Badge>
        )},
        { key: 'actions', title: 'عملیات', sortable: false, render: (role: any) => (
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button variant="ghost" size="sm" onClick={() => onAssign(role)} title="انتساب دسترسی" className="text-amber-600 hover:text-amber-800">
              <KeyIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(role)} title="ویرایش" className="text-indigo-600 hover:text-indigo-800">
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(role.id)} title="حذف" className="text-red-600 hover:text-red-900">
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


