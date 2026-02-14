import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1e12) {
    return `$${(num / 1e12).toFixed(1)}T`
  }
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(1)}B`
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(1)}M`
  }
  return num.toLocaleString()
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(0)}%`
}

export function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
}

export function getRiskColor(score: number): string {
  if (score >= 85) return 'text-taiwan-red'
  if (score >= 60) return 'text-risk-high'
  if (score >= 30) return 'text-taiwan-caution'
  return 'text-taiwan-resilience'
}

export function getRiskBgColor(score: number): string {
  if (score >= 85) return 'bg-taiwan-red'
  if (score >= 60) return 'bg-risk-high'
  if (score >= 30) return 'bg-taiwan-caution'
  return 'bg-taiwan-resilience'
}

export function getRiskLabel(score: number): string {
  if (score >= 85) return 'CRITICAL'
  if (score >= 60) return 'HIGH'
  if (score >= 30) return 'MEDIUM'
  return 'LOW'
}

export function getSeverityColor(severity: string): string {
  switch (severity.toUpperCase()) {
    case 'CRITICAL':
      return 'border-taiwan-red bg-taiwan-red/10'
    case 'HIGH':
      return 'border-risk-high bg-risk-high/10'
    case 'MEDIUM':
      return 'border-taiwan-caution bg-taiwan-caution/10'
    case 'LOW':
      return 'border-taiwan-resilience bg-taiwan-resilience/10'
    default:
      return 'border-navy-100 bg-navy-100/10'
  }
}

export function getSeverityBadgeClass(severity: string): string {
  switch (severity.toUpperCase()) {
    case 'CRITICAL':
      return 'badge-critical'
    case 'HIGH':
      return 'badge-high'
    case 'MEDIUM':
      return 'badge-medium'
    case 'LOW':
      return 'badge-low'
    default:
      return 'bg-navy-100 text-text-secondary px-3 py-1 rounded-full text-xs font-semibold'
  }
}
