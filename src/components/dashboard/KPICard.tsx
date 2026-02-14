import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'

interface KPICardProps {
  icon: string
  value: string | number
  label: string
  trend?: {
    value: string
    direction: 'up' | 'down'
    isPositive: boolean
  }
  variant?: 'taiwan' | 'amber' | 'green' | 'blue'
  badge?: string
  className?: string
}

export function KPICard({ 
  icon, 
  value, 
  label, 
  trend, 
  variant = 'taiwan',
  badge,
  className 
}: KPICardProps) {
  const variantStyles = {
    taiwan: 'border-l-4 border-taiwan-red',
    amber: 'border-l-4 border-taiwan-caution',
    green: 'border-l-4 border-taiwan-resilience',
    blue: 'border-l-4 border-taiwan-strategic',
  }

  const valueColors = {
    taiwan: 'text-text-emphasis',
    amber: 'text-taiwan-caution',
    green: 'text-taiwan-resilience',
    blue: 'text-taiwan-strategic',
  }

  return (
    <div 
      className={cn(
        'kpi-card group cursor-pointer',
        variantStyles[variant],
        variant === 'taiwan' && 'animate-taiwan-pulse',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        {badge && (
          <span className={cn(
            'px-2 py-1 rounded-full text-xs font-semibold',
            variant === 'taiwan' ? 'bg-taiwan-red/20 text-taiwan-red' :
            variant === 'amber' ? 'bg-taiwan-caution/20 text-taiwan-caution' :
            variant === 'green' ? 'bg-taiwan-resilience/20 text-taiwan-resilience' :
            'bg-taiwan-strategic/20 text-taiwan-strategic'
          )}>
            {badge}
          </span>
        )}
      </div>
      
      <div className={cn('text-kpi font-bold mb-2', valueColors[variant])}>
        {value}
      </div>
      
      <p className="text-sm text-text-muted mb-3">{label}</p>
      
      {trend && (
        <div className={cn(
          'flex items-center gap-1 text-sm font-medium',
          trend.isPositive ? 'text-taiwan-resilience' : 'text-taiwan-red'
        )}>
          {trend.direction === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  )
}
