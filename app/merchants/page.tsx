"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MerchantTable } from "@/components/merchants/merchant-table"
import { MerchantDetailsDialog } from "@/components/merchants/merchant-details-dialog"
import { MerchantFormDialog } from "@/components/merchants/merchant-form-dialog"
import { mockMerchants } from "@/lib/mock-data"
import type { Merchant } from "@/lib/types"
import { Plus, Search } from "lucide-react"

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingMerchant, setEditingMerchant] = useState<Merchant | null>(null)

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch =
      merchant.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || merchant.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (merchant: Merchant) => {
    setSelectedMerchant(merchant)
    setDetailsOpen(true)
  }

  const handleEdit = (merchant: Merchant) => {
    setEditingMerchant(merchant)
    setFormOpen(true)
  }

  const handleStatusChange = (merchantId: string, status: Merchant["status"]) => {
    setMerchants(merchants.map((m) => (m.id === merchantId ? { ...m, status } : m)))
  }

  const handleSave = (merchantData: Partial<Merchant>) => {
    if (editingMerchant) {
      setMerchants(merchants.map((m) => (m.id === editingMerchant.id ? { ...m, ...merchantData } : m)))
    } else {
      const newMerchant: Merchant = {
        id: `M${String(merchants.length + 1).padStart(3, "0")}`,
        registrationDate: new Date().toISOString().split("T")[0],
        totalRevenue: 0,
        totalOrders: 0,
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "USA",
        },
        contactPerson: {
          name: "",
          email: merchantData.email || "",
          phone: merchantData.phone || "",
        },
        ...merchantData,
      } as Merchant
      setMerchants([...merchants, newMerchant])
    }
    setEditingMerchant(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Merchant Management</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all platform merchants</p>
        </div>
        <Button
          onClick={() => {
            setEditingMerchant(null)
            setFormOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Merchant
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search merchants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <MerchantTable
        merchants={filteredMerchants}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />

      {/* Dialogs */}
      <MerchantDetailsDialog merchant={selectedMerchant} open={detailsOpen} onOpenChange={setDetailsOpen} />
      <MerchantFormDialog merchant={editingMerchant} open={formOpen} onOpenChange={setFormOpen} onSave={handleSave} />
    </div>
  )
}
