import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

import Button from '../../../components/ui/Button';

const PerformanceChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [chartType, setChartType] = useState('line');

  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '1Y', value: '1Y' },
    { label: '5Y', value: '5Y' }
  ];

  const performanceData = [
    { date: '2024-01-01', portfolio: 100000, benchmark: 100000, volume: 1200000 },
    { date: '2024-01-15', portfolio: 102500, benchmark: 101200, volume: 1350000 },
    { date: '2024-02-01', portfolio: 105800, benchmark: 103500, volume: 1180000 },
    { date: '2024-02-15', portfolio: 103200, benchmark: 102800, volume: 1420000 },
    { date: '2024-03-01', portfolio: 108900, benchmark: 105600, volume: 1290000 },
    { date: '2024-03-15', portfolio: 112400, benchmark: 107200, volume: 1380000 },
    { date: '2024-04-01', portfolio: 115600, benchmark: 109800, volume: 1250000 },
    { date: '2024-04-15', portfolio: 118200, benchmark: 111500, volume: 1460000 },
    { date: '2024-05-01', portfolio: 121800, benchmark: 113900, volume: 1320000 },
    { date: '2024-05-15', portfolio: 119500, benchmark: 112400, volume: 1390000 },
    { date: '2024-06-01', portfolio: 124300, benchmark: 115800, volume: 1280000 },
    { date: '2024-06-15', portfolio: 127900, benchmark: 118200, volume: 1450000 },
    { date: '2024-07-01', portfolio: 131500, benchmark: 120600, volume: 1360000 },
    { date: '2024-07-17', portfolio: 134200, benchmark: 122800, volume: 1410000 }
  ];

  const formatTooltipValue = (value, name) => {
    if (name === 'volume') {
      return [`$${(value / 1000000).toFixed(1)}M`, 'Volume'];
    }
    return [`$${value.toLocaleString()}`, name === 'portfolio' ? 'Portfolio Value' : 'S&P 500 Benchmark'];
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Portfolio Performance</h2>
          <p className="text-sm text-muted-foreground">Track portfolio performance against benchmarks over time</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <div className="flex items-center bg-muted rounded-lg p-1">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.value}
                onClick={() => setSelectedTimeframe(timeframe.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  selectedTimeframe === timeframe.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
              iconName="TrendingUp"
              iconSize={16}
            >
              Line
            </Button>
            <Button
              variant={chartType === 'area' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('area')}
              iconName="AreaChart"
              iconSize={16}
            >
              Area
            </Button>
          </div>
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="benchmark" 
                stroke="var(--color-muted-foreground)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'var(--color-muted-foreground)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="portfolio" 
                stroke="var(--color-primary)" 
                fill="var(--color-primary)"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="benchmark" 
                stroke="var(--color-muted-foreground)" 
                fill="var(--color-muted-foreground)"
                fillOpacity={0.05}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Portfolio</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-muted-foreground rounded-full"></div>
            <span className="text-sm text-muted-foreground">S&P 500 Benchmark</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-2 lg:mt-0">
          <div className="text-sm">
            <span className="text-muted-foreground">Portfolio Return: </span>
            <span className="font-medium text-success">+34.2%</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Benchmark Return: </span>
            <span className="font-medium text-success">+22.8%</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Alpha: </span>
            <span className="font-medium text-primary">+11.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;