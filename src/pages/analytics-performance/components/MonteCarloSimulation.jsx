import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MonteCarloSimulation = () => {
  const [simulationParams, setSimulationParams] = useState({
    timeHorizon: '10',
    simulations: '1000',
    initialValue: '1000000',
    expectedReturn: '8.5',
    volatility: '15.2'
  });
  
  const [isRunning, setIsRunning] = useState(false);

  const simulationResults = [
    { year: 0, p10: 1000000, p25: 1000000, p50: 1000000, p75: 1000000, p90: 1000000 },
    { year: 1, p10: 920000, p25: 980000, p50: 1085000, p75: 1190000, p90: 1280000 },
    { year: 2, p10: 850000, p25: 960000, p50: 1175000, p75: 1410000, p90: 1640000 },
    { year: 3, p10: 780000, p25: 940000, p50: 1275000, p75: 1680000, p90: 2100000 },
    { year: 4, p10: 720000, p25: 920000, p50: 1385000, p75: 2000000, p90: 2690000 },
    { year: 5, p10: 660000, p25: 900000, p50: 1500000, p75: 2380000, p90: 3450000 },
    { year: 6, p10: 610000, p25: 880000, p50: 1630000, p75: 2830000, p90: 4420000 },
    { year: 7, p10: 560000, p25: 860000, p50: 1770000, p75: 3370000, p90: 5670000 },
    { year: 8, p10: 520000, p25: 840000, p50: 1920000, p75: 4010000, p90: 7270000 },
    { year: 9, p10: 480000, p25: 820000, p50: 2085000, p75: 4770000, p90: 9320000 },
    { year: 10, p10: 440000, p25: 800000, p50: 2265000, p75: 5670000, p90: 11950000 }
  ];

  const probabilityOutcomes = [
    { scenario: 'Loss (< $1M)', probability: 15.2, color: 'text-error' },
    { scenario: 'Modest Growth ($1M - $1.5M)', probability: 23.8, color: 'text-warning' },
    { scenario: 'Good Growth ($1.5M - $3M)', probability: 35.4, color: 'text-primary' },
    { scenario: 'Strong Growth ($3M - $5M)', probability: 18.6, color: 'text-success' },
    { scenario: 'Exceptional Growth (> $5M)', probability: 7.0, color: 'text-success' }
  ];

  const handleInputChange = (field, value) => {
    setSimulationParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const runSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const formatTooltip = (value, name) => {
    const labels = {
      p10: '10th Percentile',
      p25: '25th Percentile',
      p50: 'Median (50th)',
      p75: '75th Percentile',
      p90: '90th Percentile'
    };
    return [formatCurrency(value), labels[name] || name];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Monte Carlo Simulation</h2>
          <p className="text-sm text-muted-foreground">Portfolio value projections based on historical volatility</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <Button
            variant="default"
            onClick={runSimulation}
            loading={isRunning}
            iconName="Play"
            iconSize={16}
          >
            Run Simulation
          </Button>
          <Button variant="outline" size="sm" iconName="Download" iconSize={16}>
            Export Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simulationResults} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="year" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `Year ${value}`}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  formatter={formatTooltip}
                  labelFormatter={(label) => `Year ${label}`}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="p90" 
                  stroke="var(--color-success)" 
                  fill="var(--color-success)"
                  fillOpacity={0.1}
                  strokeWidth={1}
                />
                <Area 
                  type="monotone" 
                  dataKey="p75" 
                  stroke="var(--color-primary)" 
                  fill="var(--color-primary)"
                  fillOpacity={0.1}
                  strokeWidth={1}
                />
                <Line 
                  type="monotone" 
                  dataKey="p50" 
                  stroke="var(--color-foreground)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-foreground)', strokeWidth: 2, r: 4 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="p25" 
                  stroke="var(--color-warning)" 
                  fill="var(--color-warning)"
                  fillOpacity={0.1}
                  strokeWidth={1}
                />
                <Area 
                  type="monotone" 
                  dataKey="p10" 
                  stroke="var(--color-error)" 
                  fill="var(--color-error)"
                  fillOpacity={0.1}
                  strokeWidth={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium text-sm text-foreground mb-3">Simulation Parameters</h3>
            <div className="space-y-3">
              <Input
                label="Time Horizon (Years)"
                type="number"
                value={simulationParams.timeHorizon}
                onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
                className="text-sm"
              />
              <Input
                label="Number of Simulations"
                type="number"
                value={simulationParams.simulations}
                onChange={(e) => handleInputChange('simulations', e.target.value)}
                className="text-sm"
              />
              <Input
                label="Initial Value ($)"
                type="number"
                value={simulationParams.initialValue}
                onChange={(e) => handleInputChange('initialValue', e.target.value)}
                className="text-sm"
              />
              <Input
                label="Expected Return (%)"
                type="number"
                step="0.1"
                value={simulationParams.expectedReturn}
                onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                className="text-sm"
              />
              <Input
                label="Volatility (%)"
                type="number"
                step="0.1"
                value={simulationParams.volatility}
                onChange={(e) => handleInputChange('volatility', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-foreground mb-4">Probability Outcomes (10-Year Horizon)</h3>
          <div className="space-y-3">
            {probabilityOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium text-sm text-foreground">{outcome.scenario}</div>
                  <div className="w-full bg-border rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${outcome.probability}%` }}
                    ></div>
                  </div>
                </div>
                <div className={`font-semibold text-sm ${outcome.color}`}>
                  {outcome.probability}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-foreground mb-4">Key Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Median Outcome</span>
              </div>
              <div className="text-2xl font-bold text-foreground">$2.27M</div>
              <p className="text-xs text-muted-foreground">50% probability of achieving</p>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-foreground">84.8%</div>
              <p className="text-xs text-muted-foreground">Probability of positive returns</p>
            </div>
            
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">Worst Case</span>
              </div>
              <div className="text-2xl font-bold text-foreground">$440K</div>
              <p className="text-xs text-muted-foreground">10th percentile outcome</p>
            </div>
            
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Star" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Best Case</span>
              </div>
              <div className="text-2xl font-bold text-foreground">$11.95M</div>
              <p className="text-xs text-muted-foreground">90th percentile outcome</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonteCarloSimulation;