export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7270/api',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
}

export const endpoints = {
  addMerchant: '/Merchant/AddMerchant',
  uploadDocument: '/Upload/Document'
}