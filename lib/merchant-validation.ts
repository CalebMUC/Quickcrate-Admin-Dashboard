import type { MerchantRegistrationData } from './types/merchant-registration'

/**
 * Utility to validate the merchant registration payload matches backend expectations
 */
export function validateMerchantPayload(data: any): MerchantRegistrationData {
  const requiredFields = [
    'businessName', 'businessType', 'businessRegistrationNo', 'krapin',
    'businessNature', 'businessCategory', 'merchantName', 'email', 'phone',
    'address', 'socialMedia', 'bankName', 'bankAccountNo', 'bankAccountName',
    'mpesaPaybill', 'mpesaTillNumber', 'preferredPaymentChannel',
    'krapinCertificate', 'businessRegistrationCertificate', 'termsAndCondition',
    'deliveryMethod', 'returnPolicy', 'status'
  ]

  const validatedData: MerchantRegistrationData = {
    businessName: data.businessName || "",
    businessType: data.businessType || "",
    businessRegistrationNo: data.businessRegistrationNo || "",
    krapin: data.krapin || data.kraPin || "", // Handle both field names
    businessNature: data.businessNature || "",
    businessCategory: data.businessCategory || "",
    merchantName: data.merchantName || "",
    email: data.email || "",
    phone: data.phone || "",
    address: data.address || "",
    socialMedia: data.socialMedia || "",
    bankName: data.bankName || "",
    bankAccountNo: data.bankAccountNo || "",
    bankAccountName: data.bankAccountName || "",
    mpesaPaybill: data.mpesaPaybill || "",
    mpesaTillNumber: data.mpesaTillNumber || "",
    preferredPaymentChannel: Array.isArray(data.preferredPaymentChannel) 
      ? data.preferredPaymentChannel.join(",")
      : data.preferredPaymentChannel || "",
    krapinCertificate: data.krapinCertificate || "",
    businessRegistrationCertificate: data.businessRegistrationCertificate || "",
    termsAndCondition: Boolean(data.termsAndCondition),
    deliveryMethod: data.deliveryMethod || "",
    returnPolicy: Boolean(data.returnPolicy),
    status: data.status || "Active"
  }

  // Log the payload for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.group('🔍 Merchant Registration Payload')
    console.log('Raw form data:', data)
    console.log('Validated API payload:', validatedData)
    console.log('Payload size:', JSON.stringify(validatedData).length, 'bytes')
    console.groupEnd()
  }

  return validatedData
}

/**
 * Sample payload structure for reference
 */
export const SAMPLE_PAYLOAD: MerchantRegistrationData = {
  businessName: "TechCorp Solutions",
  businessType: "technology",
  businessRegistrationNo: "BRC12345",
  krapin: "A123456789Z",
  businessNature: "Software development and consulting services",
  businessCategory: "technology",
  merchantName: "John Doe",
  email: "john@techcorp.com",
  phone: "+254700123456",
  address: "123 Tech Street, Nairobi, Kenya",
  socialMedia: "@techcorp_solutions",
  bankName: "KCB Bank",
  bankAccountNo: "1234567890",
  bankAccountName: "TechCorp Solutions Ltd",
  mpesaPaybill: "400200",
  mpesaTillNumber: "123456",
  preferredPaymentChannel: "bank,mpesa",
  krapinCertificate: "/uploads/documents/krapin_cert.pdf",
  businessRegistrationCertificate: "/uploads/documents/business_cert.pdf",
  termsAndCondition: true,
  deliveryMethod: "both",
  returnPolicy: true,
  status: "Active"
}