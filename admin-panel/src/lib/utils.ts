import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment-jalaali'

// تنظیم moment برای استفاده از تقویم جلالی
moment.loadPersian({ dialect: 'persian-modern' })

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return moment(date).format('jYYYY/jMM/jDD')
}

export function formatDateTime(date: string | Date): string {
  return moment(date).format('jYYYY/jMM/jDD HH:mm')
}

export function formatDateForInput(date: string | Date): string {
  // برای input type="date" باید تاریخ میلادی باشد
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}
