import { Link } from 'react-router-dom'
import { Bookmark, ArrowRight, BarChart2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getTimeAgo, getSeverityBadgeClass, getSeverityColor } from '@/lib/utils'
import type { GeopoliticalAlert } from '@/data/types'

interface AlertFeedProps {
  alerts: GeopoliticalAlert[]
  maxItems?: number
}

export function AlertFeed({ alerts, maxItems = 5 }: AlertFeedProps) {
  const displayAlerts = alerts.slice(0, maxItems)

  const getSeverityEmoji = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return '🔴'
      case 'HIGH': return '🟠'
      case 'MEDIUM': return '🟡'
      case 'LOW': return '🟢'
      default: return '⚪'
    }
  }

  return (
    <div className="space-y-4">
      {displayAlerts.map((alert) => (
        <div
          key={alert.id}
          className={cn(
            'bg-navy-50 rounded-xl p-5 border-l-4 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-elevated cursor-pointer',
            getSeverityColor(alert.severity)
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className={getSeverityBadgeClass(alert.severity)}>
              {getSeverityEmoji(alert.severity)} {alert.severity}
            </span>
            <span className="text-xs text-text-muted">{getTimeAgo(alert.timestamp)}</span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
            {alert.title}
          </h4>

          {/* Description */}
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {alert.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {alert.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-navy-100 rounded-md text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Source */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted bg-navy-100 px-2 py-1 rounded">
              {alert.source}
            </span>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg hover:bg-navy-100 transition-colors">
                <Bookmark className={cn(
                  'w-4 h-4',
                  alert.isWatchlisted ? 'fill-taiwan-strategic text-taiwan-strategic' : 'text-text-muted'
                )} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-navy-100 transition-colors">
                <BarChart2 className="w-4 h-4 text-text-muted" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* View All Link */}
      <Link 
        to="/alerts"
        className="flex items-center justify-center gap-2 py-3 text-taiwan-strategic hover:text-blue-400 transition-colors"
      >
        <span className="text-sm font-medium">View All Alerts</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
