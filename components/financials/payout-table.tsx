"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Payout } from "@/lib/types"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle } from "lucide-react"

interface PayoutTableProps {
  payouts: Payout[]
  onApprove?: (payoutId: string) => void
  onReject?: (payoutId: string) => void
}

const statusConfig = {
  completed: { label: "Completed", className: "bg-green-500/10 text-green-500" },
  processing: { label: "Processing", className: "bg-blue-500/10 text-blue-500" },
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500" },
  failed: { label: "Failed", className: "bg-red-500/10 text-red-500" },
}

export function PayoutTable({ payouts, onApprove, onReject }: PayoutTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payout ID</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Bank Account</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Completed Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts.map((payout) => (
            <TableRow key={payout.id}>
              <TableCell className="font-mono text-sm">{payout.id}</TableCell>
              <TableCell className="font-medium">{payout.merchantName}</TableCell>
              <TableCell className="font-mono text-sm">{payout.bankAccount}</TableCell>
              <TableCell>{new Date(payout.requestDate).toLocaleDateString()}</TableCell>
              <TableCell>{payout.completedDate ? new Date(payout.completedDate).toLocaleDateString() : "-"}</TableCell>
              <TableCell className="text-right font-bold">${payout.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn(statusConfig[payout.status].className)}>
                  {statusConfig[payout.status].label}
                </Badge>
              </TableCell>
              <TableCell>
                {payout.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onApprove?.(payout.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onReject?.(payout.id)}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
