export interface MerchantRegistrationData {
  // Contact Information (Step 1)
  merchantName: string
  email: string
  phone: string
  address: string
  socialMedia: string

  // Business Information (Step 2)
  businessName: string
  businessType: string
  businessRegistrationNo: string
  krapin: string // Note: lowercase 'p' to match backend
  businessNature: string
  businessCategory: string
  deliveryMethod: string

  // Payment Information (Step 3)
  preferredPaymentChannel: string // Changed from array to string
  bankName?: string
  bankAccountNo?: string
  bankAccountName?: string
  mpesaPaybill?: string
  mpesaTillNumber?: string

  // Documents (Step 4) - Changed to string for file paths/URLs
  krapinCertificate?: string
  businessRegistrationCertificate?: string

  // Terms & Conditions (Step 5)
  termsAndCondition: boolean
  returnPolicy: boolean
  status: string
}

// Internal form data interface (with File objects)
export interface MerchantFormData extends Omit<MerchantRegistrationData, 'preferredPaymentChannel' | 'krapinCertificate' | 'businessRegistrationCertificate' | 'krapin'> {
  preferredPaymentChannel: PaymentChannel[] // Keep array for form handling
  kraPin: string // Form uses camelCase
  kraPinCertificate?: File | null // Form uses File objects
  businessRegistrationCertificate?: File | null
}

export type PaymentChannel = 'bank' | 'mpesa' | 'cash'

export interface MerchantRegistrationStep {
  id: number
  title: string
  description: string
  fields: string[]
}

export interface FormValidationErrors {
  [key: string]: string | undefined
}

export interface FileUploadPreview {
  file: File
  url: string
  name: string
  size: number
}

// Business type options
export const BUSINESS_TYPES = [
  { value: 'retail', label: 'Retail' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'service', label: 'Service' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'technology', label: 'Technology' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'other', label: 'Other' }
] as const

// Business category options
export const BUSINESS_CATEGORIES = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'home_garden', label: 'Home & Garden' },
  { value: 'health_beauty', label: 'Health & Beauty' },
  { value: 'sports', label: 'Sports & Recreation' },
  { value: 'books_media', label: 'Books & Media' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'toys_games', label: 'Toys & Games' },
  { value: 'other', label: 'Other' }
] as const

// Delivery method options
export const DELIVERY_METHODS = [
  { value: 'pickup', label: 'Customer Pickup' },
  { value: 'delivery', label: 'Home Delivery' },
  { value: 'shipping', label: 'Shipping' },
  { value: 'both', label: 'Pickup & Delivery' }
] as const

// Payment channel options
export const PAYMENT_CHANNELS = [
  { value: 'bank', label: 'Bank Transfer' },
  { value: 'mpesa', label: 'M-Pesa' },
  { value: 'cash', label: 'Cash on Delivery' }
] as const