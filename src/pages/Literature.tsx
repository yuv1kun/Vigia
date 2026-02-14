import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dataSources, academicStudies } from '@/data/mockData'
import { ExternalLink, BookOpen, Database, FileText, Download } from 'lucide-react'

export function Literature() {
  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Literature & Data Sources
        </h1>
        <p className="text-text-muted">
          Academic research, industry reports, and real-time data feeds powering Vigia's analysis
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-taiwan-strategic" />
              Real-Time Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataSources.map((source) => (
                <div key={source.id} className="p-4 bg-navy-100 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{source.logo}</span>
                      <div>
                        <h4 className="font-semibold text-text-primary">{source.name}</h4>
                        <p className="text-xs text-text-muted">{source.dataPoints}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      source.status === 'connected' ? 'bg-taiwan-resilience/20 text-taiwan-resilience' : 
                      source.status === 'delayed' ? 'bg-taiwan-caution/20 text-taiwan-caution' :
                      'bg-navy-200 text-text-muted'
                    }`}>
                      {source.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{source.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Updated: {source.lastUpdated}</span>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-taiwan-strategic hover:underline"
                    >
                      Visit Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Academic Studies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-taiwan-ai" />
              Key Academic Research
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {academicStudies.map((study) => (
                <div key={study.id} className="p-4 bg-navy-100 rounded-xl">
                  <h4 className="font-semibold text-text-primary mb-1">{study.title}</h4>
                  <p className="text-xs text-text-muted mb-2">
                    {study.authors} • {study.year} • {study.journal}
                  </p>
                  <p className="text-sm text-text-secondary mb-3">{study.keyFinding}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {study.citations && (
                      <span className="text-xs px-2 py-1 bg-navy-200 rounded text-text-muted">
                        Citations: {study.citations}
                      </span>
                    )}
                    {study.impactFactor && (
                      <span className="text-xs px-2 py-1 bg-taiwan-strategic/20 rounded text-taiwan-strategic">
                        IF: {study.impactFactor}
                      </span>
                    )}
                    {study.relevanceTags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-navy-200 rounded text-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Methodology */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-taiwan-caution" />
              Methodology & Model Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-navy-100 rounded-xl">
                <h4 className="font-semibold text-text-primary mb-2">Risk Scoring Model</h4>
                <p className="text-sm text-text-secondary mb-3">
                  Multi-factor weighted index combining military activity (40%), economic indicators (30%), 
                  and diplomatic tensions (30%). Updated daily using GDELT and custom NLP analysis.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Whitepaper
                </Button>
              </div>
              <div className="p-4 bg-navy-100 rounded-xl">
                <h4 className="font-semibold text-text-primary mb-2">Optimization Solver</h4>
                <p className="text-sm text-text-secondary mb-3">
                  Multi-objective linear programming using PuLP library. Minimizes cost while constraining 
                  geopolitical risk exposure and ensuring supply chain diversification.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  View Algorithm
                </Button>
              </div>
              <div className="p-4 bg-navy-100 rounded-xl">
                <h4 className="font-semibold text-text-primary mb-2">Predictive ML Model</h4>
                <p className="text-sm text-text-secondary mb-3">
                  Random Forest classifier trained on 5 years of historical disruption data. 
                  Features include military exercises, shipping delays, and sentiment analysis.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Model Card
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
