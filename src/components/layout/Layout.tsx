import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { TooltipProvider } from '@/components/ui/tooltip'

export function Layout() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-navy">
        <Navigation />
        <main className="pt-[72px]">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  )
}
