"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsSection } from "@/components/settings/settings-section"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "QuickCrate",
    supportEmail: "support@quickcrate.com",
    defaultCommissionRate: 10,
    minPayoutAmount: 100,
    payoutSchedule: "monthly",
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    autoApprovePayouts: false,
  })

  const handleSave = () => {
    console.log("[v0] Saving settings:", settings)
    // In production, this would call the API
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground mt-1">Configure platform settings and preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <SettingsSection title="Platform Information" description="Basic platform configuration">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input
                  id="platformName"
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                />
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <SettingsSection title="Commission Settings" description="Configure commission rates and payout rules">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultCommissionRate">Default Commission Rate (%)</Label>
                <Input
                  id="defaultCommissionRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.defaultCommissionRate}
                  onChange={(e) =>
                    setSettings({ ...settings, defaultCommissionRate: Number.parseFloat(e.target.value) })
                  }
                />
                <p className="text-xs text-muted-foreground">Applied to new merchants by default</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minPayoutAmount">Minimum Payout Amount ($)</Label>
                <Input
                  id="minPayoutAmount"
                  type="number"
                  min="0"
                  value={settings.minPayoutAmount}
                  onChange={(e) => setSettings({ ...settings, minPayoutAmount: Number.parseInt(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">Merchants must reach this amount to request payout</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Approve Payouts</Label>
                  <p className="text-xs text-muted-foreground">Automatically approve payout requests under $1,000</p>
                </div>
                <Switch
                  checked={settings.autoApprovePayouts}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoApprovePayouts: checked })}
                />
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <SettingsSection title="Notification Preferences" description="Manage how you receive notifications">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive critical alerts via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <SettingsSection title="Advanced Settings" description="Advanced platform configuration">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-xs text-muted-foreground">Temporarily disable platform access for maintenance</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>
            </div>
          </SettingsSection>
        </TabsContent>
      </Tabs>
    </div>
  )
}
