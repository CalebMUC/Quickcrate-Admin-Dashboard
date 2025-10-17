import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Percent, Calendar } from "lucide-react"

export function CommissionSummary() {
  const summaryData = [
    {
      label: "Total Commission (MTD)",
      value: "$28,476",
      icon: DollarSign,
      description: "Month to date",
    },
    {
      label: "Average Commission Rate",
      value: "10.8%",
      icon: Percent,
      description: "Across all merchants",
    },
    {
      label: "Commission Growth",
      value: "+12.5%",
      icon: TrendingUp,
      description: "vs last month",
    },
    {
      label: "Next Payout Date",
      value: "Mar 31",
      icon: Calendar,
      description: "Scheduled payout",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Card key={item.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
