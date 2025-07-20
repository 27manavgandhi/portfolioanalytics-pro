import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CorrelationMatrix = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');

  const periods = [
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' },
    { label: '3Y', value: '3Y' }
  ];

  const assets = [
    'US Stocks',
    'Intl Stocks',
    'Bonds',
    'REITs',
    'Commodities',
    'Cash'
  ];

  const correlationData = [
    [1.00, 0.85, -0.12, 0.67, 0.23, -0.05],
    [0.85, 1.00, -0.08, 0.72, 0.31, -0.02],
    [-0.12, -0.08, 1.00, 0.15, -0.18, 0.45],
    [0.67, 0.72, 0.15, 1.00, 0.41, 0.08],
    [0.23, 0.31, -0.18, 0.41, 1.00, -0.12],
    [-0.05, -0.02, 0.45, 0.08, -0.12, 1.00]
  ];

  const getCorrelationColor = (value) => {
    if (value >= 0.7) return 'bg-error text-error-foreground';
    if (value >= 0.3) return 'bg-warning text-warning-foreground';
    if (value >= -0.3) return 'bg-muted text-foreground';
    if (value >= -0.7) return 'bg-primary text-primary-foreground';
    return 'bg-success text-success-foreground';
  };

  const getCorrelationIntensity = (value) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.8) return 'font-bold';
    if (absValue >= 0.5) return 'font-semibold';
    return 'font-medium';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Asset Correlation Matrix</h2>
          <p className="text-sm text-muted-foreground">Correlation coefficients between asset classes</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <span className="text-sm text-muted-foreground">Period:</span>
          <div className="flex items-center bg-muted rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 text-sm font-medium text-muted-foreground"></th>
                {assets.map((asset, index) => (
                  <th key={index} className="text-center p-2 text-sm font-medium text-muted-foreground min-w-24">
                    {asset}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="p-2 text-sm font-medium text-foreground min-w-24">
                    {asset}
                  </td>
                  {correlationData[rowIndex].map((correlation, colIndex) => (
                    <td key={colIndex} className="p-1">
                      <div className={`
                        w-16 h-8 rounded-md flex items-center justify-center text-xs
                        ${getCorrelationColor(correlation)}
                        ${getCorrelationIntensity(correlation)}
                        transition-all hover:scale-105 cursor-pointer
                      `}>
                        {correlation.toFixed(2)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4 mb-4 lg:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-success rounded"></div>
              <span className="text-xs text-muted-foreground">Strong Negative (-0.7 to -1.0)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span className="text-xs text-muted-foreground">Moderate Negative (-0.3 to -0.7)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-muted rounded"></div>
              <span className="text-xs text-muted-foreground">Low (-0.3 to 0.3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-warning rounded"></div>
              <span className="text-xs text-muted-foreground">Moderate Positive (0.3 to 0.7)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-error rounded"></div>
              <span className="text-xs text-muted-foreground">Strong Positive (0.7 to 1.0)</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconSize={16}>
              Export Matrix
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw" iconSize={16}>
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Diversification Score</span>
          </div>
          <div className="text-2xl font-bold text-primary mb-1">7.8/10</div>
          <p className="text-xs text-muted-foreground">
            Good diversification with low correlation between bonds and equities
          </p>
        </div>
        
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">High Correlation Alert</span>
          </div>
          <div className="text-sm text-foreground mb-1">US Stocks ↔ Intl Stocks: 0.85</div>
          <p className="text-xs text-muted-foreground">
            Consider reducing exposure to correlated equity positions
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrix;