"use client"

import DataTable, { Column } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export type CategoryLite = { id: number; title: string; name: string }

type Props = {
  data: CategoryLite[]
  onEdit: (c: CategoryLite) => void
  onDelete: (id: number) => void
}

export default function CategoriesTable({ data, onEdit, onDelete }: Props) {
  return (
    <DataTable
      data={data}
      columns={[
        { key: 'id', title: 'شناسه', sortable: true },
        { key: 'title', title: 'عنوان', sortable: true },
        { key: 'name', title: 'نام (name)', sortable: true },
        { key: 'actions', title: 'عملیات', sortable: false, render: (c: any) => (
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button variant="ghost" size="sm" onClick={() => onEdit(c)} title="ویرایش" className="text-indigo-600 hover:text-indigo-800" data-testid={`edit-category-${c.id}`}>
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(c.id)} title="حذف" className="text-red-600 hover:text-red-900" data-testid={`delete-category-${c.id}`}>
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


