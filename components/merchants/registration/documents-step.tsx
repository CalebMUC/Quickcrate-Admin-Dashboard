"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, FileText, X, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { MerchantRegistrationData, MerchantFormData, FileUploadPreview } from "@/lib/types/merchant-registration"

const documentsSchema = z.object({
  kraPinCertificate: z.any().optional(),
  businessRegistrationCertificate: z.any().optional()
})

type DocumentsFormData = z.infer<typeof documentsSchema>

interface DocumentsStepProps {
  data: Partial<MerchantFormData>
  onNext: (data: Partial<MerchantFormData>) => void
  onBack: () => void
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
]

export function DocumentsStep({ data, onNext, onBack }: DocumentsStepProps) {
  const [kraPinFile, setKraPinFile] = useState<FileUploadPreview | null>(null)
  const [businessRegFile, setBusinessRegFile] = useState<FileUploadPreview | null>(null)
  const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>({})

  const {
    handleSubmit,
    formState: { isValid }
  } = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
    mode: "onChange"
  })

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB"
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return "File must be PDF, JPEG, JPG, or PNG"
    }
    return null
  }

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: 'kra' | 'business'
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const error = validateFile(file)
    if (error) {
      setUploadErrors(prev => ({ ...prev, [fileType]: error }))
      return
    }

    // Clear any previous errors
    setUploadErrors(prev => ({ ...prev, [fileType]: "" }))

    // Create file preview
    const preview: FileUploadPreview = {
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }

    if (fileType === 'kra') {
      // Clean up previous URL if exists
      if (kraPinFile?.url) {
        URL.revokeObjectURL(kraPinFile.url)
      }
      setKraPinFile(preview)
    } else {
      // Clean up previous URL if exists
      if (businessRegFile?.url) {
        URL.revokeObjectURL(businessRegFile.url)
      }
      setBusinessRegFile(preview)
    }

    // Reset the input
    event.target.value = ''
  }

  const removeFile = (fileType: 'kra' | 'business') => {
    if (fileType === 'kra') {
      if (kraPinFile?.url) {
        URL.revokeObjectURL(kraPinFile.url)
      }
      setKraPinFile(null)
    } else {
      if (businessRegFile?.url) {
        URL.revokeObjectURL(businessRegFile.url)
      }
      setBusinessRegFile(null)
    }
    setUploadErrors(prev => ({ ...prev, [fileType]: "" }))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const onSubmit = () => {
    onNext({
      kraPinCertificate: kraPinFile?.file || undefined,
      businessRegistrationCertificate: businessRegFile?.file || undefined
    })
  }

  const FileUploadArea = ({ 
    fileType, 
    title, 
    description,
    file,
    error 
  }: {
    fileType: 'kra' | 'business'
    title: string
    description: string
    file: FileUploadPreview | null
    error?: string
  }) => {
    return (
      <div className="space-y-2">
        <Label className="text-base font-medium">{title}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {!file ? (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-muted-foreground/50 transition-colors">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <Label htmlFor={`${fileType}-upload`} className="cursor-pointer">
                  <span className="text-primary hover:text-primary/80">Click to upload</span>
                  <span className="text-muted-foreground"> or drag and drop</span>
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, JPEG, JPG, PNG (max 5MB)
                </p>
              </div>
            </div>
            <Input
              id={`${fileType}-upload`}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, fileType)}
              className="hidden"
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(fileType)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* File preview for images */}
            {file.file.type.startsWith('image/') && (
              <div className="mt-3">
                <img
                  src={file.url}
                  alt="Preview"
                  className="max-w-full h-32 object-cover rounded border"
                />
              </div>
            )}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeFile(fileType)}
              className="w-full"
            >
              Replace File
            </Button>
          </div>
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents Upload</CardTitle>
        <CardDescription>
          Upload your business documents. These help us verify your business legitimacy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* KRA PIN Certificate */}
          <FileUploadArea
            fileType="kra"
            title="KRA PIN Certificate"
            description="Upload your KRA PIN certificate (Optional but recommended)"
            file={kraPinFile}
            error={uploadErrors.kra}
          />

          {/* Business Registration Certificate */}
          <FileUploadArea
            fileType="business"
            title="Business Registration Certificate"
            description="Upload your business registration certificate (Optional but recommended)"
            file={businessRegFile}
            error={uploadErrors.business}
          />

          {/* Info Alert */}
          <Alert>
            <AlertDescription>
              <strong>Note:</strong> Document uploads are optional but highly recommended. 
              Verified businesses get priority placement and increased customer trust.
              You can always upload documents later from your merchant dashboard.
            </AlertDescription>
          </Alert>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Back
            </Button>
            <Button type="submit">
              Next: Terms & Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}