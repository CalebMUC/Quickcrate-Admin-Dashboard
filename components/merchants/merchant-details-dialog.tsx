"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Merchant } from "@/lib/types"
import { cn } from "@/lib/utils"
import { MapPin, Phone, Mail, User, Calendar, DollarSign, ShoppingCart } from "lucide-react"

interface MerchantDetailsDialogProps {
  merchant: Merchant | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusConfig = {
  active: { label: "Active", className: "bg-green-500/10 text-green-500" },
  inactive: { label: "Inactive", className: "bg-gray-500/10 text-gray-500" },
  suspended: { label: "Suspended", className: "bg-red-500/10 text-red-500" },
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500" },
}

export function MerchantDetailsDialog({ merchant, open, onOpenChange }: MerchantDetailsDialogProps) {
  if (!merchant) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{merchant.businessName}</DialogTitle>
            <Badge variant="outline" className={cn(statusConfig[merchant.status].className)}>
              {statusConfig[merchant.status].label}
            </Badge>
          </div>
          <DialogDescription>Merchant ID: {merchant.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Business Metrics */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Business Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Revenue</p>
                  <p className="text-lg font-bold">${merchant.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                  <p className="text-lg font-bold">{merchant.totalOrders}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Commission Rate</p>
                  <p className="text-lg font-bold">{merchant.commissionRate}%</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{merchant.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{merchant.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Registered on {new Date(merchant.registrationDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Business Address */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Business Address</h3>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm">
                <p>{merchant.address.street}</p>
                <p>
                  {merchant.address.city}, {merchant.address.state} {merchant.address.zipCode}
                </p>
                <p>{merchant.address.country}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Person */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Contact Person</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{merchant.contactPerson.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{merchant.contactPerson.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{merchant.contactPerson.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
