"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type LevelSelectProps = {
  id?: string
  value: number
  onChange: (value: number) => void
  required?: boolean
  placeholder?: string
}

export default function LevelSelect({ id, value, onChange, required, placeholder = 'انتخاب سطح' }: LevelSelectProps) {
  return (
    <Select value={value.toString()} onValueChange={(v) => onChange(parseInt(v))}>
      <SelectTrigger id={id} aria-label="سطح" data-required={required}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">سطح ۱</SelectItem>
        <SelectItem value="2">سطح ۲</SelectItem>
        <SelectItem value="3">سطح ۳</SelectItem>
        <SelectItem value="4">سطح ۴</SelectItem>
        <SelectItem value="5">سطح ۵</SelectItem>
      </SelectContent>
    </Select>
  )
}




