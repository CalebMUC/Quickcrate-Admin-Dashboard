"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TransactionTable } from "@/components/financials/transaction-table"
import { PayoutTable } from "@/components/financials/payout-table"
import { RevenueBreakdown } from "@/components/financials/revenue-breakdown"
import { CommissionSummary } from "@/components/financials/commission-summary"
import { mockTransactions, mockPayouts } from "@/lib/mock-data"
import type { Payout } from "@/lib/types"
import { Download } from "lucide-react"

export default function FinancialsPage() {
  const [payouts, setPayouts] = useState<Payout[]>(mockPayouts)

  const handleApprovePayout = (payoutId: string) => {
    setPayouts(payouts.map((p) => (p.id === payoutId ? { ...p, status: "processing" as const } : p)))
  }

  const handleRejectPayout = (payoutId: string) => {
    setPayouts(payouts.map((p) => (p.id === payoutId ? { ...p, status: "failed" as const } : p)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Financials</h1>
          <p className="text-muted-foreground mt-1">Track revenue, commissions, and manage payouts</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Commission Summary */}
      <CommissionSummary />

      {/* Revenue Breakdown */}
      <RevenueBreakdown />

      {/* Transactions and Payouts */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>All platform transactions and commission details</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionTable transactions={mockTransactions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Merchant Payouts</CardTitle>
              <CardDescription>Manage and approve merchant payout requests</CardDescription>
            </CardHeader>
            <CardContent>
              <PayoutTable payouts={payouts} onApprove={handleApprovePayout} onReject={handleRejectPayout} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
