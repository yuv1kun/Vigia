import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Network, 
  AlertTriangle, 
  Settings, 
  Bell,
  BookOpen,
  Target,
  Cpu
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Taiwan Risk Dashboard' },
  { to: '/supply-chain', icon: Network, label: 'Supply Chain Network' },
  { to: '/scenarios', icon: AlertTriangle, label: 'Disruption Scenarios' },
  { to: '/optimization', icon: Target, label: 'Sourcing Optimization' },
  { to: '/alerts', icon: Bell, label: 'Geopolitical Alerts' },
  { to: '/literature', icon: BookOpen, label: 'Literature & Data' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-navy-50 border-b border-taiwan-red/30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-taiwan-red to-red-800 flex items-center justify-center shadow-taiwan">
            <Cpu className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-text-primary">Vigia</h1>
            <p className="text-xs text-text-muted">Taiwan Semiconductor Risk Intelligence</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-text-primary bg-navy-100 border-b-2 border-taiwan-red'
                    : 'text-text-muted hover:text-text-primary hover:bg-navy-100/50'
                )
              }
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden xl:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Live Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-taiwan-red/20 border border-taiwan-red/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-taiwan-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-taiwan-red"></span>
            </span>
            <span className="text-xs font-medium text-taiwan-red">Taiwan Strait: ELEVATED</span>
          </div>

          {/* Alert Bell */}
          <button className="relative p-2 rounded-lg hover:bg-navy-100 transition-colors">
            <Bell className="w-5 h-5 text-text-secondary" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-taiwan-red rounded-full text-[10px] font-bold text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-navy-100 border-2 border-navy-200 flex items-center justify-center">
            <span className="text-sm font-medium text-text-secondary">JD</span>
          </div>
        </div>
      </div>
    </header>
  )
}
