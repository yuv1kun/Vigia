import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { suppliers as initialSuppliers } from '@/data/mockData'
import { formatNumber, cn } from '@/lib/utils'
import { Target, DollarSign, Shield, Lock, Unlock, Settings, Download, Check } from 'lucide-react'

const COLORS = ['#DC2626', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

export function Optimization() {
  const [maxTaiwan, setMaxTaiwan] = useState([35])
  const [minUSA, setMinUSA] = useState([25])
  const [riskWeight, setRiskWeight] = useState([0.5])
  const [enforceDiversification, setEnforceDiversification] = useState(true)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationRun, setOptimizationRun] = useState(false)
  const [optimizedAllocations, setOptimizedAllocations] = useState<{[key: string]: number}>({})
  const [optimizationResults, setOptimizationResults] = useState({
    riskScore: 85,
    costPremium: 0,
    taiwanExposure: 65,
    solutionFound: false
  })

  // Calculate optimized allocations based on constraints
  const runOptimization = () => {
    const maxTaiwanPercent = maxTaiwan[0]
    const minUSAPercent = minUSA[0]
    const riskFactor = riskWeight[0]
    const maxPerSupplier = enforceDiversification ? 40 : 100

    // Simulate optimization algorithm
    const newAllocations: {[key: string]: number} = {}
    let remainingPercent = 100
    
    // Taiwan suppliers - cap at maxTaiwan
    const taiwanSuppliers = initialSuppliers.filter(s => s.countryCode === 'TW')
    const usaSuppliers = initialSuppliers.filter(s => s.countryCode === 'US')
    const otherSuppliers = initialSuppliers.filter(s => s.countryCode !== 'TW' && s.countryCode !== 'US')

    // Allocate to Taiwan (capped)
    let taiwanAllocation = Math.min(maxTaiwanPercent, remainingPercent)
    taiwanSuppliers.forEach((s) => {
      const share = Math.min(
        taiwanAllocation / taiwanSuppliers.length,
        maxPerSupplier
      )
      newAllocations[s.id] = Math.round(share)
    })
    const actualTaiwanTotal = Object.entries(newAllocations)
      .filter(([id]) => taiwanSuppliers.some(s => s.id === id))
      .reduce((sum, [, val]) => sum + val, 0)
    remainingPercent -= actualTaiwanTotal

    // Allocate to USA (minimum requirement)
    const usaAllocation = Math.max(minUSAPercent, remainingPercent * 0.4)
    usaSuppliers.forEach((s) => {
      const share = Math.min(
        usaAllocation / usaSuppliers.length,
        maxPerSupplier
      )
      newAllocations[s.id] = Math.round(share)
    })
    const actualUSATotal = Object.entries(newAllocations)
      .filter(([id]) => usaSuppliers.some(s => s.id === id))
      .reduce((sum, [, val]) => sum + val, 0)
    remainingPercent -= actualUSATotal

    // Distribute remaining to other suppliers based on risk weight
    otherSuppliers.forEach((s) => {
      const baseShare = remainingPercent / otherSuppliers.length
      // Higher risk weight = prefer lower risk suppliers
      const riskAdjustment = riskFactor > 0.5 ? (1 - s.riskPremium / 50) : 1
      const share = Math.min(baseShare * riskAdjustment, maxPerSupplier)
      newAllocations[s.id] = Math.round(Math.max(share, 5))
    })

    // Normalize to 100%
    const total = Object.values(newAllocations).reduce((sum, val) => sum + val, 0)
    if (total !== 100) {
      const adjustment = 100 - total
      // Add/subtract from largest allocation
      const largestId = Object.entries(newAllocations).sort((a, b) => b[1] - a[1])[0][0]
      newAllocations[largestId] += adjustment
    }

    // Calculate new risk score based on allocations
    const taiwanPercent = Object.entries(newAllocations)
      .filter(([id]) => taiwanSuppliers.some(s => s.id === id))
      .reduce((sum, [, val]) => sum + val, 0)
    
    const newRiskScore = Math.round(20 + (taiwanPercent * 0.8) + ((1 - riskFactor) * 20))
    const newCostPremium = Math.round(5 + ((100 - taiwanPercent) * 0.2) + (riskFactor * 10))

    setOptimizedAllocations(newAllocations)
    setOptimizationResults({
      riskScore: newRiskScore,
      costPremium: newCostPremium,
      taiwanExposure: taiwanPercent,
      solutionFound: true
    })
  }

  const handleOptimize = () => {
    setIsOptimizing(true)
    setOptimizationRun(false)
    
    // Simulate optimization delay
    setTimeout(() => {
      runOptimization()
      setIsOptimizing(false)
      setOptimizationRun(true)
    }, 1500)
  }

  // Get current allocations (optimized or original)
  const getCurrentAllocations = () => {
    return initialSuppliers.map(s => ({
      ...s,
      allocationPercent: optimizationRun && optimizedAllocations[s.id] !== undefined 
        ? optimizedAllocations[s.id] 
        : s.allocationPercent
    }))
  }

  const currentSuppliers = getCurrentAllocations()

  const pieData = currentSuppliers.map((s, i) => ({
    name: s.name,
    value: s.allocationPercent,
    color: COLORS[i % COLORS.length]
  }))

  const totalCost = currentSuppliers.reduce((acc, s) => acc + (s.allocationPercent / 100) * s.costPerUnit * 100000, 0)
  
  const handleExportCSV = () => {
    const headers = [
      'Supplier',
      'Country',
      'Country Code',
      'Allocation (%)',
      'Cost/Unit ($)',
      'Risk Premium ($)',
      'Capacity (GW)',
      'Lead Time (Days)',
      'Locked'
    ]
    
    const rows = currentSuppliers.map(s => [
      s.name,
      s.country,
      s.countryCode,
      s.allocationPercent,
      s.costPerUnit,
      s.riskPremium,
      s.capacityGW,
      s.leadTimeDays,
      s.isLocked ? 'Yes' : 'No'
    ])

    // Add summary rows
    const summaryRows = [
      [],
      ['--- OPTIMIZATION SUMMARY ---'],
      ['Max Taiwan Dependency', `${maxTaiwan[0]}%`],
      ['Min USA Capacity', `${minUSA[0]}%`],
      ['Risk Weight Factor', riskWeight[0].toFixed(1)],
      ['Enforce Diversification', enforceDiversification ? 'Yes' : 'No'],
      [],
      ['--- RESULTS ---'],
      ['Total Annual Cost', `$${formatNumber(totalCost * 1000)}`],
      ['Geopolitical Risk Score', `${optimizationResults.riskScore}/100`],
      ['Taiwan Exposure', `${optimizationResults.taiwanExposure}%`],
      ['Cost Premium vs Baseline', `+${optimizationResults.costPremium}%`]
    ]

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      ...summaryRows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `vigia-optimization-results-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Multi-Objective Sourcing Optimization
        </h1>
        <p className="text-text-muted">
          Balance cost minimization, geopolitical risk reduction, and supply chain resilience
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - Configuration */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Optimization Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Objective */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Optimization Goal</h4>
              <div className="space-y-2">
                {['cost', 'balanced', 'resilience'].map((goal) => (
                  <label key={goal} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="goal"
                      defaultChecked={goal === 'balanced'}
                      className="accent-taiwan-strategic"
                    />
                    <span className="text-sm text-text-secondary capitalize">
                      {goal === 'cost' ? 'Minimize Total Cost Only' :
                       goal === 'balanced' ? 'Minimize Cost + Risk (Balanced)' :
                       'Maximize Resilience (Risk-First)'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Risk Weight */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-text-muted">Risk Weight Factor</label>
                <span className="text-sm font-mono text-taiwan-strategic">{riskWeight[0].toFixed(1)}</span>
              </div>
              <Slider value={riskWeight} onValueChange={setRiskWeight} max={1} step={0.1} />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>Cost-focused</span>
                <span>Risk-focused</span>
              </div>
            </div>

            {/* Constraints */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Supply Chain Constraints</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs text-text-muted">Max Taiwan Dependency</label>
                    <span className="text-xs font-mono text-taiwan-red">{maxTaiwan}%</span>
                  </div>
                  <Slider 
                    value={maxTaiwan} 
                    onValueChange={setMaxTaiwan} 
                    max={65} 
                    className="[&_[role=slider]]:border-taiwan-red"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs text-text-muted">Min USA Capacity</label>
                    <span className="text-xs font-mono text-taiwan-strategic">{minUSA}%</span>
                  </div>
                  <Slider value={minUSA} onValueChange={setMinUSA} max={50} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Enforce diversification (no supplier &gt;40%)</span>
                  <Switch checked={enforceDiversification} onCheckedChange={setEnforceDiversification} />
                </div>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleOptimize}
              disabled={isOptimizing}
            >
              {isOptimizing ? (
                <>
                  <span className="animate-spin mr-2">⚙️</span>
                  Solving...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Run Optimization
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Right Panel - Results */}
        <div className="xl:col-span-2 space-y-6">
          {/* Allocation Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Optimal Supplier Allocation: Taiwan 65% → {optimizationResults.taiwanExposure}%</span>
                {optimizationResults.solutionFound ? (
                  <span className="text-sm font-normal text-taiwan-resilience flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Optimal Solution Found
                  </span>
                ) : (
                  <span className="text-sm font-normal text-text-muted">Click "Run Optimization" to calculate</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Donut Chart */}
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ value }) => `${value}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A1F3A', 
                          border: '1px solid #252D4A',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <div className="p-4 bg-navy-100 rounded-xl border-l-4 border-taiwan-strategic">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-taiwan-strategic" />
                      <span className="text-sm text-text-muted">Total Annual Cost</span>
                    </div>
                    <p className="text-3xl font-bold text-taiwan-strategic">{formatNumber(totalCost * 1000)}</p>
                    <p className="text-xs text-taiwan-caution mt-1">+{optimizationResults.costPremium}% vs Taiwan-only baseline</p>
                  </div>

                  <div className="p-4 bg-navy-100 rounded-xl border-l-4 border-taiwan-resilience">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-taiwan-resilience" />
                      <span className="text-sm text-text-muted">Geopolitical Risk Score</span>
                    </div>
                    <p className="text-3xl font-bold text-taiwan-resilience">{optimizationResults.riskScore}/100</p>
                    <p className="text-xs text-taiwan-resilience mt-1">-{85 - optimizationResults.riskScore} points vs baseline 85/100</p>
                  </div>

                  <div className="p-4 bg-navy-100 rounded-xl border-l-4 border-taiwan-resilience">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-taiwan-resilience" />
                      <span className="text-sm text-text-muted">Taiwan Exposure</span>
                    </div>
                    <p className="text-3xl font-bold text-taiwan-resilience">{optimizationResults.taiwanExposure}%</p>
                    <p className="text-xs text-taiwan-resilience mt-1">
                      {optimizationResults.solutionFound 
                        ? `✓ Target achieved (-${65 - optimizationResults.taiwanExposure}% from 65%)`
                        : 'Run optimization to see results'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Supplier-Level Allocation Details</span>
                <Button variant="outline" size="sm" onClick={handleExportCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Supplier</th>
                      <th>Country</th>
                      <th>Allocation</th>
                      <th>Cost/Unit</th>
                      <th>Risk Premium</th>
                      <th>Capacity</th>
                      <th>Lead Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSuppliers.map((supplier, index) => (
                      <tr key={supplier.id}>
                        <td className="font-medium text-text-primary">{supplier.name}</td>
                        <td>
                          <span className="flex items-center gap-2">
                            {supplier.countryCode === 'TW' ? '🇹🇼' : 
                             supplier.countryCode === 'US' ? '🇺🇸' :
                             supplier.countryCode === 'KR' ? '🇰🇷' :
                             supplier.countryCode === 'EU' ? '🇪🇺' : '🌍'}
                            {supplier.country}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-navy-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full"
                                style={{ 
                                  width: `${supplier.allocationPercent}%`,
                                  backgroundColor: COLORS[index % COLORS.length]
                                }}
                              />
                            </div>
                            <span className="text-sm font-mono">{supplier.allocationPercent}%</span>
                          </div>
                        </td>
                        <td className="font-mono">${supplier.costPerUnit}</td>
                        <td className={cn(
                          'font-mono',
                          supplier.riskPremium > 20 ? 'text-taiwan-red' : 'text-text-secondary'
                        )}>
                          ${supplier.riskPremium}
                        </td>
                        <td className="font-mono">{supplier.capacityGW} GW</td>
                        <td className={cn(
                          'font-mono',
                          supplier.leadTimeDays > 160 ? 'text-taiwan-caution' : 'text-text-secondary'
                        )}>
                          {supplier.leadTimeDays} days
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded hover:bg-navy-100">
                              {supplier.isLocked ? <Lock className="w-4 h-4 text-taiwan-strategic" /> : <Unlock className="w-4 h-4 text-text-muted" />}
                            </button>
                            <button className="p-1.5 rounded hover:bg-navy-100">
                              <Settings className="w-4 h-4 text-text-muted" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
