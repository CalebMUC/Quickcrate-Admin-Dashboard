"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { ContactStep } from "./contact-step"
import { BusinessStep } from "./business-step"
import { PaymentStep } from "./payment-step"
import { DocumentsStep } from "./documents-step"
import { TermsReviewStep } from "./terms-review-step"
import { toast } from "sonner"
import { merchantApi } from "@/lib/merchant-api"
import { validateMerchantPayload } from "@/lib/merchant-validation"
import type { MerchantRegistrationData, MerchantFormData } from "@/lib/types/merchant-registration"

const STEPS = [
  { id: 1, title: "Contact", description: "Personal details" },
  { id: 2, title: "Business", description: "Business info" },
  { id: 3, title: "Payments", description: "Payment methods" },
  { id: 4, title: "Documents", description: "File uploads" },
  { id: 5, title: "Review", description: "Terms & submit" }
]

interface MerchantRegistrationWizardProps {
  onComplete?: (data: MerchantRegistrationData) => void
  onCancel?: () => void
}

export function MerchantRegistrationWizard({ 
  onComplete, 
  onCancel 
}: MerchantRegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<MerchantFormData>>({
    preferredPaymentChannel: [],
    termsAndCondition: false,
    returnPolicy: false,
    status: "Active"
  })

  const handleNext = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }))
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
    // Allow navigation to previous steps or current step
    if (stepId <= currentStep) {
      setCurrentStep(stepId)
    }
  }

  const handleEdit = (stepNumber: number) => {
    setCurrentStep(stepNumber)
  }

  const handleSubmit = async (finalFormData: any) => {
    setIsSubmitting(true)
    
    try {
      // Submit registration with files using the API service
      const response = await merchantApi.submitRegistration({
        data: finalFormData, // The API service will validate and format this
        kraPinFile: finalFormData.kraPinCertificate,
        businessRegFile: finalFormData.businessRegistrationCertificate
      })
      
      toast.success("Registration submitted successfully!", {
        description: "Your application is being reviewed. You'll receive an email confirmation shortly."
      })
      
      // Validate the final data for the callback
      const displayData = validateMerchantPayload({
        ...finalFormData,
        krapinCertificate: response.krapinCertificate || "",
        businessRegistrationCertificate: response.businessRegistrationCertificate || ""
      })
      
      onComplete?.(displayData)
      
    } catch (error: any) {
      toast.error("Failed to submit registration", {
        description: error.message || "Please try again or contact support if the problem persists."
      })
      console.error("Registration submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactStep
            data={formData as any}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <BusinessStep
            data={formData as any}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <PaymentStep
            data={formData as any}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <DocumentsStep
            data={formData as any}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <TermsReviewStep
            data={formData as any}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onEdit={handleEdit}
            isSubmitting={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Stepper */}
      <Card>
        <CardContent className="pt-6">
          <Stepper
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            allowSkip={false}
          />
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <div className="min-h-[600px]">
        {renderCurrentStep()}
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <details>
              <summary className="cursor-pointer text-sm font-medium mb-2">
                Debug Info (Development Only)
              </summary>
              <pre className="text-xs bg-background p-2 rounded overflow-auto">
                {JSON.stringify({ currentStep, formData }, null, 2)}
              </pre>
            </details>
          </CardContent>
        </Card>
      )}
    </div>
  )
}