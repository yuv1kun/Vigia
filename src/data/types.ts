export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

export type DisruptionScenario = 'baseline' | 'quarantine' | 'blockade' | 'destruction'

export interface TaiwanMetrics {
  taiwanDependency: number
  tsmcMarketShare: number
  economicExposure: number
  riskScore: number
  lastUpdated: Date
}

export interface RiskIndex {
  overall: number
  militaryActivity: number
  economicIndicators: number
  diplomaticTensions: number
  shippingDisruptions: number
  timestamp: Date
}

export interface GeopoliticalAlert {
  id: string
  timestamp: Date
  severity: Severity
  title: string
  description: string
  source: string
  category: string
  impactProbability: number
  tags: string[]
  isWatchlisted: boolean
}

export interface Supplier {
  id: string
  name: string
  country: string
  countryCode: string
  allocationPercent: number
  costPerUnit: number
  riskPremium: number
  capacityGW: number
  leadTimeDays: number
  isLocked: boolean
}

export interface OptimizationResult {
  allocations: Supplier[]
  totalCost: number
  riskScore: number
  costPremiumPercent: number
  taiwanDependency: number
}

export interface ScenarioConfig {
  id: string
  name: string
  productionDropPercent: number
  durationMonths: number
  probabilityAnnual: number
  economicImpactUSD: number
  icon: string
  color: string
}

export interface IndustryImpact {
  industry: string
  icon: string
  lossUSD: number
  productionHaltPercent: number
  color: string
}

export interface TimelineEvent {
  period: string
  title: string
  description: string
  severity: Severity
}

export interface SupplyChainNode {
  id: string
  name: string
  type: 'material' | 'equipment' | 'manufacturer' | 'enduser'
  country: string
  marketShare: number
  capacityGW?: number
  riskScore: number
}

export interface SupplyChainLink {
  source: string
  target: string
  flowUSD: number
}

export interface DataSource {
  id: string
  name: string
  description: string
  url: string
  status: 'connected' | 'delayed' | 'inactive'
  lastUpdated: string
  dataPoints?: string
  logo: string
}

export interface AcademicStudy {
  id: string
  authors: string
  year: number
  title: string
  journal: string
  keyFinding: string
  relevanceTags: string[]
  impactFactor?: number
  citations?: number
}

export interface UserSettings {
  theme: 'dark' | 'light' | 'auto'
  refreshInterval: number
  showAnimations: boolean
  showTooltips: boolean
  currency: string
  timezone: string
  emailNotifications: boolean
  pushNotifications: boolean
  smsAlerts: boolean
  criticalAlerts: boolean
  riskThresholdAlerts: boolean
  dailyDigest: boolean
  weeklyReport: boolean
}

export interface ScenarioTemplate {
  id: string
  name: string
  icon: string
  parameters: {
    label: string
    value: string
    color: string
  }[]
  isDefault: boolean
}
