import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { SupplyChain } from '@/pages/SupplyChain'
import { Scenarios } from '@/pages/Scenarios'
import { Optimization } from '@/pages/Optimization'
import { Alerts } from '@/pages/Alerts'
import { Literature } from '@/pages/Literature'
import { Settings } from '@/pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="supply-chain" element={<SupplyChain />} />
        <Route path="scenarios" element={<Scenarios />} />
        <Route path="optimization" element={<Optimization />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="literature" element={<Literature />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
