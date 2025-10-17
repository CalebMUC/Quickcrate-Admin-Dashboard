"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, Banknote } from "lucide-react"
import { 
  PAYMENT_CHANNELS,
  type MerchantRegistrationData,
  type PaymentChannel 
} from "@/lib/types/merchant-registration"

const paymentSchema = z.object({
  preferredPaymentChannel: z.array(z.string()).min(1, "Please select at least one payment method"),
  bankName: z.string().optional(),
  bankAccountNo: z.string().optional(),
  bankAccountName: z.string().optional(),
  mpesaPaybill: z.string().optional(),
  mpesaTillNumber: z.string().optional()
}).superRefine((data, ctx) => {
  // Validate bank details if bank is selected
  if (data.preferredPaymentChannel.includes('bank')) {
    if (!data.bankName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bank name is required when bank transfer is selected",
        path: ['bankName']
      })
    }
    if (!data.bankAccountNo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bank account number is required when bank transfer is selected",
        path: ['bankAccountNo']
      })
    }
    if (!data.bankAccountName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bank account name is required when bank transfer is selected",
        path: ['bankAccountName']
      })
    }
  }
  
  // Validate M-Pesa details if M-Pesa is selected
  if (data.preferredPaymentChannel.includes('mpesa')) {
    if (!data.mpesaPaybill && !data.mpesaTillNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either Paybill or Till Number is required when M-Pesa is selected",
        path: ['mpesaPaybill']
      })
    }
  }
})

type PaymentFormData = z.infer<typeof paymentSchema>

interface PaymentStepProps {
  data: Partial<MerchantRegistrationData>
  onNext: (data: Partial<MerchantRegistrationData>) => void
  onBack: () => void
}

export function PaymentStep({ data, onNext, onBack }: PaymentStepProps) {
  // Handle preferredPaymentChannel which might be string or array
  const getInitialChannels = (): PaymentChannel[] => {
    if (!data.preferredPaymentChannel) return []
    if (Array.isArray(data.preferredPaymentChannel)) return data.preferredPaymentChannel as PaymentChannel[]
    if (typeof data.preferredPaymentChannel === 'string') {
      return data.preferredPaymentChannel.split(',').filter(Boolean) as PaymentChannel[]
    }
    return []
  }

  const [selectedChannels, setSelectedChannels] = useState<PaymentChannel[]>(getInitialChannels())

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      preferredPaymentChannel: getInitialChannels(),
      bankName: data.bankName || "",
      bankAccountNo: data.bankAccountNo || "",
      bankAccountName: data.bankAccountName || "",
      mpesaPaybill: data.mpesaPaybill || "",
      mpesaTillNumber: data.mpesaTillNumber || ""
    },
    mode: "onChange"
  })

  const watchedChannels = watch("preferredPaymentChannel")

  useEffect(() => {
    setSelectedChannels(watchedChannels as PaymentChannel[])
  }, [watchedChannels])

  const onSubmit = (formData: PaymentFormData) => {
    // Convert the payment channels array to string for the main data interface
    onNext({
      ...formData,
      preferredPaymentChannel: formData.preferredPaymentChannel.join(',')
    } as Partial<MerchantRegistrationData>)
  }

  const handleChannelChange = (channelValue: string, checked: boolean) => {
    const currentChannels = watchedChannels || []
    let newChannels: string[]

    if (checked) {
      newChannels = [...currentChannels, channelValue]
    } else {
      newChannels = currentChannels.filter(c => c !== channelValue)
    }

    return newChannels
  }

  const getPaymentIcon = (channel: string) => {
    switch (channel) {
      case 'bank':
        return <CreditCard className="h-5 w-5" />
      case 'mpesa':
        return <Smartphone className="h-5 w-5" />
      case 'cash':
        return <Banknote className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Choose your preferred payment methods and provide the necessary details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Payment Channels Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">
              Preferred Payment Channels <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PAYMENT_CHANNELS.map((channel) => (
                <Controller
                  key={channel.value}
                  name="preferredPaymentChannel"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={channel.value}
                        checked={field.value?.includes(channel.value) || false}
                        onCheckedChange={(checked) => {
                          const newChannels = handleChannelChange(channel.value, !!checked)
                          field.onChange(newChannels)
                        }}
                      />
                      <div className="flex items-center space-x-2">
                        {getPaymentIcon(channel.value)}
                        <Label htmlFor={channel.value} className="cursor-pointer">
                          {channel.label}
                        </Label>
                      </div>
                    </div>
                  )}
                />
              ))}
            </div>
            {errors.preferredPaymentChannel && (
              <p className="text-sm text-destructive">{errors.preferredPaymentChannel.message}</p>
            )}
          </div>

          {/* Bank Details - Show only if bank is selected */}
          {selectedChannels.includes('bank') && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Bank Transfer Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">
                      Bank Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="bankName"
                      placeholder="e.g., KCB Bank"
                      {...register("bankName")}
                      className={errors.bankName ? "border-destructive" : ""}
                    />
                    {errors.bankName && (
                      <p className="text-sm text-destructive">{errors.bankName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankAccountNo">
                      Account Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="bankAccountNo"
                      placeholder="Enter account number"
                      {...register("bankAccountNo")}
                      className={errors.bankAccountNo ? "border-destructive" : ""}
                    />
                    {errors.bankAccountNo && (
                      <p className="text-sm text-destructive">{errors.bankAccountNo.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bankAccountName">
                      Account Holder Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="bankAccountName"
                      placeholder="Name as appears on bank account"
                      {...register("bankAccountName")}
                      className={errors.bankAccountName ? "border-destructive" : ""}
                    />
                    {errors.bankAccountName && (
                      <p className="text-sm text-destructive">{errors.bankAccountName.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* M-Pesa Details - Show only if mpesa is selected */}
          {selectedChannels.includes('mpesa') && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  M-Pesa Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mpesaPaybill">Paybill Number</Label>
                    <Input
                      id="mpesaPaybill"
                      placeholder="Enter Paybill number"
                      {...register("mpesaPaybill")}
                      className={errors.mpesaPaybill ? "border-destructive" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mpesaTillNumber">Till Number</Label>
                    <Input
                      id="mpesaTillNumber"
                      placeholder="Enter Till number"
                      {...register("mpesaTillNumber")}
                    />
                  </div>
                </div>
                {errors.mpesaPaybill && (
                  <p className="text-sm text-destructive">{errors.mpesaPaybill.message}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Note: You can provide either Paybill or Till number, or both.
                </p>
              </div>
            </>
          )}

          {/* Cash on Delivery Notice */}
          {selectedChannels.includes('cash') && (
            <>
              <Separator />
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                  <Banknote className="h-5 w-5" />
                  Cash on Delivery
                </h3>
                <p className="text-sm text-muted-foreground">
                  You have selected cash on delivery. Customers will pay when they receive their orders.
                  Ensure you have proper cash handling procedures in place.
                </p>
              </div>
            </>
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
              Next: Documents
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}