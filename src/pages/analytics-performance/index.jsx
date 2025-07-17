import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PerformanceChart from './components/PerformanceChart';
import RiskMetrics from './components/RiskMetrics';
import CorrelationMatrix from './components/CorrelationMatrix';
import SectorAllocation from './components/SectorAllocation';
import MonteCarloSimulation from './components/MonteCarloSimulation';
import AnalyticsFilters from './components/AnalyticsFilters';
import PerformanceAttribution from './components/PerformanceAttribution';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalyticsPerformance = () => {
  const [filters, setFilters] = useState({
    dateRange: '1M',
    benchmark: 'sp500',
    portfolios: ['growth-a'],
    metrics: ['returns', 'risk', 'alpha'],
    currency: 'USD',
    frequency: 'daily'
  });

  const [isExporting, setIsExporting] = useState(false);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
    }, 2000);
  };

  const quickStats = [
    {
      label: 'Portfolio Value',
      value: '$134.2M',
      change: '+2.8%',
      trend: 'up',
      icon: 'DollarSign'
    },
    {
      label: 'Total Return',
      value: '+34.2%',
      change: '+11.4% vs benchmark',
      trend: 'up',
      icon: 'TrendingUp'
    },
    {
      label: 'Sharpe Ratio',
      value: '1.84',
      change: '+0.12',
      trend: 'up',
      icon: 'Target'
    },
    {
      label: 'Max Drawdown',
      value: '-8.4%',
      change: 'Stable',
      trend: 'stable',
      icon: 'ArrowDown'
    }
  ];

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      <Helmet>
        <title>Analytics & Performance - PortfolioAnalytics Pro</title>
        <meta name="description" content="Comprehensive portfolio analytics and performance analysis with risk metrics, correlation matrices, and Monte Carlo simulations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="container-dashboard py-8">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">Analytics & Performance</h1>
                <p className="text-muted-foreground">
                  Comprehensive portfolio analysis with institutional-grade risk metrics and performance attribution
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  onClick={() => handleExport('pdf')}
                  loading={isExporting}
                  iconName="FileText"
                  iconSize={16}
                >
                  Export PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleExport('excel')}
                  loading={isExporting}
                  iconName="Download"
                  iconSize={16}
                >
                  Export Excel
                </Button>
                <Button
                  variant="default"
                  iconName="RefreshCw"
                  iconSize={16}
                >
                  Refresh Data
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={stat.icon} size={20} className="text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="mb-8">
              <AnalyticsFilters onFiltersChange={handleFiltersChange} />
            </div>

            {/* Main Analytics Grid */}
            <div className="space-y-8">
              {/* Performance Chart */}
              <PerformanceChart />

              {/* Risk Metrics */}
              <RiskMetrics />

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <SectorAllocation />
                <CorrelationMatrix />
              </div>

              {/* Performance Attribution */}
              <PerformanceAttribution />

              {/* Monte Carlo Simulation */}
              <MonteCarloSimulation />
            </div>

            {/* Additional Insights */}
            <div className="mt-8 bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Lightbulb" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Key Insights & Recommendations</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Strong Performance</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Portfolio is outperforming benchmark by 11.4% with excellent risk-adjusted returns (Sharpe: 1.84)
                  </p>
                </div>
                
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-warning">Concentration Risk</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Technology sector allocation (28.5%) is 3.3% above benchmark. Consider rebalancing to reduce concentration
                  </p>
                </div>
                
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Target" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">Optimization Opportunity</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monte Carlo analysis suggests 84.8% probability of positive returns over 10-year horizon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AnalyticsPerformance;