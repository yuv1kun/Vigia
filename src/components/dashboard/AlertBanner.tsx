import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AlertBanner() {
  return (
    <div className="alert-banner w-full py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
        <span className="text-white font-semibold text-sm">
          CRITICAL: 1,400+ military exercises detected near Taiwan in 2024 (+267% vs 2020)
        </span>
      </div>
      <Link 
        to="/alerts" 
        className="flex items-center gap-1 text-white text-sm font-medium hover:underline"
      >
        View Full Analysis
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
