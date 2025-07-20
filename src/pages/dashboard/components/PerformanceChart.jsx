import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';

const PerformanceChart = () => {
  const [timeframe, setTimeframe] = useState('1M');
  
  const performanceData = [
    { date: '2025-01-01', portfolio: 100000, benchmark: 100000 },
    { date: '2025-01-08', portfolio: 102500, benchmark: 101200 },
    { date: '2025-01-15', portfolio: 104800, benchmark: 102800 },
    { date: '2025-01-22', portfolio: 103200, benchmark: 101900 },
    { date: '2025-01-29', portfolio: 106500, benchmark: 103500 },
    { date: '2025-02-05', portfolio: 108200, benchmark: 104200 },
    { date: '2025-02-12', portfolio: 107800, benchmark: 103800 },
    { date: '2025-02-19', portfolio: 110500, benchmark: 105800 },
    { date: '2025-02-26', portfolio: 112300, benchmark: 106900 },
    { date: '2025-03-05', portfolio: 114800, benchmark: 108200 },
    { date: '2025-03-12', portfolio: 113500, benchmark: 107500 },
    { date: '2025-03-19', portfolio: 116200, benchmark: 109800 },
    { date: '2025-03-26', portfolio: 118900, benchmark: 111200 },
    { date: '2025-04-02', portfolio: 120500, benchmark: 112500 },
    { date: '2025-04-09', portfolio: 119200, benchmark: 111800 },
    { date: '2025-04-16', portfolio: 122800, benchmark: 114200 },
    { date: '2025-04-23', portfolio: 125400, benchmark: 115900 },
    { date: '2025-04-30', portfolio: 127100, benchmark: 117300 }
  ];

  const timeframes = ['1W', '1M', '3M', '6M', '1Y', 'YTD'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground mb-2">
            {new Date(label).toLocaleDateString()}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-foreground">
                {entry.name}: ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Performance Comparison</h3>
        <div className="flex space-x-1">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeframe(tf)}
              className="px-3 py-1"
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="portfolio" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              name="Portfolio"
              dot={false}
              activeDot={{ r: 4, fill: "var(--color-primary)" }}
            />
            <Line 
              type="monotone" 
              dataKey="benchmark" 
              stroke="var(--color-muted-foreground)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="S&P 500"
              dot={false}
              activeDot={{ r: 4, fill: "var(--color-muted-foreground)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span className="text-sm text-foreground">Portfolio</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-1 bg-muted-foreground" />
          <span className="text-sm text-foreground">S&P 500 Benchmark</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;