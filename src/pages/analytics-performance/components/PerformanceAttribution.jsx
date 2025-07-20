import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceAttribution = () => {
  const [viewType, setViewType] = useState('sector');
  const [timeframe, setTimeframe] = useState('1M');

  const sectorAttribution = [
    { name: 'Technology', allocation: 28.5, selection: 2.8, interaction: 0.3, total: 3.1, color: '#1976d2' },
    { name: 'Healthcare', allocation: 18.2, selection: 1.4, interaction: 0.1, total: 1.5, color: '#388e3c' },
    { name: 'Financial Services', allocation: 15.7, selection: -0.8, interaction: -0.2, total: -1.0, color: '#f57c00' },
    { name: 'Consumer Discretionary', allocation: 12.3, selection: 2.1, interaction: 0.4, total: 2.5, color: '#7b1fa2' },
    { name: 'Industrials', allocation: 9.8, selection: 0.3, interaction: 0.0, total: 0.3, color: '#d32f2f' },
    { name: 'Energy', allocation: 6.2, selection: -1.2, interaction: -0.3, total: -1.5, color: '#455a64' },
    { name: 'Materials', allocation: 4.8, selection: 0.1, interaction: 0.0, total: 0.1, color: '#8d6e63' },
    { name: 'Utilities', allocation: 2.9, selection: -0.1, interaction: 0.0, total: -0.1, color: '#546e7a' },
    { name: 'Real Estate', allocation: 1.6, selection: 0.2, interaction: 0.0, total: 0.2, color: '#6d4c41' }
  ];

  const assetAttribution = [
    { name: 'Apple Inc.', weight: 8.2, contribution: 1.8, excess: 0.4, sector: 'Technology' },
    { name: 'Microsoft Corp.', weight: 6.8, contribution: 1.2, excess: 0.3, sector: 'Technology' },
    { name: 'Amazon.com Inc.', weight: 4.5, contribution: 0.9, excess: 0.2, sector: 'Consumer Discretionary' },
    { name: 'Alphabet Inc.', weight: 4.2, contribution: 0.7, excess: 0.1, sector: 'Technology' },
    { name: 'Tesla Inc.', weight: 3.8, contribution: 1.4, excess: 0.8, sector: 'Consumer Discretionary' },
    { name: 'Johnson & Johnson', weight: 3.2, contribution: 0.4, excess: 0.1, sector: 'Healthcare' },
    { name: 'JPMorgan Chase', weight: 2.9, contribution: -0.2, excess: -0.3, sector: 'Financial Services' },
    { name: 'Visa Inc.', weight: 2.6, contribution: 0.6, excess: 0.2, sector: 'Financial Services' },
    { name: 'Procter & Gamble', weight: 2.4, contribution: 0.3, excess: 0.1, sector: 'Consumer Staples' },
    { name: 'UnitedHealth Group', weight: 2.2, contribution: 0.5, excess: 0.2, sector: 'Healthcare' }
  ];

  const timeframes = [
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' }
  ];

  const getBarColor = (value) => {
    return value >= 0 ? 'var(--color-success)' : 'var(--color-error)';
  };

  const formatTooltip = (value, name, props) => {
    return [`${value.toFixed(2)}%`, name];
  };

  const totalAttribution = sectorAttribution.reduce((sum, item) => sum + item.total, 0);
  const positiveContribution = sectorAttribution.filter(item => item.total > 0).reduce((sum, item) => sum + item.total, 0);
  const negativeContribution = sectorAttribution.filter(item => item.total < 0).reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Performance Attribution</h2>
          <p className="text-sm text-muted-foreground">Breakdown of portfolio returns by sector and individual holdings</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <div className="flex items-center bg-muted rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  timeframe === tf.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewType === 'sector' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('sector')}
            >
              By Sector
            </Button>
            <Button
              variant={viewType === 'asset' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('asset')}
            >
              By Asset
            </Button>
          </div>
        </div>
      </div>

      {viewType === 'sector' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorAttribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={10}
                  stroke="var(--color-muted-foreground)"
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={formatTooltip}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {sectorAttribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.total)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {sectorAttribution.map((sector, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: sector.color }}
                    ></div>
                    <span className="font-medium text-sm text-foreground">{sector.name}</span>
                  </div>
                  <span className={`font-semibold text-sm ${sector.total >= 0 ? 'text-success' : 'text-error'}`}>
                    {sector.total >= 0 ? '+' : ''}{sector.total.toFixed(2)}%
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Allocation:</span>
                    <div className="font-medium">{sector.allocation.toFixed(1)}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Selection:</span>
                    <div className={`font-medium ${sector.selection >= 0 ? 'text-success' : 'text-error'}`}>
                      {sector.selection >= 0 ? '+' : ''}{sector.selection.toFixed(2)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Interaction:</span>
                    <div className={`font-medium ${sector.interaction >= 0 ? 'text-success' : 'text-error'}`}>
                      {sector.interaction >= 0 ? '+' : ''}{sector.interaction.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Asset</th>
                <th className="text-right p-3 text-sm font-medium text-muted-foreground">Weight</th>
                <th className="text-right p-3 text-sm font-medium text-muted-foreground">Contribution</th>
                <th className="text-right p-3 text-sm font-medium text-muted-foreground">Excess Return</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Sector</th>
              </tr>
            </thead>
            <tbody>
              {assetAttribution.map((asset, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <div className="font-medium text-sm text-foreground">{asset.name}</div>
                  </td>
                  <td className="p-3 text-right text-sm text-foreground">{asset.weight}%</td>
                  <td className={`p-3 text-right text-sm font-medium ${asset.contribution >= 0 ? 'text-success' : 'text-error'}`}>
                    {asset.contribution >= 0 ? '+' : ''}{asset.contribution.toFixed(2)}%
                  </td>
                  <td className={`p-3 text-right text-sm font-medium ${asset.excess >= 0 ? 'text-success' : 'text-error'}`}>
                    {asset.excess >= 0 ? '+' : ''}{asset.excess.toFixed(2)}%
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{asset.sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Total Attribution</span>
            </div>
            <div className={`text-2xl font-bold ${totalAttribution >= 0 ? 'text-success' : 'text-error'}`}>
              {totalAttribution >= 0 ? '+' : ''}{totalAttribution.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">vs benchmark</p>
          </div>
          
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Plus" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Positive Impact</span>
            </div>
            <div className="text-2xl font-bold text-success">+{positiveContribution.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">from outperformers</p>
          </div>
          
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Minus" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Negative Impact</span>
            </div>
            <div className="text-2xl font-bold text-error">{negativeContribution.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">from underperformers</p>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Hit Rate</span>
            </div>
            <div className="text-2xl font-bold text-foreground">67%</div>
            <p className="text-xs text-muted-foreground">positions outperforming</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAttribution;