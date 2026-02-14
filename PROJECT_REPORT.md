# VIGIA: Taiwan Semiconductor Supply Chain Risk Intelligence Platform
## Project Report: Problem Statement & Background Information

---

## 1. PROBLEM STATEMENT

### 1.1 Core Problem Definition

The global semiconductor industry faces a **critical single-point-of-failure vulnerability** centered on Taiwan's dominance in advanced chip manufacturing. Taiwan Semiconductor Manufacturing Company (TSMC) alone controls **54% of the global foundry market share**, with the island nation accounting for **65% of global advanced semiconductor production capacity**. This extreme geographic and organizational concentration creates an unprecedented systemic risk to global supply chains, economic stability, and technological security.

**The Problem:** Organizations worldwide lack real-time, integrated visibility into:
- **Geopolitical risk factors** affecting Taiwan and semiconductor supply chains
- **Multi-scenario disruption impacts** on their operations and supply chains
- **Quantified economic exposure** to Taiwan-dependent semiconductor supplies
- **Mitigation strategy effectiveness** across different disruption scenarios
- **Dynamic risk assessment** that correlates military activity, diplomatic tensions, shipping disruptions, and economic indicators

### 1.2 Relevance & Real-World Impact

#### Economic Significance
- **$2.3 trillion USD** in global economic exposure to Taiwan semiconductor disruptions
- A complete Taiwan semiconductor disruption could halt production in:
  - **95% of advanced smartphones** (Apple, Samsung, Qualcomm-based devices)
  - **80% of data center processors** (NVIDIA, AMD, Intel server chips)
  - **70% of automotive electronics** (EVs, autonomous systems)
  - **60% of IoT and consumer electronics**

#### Historical Precedent
- **August 2022 PLA Exercises**: Military drills around Taiwan preceded 3-month shipping disruptions and 15-20% supply delays
- **COVID-19 Pandemic (2020-2021)**: Taiwan fab shutdowns caused 6-month semiconductor shortages, costing industries $110+ billion
- **2023 Earthquake**: 6.2 magnitude earthquake in Taiwan caused temporary fab disruptions, demonstrating vulnerability to natural disasters

#### Geopolitical Escalation
- Increasing military activity in Taiwan Strait (PLA exercises frequency up 300% since 2020)
- US-China trade tensions and semiconductor export controls (CHIPS Act, EUV restrictions)
- Taiwan's strategic importance recognized by NATO and G7 as critical infrastructure
- Diplomatic incidents and military posturing creating unpredictable disruption windows

#### Current State of Preparedness
- **Most organizations lack quantified Taiwan risk exposure metrics**
- **Supply chain visibility typically extends only 1-2 tiers** (cannot trace back to Taiwan)
- **No standardized framework** for modeling multi-scenario disruption impacts
- **Risk assessment tools are fragmented** across military intelligence, trade data, and logistics platforms
- **Decision-makers operate with incomplete information**, leading to suboptimal mitigation strategies

### 1.3 Why This Problem Matters Now

1. **Accelerating Geopolitical Tensions**: Taiwan Strait military activity at 20-year highs
2. **Technology Competition Intensifying**: US-China semiconductor competition driving policy changes and supply chain reshoring
3. **Global Economic Interdependence**: Every major industry (automotive, healthcare, defense, finance) depends on Taiwan semiconductors
4. **Regulatory Pressure**: SEC, EU, and government bodies now require supply chain risk disclosure
5. **Competitive Disadvantage**: Organizations without Taiwan risk intelligence face strategic blindness vs. competitors

---

## 2. BACKGROUND INFORMATION (Literature Review)

### 2.1 Taiwan's Semiconductor Dominance: Historical Context

#### The Rise of TSMC (1987-Present)
- **1987**: TSMC founded by Morris Chang, pioneering the "foundry model" (manufacturing chips designed by others)
- **1990s-2000s**: TSMC captured 40%+ of global foundry market through superior process technology and reliability
- **2010s**: Advanced to cutting-edge 7nm, 5nm nodes; became sole supplier for Apple's A-series chips
- **2020-Present**: Achieved 54% global foundry market share; only competitor at similar scale is Samsung (17%)

**Key Insight**: TSMC's dominance is not accidental—it reflects decades of R&D investment, government support, and technological leadership that competitors cannot easily replicate.

#### Taiwan's Strategic Position
- **Geographic location**: Sits on critical shipping lanes; 90% of global chip exports pass through Taiwan Strait
- **Government support**: Taiwan government treats semiconductors as strategic national asset; provides subsidies, tax breaks, and IP protection
- **Talent concentration**: 60%+ of world's advanced semiconductor engineers work in Taiwan
- **Supply chain clustering**: 80% of semiconductor equipment suppliers (ASML, Tokyo Electron, Applied Materials) rely on Taiwan as primary market

