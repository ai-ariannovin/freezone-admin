'use client'

import React, { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment-jalaali'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// تنظیم moment برای استفاده از تقویم جلالی
moment.loadPersian({ dialect: 'persian-modern' })

// تنظیم locale فارسی برای react-datepicker
import 'react-datepicker/dist/react-datepicker.css'

interface PersianDatePickerProps {
  value?: string | Date
  onChange?: (date: string | null) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  required?: boolean
  id?: string
  name?: string
}

const PersianDatePicker = forwardRef<HTMLInputElement, PersianDatePickerProps>(
  ({ value, onChange, placeholder = "تاریخ را انتخاب کنید", className, disabled, required, id, name }, ref) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

    React.useEffect(() => {
      if (value) {
        if (typeof value === 'string') {
          // اگر string است، آن را به Date تبدیل کن
          const date = new Date(value)
          setSelectedDate(isNaN(date.getTime()) ? null : date)
        } else {
          setSelectedDate(value)
        }
      } else {
        setSelectedDate(null)
      }
    }, [value])

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date)
      if (onChange) {
        if (date) {
          // تاریخ را به فرمت ISO string تبدیل کن (Gregorian) برای ذخیره در دیتابیس
          onChange(date.toISOString().split('T')[0])
        } else {
          onChange(null)
        }
      }
    }

    const formatDate = (date: Date) => {
      return moment(date).format('jYYYY/jMM/jDD')
    }

    const formatDateForDisplay = (dateString: string) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return moment(date).format('jYYYY/jMM/jDD')
    }

    const CustomInput = forwardRef<HTMLInputElement, any>(({ value: inputValue, onClick, placeholder: inputPlaceholder }, inputRef) => (
      <Button
        ref={inputRef}
        variant="outline"
        onClick={onClick}
        className={cn(
          "w-full justify-start text-left font-normal persian-date-display",
          !inputValue && "text-muted-foreground",
          className
        )}
        disabled={disabled}
        type="button"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {inputValue ? formatDateForDisplay(inputValue) : inputPlaceholder}
      </Button>
    ))

    CustomInput.displayName = 'CustomInput'

    return (
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={<CustomInput />}
        dateFormat="yyyy-MM-dd"
        calendar="persian"
        locale="fa"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        yearDropdownItemNumber={15}
        scrollableYearDropdown
        placeholderText={placeholder}
        disabled={disabled}
        required={required}
        id={id}
        name={name}
        ref={ref}
        isRTL={true}
        className="persian-datepicker"
        wrapperClassName="w-full"
        popperClassName="persian-datepicker-popper"
        popperPlacement="bottom-start"
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ]}
      />
    )
  }
)

PersianDatePicker.displayName = 'PersianDatePicker'

export { PersianDatePicker }
