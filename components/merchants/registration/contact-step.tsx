"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { MerchantRegistrationData } from "@/lib/types/merchant-registration"

const contactSchema = z.object({
  merchantName: z.string().min(2, "Merchant name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  address: z.string().min(10, "Please provide a complete address"),
  socialMedia: z.string().optional()
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactStepProps {
  data: Partial<MerchantRegistrationData>
  onNext: (data: Partial<MerchantRegistrationData>) => void
  onBack?: () => void
}

export function ContactStep({ data, onNext, onBack }: ContactStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      merchantName: data.merchantName || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      socialMedia: data.socialMedia || ""
    },
    mode: "onChange"
  })

  const onSubmit = (formData: ContactFormData) => {
    onNext(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Please provide your contact details for merchant registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Merchant Name */}
            <div className="space-y-2">
              <Label htmlFor="merchantName">
                Merchant Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="merchantName"
                placeholder="Enter merchant name"
                {...register("merchantName")}
                className={errors.merchantName ? "border-destructive" : ""}
              />
              {errors.merchantName && (
                <p className="text-sm text-destructive">{errors.merchantName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="+254 700 000 000"
                {...register("phone")}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <Label htmlFor="socialMedia">Social Media (Optional)</Label>
              <Input
                id="socialMedia"
                placeholder="@username or website"
                {...register("socialMedia")}
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">
              Business Address <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="address"
              placeholder="Enter complete business address including city and postal code"
              rows={3}
              {...register("address")}
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              disabled={!isValid}
              className={!onBack ? "ml-auto" : ""}
            >
              Next: Business Information
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}