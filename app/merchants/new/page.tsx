"use client"

import { useRouter } from "next/navigation"
import { MerchantRegistrationWizard } from "@/components/merchants/registration/merchant-registration-wizard"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { MerchantRegistrationData } from "@/lib/types/merchant-registration"

export default function NewMerchantPage() {
  const router = useRouter()

  const handleComplete = (data: MerchantRegistrationData) => {
    console.log("Registration completed:", data)
    // Here you would typically send the data to your backend API
    
    // Redirect back to merchants page
    router.push("/merchants")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Merchant Registration</h1>
          <p className="text-muted-foreground mt-1">
            Complete the step-by-step registration process to add a new merchant
          </p>
        </div>
      </div>

      {/* Registration Wizard */}
      <MerchantRegistrationWizard
        onComplete={handleComplete}
        onCancel={handleCancel}
      />
    </div>
  )
}