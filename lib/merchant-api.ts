import type { MerchantRegistrationData } from './types/merchant-registration'
import { config, endpoints } from './config'
import { validateMerchantPayload } from './merchant-validation'

class MerchantApiService {
  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  /**
   * Upload a file to the backend and return the file path/URL
   */
  async uploadFile(file: File, fileType: 'krapin' | 'business-registration'): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', fileType)

    const response = await fetch(`${config.apiBaseUrl}${endpoints.uploadDocument}`, {
      method: 'POST',
      body: formData,
    })

    const result = await this.handleResponse(response)
    return result.filePath || result.url || result.path // Adjust based on your backend response
  }

  /**
   * Submit merchant registration to backend
   */
  async registerMerchant(data: any): Promise<any> {
    // Validate and format data to match backend expectations
    const validatedData = validateMerchantPayload(data)
    
    const response = await fetch(`${config.apiBaseUrl}${endpoints.addMerchant}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })

    return this.handleResponse(response)
  }

  /**
   * Complete registration process with file uploads and data submission
   */
  async submitRegistration(
    formData: {
      data: Omit<MerchantRegistrationData, 'krapinCertificate' | 'businessRegistrationCertificate'>
      kraPinFile?: File | null
      businessRegFile?: File | null
    }
  ): Promise<any> {
    const registrationData: any = { ...formData.data }

    try {
      // Upload files if present
      if (formData.kraPinFile) {
        const krapinPath = await this.uploadFile(formData.kraPinFile, 'krapin')
        registrationData.krapinCertificate = krapinPath
      } else {
        registrationData.krapinCertificate = ""
      }

      if (formData.businessRegFile) {
        const businessRegPath = await this.uploadFile(formData.businessRegFile, 'business-registration')
        registrationData.businessRegistrationCertificate = businessRegPath
      } else {
        registrationData.businessRegistrationCertificate = ""
      }

      // Submit registration
      return await this.registerMerchant(registrationData as MerchantRegistrationData)
    } catch (error) {
      console.error('Registration submission failed:', error)
      throw error
    }
  }
}

export const merchantApi = new MerchantApiService()