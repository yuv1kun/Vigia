import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertFeed } from '@/components/dashboard/AlertFeed'
import { RiskThermometer } from '@/components/dashboard/RiskThermometer'
import { geopoliticalAlerts, riskIndex, alertForecast } from '@/data/mockData'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Search, Filter, Bell, TrendingUp } from 'lucide-react'

export function Alerts() {
  const [severityFilter, setSeverityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredAlerts = geopoliticalAlerts.filter(alert => {
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false
    if (categoryFilter !== 'all' && alert.category !== categoryFilter) return false
    return true
  })

  const alertStats = {
    total: geopoliticalAlerts.length,
    critical: geopoliticalAlerts.filter(a => a.severity === 'CRITICAL').length,
    high: geopoliticalAlerts.filter(a => a.severity === 'HIGH').length,
    medium: geopoliticalAlerts.filter(a => a.severity === 'MEDIUM').length,
    low: geopoliticalAlerts.filter(a => a.severity === 'LOW').length,
  }

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Real-Time Taiwan Geopolitical Intelligence Feed
        </h1>
        <p className="text-text-muted">
          Monitoring cross-strait tensions, military exercises, and supply chain disruptions
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - Alert Feed */}
        <div className="xl:col-span-2 space-y-6">
          {/* Filter Bar */}
          <Card>
            <CardContent className="py-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search alerts..."
                      className="w-full pl-10 pr-4 py-2 bg-navy-100 border border-navy-200 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-taiwan-strategic"
                    />
                  </div>
                </div>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="CRITICAL">🔴 Critical</SelectItem>
                    <SelectItem value="HIGH">🟠 High</SelectItem>
                    <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                    <SelectItem value="LOW">🟢 Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Military">Military</SelectItem>
                    <SelectItem value="Trade">Trade</SelectItem>
                    <SelectItem value="TSMC Operations">TSMC Operations</SelectItem>
                    <SelectItem value="Shipping">Shipping</SelectItem>
                    <SelectItem value="Policy">Policy</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alert Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-taiwan-red" />
                  Alert Feed ({filteredAlerts.length})
                </span>
                <span className="text-sm font-normal text-text-muted">
                  Last updated: 3 min ago
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[800px] overflow-y-auto custom-scrollbar">
              <AlertFeed alerts={filteredAlerts} maxItems={10} />
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Dashboard */}
        <div className="space-y-6">
          {/* Risk Thermometer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Taiwan Strait Risk Index (Live)</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskThermometer value={riskIndex.overall} />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Military Activity</span>
                  <span className="text-taiwan-red font-mono">{riskIndex.militaryActivity}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Economic</span>
                  <span className="text-taiwan-caution font-mono">{riskIndex.economicIndicators}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Diplomatic</span>
                  <span className="text-taiwan-red font-mono">{riskIndex.diplomaticTensions}/100</span>
                </div>
              </div>
              <p className="text-xs text-taiwan-red mt-4">↑ +12 points vs. last week</p>
            </CardContent>
          </Card>

          {/* Alert Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alert Activity (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-navy-100 rounded-xl">
                  <p className="text-2xl font-bold text-text-primary">{alertStats.total}</p>
                  <p className="text-xs text-text-muted">Total Alerts</p>
                </div>
                <div className="text-center p-3 bg-navy-100 rounded-xl">
                  <p className="text-2xl font-bold text-taiwan-red">{alertStats.critical}</p>
                  <p className="text-xs text-text-muted">Critical</p>
                </div>
                <div className="text-center p-3 bg-navy-100 rounded-xl">
                  <p className="text-2xl font-bold text-risk-high">{alertStats.high}</p>
                  <p className="text-xs text-text-muted">High</p>
                </div>
                <div className="text-center p-3 bg-navy-100 rounded-xl">
                  <p className="text-2xl font-bold text-taiwan-caution">{alertStats.medium}</p>
                  <p className="text-xs text-text-muted">Medium</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Predictive Forecast */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-taiwan-ai" />
                7-Day Risk Forecast (AI)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={alertForecast}>
                    <XAxis dataKey="day" stroke="#94A3B8" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#94A3B8" tick={{ fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1F3A', 
                        border: '1px solid #252D4A',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="critical" stackId="1" stroke="#DC2626" fill="#DC2626" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="high" stackId="1" stroke="#F97316" fill="#F97316" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="medium" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-taiwan-caution mt-3">
                ⚠️ Peak risk expected on +3 days: 38% probability of critical military event
              </p>
              <p className="text-[10px] text-text-muted mt-1">
                Model Accuracy: 76% (backtested vs last 90 days)
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Button variant="outline" className="w-full justify-start">
                📊 View Historical Trends
              </Button>
              <Button variant="outline" className="w-full justify-start">
                ⚙️ Configure Alert Rules
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📧 Email Digest Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
