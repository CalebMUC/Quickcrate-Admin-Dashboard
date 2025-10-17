// Core data models for QuickCrate Admin Dashboard

export interface Admin {
  id: string
  email: string
  name: string
  role: "super_admin" | "admin" | "support"
  avatar?: string
  createdAt: string
}

export interface Merchant {
  id: string
  businessName: string
  email: string
  phone: string
  status: "active" | "inactive" | "suspended" | "pending"
  registrationDate: string
  totalRevenue: number
  totalOrders: number
  commissionRate: number
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  contactPerson: {
    name: string
    email: string
    phone: string
  }
}

export interface Transaction {
  id: string
  merchantId: string
  merchantName: string
  amount: number
  commission: number
  netAmount: number
  status: "completed" | "pending" | "failed" | "refunded"
  date: string
  orderId: string
  paymentMethod: string
}

export interface Payout {
  id: string
  merchantId: string
  merchantName: string
  amount: number
  status: "pending" | "processing" | "completed" | "failed"
  requestDate: string
  completedDate?: string
  bankAccount: string
}

export interface PlatformMetrics {
  totalRevenue: number
  totalCommission: number
  totalMerchants: number
  activeMerchants: number
  totalOrders: number
  averageOrderValue: number
  revenueGrowth: number
  merchantGrowth: number
}

export interface ActivityLog {
  id: string
  type: "merchant_registered" | "payout_completed" | "merchant_suspended" | "high_value_order" | "system_alert"
  title: string
  description: string
  timestamp: string
  severity: "info" | "warning" | "error" | "success"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  read: boolean
  timestamp: string
  actionUrl?: string
}

export interface SystemSettings {
  id: string
  category: "general" | "payment" | "commission" | "notification"
  key: string
  value: string
  description: string
  updatedAt: string
  updatedBy: string
}
