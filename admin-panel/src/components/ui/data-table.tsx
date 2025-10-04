'use client'

import { useMemo, useState } from 'react'
import { Input } from './input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Button } from './button'
import { MagnifyingGlassIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline'

export interface Column<T> {
  key: keyof T | string
  title: string
  width?: string | number
  render?: (row: T) => React.ReactNode
  sortable?: boolean
  align?: 'left' | 'right' | 'center'
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  rtl?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  sortable?: boolean
  paginated?: boolean
  pageSizeOptions?: number[]
  defaultPageSize?: number
  className?: string
  showRowIndex?: boolean
  indexTitle?: string
  hiddenKeys?: string[]
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  rtl = true,
  searchable = true,
  searchPlaceholder = 'جستجو…',
  sortable = true,
  paginated = true,
  pageSizeOptions = [10, 20, 30, 50],
  defaultPageSize = 10,
  className,
  showRowIndex = true,
  indexTitle = 'ردیف',
  hiddenKeys = [],
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<string>('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const filtered = useMemo(() => {
    let rows = [...data]
    if (search) {
      const s = search.toLowerCase()
      rows = rows.filter((r) => Object.values(r).some((v) => String(v ?? '').toLowerCase().includes(s)))
    }
    if (sortable && sortBy) {
      rows.sort((a, b) => {
        const av = a[sortBy as keyof T]
        const bv = b[sortBy as keyof T]
        if (av == null && bv == null) return 0
        if (av == null) return 1
        if (bv == null) return -1
        if (typeof av === 'number' && typeof bv === 'number') {
          return sortDir === 'asc' ? av - bv : bv - av
        }
        return sortDir === 'asc'
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av))
      })
    }
    return rows
  }, [data, search, sortable, sortBy, sortDir])

  const pageStart = Math.min((page - 1) * pageSize, filtered.length)
  const pageEnd = Math.min(page * pageSize, filtered.length)
  const pageRows = paginated ? filtered.slice(pageStart, pageEnd) : filtered

  const headButtonClass = 'text-right w-full inline-flex items-center justify-end flex-row-reverse gap-1'
  const dirProps = rtl ? { dir: 'rtl' as const } : {}

  const visibleColumns = useMemo(() => columns.filter(c => !hiddenKeys.includes(String(c.key))), [columns, hiddenKeys])

  return (
    <div className={className} {...dirProps}>
      {(searchable || paginated) && (
        <div className="mb-3 flex items-center justify-between">
          {paginated ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>نمایش</span>
              <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(1) }}>
                <SelectTrigger className="h-8 w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>رکورد</span>
            </div>
          ) : <span />}

          {searchable && (
            <div className="relative w-full sm:max-w-xs">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-9 h-9 text-sm text-right"
              />
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {showRowIndex && (
                <TableHead className="text-right w-12">{indexTitle}</TableHead>
              )}
              {visibleColumns.map((c) => (
                <TableHead key={String(c.key)} className={c.align ? `text-${c.align}` : 'text-right'}>
                  {sortable && c.sortable !== false ? (
                    <button className={headButtonClass} onClick={() => {
                      const k = String(c.key)
                      if (sortBy === k) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
                      else { setSortBy(k); setSortDir('asc') }
                    }}>
                      <span>{c.title}</span>
                      <ArrowsUpDownIcon className={`h-3.5 w-3.5 ${sortBy===String(c.key) ? 'text-gray-600' : 'text-gray-400'}`} />
                    </button>
                  ) : (
                    <span>{c.title}</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((row, idx) => (
              <TableRow key={idx}>
                {showRowIndex && (
                  <TableCell className="text-right w-12">{(pageStart + idx + 1)}</TableCell>
                )}
                {visibleColumns.map((c) => (
                  <TableCell key={String(c.key)} className={c.align ? `text-${c.align}` : 'text-right'}>
                    {c.render ? c.render(row) : String(row[c.key as keyof T])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {paginated && (
        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground" {...dirProps}>
          <div>
            نمایش {Math.min(pageStart + 1, filtered.length)} تا {pageEnd} از {filtered.length} رکورد
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page===1} onClick={()=>setPage(page-1)}>قبلی</Button>
            <Button variant="outline" size="sm" disabled={pageEnd>=filtered.length} onClick={()=>setPage(page+1)}>بعدی</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable




