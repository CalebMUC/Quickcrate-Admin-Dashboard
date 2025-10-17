import { StatCard } from "@/components/dashboard/stat-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { MerchantGrowthChart } from "@/components/dashboard/merchant-growth-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { TopMerchants } from "@/components/dashboard/top-merchants"
import { DollarSign, Store, ShoppingCart, TrendingUp } from "lucide-react"
import { mockMetrics } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
        <p className="text-muted-foreground mt-1">Overview of your platform performance and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${(mockMetrics.totalRevenue / 1000).toFixed(1)}k`}
          change={mockMetrics.revenueGrowth}
          icon={DollarSign}
        />
        <StatCard
          title="Total Commission"
          value={`$${(mockMetrics.totalCommission / 1000).toFixed(1)}k`}
          change={mockMetrics.revenueGrowth}
          icon={TrendingUp}
        />
        <StatCard
          title="Active Merchants"
          value={mockMetrics.activeMerchants.toString()}
          change={mockMetrics.merchantGrowth}
          icon={Store}
          description={`${mockMetrics.totalMerchants} total merchants`}
        />
        <StatCard
          title="Total Orders"
          value={mockMetrics.totalOrders.toLocaleString()}
          icon={ShoppingCart}
          description={`$${mockMetrics.averageOrderValue.toFixed(2)} avg value`}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart />
        <MerchantGrowthChart />
      </div>

      {/* Activity and Top Merchants */}
      <div className="grid gap-4 md:grid-cols-2">
        <ActivityFeed />
        <TopMerchants />
      </div>
    </div>
  )
}