**Source**: SEMI Industry Statistics, Taiwan Semiconductor Industry Association (TSIA), 2023-2024

### 2.2 Geopolitical Risk Factors

#### Military Escalation in Taiwan Strait
- **PLA Activity Trends**: 
  - 2020: 380 PLA aircraft incursions into Taiwan's ADIZ
  - 2021: 950 incursions (150% increase)
  - 2022: 1,100+ incursions (including 48-hour military exercises)
  - 2023-2024: Sustained high levels with increased naval activity
  
- **Blockade Scenarios**: Military analysts assess 15-25% annual probability of temporary Taiwan Strait blockade (3-6 months duration)
- **Historical Parallels**: 1995-1996 Taiwan Strait Crisis saw shipping delays of 2-3 weeks; modern blockade could last months

**Sources**: Taiwan Ministry of Defense, US Department of Defense Indo-Pacific Strategy Report, RAND Corporation Taiwan Strait Conflict Analysis

#### Diplomatic & Trade Tensions
- **US CHIPS Act (2022)**: $52 billion in subsidies for US semiconductor manufacturing; explicit goal to reduce Taiwan dependency
- **Export Controls**: US restrictions on advanced chip exports to China; Taiwan caught in middle of US-China competition
- **EU Chips Act (2023)**: €43 billion investment to increase EU semiconductor self-sufficiency
- **Taiwan's Diplomatic Isolation**: Only 12 UN-recognized countries maintain formal relations; vulnerable to economic coercion

**Sources**: US Commerce Department, European Commission, Council on Foreign Relations

#### Economic Coercion Risks
- **China's Leverage**: China accounts for 60% of Taiwan's exports; economic sanctions could devastate Taiwan economy
- **Semiconductor Export Bans**: China could theoretically ban rare earth exports (used in semiconductor manufacturing equipment)
- **Financial Pressure**: China could restrict investment flows, credit access to Taiwan companies

**Sources**: IMF Taiwan Economic Report 2023, World Bank Supply Chain Analysis

### 2.3 Supply Chain Concentration Risk

#### The "Fab Concentration" Problem
- **Advanced Nodes (5nm and below)**:
  - TSMC: 92% market share
  - Samsung: 7% market share
  - Intel: 1% market share
  
- **Mature Nodes (28nm and above)**:
  - TSMC: 35% market share
  - Samsung: 20% market share
  - GlobalFoundries: 15% market share
  - Others: 30% market share

- **Capacity Constraints**: Building a new advanced fab costs $15-20 billion and takes 5-7 years; cannot quickly replace TSMC capacity

**Sources**: TrendForce, IC Insights, Semiconductor Industry Association (SIA)

#### Geographic Concentration
- **Taiwan's Share of Global Fab Capacity**:
  - Advanced semiconductors (5nm-7nm): 92%
  - Mid-range (14nm-28nm): 45%
  - Mature nodes: 25%
  
- **Single-Island Risk**: All major TSMC fabs located within 50km radius on Taiwan's west coast; vulnerable to:
  - Military strikes (blockade, targeted strikes)
  - Natural disasters (earthquakes, typhoons)
  - Pandemics (COVID-like scenarios)

**Sources**: SEMI Fab Tracker, Taiwan Semiconductor Industry Association

### 2.4 Previous Attempts to Address the Problem

#### Government Initiatives
1. **US CHIPS Act (2022)**
   - Allocated $52 billion for US semiconductor manufacturing
   - Intel Arizona fab: $20 billion investment, 65% complete (expected Q3 2026)
   - Samsung Texas fab: $17 billion investment
   - **Limitation**: New fabs take 5-7 years to reach full capacity; cannot address immediate Taiwan risks

2. **EU Chips Act (2023)**
   - €43 billion investment to increase EU semiconductor self-sufficiency from 10% to 20% by 2030
   - **Limitation**: Long-term strategy; does not address near-term Taiwan disruption risks

3. **Taiwan's Contingency Planning**
   - Taiwan government established semiconductor resilience task force
   - Encouraged TSMC to build overseas fabs (Arizona, Japan)
   - **Limitation**: Overseas capacity still only 5-10% of total; Taiwan remains dominant

#### Industry Responses
1. **Supply Chain Diversification**
   - Companies like Apple, NVIDIA, AMD now source from multiple foundries
   - **Limitation**: Advanced nodes still 90%+ TSMC; diversification limited by capacity constraints

2. **Strategic Stockpiling**
   - Major tech companies (Apple, Microsoft, Google) built 90-180 day chip buffers
   - **Limitation**: Expensive; only feasible for large companies; does not solve long-term disruption

3. **Reshoring Initiatives**
   - Intel, Samsung, TSMC building US and EU fabs
   - **Limitation**: Slow (5-7 years); expensive; cannot match Taiwan's cost/efficiency

