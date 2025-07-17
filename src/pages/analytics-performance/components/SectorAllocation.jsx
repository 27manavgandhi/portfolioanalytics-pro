import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SectorAllocation = () => {
  const [viewType, setViewType] = useState('pie');

  const sectorData = [
    { name: 'Technology', value: 28.5, allocation: 285000, benchmark: 25.2, performance: '+15.8%', color: '#1976d2' },
    { name: 'Healthcare', value: 18.2, allocation: 182000, benchmark: 16.8, performance: '+12.4%', color: '#388e3c' },
    { name: 'Financial Services', value: 15.7, allocation: 157000, benchmark: 18.3, performance: '+8.9%', color: '#f57c00' },
    { name: 'Consumer Discretionary', value: 12.3, allocation: 123000, benchmark: 11.8, performance: '+22.1%', color: '#7b1fa2' },
    { name: 'Industrials', value: 9.8, allocation: 98000, benchmark: 10.5, performance: '+6.7%', color: '#d32f2f' },
    { name: 'Energy', value: 6.2, allocation: 62000, benchmark: 7.1, performance: '-3.2%', color: '#455a64' },
    { name: 'Materials', value: 4.8, allocation: 48000, benchmark: 5.3, performance: '+4.1%', color: '#8d6e63' },
    { name: 'Utilities', value: 2.9, allocation: 29000, benchmark: 3.2, performance: '+1.8%', color: '#546e7a' },
    { name: 'Real Estate', value: 1.6, allocation: 16000, benchmark: 1.8, performance: '+9.3%', color: '#6d4c41' }
  ];

  const formatTooltip = (value, name, props) => {
    return [`${value}%`, `${name}: $${props.payload.allocation.toLocaleString()}`];
  };

  const getPerformanceColor = (performance) => {
    return performance.startsWith('+') ? 'text-success' : 'text-error';
  };

  const getAllocationDifference = (current, benchmark) => {
    const diff = current - benchmark;
    return {
      value: Math.abs(diff).toFixed(1),
      type: diff > 0 ? 'overweight' : 'underweight',
      color: diff > 0 ? 'text-warning' : 'text-primary'
    };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Sector Allocation</h2>
          <p className="text-sm text-muted-foreground">Portfolio allocation by sector with benchmark comparison</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <Button
            variant={viewType === 'pie' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('pie')}
            iconName="PieChart"
            iconSize={16}
          >
            Pie Chart
          </Button>
          <Button
            variant={viewType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('bar')}
            iconName="BarChart3"
            iconSize={16}
          >
            Bar Chart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {viewType === 'pie' ? (
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={formatTooltip} />
              </PieChart>
            ) : (
              <BarChart data={sectorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  formatter={(value, name) => [`${value}%`, 'Allocation']}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {sectorData.map((sector, index) => {
            const diff = getAllocationDifference(sector.value, sector.benchmark);
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: sector.color }}
                  ></div>
                  <div>
                    <div className="font-medium text-sm text-foreground">{sector.name}</div>
                    <div className="text-xs text-muted-foreground">
                      ${sector.allocation.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-sm text-foreground">{sector.value}%</div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className={getPerformanceColor(sector.performance)}>
                      {sector.performance}
                    </span>
                    <span className={diff.color}>
                      {diff.type === 'overweight' ? '+' : '-'}{diff.value}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Top Performer</span>
            </div>
            <div className="text-lg font-bold text-foreground">Consumer Discretionary</div>
            <div className="text-sm text-success">+22.1% return</div>
            <p className="text-xs text-muted-foreground mt-1">
              Outperforming due to strong consumer spending
            </p>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Overweight</span>
            </div>
            <div className="text-lg font-bold text-foreground">Technology</div>
            <div className="text-sm text-warning">+3.3% vs benchmark</div>
            <p className="text-xs text-muted-foreground mt-1">
              Consider rebalancing to reduce concentration risk
            </p>
          </div>
          
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingDown" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Underperformer</span>
            </div>
            <div className="text-lg font-bold text-foreground">Energy</div>
            <div className="text-sm text-error">-3.2% return</div>
            <p className="text-xs text-muted-foreground mt-1">
              Impacted by commodity price volatility
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorAllocation;