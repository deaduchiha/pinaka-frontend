import { z } from 'zod'

// Iranian phone number validation
export const iranianPhoneSchema = z
  .string()
  .regex(/^09\d{9}$/, 'شماره تلفن باید با 09 شروع شود و 11 رقم باشد')

// Password validation
export const passwordSchema = z
  .string()
  .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'رمز عبور باید شامل حروف بزرگ، کوچک و اعداد باشد')

// Email validation
export const emailSchema = z
  .string()
  .email('ایمیل نامعتبر است')

// National ID validation (Iranian)
export const nationalIdSchema = z
  .string()
  .regex(/^\d{10}$/, 'کد ملی باید 10 رقم باشد')

// Price validation
export const priceSchema = z
  .number()
  .positive('قیمت باید مثبت باشد')
  .min(0, 'قیمت نمی‌تواند منفی باشد')

// Stock quantity validation
export const stockSchema = z
  .number()
  .int('موجودی باید عدد صحیح باشد')
  .min(0, 'موجودی نمی‌تواند منفی باشد')

// SKU validation
export const skuSchema = z
  .string()
  .min(3, 'SKU باید حداقل 3 کاراکتر باشد')
  .max(50, 'SKU نمی‌تواند بیش از 50 کاراکتر باشد')
  .regex(/^[A-Za-z0-9-_]+$/, 'SKU فقط می‌تواند شامل حروف، اعداد، خط تیره و زیرخط باشد')

// Product name validation
export const productNameSchema = z
  .string()
  .min(2, 'نام محصول باید حداقل 2 کاراکتر باشد')
  .max(100, 'نام محصول نمی‌تواند بیش از 100 کاراکتر باشد')

// Address validation
export const addressSchema = z
  .string()
  .min(10, 'آدرس باید حداقل 10 کاراکتر باشد')
  .max(500, 'آدرس نمی‌تواند بیش از 500 کاراکتر باشد')

// Postal code validation (Iranian)
export const postalCodeSchema = z
  .string()
  .regex(/^\d{10}$/, 'کد پستی باید 10 رقم باشد')

// URL validation
export const urlSchema = z
  .string()
  .url('لینک نامعتبر است')

// File size validation (in bytes)
export const fileSizeSchema = (maxSize: number) =>
  z.object({
    size: z.number().max(maxSize, `حجم فایل نمی‌تواند بیش از ${formatFileSize(maxSize)} باشد`)
  })

// File type validation
export const fileTypeSchema = (allowedTypes: string[]) =>
  z.object({
    type: z.string().refine(
      (type) => allowedTypes.includes(type),
      `نوع فایل باید یکی از موارد زیر باشد: ${allowedTypes.join(', ')}`
    )
  })

// Helper function to format file size (import from format.ts)
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Common validation schemas
export const commonSchemas = {
  phone: iranianPhoneSchema,
  password: passwordSchema,
  email: emailSchema,
  nationalId: nationalIdSchema,
  price: priceSchema,
  stock: stockSchema,
  sku: skuSchema,
  productName: productNameSchema,
  address: addressSchema,
  postalCode: postalCodeSchema,
  url: urlSchema,
} 