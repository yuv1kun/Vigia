import { cn } from '@/lib/utils'

interface RiskThermometerProps {
  value: number
  className?: string
}

export function RiskThermometer({ value, className }: RiskThermometerProps) {
  const getRiskLabel = (score: number) => {
    if (score >= 85) return 'CRITICAL'
    if (score >= 60) return 'ELEVATED'
    if (score >= 30) return 'MODERATE'
    return 'LOW'
  }

  const getRiskColor = (score: number) => {
    if (score >= 85) return 'text-taiwan-red'
    if (score >= 60) return 'text-risk-high'
    if (score >= 30) return 'text-taiwan-caution'
    return 'text-taiwan-resilience'
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* Thermometer container */}
      <div className="relative w-20 h-64">
        {/* Glass tube */}
        <div className="absolute inset-x-2 top-0 bottom-8 rounded-t-full bg-navy-100 border-2 border-navy-200 overflow-hidden">
          {/* Risk gradient fill */}
          <div 
            className="absolute bottom-0 left-0 right-0 risk-gradient transition-all duration-1000 ease-out"
            style={{ height: `${value}%` }}
          />
          
          {/* Scale markers */}
          <div className="absolute inset-0 flex flex-col justify-between py-2">
            {[100, 75, 50, 25, 0].map((mark) => (
              <div key={mark} className="flex items-center justify-end pr-1">
                <span className="text-[10px] text-text-muted font-mono">{mark}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bulb at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-taiwan-red animate-pulse shadow-taiwan" />
      </div>
      
      {/* Current reading */}
      <div className="mt-4 text-center">
        <div className={cn('text-5xl font-bold font-mono', getRiskColor(value))}>
          {value}
        </div>
        <div className={cn(
          'mt-1 px-3 py-1 rounded-full text-xs font-bold',
          value >= 85 ? 'bg-taiwan-red/20 text-taiwan-red' :
          value >= 60 ? 'bg-risk-high/20 text-risk-high' :
          value >= 30 ? 'bg-taiwan-caution/20 text-taiwan-caution' :
          'bg-taiwan-resilience/20 text-taiwan-resilience'
        )}>
          {getRiskLabel(value)}
        </div>
      </div>
    </div>
  )
}
