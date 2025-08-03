import { format, parseISO } from 'date-fns'
import { faIR } from 'date-fns/locale'

// Currency formatting for Iranian Rial
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Date formatting
export const formatDate = (date: string | Date, formatStr: string = 'yyyy/MM/dd'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, { locale: faIR })
}

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'yyyy/MM/dd HH:mm')
}

// Phone number formatting for Iranian format
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as Iranian phone number
  if (cleaned.length === 11 && cleaned.startsWith('09')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  }
  
  return phone
}

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Number formatting
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fa-IR').format(num)
}

// Percentage formatting
export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`
} 