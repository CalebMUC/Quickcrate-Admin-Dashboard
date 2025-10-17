import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockMerchants } from "@/lib/mock-data"

export function TopMerchants() {
  const topMerchants = [...mockMerchants]
    .filter((m) => m.status === "active")
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Merchants</CardTitle>
        <CardDescription>Highest revenue generating merchants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topMerchants.map((merchant, index) => (
            <div key={merchant.id} className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                #{index + 1}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-muted">
                  {merchant.businessName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{merchant.businessName}</p>
                <p className="text-xs text-muted-foreground">{merchant.totalOrders} orders</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">${merchant.totalRevenue.toLocaleString()}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {merchant.commissionRate}% rate
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
