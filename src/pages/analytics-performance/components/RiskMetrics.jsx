import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskMetrics = () => {
  const riskMetrics = [
    {
      id: 1,
      name: 'Value at Risk (VaR)',
      value: '-2.8%',
      description: '95% confidence, 1-day horizon',
      trend: 'down',
      trendValue: '-0.3%',
      icon: 'TrendingDown',
      color: 'text-error'
    },
    {
      id: 2,
      name: 'Beta',
      value: '1.12',
      description: 'Relative to S&P 500',
      trend: 'up',
      trendValue: '+0.05',
      icon: 'Activity',
      color: 'text-warning'
    },
    {
      id: 3,
      name: 'Sharpe Ratio',
      value: '1.84',
      description: 'Risk-adjusted return',
      trend: 'up',
      trendValue: '+0.12',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      id: 4,
      name: 'Maximum Drawdown',
      value: '-8.4%',
      description: 'Peak to trough decline',
      trend: 'stable',
      trendValue: '0.0%',
      icon: 'ArrowDown',
      color: 'text-error'
    },
    {
      id: 5,
      name: 'Sortino Ratio',
      value: '2.31',
      description: 'Downside deviation adjusted',
      trend: 'up',
      trendValue: '+0.18',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      id: 6,
      name: 'Calmar Ratio',
      value: '1.67',
      description: 'Return vs max drawdown',
      trend: 'up',
      trendValue: '+0.09',
      icon: 'BarChart3',
      color: 'text-primary'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Risk Metrics</h2>
          <p className="text-sm text-muted-foreground">Comprehensive risk analysis and volatility measures</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">Real-time</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {riskMetrics.map((metric) => (
          <div key={metric.id} className="bg-muted/30 border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={metric.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">{metric.name}</h3>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className={`text-2xl font-semibold ${metric.color} mb-1`}>
                  {metric.value}
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getTrendIcon(metric.trend)} 
                  size={14} 
                  className={getTrendColor(metric.trend)}
                />
                <span className={`text-xs font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.trendValue}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Low Risk</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Portfolio maintains conservative risk profile with strong risk-adjusted returns
            </p>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Monitor Beta</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Beta above 1.0 indicates higher volatility than market benchmark
            </p>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Optimization</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Consider rebalancing to improve Sharpe ratio and reduce maximum drawdown
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;