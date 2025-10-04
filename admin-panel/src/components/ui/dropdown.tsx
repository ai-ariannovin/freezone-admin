"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type DropdownOption = { value: string; label: string }

type DropdownProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
  rtl?: boolean
  fullWidth?: boolean
}

export default function Dropdown({ id, value, onChange, options, placeholder = 'انتخاب کنید', required, disabled, rtl = true, fullWidth = true }: DropdownProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label || ''
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled} dir={rtl ? 'rtl' : undefined}>
      <SelectTrigger
        id={id}
        aria-label="انتخاب"
        data-required={required}
        className={[
          fullWidth ? 'w-full' : '',
          rtl ? 'text-right justify-end' : 'text-left',
          // اجازه چندخطی شدن متن داخل تریگر
          'min-h-10 py-2 leading-6 whitespace-normal break-words'
        ].filter(Boolean).join(' ')}
        title={selectedLabel || placeholder}
      >
        {/* از SelectValue استفاده نمی‌کنیم چون truncate می‌کند */}
        <div className="w-full text-sm whitespace-normal break-words overflow-hidden">
          {selectedLabel ? (
            <span
              className="block"
              style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as any }}
            >
              {selectedLabel}
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
      </SelectTrigger>
      <SelectContent
        dir={rtl ? 'rtl' : undefined}
        className={[
          rtl ? 'text-right' : '',
          'min-w-[var(--radix-select-trigger-width)] w-[var(--radix-select-trigger-width)] max-w-[90vw] max-h-64 overflow-auto'
        ].join(' ')}
        align={rtl ? 'end' : 'start'}
      >
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="whitespace-normal break-words">
            <div className="block max-w-full" title={opt.label}>{opt.label}</div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}


