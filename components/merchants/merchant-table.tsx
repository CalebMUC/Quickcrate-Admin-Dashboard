"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Ban, CheckCircle } from "lucide-react"
import type { Merchant } from "@/lib/types"
import { cn } from "@/lib/utils"

interface MerchantTableProps {
  merchants: Merchant[]
  onViewDetails: (merchant: Merchant) => void
  onEdit: (merchant: Merchant) => void
  onStatusChange: (merchantId: string, status: Merchant["status"]) => void
}

const statusConfig = {
  active: { label: "Active", className: "bg-green-500/10 text-green-500 hover:bg-green-500/20" },
  inactive: { label: "Inactive", className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20" },
  suspended: { label: "Suspended", className: "bg-red-500/10 text-red-500 hover:bg-red-500/20" },
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20" },
}

export function MerchantTable({ merchants, onViewDetails, onEdit, onStatusChange }: MerchantTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Orders</TableHead>
            <TableHead className="text-right">Commission</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {merchants.map((merchant) => (
            <TableRow key={merchant.id}>
              <TableCell className="font-medium">{merchant.businessName}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm">{merchant.email}</span>
                  <span className="text-xs text-muted-foreground">{merchant.phone}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn(statusConfig[merchant.status].className)}>
                  {statusConfig[merchant.status].label}
                </Badge>
              </TableCell>
              <TableCell>{new Date(merchant.registrationDate).toLocaleDateString()}</TableCell>
              <TableCell className="text-right font-medium">${merchant.totalRevenue.toLocaleString()}</TableCell>
              <TableCell className="text-right">{merchant.totalOrders}</TableCell>
              <TableCell className="text-right">{merchant.commissionRate}%</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onViewDetails(merchant)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(merchant)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {merchant.status !== "active" && (
                      <DropdownMenuItem onClick={() => onStatusChange(merchant.id, "active")}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Activate
                      </DropdownMenuItem>
                    )}
                    {merchant.status !== "suspended" && (
                      <DropdownMenuItem onClick={() => onStatusChange(merchant.id, "suspended")}>
                        <Ban className="mr-2 h-4 w-4" />
                        Suspend
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
