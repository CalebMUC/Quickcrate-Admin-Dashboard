"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Electronics", value: 485000, color: "hsl(var(--chart-1))" },
  { name: "Fashion", value: 325000, color: "hsl(var(--chart-2))" },
  { name: "Home & Garden", value: 280000, color: "hsl(var(--chart-3))" },
  { name: "Sports", value: 195000, color: "hsl(var(--chart-4))" },
  { name: "Others", value: 162650, color: "hsl(var(--chart-5))" },
]

const chartConfig = {
  value: {
    label: "Revenue",
  },
}

export function RevenueBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Category</CardTitle>
        <CardDescription>Distribution of revenue across product categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
