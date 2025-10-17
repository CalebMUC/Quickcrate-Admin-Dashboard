"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", revenue: 186000, commission: 18600 },
  { month: "Feb", revenue: 205000, commission: 20500 },
  { month: "Mar", revenue: 237000, commission: 23700 },
  { month: "Apr", revenue: 273000, commission: 27300 },
  { month: "May", revenue: 309000, commission: 30900 },
  { month: "Jun", revenue: 314000, commission: 31400 },
  { month: "Jul", revenue: 345000, commission: 34500 },
  { month: "Aug", revenue: 378000, commission: 37800 },
  { month: "Sep", revenue: 412000, commission: 41200 },
  { month: "Oct", revenue: 438000, commission: 43800 },
  { month: "Nov", revenue: 465000, commission: 46500 },
  { month: "Dec", revenue: 485000, commission: 48500 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  commission: {
    label: "Commission",
    color: "hsl(var(--chart-2))",
  },
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue and commission trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="commission"
                stackId="2"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
