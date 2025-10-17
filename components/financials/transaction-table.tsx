"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TransactionTableProps {
  transactions: Transaction[]
}

const statusConfig = {
  completed: { label: "Completed", className: "bg-green-500/10 text-green-500" },
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500" },
  failed: { label: "Failed", className: "bg-red-500/10 text-red-500" },
  refunded: { label: "Refunded", className: "bg-gray-500/10 text-gray-500" },
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Commission</TableHead>
            <TableHead className="text-right">Net Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
              <TableCell className="font-medium">{transaction.merchantName}</TableCell>
              <TableCell className="font-mono text-sm">{transaction.orderId}</TableCell>
              <TableCell>{transaction.paymentMethod}</TableCell>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right font-medium">${transaction.amount.toFixed(2)}</TableCell>
              <TableCell className="text-right text-primary">${transaction.commission.toFixed(2)}</TableCell>
              <TableCell className="text-right font-medium">${transaction.netAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn(statusConfig[transaction.status].className)}>
                  {statusConfig[transaction.status].label}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
