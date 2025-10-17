"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  BUSINESS_TYPES, 
  BUSINESS_CATEGORIES, 
  DELIVERY_METHODS,
  type MerchantRegistrationData 
} from "@/lib/types/merchant-registration"
import { Controller } from "react-hook-form"

const businessSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessType: z.string().min(1, "Please select a business type"),
  businessRegistrationNo: z.string().min(1, "Business registration number is required"),
  kraPin: z.string().min(1, "KRA PIN is required"),
  businessNature: z.string().min(1, "Business nature is required"),
  businessCategory: z.string().min(1, "Business category is required"),
  deliveryMethod: z.string().min(1, "Delivery method is required")
})

type BusinessFormData = z.infer<typeof businessSchema>

interface BusinessStepProps {
  data: Partial<MerchantRegistrationData>
  onNext: (data: Partial<MerchantRegistrationData>) => void
  onBack: () => void
}

export function BusinessStep({ data, onNext, onBack }: BusinessStepProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: data.businessName || "",
      businessType: data.businessType || "",
      businessRegistrationNo: data.businessRegistrationNo || "",
      kraPin: data.krapin || "",
      businessNature: data.businessNature || "",
      businessCategory: data.businessCategory || "",
      deliveryMethod: data.deliveryMethod || ""
    },
    mode: "onChange"
  })

  // Debug: Watch all form values
  const formValues = watch()
  
  // Debug logging (remove in production)
  console.log('Business Form Debug:', { 
    isValid, 
    errors: Object.keys(errors),
    formValues 
  })

  const onSubmit = (formData: BusinessFormData) => {
    onNext(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>
          Tell us about your business to help us serve you better
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">
                Business Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                {...register("businessName")}
                className={errors.businessName ? "border-destructive" : ""}
              />
              {errors.businessName && (
                <p className="text-sm text-destructive">{errors.businessName.message}</p>
              )}
            </div>

            {/* Business Type */}
            <div className="space-y-2">
              <Label htmlFor="businessType">
                Business Type <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="businessType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.businessType ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.businessType && (
                <p className="text-sm text-destructive">{errors.businessType.message}</p>
              )}
            </div>

            {/* Business Registration Number */}
            <div className="space-y-2">
              <Label htmlFor="businessRegistrationNo">
                Business Registration No. <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessRegistrationNo"
                placeholder="Enter registration number"
                {...register("businessRegistrationNo")}
                className={errors.businessRegistrationNo ? "border-destructive" : ""}
              />
              {errors.businessRegistrationNo && (
                <p className="text-sm text-destructive">{errors.businessRegistrationNo.message}</p>
              )}
            </div>

            {/* KRA PIN */}
            <div className="space-y-2">
              <Label htmlFor="kraPin">
                KRA PIN <span className="text-destructive">*</span>
              </Label>
              <Input
                id="kraPin"
                placeholder="Enter KRA PIN"
                {...register("kraPin")}
                className={errors.kraPin ? "border-destructive" : ""}
              />
              {errors.kraPin && (
                <p className="text-sm text-destructive">{errors.kraPin.message}</p>
              )}
            </div>

            {/* Business Category */}
            <div className="space-y-2">
              <Label htmlFor="businessCategory">
                Business Category <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="businessCategory"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.businessCategory ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select business category" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.businessCategory && (
                <p className="text-sm text-destructive">{errors.businessCategory.message}</p>
              )}
            </div>

            {/* Delivery Method */}
            <div className="space-y-2">
              <Label htmlFor="deliveryMethod">
                Delivery Method <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="deliveryMethod"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.deliveryMethod ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select delivery method" />
                    </SelectTrigger>
                    <SelectContent>
                      {DELIVERY_METHODS.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.deliveryMethod && (
                <p className="text-sm text-destructive">{errors.deliveryMethod.message}</p>
              )}
            </div>
          </div>

          {/* Business Nature */}
          <div className="space-y-2">
            <Label htmlFor="businessNature">
              Business Nature/Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="businessNature"
              placeholder="Describe what your business does"
              rows={3}
              {...register("businessNature")}
              className={errors.businessNature ? "border-destructive" : ""}
            />
            {errors.businessNature && (
              <p className="text-sm text-destructive">{errors.businessNature.message}</p>
            )}
          </div>

          {/* Debug Information (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="p-4 bg-muted rounded-lg text-sm">
              <p>Form Valid: {isValid ? '✅' : '❌'}</p>
              <p>Errors: {Object.keys(errors).join(', ') || 'None'}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
            >
              Next: Payment Information
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}