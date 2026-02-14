import { useState } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { KPICard } from '@/components/dashboard/KPICard'
import { AlertBanner } from '@/components/dashboard/AlertBanner'
import { AlertFeed } from '@/components/dashboard/AlertFeed'
import { RiskThermometer } from '@/components/dashboard/RiskThermometer'
import { 
  taiwanMetrics, 
  riskIndex, 
  geopoliticalAlerts,
  capacityByCategory,
  industryImpacts
} from '@/data/mockData'
import { formatNumber } from '@/lib/utils'
import { 
  RefreshCw, 
  Download, 
  Building2, 
  Factory, 
  Shield, 
  Landmark
} from 'lucide-react'

export function Dashboard() {
  const [scenario, setScenario] = useState('destruction')
  const [blockadeProbability, setBlockadeProbability] = useState([15])
  const [usaCapacity, setUsaCapacity] = useState([25])
  const [reshoringTimeline, setReshoringTimeline] = useState([4])

  return (
    <div className="min-h-screen">
      {/* Critical Alert Banner */}
      <AlertBanner />

      <div className="flex">
        {/* Left Sidebar - Control Panel */}
        <aside className="w-80 min-h-[calc(100vh-72px-60px)] bg-navy-50 border-r border-navy-100 p-6 hidden lg:block">
          {/* Scenario Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Disruption Scenario</h3>
            <div className="space-y-3">
              {[
                { id: 'baseline', label: 'Baseline (Current State)', icon: '⚪', desc: '65% Taiwan dependency' },
                { id: 'quarantine', label: 'Scenario 1: Quarantine', icon: '🟡', desc: '50% production drop' },
                { id: 'blockade', label: 'Scenario 2: Blockade', icon: '🟠', desc: '80% halt' },
                { id: 'destruction', label: 'Scenario 3: Destruction', icon: '🔴', desc: '95% shutdown' },
              ].map((s) => (
                <label
                  key={s.id}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    scenario === s.id 
                      ? 'bg-navy-100 border border-taiwan-red/50' 
                      : 'hover:bg-navy-100/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="scenario"
                    value={s.id}
                    checked={scenario === s.id}
                    onChange={(e) => setScenario(e.target.value)}
                    className="mt-1 accent-taiwan-red"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{s.icon}</span>
                      <span className="text-sm font-medium text-text-primary">{s.label}</span>
                    </div>
                    <span className="text-xs text-text-muted">{s.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Risk Parameters */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Geopolitical Risk Parameters</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs text-text-muted">Taiwan Blockade Probability</label>
                  <span className="text-xs font-mono text-taiwan-red">{blockadeProbability}%</span>
                </div>
                <Slider
                  value={blockadeProbability}
                  onValueChange={setBlockadeProbability}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:border-taiwan-red [&_.bg-taiwan-strategic]:bg-taiwan-red"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs text-text-muted">USA Capacity Ramp-Up</label>
                  <span className="text-xs font-mono text-taiwan-strategic">{usaCapacity}%</span>
                </div>
                <Slider
                  value={usaCapacity}
                  onValueChange={setUsaCapacity}
                  max={50}
                  step={1}
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs text-text-muted">Reshoring Timeline (years)</label>
                  <span className="text-xs font-mono text-text-secondary">{reshoringTimeline} years</span>
                </div>
                <Slider
                  value={reshoringTimeline}
                  onValueChange={setReshoringTimeline}
                  min={1}
                  max={7}
                  step={1}
                />
              </div>

              <div>
                <label className="text-xs text-text-muted mb-2 block">Diversification Strategy</label>
                <Select defaultValue="balanced">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="conservative">Conservative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Live Taiwan Status */}
          <Card className="border-l-4 border-taiwan-red">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇹🇼</span>
                <span className="text-sm font-semibold text-text-primary">Live Taiwan Status</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">TSMC Utilization</span>
                  <span className="text-text-primary font-mono">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Shipping Delays</span>
                  <span className="text-taiwan-red font-mono">+12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Tension Index</span>
                  <span className="text-taiwan-red font-mono">78/100</span>
                </div>
              </div>
              <p className="text-[10px] text-text-muted mt-3">Last updated: 3 min ago</p>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Taiwan Risk Dashboard
              </h1>
              <p className="text-text-muted">
                Real-time monitoring of Taiwan semiconductor supply chain vulnerabilities
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <KPICard
              icon="🇹🇼"
              value={`${taiwanMetrics.taiwanDependency}%`}
              label="Advanced chips from Taiwan"
              trend={{ value: 'TARGET: 35%', direction: 'down', isPositive: true }}
              variant="taiwan"
            />
            <KPICard
              icon="🏭"
              value={`${taiwanMetrics.tsmcMarketShare}%`}
              label="Global foundry market share"
              badge="Monopoly risk"
              variant="taiwan"
            />
            <KPICard
              icon="💰"
              value={formatNumber(taiwanMetrics.economicExposure)}
              label="Global industries at risk"
              badge="Critical"
              variant="amber"
            />
            <KPICard
              icon="⚠️"
              value={`${taiwanMetrics.riskScore}/100`}
              label="Taiwan supply chain vulnerability"
              badge="ELEVATED"
              variant="taiwan"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Capacity Comparison Chart */}
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Taiwan Concentration Risk vs. Alternative Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={capacityByCategory}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#252D4A" />
                      <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" />
                      <YAxis 
                        type="category" 
                        dataKey="category" 
                        stroke="#94A3B8"
                        tick={{ fontSize: 12 }}
                        width={100}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A1F3A', 
                          border: '1px solid #252D4A',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="taiwan" name="Taiwan" stackId="a" fill="#DC2626" />
                      <Bar dataKey="usa" name="USA" stackId="a" fill="#3B82F6" />
                      <Bar dataKey="korea" name="South Korea" stackId="a" fill="#10B981" />
                      <Bar dataKey="eu" name="EU" stackId="a" fill="#8B5CF6" />
                      <Bar dataKey="china" name="China" stackId="a" fill="#6B7280" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Threshold Line Note */}
                <div className="flex items-center gap-2 mt-4 p-3 bg-taiwan-caution/10 rounded-lg border border-taiwan-caution/30">
                  <span className="text-taiwan-caution text-sm">⚠️</span>
                  <span className="text-sm text-text-secondary">
                    Single-source risk threshold: 40% — Taiwan exceeds this in 5/6 categories
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Risk Thermometer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Taiwan Strait Risk Index</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <RiskThermometer value={riskIndex.overall} />
                
                <div className="w-full mt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Military Activity</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-navy-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-taiwan-red rounded-full"
                          style={{ width: `${riskIndex.militaryActivity}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono text-taiwan-red">{riskIndex.militaryActivity}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Economic</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-navy-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-taiwan-caution rounded-full"
                          style={{ width: `${riskIndex.economicIndicators}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono text-taiwan-caution">{riskIndex.economicIndicators}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Diplomatic</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-navy-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-taiwan-red rounded-full"
                          style={{ width: `${riskIndex.diplomaticTensions}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono text-taiwan-red">{riskIndex.diplomaticTensions}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-muted mt-4">↑ +12 points vs. last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Cascading Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-taiwan-red">
                  If Taiwan Production Halts for 12 Months
                </CardTitle>
                <p className="text-sm text-text-muted">Industry-by-Industry Collapse Timeline</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryImpacts.map((impact, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="text-2xl w-10">{impact.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-text-primary">{impact.industry}</span>
                          <span className="text-sm font-mono" style={{ color: impact.color }}>
                            {formatNumber(impact.lossUSD)} loss
                          </span>
                        </div>
                        <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${impact.productionHaltPercent}%`,
                              backgroundColor: impact.color
                            }}
                          />
                        </div>
                        <span className="text-xs text-text-muted">{impact.productionHaltPercent}% production halt</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-navy-100 rounded-xl text-center">
                  <p className="text-text-muted text-sm mb-1">Total Economic Impact</p>
                  <p className="text-4xl font-bold text-text-emphasis">$2.4 TRILLION</p>
                  <p className="text-xs text-text-muted mt-1">Cumulative GDP loss (12-month scenario)</p>
                </div>
              </CardContent>
            </Card>

            {/* Alert Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Real-Time Geopolitical Alert Feed</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto custom-scrollbar">
                <AlertFeed alerts={geopoliticalAlerts} maxItems={4} />
              </CardContent>
            </Card>
          </div>

          {/* Strategic Recommendations */}
          <Card className="border-l-4 border-taiwan-strategic">
            <CardHeader>
              <CardTitle className="text-2xl text-taiwan-strategic">
                Immediate Action Items for Taiwan Risk Mitigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Landmark className="w-6 h-6 text-taiwan-strategic" />
                    <h4 className="font-semibold text-text-primary">Government Policy</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• Accelerate Intel Arizona fab (target 2026 vs 2028)</li>
                    <li>• Establish strategic stockpile (90-day buffer)</li>
                    <li>• Fund talent pipeline (100K engineers by 2030)</li>
                    <li>• Coordinate QUAD supply chain resilience</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Factory className="w-6 h-6 text-taiwan-strategic" />
                    <h4 className="font-semibold text-text-primary">Industry Strategy</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• Reduce Taiwan allocation 65% → 35% in 36 months</li>
                    <li>• Dual-source all critical components</li>
                    <li>• Increase inventory buffer 45 → 90 days</li>
                    <li>• Nearshore packaging to Vietnam/Malaysia</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-6 h-6 text-taiwan-strategic" />
                    <h4 className="font-semibold text-text-primary">Risk Monitoring</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• Monitor PLA military exercises (daily feeds)</li>
                    <li>• Track TSMC fab utilization (weekly)</li>
                    <li>• Assess Taiwan Strait shipping congestion</li>
                    <li>• Geopolitical risk scoring (GDELT analysis)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
