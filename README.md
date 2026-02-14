# Vigia — Taiwan Semiconductor Supply Chain Risk Intelligence Platform

Vigia is a real-time geopolitical risk intelligence dashboard focused on Taiwan semiconductor supply chain vulnerabilities. It helps organizations monitor, analyze, and mitigate risks associated with the global semiconductor industry's heavy dependence on Taiwan — particularly TSMC, which controls 54% of the global foundry market share.

## The Problem

Taiwan accounts for **65% of global advanced semiconductor production capacity**. A disruption — whether from military conflict, blockade, or natural disaster — could halt production in 95% of smartphones, 80% of data centers, and 70% of automotive electronics, with estimated economic impact of **$1.6–$2.3 trillion USD**.

Vigia provides the integrated visibility that organizations currently lack.

## Features

### Dashboard
- Real-time KPIs: Risk Score, Taiwan Dependency %, Economic Exposure, Alert Count
- Risk thermometer visualization (0–100 scale)
- Live geopolitical alert feed with severity levels (CRITICAL, HIGH, MEDIUM, LOW)
- Disruption scenario selector with adjustable parameters

### Supply Chain Visualization
- Interactive D3-Sankey network diagram of semiconductor supply chain
- Supplier nodes: TSMC Taiwan, Intel USA, Samsung Korea, TSMC Arizona, EU Fabs, GlobalFoundries
- Flow visualization with USD values and risk color-coding

### Scenario Modeling
- **Baseline**: Current state (0% production drop)
- **Quarantine**: 50% production drop, 4.5 months, $800B impact
- **Blockade**: 80% production drop, 9 months, $1.6T impact
- **Destruction**: 95% production drop, 18 months, $2.3T impact
- Adjustable parameters: blockade probability, USA capacity, reshoring timeline
- Industry-specific impact analysis (smartphones, data centers, automotive, IoT, healthcare, defense)

### Optimization Engine
- Supplier allocation optimization (linear programming)
- Mitigation strategy comparison: stockpiling, reshoring, nearshoring, diversification
- Cost/benefit and ROI analysis
- Capacity-constrained recommendations

### Alerts
- Real-time geopolitical event monitoring
- Categories: Military, Trade, Policy, Shipping, TSMC Operations
- Watchlist functionality and severity filtering

### Literature & Data Sources
- Academic research on supply chain resilience and geopolitical risk
- Data source integration details (GDELT, MarineTraffic, Taiwan Customs)

### Settings
- Theme preferences (dark/light)
- Notification configuration (email, push, SMS)
- Alert threshold customization

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | TailwindCSS + tailwindcss-animate |
| **UI Components** | Radix UI (shadcn/ui style) |
| **Charts** | Recharts |
| **Network Viz** | D3-Sankey |
| **Maps** | react-simple-maps |
| **Animations** | Framer Motion |
| **Routing** | React Router v6 |
| **Icons** | Lucide React |

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── AlertBanner.tsx
│   │   ├── AlertFeed.tsx
│   │   ├── KPICard.tsx
│   │   └── RiskThermometer.tsx
│   ├── layout/             # App layout and navigation
│   │   ├── Layout.tsx
│   │   └── Navigation.tsx
│   └── ui/                 # Reusable UI primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── progress.tsx
│       ├── select.tsx
│       ├── slider.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       └── tooltip.tsx
├── data/
│   ├── mockData.ts         # Mock data for all modules
│   └── types.ts            # TypeScript type definitions
├── lib/
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Dashboard.tsx        # Main risk dashboard
│   ├── SupplyChain.tsx      # Supply chain visualization
│   ├── Scenarios.tsx        # Disruption scenario modeling
│   ├── Optimization.tsx     # Mitigation strategy optimization
│   ├── Alerts.tsx           # Geopolitical alert monitoring
│   ├── Literature.tsx       # Research and data sources
│   └── Settings.tsx         # User preferences
├── App.tsx                  # Root component with routing
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yuv1kun/Vigia.git
cd Vigia

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Data Model

| Type | Description |
|------|-------------|
| `TaiwanMetrics` | Dependency %, TSMC market share, economic exposure, risk score |
| `RiskIndex` | Military activity, economic indicators, diplomatic tensions, shipping disruptions |
| `GeopoliticalAlert` | Real-time alerts with severity, source, impact probability, tags |
| `Supplier` | Allocation %, cost per unit, risk premium, capacity (GW), lead time |
| `ScenarioConfig` | Production drop %, duration, annual probability, economic impact |
| `IndustryImpact` | Industry-specific loss (USD) and production halt % |
| `SupplyChainNode` | Supplier nodes with type, country, market share, risk score |
| `SupplyChainLink` | Flow connections between nodes with USD values |

## Key Metrics (Mock Data)

- **Taiwan Dependency**: 65%
- **TSMC Market Share**: 54%
- **Global Economic Exposure**: $2.3 Trillion
- **Overall Risk Score**: 82/100
- **Suppliers Tracked**: TSMC Taiwan, Intel USA, Samsung Korea, TSMC Arizona, EU Fabs, GlobalFoundries

## License

This project is private and proprietary.

## Author

**Yuvraj Kumar** — [GitHub](https://github.com/yuv1kun)
