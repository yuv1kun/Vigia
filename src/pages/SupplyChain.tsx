import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { supplyChainNodes } from '@/data/mockData'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Network, Download, ZoomIn, ZoomOut, FileImage, FileSpreadsheet } from 'lucide-react'

export function SupplyChain() {
  const [highlightTaiwan, setHighlightTaiwan] = useState(true)
  const [showTSMC, setShowTSMC] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  const exportMenuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.6))
  }

  const handleExportPNG = async () => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      canvas.width = 1200
      canvas.height = 800
      
      if (ctx) {
        // Background
        ctx.fillStyle = '#0F1629'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Title
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 28px Inter, system-ui, sans-serif'
        ctx.fillText('Taiwan Semiconductor Supply Chain Network', 40, 60)
        
        // Subtitle
        ctx.font = '16px Inter, system-ui, sans-serif'
        ctx.fillStyle = '#94A3B8'
        ctx.fillText('Exported from Vigia - Taiwan Risk Intelligence Platform', 40, 95)
        ctx.fillText(`Export Date: ${new Date().toLocaleString()}`, 40, 120)
        
        // Divider line
        ctx.strokeStyle = '#252D4A'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(40, 145)
        ctx.lineTo(1160, 145)
        ctx.stroke()
        
        // Critical Dependencies Header
        ctx.font = 'bold 20px Inter, system-ui, sans-serif'
        ctx.fillStyle = '#DC2626'
        ctx.fillText('⚠️ Critical Dependencies', 40, 190)
        
        // Dependencies list
        ctx.font = '16px Inter, system-ui, sans-serif'
        ctx.fillStyle = '#E2E8F0'
        ctx.fillText('• TSMC Taiwan: 54% global foundry market share, 90% advanced chips', 60, 230)
        ctx.fillText('• ASML Netherlands: 100% EUV lithography monopoly', 60, 260)
        ctx.fillText('• Taiwan Dependency: 65% of advanced chip production', 60, 290)
        ctx.fillText('• Ukraine: 70% of global neon gas supply (critical for lithography)', 60, 320)
        
        // Risk Metrics Header
        ctx.font = 'bold 20px Inter, system-ui, sans-serif'
        ctx.fillStyle = '#F59E0B'
        ctx.fillText('📊 Risk Concentration Metrics', 40, 380)
        
        // Risk bars
        const drawRiskBar = (label: string, value: number, y: number, color: string) => {
          ctx.font = '14px Inter, system-ui, sans-serif'
          ctx.fillStyle = '#94A3B8'
          ctx.fillText(label, 60, y)
          ctx.fillText(`${value}%`, 300, y)
          
          // Bar background
          ctx.fillStyle = '#1E293B'
          ctx.fillRect(350, y - 12, 400, 16)
          
          // Bar fill
          ctx.fillStyle = color
          ctx.fillRect(350, y - 12, (value / 100) * 400, 16)
        }
        
        drawRiskBar('Taiwan Dependency', 65, 420, '#DC2626')
        drawRiskBar('TSMC Dominance', 54, 460, '#DC2626')
        drawRiskBar('ASML Monopoly', 100, 500, '#F59E0B')
        drawRiskBar('Diversification Readiness', 38, 540, '#3B82F6')
        
        // Supply Chain Nodes Summary
        ctx.font = 'bold 20px Inter, system-ui, sans-serif'
        ctx.fillStyle = '#10B981'
        ctx.fillText('🔗 Supply Chain Summary', 40, 600)
        
        ctx.font = '16px Inter, system-ui, sans-serif'
        ctx.fillStyle = '#E2E8F0'
        const materials = supplyChainNodes.filter(n => n.type === 'material').length
        const equipment = supplyChainNodes.filter(n => n.type === 'equipment').length
        const manufacturers = supplyChainNodes.filter(n => n.type === 'manufacturer').length
        const endUsers = supplyChainNodes.filter(n => n.type === 'enduser').length
        
        ctx.fillText(`• Raw Materials: ${materials} suppliers`, 60, 640)
        ctx.fillText(`• Equipment: ${equipment} providers`, 60, 670)
        ctx.fillText(`• Manufacturers: ${manufacturers} foundries`, 60, 700)
        ctx.fillText(`• End Users: ${endUsers} sectors`, 60, 730)
        
        // Footer
        ctx.font = '12px Inter, system-ui, sans-serif'
        ctx.fillStyle = '#64748B'
        ctx.fillText('Generated by Vigia Taiwan Semiconductor Risk Intelligence Platform', 40, 780)
        
        // Download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `vigia-supply-chain-${new Date().toISOString().split('T')[0]}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
          }
        }, 'image/png')
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    }
    
    setShowExportMenu(false)
  }

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Type', 'Country', 'Market Share (%)', 'Capacity (GW)', 'Risk Score']
    const rows = supplyChainNodes.map(node => [
      node.id,
      node.name,
      node.type,
      node.country,
      node.marketShare,
      node.capacityGW || 'N/A',
      node.riskScore
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `vigia-supply-chain-data-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    setShowExportMenu(false)
  }

  const handleRunOptimization = () => {
    navigate('/optimization')
  }

  const materials = supplyChainNodes.filter(n => n.type === 'material')
  const equipment = supplyChainNodes.filter(n => n.type === 'equipment')
  const manufacturers = supplyChainNodes.filter(n => n.type === 'manufacturer')
  const endUsers = supplyChainNodes.filter(n => n.type === 'enduser')

  const getNodeColor = (country: string) => {
    if (country === 'Taiwan') return 'bg-taiwan-red'
    if (country === 'USA') return 'bg-taiwan-strategic'
    if (country === 'South Korea') return 'bg-taiwan-resilience'
    if (country === 'Netherlands' || country.includes('EU')) return 'bg-taiwan-ai'
    if (country === 'China') return 'bg-gray-500'
    return 'bg-taiwan-caution'
  }

  const getNodeSize = (marketShare: number) => {
    if (marketShare >= 50) return 'w-20 h-20'
    if (marketShare >= 20) return 'w-16 h-16'
    if (marketShare >= 10) return 'w-12 h-12'
    return 'w-10 h-10'
  }

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Taiwan-Centric Semiconductor Supply Chain Network
          </h1>
          <p className="text-text-muted">
            Identifying critical dependencies and single-point failures in the Taiwan-dominated ecosystem
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-navy-100 rounded-lg p-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.6}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs text-text-muted w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleZoomIn}
              disabled={zoomLevel >= 1.5}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative" ref={exportMenuRef}>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-2 bg-navy-100 border border-navy-200 rounded-xl shadow-lg z-50 min-w-[160px]">
                <button
                  onClick={handleExportPNG}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-text-secondary hover:bg-navy-200 hover:text-text-primary transition-colors rounded-t-xl"
                >
                  <FileImage className="w-4 h-4" />
                  Export as PNG
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-text-secondary hover:bg-navy-200 hover:text-text-primary transition-colors rounded-b-xl"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Export as CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch 
                checked={highlightTaiwan} 
                onCheckedChange={setHighlightTaiwan}
              />
              <span className="text-sm text-text-secondary">Highlight Taiwan Dependencies</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={showTSMC} 
                onCheckedChange={setShowTSMC}
              />
              <span className="text-sm text-text-secondary">Show TSMC Facilities</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sankey-style Flow Visualization */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            Supply Chain Flow Diagram
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={chartRef}
            className="relative min-h-[600px] overflow-auto transition-transform duration-200 origin-top-left"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
          >
            {/* Column Headers */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Raw Materials</h3>
                <p className="text-xs text-text-muted">Input Layer</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Equipment</h3>
                <p className="text-xs text-text-muted">Suppliers</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-taiwan-red mb-2">Manufacturing</h3>
                <p className="text-xs text-text-muted">TAIWAN DOMINANCE</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">End Users</h3>
                <p className="text-xs text-text-muted">Demand Layer</p>
              </div>
            </div>

            {/* Nodes Grid */}
            <div className="grid grid-cols-4 gap-4">
              {/* Materials Column */}
              <div className="space-y-4">
                {materials.map((node) => (
                  <div
                    key={node.id}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all hover:scale-105 cursor-pointer',
                      node.riskScore >= 70 ? 'border-taiwan-red/50 bg-taiwan-red/10' : 'border-navy-200 bg-navy-50'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn('w-3 h-3 rounded-full', getNodeColor(node.country))} />
                      <span className="text-sm font-medium text-text-primary">{node.name}</span>
                    </div>
                    <div className="text-xs text-text-muted">
                      {node.country} • {node.marketShare}%
                    </div>
                    {node.riskScore >= 70 && (
                      <span className="inline-block mt-2 text-[10px] px-2 py-0.5 bg-taiwan-caution/20 text-taiwan-caution rounded">
                        ⚠️ High Risk
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Equipment Column */}
              <div className="space-y-4">
                {equipment.map((node) => (
                  <div
                    key={node.id}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all hover:scale-105 cursor-pointer',
                      node.marketShare === 100 ? 'border-taiwan-ai/50 bg-taiwan-ai/10 animate-pulse' : 'border-navy-200 bg-navy-50'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn('w-3 h-3 rounded-full', getNodeColor(node.country))} />
                      <span className="text-sm font-medium text-text-primary">{node.name}</span>
                      {node.marketShare === 100 && <span className="text-lg">👑</span>}
                    </div>
                    <div className="text-xs text-text-muted">
                      {node.country} • {node.marketShare}% market
                    </div>
                    {node.marketShare === 100 && (
                      <span className="inline-block mt-2 text-[10px] px-2 py-0.5 bg-taiwan-ai/20 text-taiwan-ai rounded">
                        EUV Monopoly
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Manufacturing Column - Taiwan Dominance */}
              <div className="space-y-4">
                {manufacturers.map((node) => (
                  <div
                    key={node.id}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all hover:scale-105 cursor-pointer',
                      node.country === 'Taiwan' 
                        ? 'border-taiwan-red bg-taiwan-red/20 shadow-taiwan' 
                        : 'border-navy-200 bg-navy-50',
                      node.name.includes('TSMC') && highlightTaiwan && 'animate-taiwan-pulse'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn(
                        'rounded-full flex items-center justify-center text-white text-xs font-bold',
                        getNodeColor(node.country),
                        getNodeSize(node.marketShare)
                      )}>
                        {node.marketShare}%
                      </div>
                      <div>
                        <span className="text-sm font-medium text-text-primary block">{node.name}</span>
                        <span className="text-xs text-text-muted">{node.country}</span>
                      </div>
                    </div>
                    {node.capacityGW && (
                      <div className="text-xs text-text-muted mt-2">
                        Capacity: {node.capacityGW} GW
                      </div>
                    )}
                    {node.name === 'TSMC Taiwan' && (
                      <div className="mt-2 text-[10px] text-taiwan-red font-semibold">
                        ⚠️ 54% global foundry • 90% advanced chips
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* End Users Column */}
              <div className="space-y-4">
                {endUsers.map((node) => (
                  <div
                    key={node.id}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all hover:scale-105 cursor-pointer',
                      node.riskScore >= 75 ? 'border-taiwan-red/30 bg-taiwan-red/5' : 'border-navy-200 bg-navy-50'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn('w-3 h-3 rounded-full', getNodeColor(node.country))} />
                      <span className="text-sm font-medium text-text-primary">{node.name}</span>
                      {node.name.includes('Defense') && <span className="text-sm">🔒</span>}
                    </div>
                    <div className="text-xs text-text-muted">
                      {node.country} • {node.marketShare}% demand
                    </div>
                    <div className="mt-2 h-1.5 bg-navy-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-taiwan-red rounded-full"
                        style={{ width: `${node.riskScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-text-muted">Taiwan exposure: {node.riskScore}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flow Lines (SVG overlay would go here in production) */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Simplified representation - in production, use D3.js or similar for actual Sankey */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-taiwan-red">
          <CardHeader>
            <CardTitle className="text-lg text-taiwan-red">Critical Single-Point Failures</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">TSMC Hsinchu Fab</span>
                <span className="badge-critical">Centrality: 0.92</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">ASML Netherlands</span>
                <span className="badge-high">Centrality: 0.88</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Ukraine Neon Supply</span>
                <span className="badge-high">Centrality: 0.76</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-taiwan-caution">
          <CardHeader>
            <CardTitle className="text-lg text-taiwan-caution">Geographic Risk Concentration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-muted">Taiwan Dependency</span>
                  <span className="text-taiwan-red font-mono">65%</span>
                </div>
                <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                  <div className="h-full bg-taiwan-red rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-muted">TSMC Dominance</span>
                  <span className="text-taiwan-red font-mono">54%</span>
                </div>
                <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                  <div className="h-full bg-taiwan-red rounded-full" style={{ width: '54%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-muted">ASML Monopoly</span>
                  <span className="text-taiwan-caution font-mono">100%</span>
                </div>
                <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                  <div className="h-full bg-taiwan-caution rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <p className="text-xs text-taiwan-resilience mt-2">TARGET: &lt;40% single-country dependency</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-taiwan-strategic">
          <CardHeader>
            <CardTitle className="text-lg text-taiwan-strategic">Diversification Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <span className="text-5xl font-bold text-taiwan-caution">38</span>
              <span className="text-2xl text-text-muted">/100</span>
            </div>
            <div className="text-center">
              <span className="badge-high">Insufficient redundancy</span>
              <p className="text-xs text-text-muted mt-3">
                3-5 years to achieve 50% non-Taiwan capacity
              </p>
            </div>
            <Button className="w-full mt-4" onClick={handleRunOptimization}>
              Run Optimization Scenario
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
