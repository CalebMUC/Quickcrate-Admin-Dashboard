"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", active: 98, inactive: 8 },
  { month: "Feb", active: 105, inactive: 9 },
  { month: "Mar", active: 112, inactive: 10 },
  { month: "Apr", active: 118, inactive: 11 },
  { month: "May", active: 125, inactive: 12 },
  { month: "Jun", active: 131, inactive: 13 },
  { month: "Jul", active: 136, inactive: 13 },
  { month: "Aug", active: 142, inactive: 14 },
]

const chartConfig = {
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  inactive: {
    label: "Inactive",
    color: "hsl(var(--chart-3))",
  },
}

export function MerchantGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Merchant Growth</CardTitle>
        <CardDescription>Active vs inactive merchants over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="active" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inactive" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
