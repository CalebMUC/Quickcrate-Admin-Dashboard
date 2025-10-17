"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Edit, User, Building, CreditCard, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { MerchantRegistrationData } from "@/lib/types/merchant-registration"

const termsSchema = z.object({
  termsAndCondition: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
  returnPolicy: z.boolean().refine(val => val === true, {
    message: "You must accept the return policy"
  })
})

type TermsFormData = z.infer<typeof termsSchema>

interface TermsReviewStepProps {
  data: any
  onSubmit: (data: any) => void
  onBack: () => void
  onEdit: (step: number) => void
  isSubmitting?: boolean
}

export function TermsReviewStep({ 
  data, 
  onSubmit, 
  onBack, 
  onEdit, 
  isSubmitting = false 
}: TermsReviewStepProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<TermsFormData>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      termsAndCondition: data.termsAndCondition || false,
      returnPolicy: data.returnPolicy || false
    },
    mode: "onChange"
  })

  const termsAccepted = watch("termsAndCondition")
  const returnPolicyAccepted = watch("returnPolicy")

  const handleFormSubmit = (formData: TermsFormData) => {
    const finalData = {
      ...data,
      ...formData,
      status: "Active"
    }
    onSubmit(finalData)
  }

  const ReviewSection = ({ 
    title, 
    icon, 
    stepNumber, 
    children 
  }: {
    title: string
    icon: React.ReactNode
    stepNumber: number
    children: React.ReactNode
  }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="font-medium">{title}</h3>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onEdit(stepNumber)}
          className="text-primary hover:text-primary/80"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </div>
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        {children}
      </div>
    </div>
  )

  const DetailRow = ({ label, value }: { label: string, value: string | undefined }) => {
    if (!value) return null
    return (
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{label}:</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Submit</CardTitle>
        <CardDescription>
          Please review all information before submitting your merchant registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Review Summary */}
          <ScrollArea className="h-96 w-full rounded-md border p-4">
            <div className="space-y-6">
              {/* Contact Information */}
              <ReviewSection 
                title="Contact Information" 
                icon={<User className="h-5 w-5" />}
                stepNumber={1}
              >
                <DetailRow label="Merchant Name" value={data.merchantName} />
                <DetailRow label="Email" value={data.email} />
                <DetailRow label="Phone" value={data.phone} />
                <DetailRow label="Address" value={data.address} />
                <DetailRow label="Social Media" value={data.socialMedia} />
              </ReviewSection>

              <Separator />

              {/* Business Information */}
              <ReviewSection 
                title="Business Information" 
                icon={<Building className="h-5 w-5" />}
                stepNumber={2}
              >
                <DetailRow label="Business Name" value={data.businessName} />
                <DetailRow label="Business Type" value={data.businessType} />
                <DetailRow label="Registration No." value={data.businessRegistrationNo} />
                <DetailRow label="KRA PIN" value={data.kraPin} />
                <DetailRow label="Business Category" value={data.businessCategory} />
                <DetailRow label="Delivery Method" value={data.deliveryMethod} />
                <DetailRow label="Business Nature" value={data.businessNature} />
              </ReviewSection>

              <Separator />

              {/* Payment Information */}
              <ReviewSection 
                title="Payment Information" 
                icon={<CreditCard className="h-5 w-5" />}
                stepNumber={3}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Payment Channels:</span>
                    <div className="flex flex-wrap gap-1">
                      {(typeof data.preferredPaymentChannel === 'string' 
                        ? data.preferredPaymentChannel.split(',').filter(Boolean)
                        : data.preferredPaymentChannel || []
                      ).map((channel: string) => (
                        <Badge key={channel} variant="secondary" className="text-xs">
                          {channel.charAt(0).toUpperCase() + channel.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {data.preferredPaymentChannel?.includes('bank') && (
                    <>
                      <DetailRow label="Bank Name" value={data.bankName} />
                      <DetailRow label="Account Number" value={data.bankAccountNo} />
                      <DetailRow label="Account Name" value={data.bankAccountName} />
                    </>
                  )}
                  
                  {data.preferredPaymentChannel?.includes('mpesa') && (
                    <>
                      <DetailRow label="M-Pesa Paybill" value={data.mpesaPaybill} />
                      <DetailRow label="M-Pesa Till" value={data.mpesaTillNumber} />
                    </>
                  )}
                </div>
              </ReviewSection>

              <Separator />

              {/* Documents */}
              <ReviewSection 
                title="Documents" 
                icon={<FileText className="h-5 w-5" />}
                stepNumber={4}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">KRA Certificate:</span>
                    <span className="text-sm font-medium">
                      {data.kraPinCertificate ? (
                        <Badge variant="secondary" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">Not uploaded</Badge>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Business Registration:</span>
                    <span className="text-sm font-medium">
                      {data.businessRegistrationCertificate ? (
                        <Badge variant="secondary" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">Not uploaded</Badge>
                      )}
                    </span>
                  </div>
                </div>
              </ReviewSection>
            </div>
          </ScrollArea>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <h3 className="font-medium">Terms and Conditions</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setValue("termsAndCondition", !!checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor="terms" className="cursor-pointer text-sm">
                    I accept the{" "}
                    <Button variant="link" className="p-0 h-auto text-primary underline">
                      Terms and Conditions
                    </Button>
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to our platform terms and merchant agreement.
                  </p>
                </div>
              </div>
              {errors.termsAndCondition && (
                <p className="text-sm text-destructive ml-6">{errors.termsAndCondition.message}</p>
              )}

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="returnPolicy"
                  checked={returnPolicyAccepted}
                  onCheckedChange={(checked) => setValue("returnPolicy", !!checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor="returnPolicy" className="cursor-pointer text-sm">
                    I understand and agree to the{" "}
                    <Button variant="link" className="p-0 h-auto text-primary underline">
                      Return Policy guidelines
                    </Button>
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    You acknowledge the return policy requirements for merchants on our platform.
                  </p>
                </div>
              </div>
              {errors.returnPolicy && (
                <p className="text-sm text-destructive ml-6">{errors.returnPolicy.message}</p>
              )}
            </div>
          </div>

          {/* Submission Alert */}
          <Alert>
            <AlertDescription>
              <strong>Ready to submit?</strong> Once you submit this registration, our team will 
              review your application within 2-3 business days. You'll receive an email confirmation 
              and updates about your application status.
            </AlertDescription>
          </Alert>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}