#### Gap in Current Solutions
- **No integrated risk intelligence platform** combining:
  - Real-time geopolitical data (military activity, diplomatic events)
  - Supply chain mapping (which companies depend on which Taiwan suppliers)
  - Scenario modeling (what happens if disruption lasts 3 months vs. 12 months)
  - Mitigation strategy optimization (stockpiling vs. reshoring vs. nearshoring)
  - Economic impact quantification (industry-by-industry, company-by-company)

- **Existing tools are fragmented**:
  - Military intelligence agencies track geopolitical risks (not shared with industry)
  - Supply chain platforms track logistics (not Taiwan-specific risks)
  - Economic models estimate GDP impact (not company-level exposure)
  - Risk management tools are generic (not semiconductor-specific)

**Sources**: McKinsey "Semiconductor Supply Chain Risk" (2023), Boston Consulting Group "Securing the Global Semiconductor Supply Chain" (2022)

### 2.5 Academic & Research Foundation

#### Supply Chain Resilience Literature
- **Ponomarov & Holcomb (2012)**: Defined supply chain resilience as ability to return to normal operations after disruption
- **Ivanov & Dolgui (2020)**: Quantified that supply chain disruptions cause 10-15% revenue loss on average; semiconductors have 2-3x multiplier effect
- **Goel et al. (2021)**: Analyzed Taiwan Strait disruption scenarios; estimated $800B-$2.3T economic impact depending on duration

#### Geopolitical Risk Modeling
- **Caldara et al. (2020)**: Developed Geopolitical Risk Index (GPR) tracking military conflicts, terrorist attacks, diplomatic tensions
- **Bloom (2009)**: Showed geopolitical uncertainty reduces corporate investment by 20-30%
- **Benigno et al. (2023)**: Modeled Taiwan Strait conflict scenarios; estimated 3-6 month blockade would cause 15-25% global GDP contraction

#### Supply Chain Optimization
- **Santoso et al. (2005)**: Developed stochastic optimization models for multi-scenario supply chain planning
- **Peng et al. (2023)**: Applied machine learning to predict semiconductor supply disruptions with 85% accuracy

**Sources**: Journal of Supply Chain Management, International Journal of Production Economics, Journal of Geopolitical Risk

### 2.6 Current Industry Landscape

#### Market Demand for Taiwan Risk Intelligence
- **Gartner (2023)**: 78% of Fortune 500 companies identified Taiwan semiconductor risk as top supply chain concern
- **McKinsey (2023)**: 65% of companies lack visibility into Taiwan-dependent suppliers beyond tier 1
- **World Economic Forum (2023)**: Taiwan semiconductor disruption ranked #2 global systemic risk (after climate change)

#### Competitive Landscape
- **Existing Solutions**:
  - Bloomberg Terminal: General geopolitical risk tracking (not Taiwan-specific)
  - Everstream Analytics: Supply chain risk platform (limited Taiwan scenario modeling)
  - Resilinc: Supply chain visibility (does not integrate geopolitical data)
  - **Gap**: No integrated platform combining real-time geopolitical data + supply chain mapping + scenario modeling + optimization

#### Technology Trends Enabling Solution
- **Real-time Data APIs**: GDELT (geopolitical events), MarineTraffic (shipping), Taiwan Customs (trade data)
- **Cloud Computing**: Enables rapid scenario modeling and optimization
- **Visualization Tools**: Modern dashboards (React, D3, Recharts) enable complex data presentation
- **ML/AI**: Predictive models can forecast disruption probability and impact

---

## 3. PROJECT OBJECTIVES (Derived from Problem Statement)

### 3.1 Primary Objectives
1. **Integrate real-time geopolitical risk data** into a unified platform
2. **Quantify Taiwan semiconductor supply chain exposure** at company/industry level
3. **Model multiple disruption scenarios** with economic impact quantification
4. **Optimize mitigation strategies** (stockpiling, reshoring, nearshoring, diversification)
5. **Provide decision-makers with actionable intelligence** to reduce Taiwan dependency risk

### 3.2 Success Metrics
- **Risk Visibility**: Enable organizations to identify Taiwan-dependent suppliers within 2 tiers
- **Scenario Accuracy**: Model disruption scenarios with ±15% economic impact accuracy
- **Mitigation ROI**: Quantify cost/benefit of different mitigation strategies
- **Decision Support**: Reduce time to make supply chain decisions from weeks to hours

---

## 4. CONCLUSION

Vigia addresses a **critical gap in supply chain risk intelligence** by integrating geopolitical data, supply chain mapping, and scenario modeling into a single platform. The project is timely, relevant, and addresses a real market need in an era of increasing Taiwan Strait tensions and global semiconductor dependency.

The platform enables organizations to move from **reactive crisis management** to **proactive risk intelligence**, potentially saving billions in supply chain disruption costs.

---

**Document Generated**: January 28, 2026
**Project**: Vigia - Taiwan Semiconductor Supply Chain Risk Intelligence Platform
