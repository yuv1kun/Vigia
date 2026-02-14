import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings as SettingsIcon, Bell, Database, Shield, User, Download } from 'lucide-react'

export function Settings() {
  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Settings & Configuration
        </h1>
        <p className="text-text-muted">
          Customize your Vigia experience and manage integrations
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden md:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span className="hidden md:inline">Data</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Account</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">Dark Mode</h4>
                  <p className="text-sm text-text-muted">Enable dark theme (default)</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">Auto-refresh Dashboard</h4>
                  <p className="text-sm text-text-muted">Refresh data every 5 minutes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">Show Taiwan Pulse Animation</h4>
                  <p className="text-sm text-text-muted">Animated risk indicators</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-2">Default Scenario</h4>
                <Select defaultValue="baseline">
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select default scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baseline">Baseline (Current State)</SelectItem>
                    <SelectItem value="quarantine">Scenario 1: Quarantine</SelectItem>
                    <SelectItem value="blockade">Scenario 2: Blockade</SelectItem>
                    <SelectItem value="destruction">Scenario 3: Destruction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alert Settings */}
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alert Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">Critical Alerts</h4>
                  <p className="text-sm text-text-muted">Receive immediate notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">High Priority Alerts</h4>
                  <p className="text-sm text-text-muted">Receive within 1 hour</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">Daily Digest</h4>
                  <p className="text-sm text-text-muted">Summary email at 8:00 AM</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">Weekly Risk Report</h4>
                  <p className="text-sm text-text-muted">Comprehensive analysis every Monday</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-2">Alert Threshold</h4>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select minimum severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical Only</SelectItem>
                    <SelectItem value="high">High and Above</SelectItem>
                    <SelectItem value="medium">Medium and Above</SelectItem>
                    <SelectItem value="all">All Alerts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Settings */}
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Sources & API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['GDELT', 'CSET', 'MarineTraffic', 'Taiwan Customs', 'WSTS', 'OECD'].map((source) => (
                  <div key={source} className="flex items-center justify-between p-4 bg-navy-100 rounded-xl">
                    <div>
                      <h4 className="font-medium text-text-primary">{source}</h4>
                      <p className="text-xs text-taiwan-resilience">Connected</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-navy-200">
                <h4 className="font-medium text-text-primary mb-3">Data Export</h4>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">Two-Factor Authentication</h4>
                  <p className="text-sm text-text-muted">Add extra security to your account</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">Session Timeout</h4>
                  <p className="text-sm text-text-muted">Auto-logout after 30 minutes of inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">Audit Logging</h4>
                  <p className="text-sm text-text-muted">Track all user actions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="pt-4 border-t border-navy-200">
                <Button variant="destructive">Revoke All API Keys</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-text-muted mb-1 block">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-2 bg-navy-100 border border-navy-200 rounded-xl text-text-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-muted mb-1 block">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@company.com"
                    className="w-full px-4 py-2 bg-navy-100 border border-navy-200 rounded-xl text-text-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-muted mb-1 block">Organization</label>
                  <input
                    type="text"
                    defaultValue="Semiconductor Corp"
                    className="w-full px-4 py-2 bg-navy-100 border border-navy-200 rounded-xl text-text-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-muted mb-1 block">Role</label>
                  <Select defaultValue="analyst">
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="analyst">Risk Analyst</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
