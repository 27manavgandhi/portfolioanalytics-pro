import React, { useState, useEffect } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { useToast } from '../../../components/ui/Toast';

const MonteCarloSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [parameters, setParameters] = useState({
    initialValue: 1000000,
    expectedReturn: 8.5,
    volatility: 15.2,
    timeHorizon: 10,
    simulations: 10000,
    confidence: 95
  });
  const [results, setResults] = useState(null);
  const { toast } = useToast();

  // Mock simulation data
  const mockSimulationData = {
    paths: [
      { year: 0, p5: 1000000, p25: 1000000, p50: 1000000, p75: 1000000, p95: 1000000 },
      { year: 1, p5: 980000, p25: 1050000, p50: 1085000, p75: 1120000, p95: 1180000 },
      { year: 2, p5: 940000, p25: 1120000, p50: 1180000, p75: 1250000, p95: 1390000 },
      { year: 3, p5: 890000, p25: 1200000, p50: 1285000, p75: 1400000, p95: 1640000 },
      { year: 4, p5: 830000, p25: 1285000, p50: 1400000, p75: 1565000, p95: 1930000 },
      { year: 5, p5: 765000, p25: 1375000, p50: 1525000, p75: 1750000, p95: 2275000 },
      { year: 6, p5: 695000, p25: 1470000, p50: 1660000, p75: 1955000, p95: 2680000 },
      { year: 7, p5: 620000, p25: 1575000, p50: 1810000, p75: 2185000, p95: 3160000 },
      { year: 8, p5: 540000, p25: 1685000, p50: 1970000, p75: 2440000, p95: 3720000 },
      { year: 9, p5: 455000, p25: 1805000, p50: 2145000, p75: 2725000, p95: 4385000 },
      { year: 10, p5: 365000, p25: 1935000, p50: 2335000, p75: 3045000, p95: 5170000 }
    ],
    statistics: {
      finalValueP50: 2335000,
      finalValueP95: 5170000,
      finalValueP5: 365000,
      probabilityPositive: 84.8,
      probabilityTarget: 67.3,
      maxDrawdown: 45.2,
      sharpeRatio: 0.87,
      volatility: 18.4
    }
  };

  const runSimulation = async () => {
    if (!parameters.initialValue || !parameters.expectedReturn || !parameters.volatility) {
      toast.error('Please fill in all required parameters');
      return;
    }

    setIsRunning(true);
    setSimulationComplete(false);

    // Simulate computation time
    setTimeout(() => {
      setResults(mockSimulationData);
      setIsRunning(false);
      setSimulationComplete(true);
      toast.success('Monte Carlo simulation completed successfully');
    }, 3000);
  };

  const resetSimulation = () => {
    setResults(null);
    setSimulationComplete(false);
    setIsRunning(false);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground">Year {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {entry.name}: ${(entry.value / 1000).toFixed(0)}K
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Monte Carlo Simulation</h3>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetSimulation}
            disabled={isRunning || !simulationComplete}
          >
            Reset
          </Button>
          <Button 
            size="sm"
            onClick={runSimulation}
            loading={isRunning}
            loadingText="Running..."
          >
            Run Simulation
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Initial Portfolio Value ($)
            </label>
            <Input
              type="number"
              value={parameters.initialValue}
              onChange={(e) => setParameters(prev => ({...prev, initialValue: parseFloat(e.target.value) || 0}))}
              placeholder="1000000"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Expected Annual Return (%)
            </label>
            <Input
              type="number"
              value={parameters.expectedReturn}
              onChange={(e) => setParameters(prev => ({...prev, expectedReturn: parseFloat(e.target.value) || 0}))}
              placeholder="8.5"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Annual Volatility (%)
            </label>
            <Input
              type="number"
              value={parameters.volatility}
              onChange={(e) => setParameters(prev => ({...prev, volatility: parseFloat(e.target.value) || 0}))}
              placeholder="15.2"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Time Horizon (Years)
            </label>
            <Select
              value={parameters.timeHorizon.toString()}
              onChange={(value) => setParameters(prev => ({...prev, timeHorizon: parseInt(value)}))}
              options={[
                { value: '1', label: '1 Year' },
                { value: '5', label: '5 Years' },
                { value: '10', label: '10 Years' },
                { value: '15', label: '15 Years' },
                { value: '20', label: '20 Years' },
                { value: '30', label: '30 Years' }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Number of Simulations
            </label>
            <Select
              value={parameters.simulations.toString()}
              onChange={(value) => setParameters(prev => ({...prev, simulations: parseInt(value)}))}
              options={[
                { value: '1000', label: '1,000' },
                { value: '5000', label: '5,000' },
                { value: '10000', label: '10,000' },
                { value: '50000', label: '50,000' }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confidence Level (%)
            </label>
            <Select
              value={parameters.confidence.toString()}
              onChange={(value) => setParameters(prev => ({...prev, confidence: parseInt(value)}))}
              options={[
                { value: '90', label: '90%' },
                { value: '95', label: '95%' },
                { value: '99', label: '99%' }
              ]}
            />
          </div>
        </div>

        {/* Loading State */}
        {isRunning && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-sm text-muted-foreground">
              Running {parameters.simulations.toLocaleString()} simulations...
            </p>
            <div className="w-64 bg-muted rounded-full h-2 mt-4">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
            </div>
          </div>
        )}

        {/* Results */}
        {results && simulationComplete && (
          <div className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Median Value</div>
                <div className="text-xl font-bold text-foreground">
                  ${(results.statistics.finalValueP50 / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-muted-foreground">50th percentile</div>
              </div>

              <div className="bg-success/10 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Optimistic Scenario</div>
                <div className="text-xl font-bold text-success">
                  ${(results.statistics.finalValueP95 / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-muted-foreground">95th percentile</div>
              </div>

              <div className="bg-error/10 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Pessimistic Scenario</div>
                <div className="text-xl font-bold text-error">
                  ${(results.statistics.finalValueP5 / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-muted-foreground">5th percentile</div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Success Probability</div>
                <div className="text-xl font-bold text-primary">
                  {results.statistics.probabilityPositive}%
                </div>
                <div className="text-xs text-muted-foreground">Positive returns</div>
              </div>
            </div>

            {/* Chart */}
            <div className="h-80">
              <h4 className="text-lg font-medium text-foreground mb-4">Portfolio Value Projections</h4>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.paths}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Years', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    label={{ value: 'Portfolio Value ($)', angle: -90, position: 'insideLeft' }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Confidence bands */}
                  <Area 
                    type="monotone" 
                    dataKey="p95" 
                    stroke="none" 
                    fill="#10b981" 
                    fillOpacity={0.1} 
                    name="95th Percentile"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="p75" 
                    stroke="none" 
                    fill="#10b981" 
                    fillOpacity={0.2} 
                    name="75th Percentile"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="p25" 
                    stroke="none" 
                    fill="#f59e0b" 
                    fillOpacity={0.2} 
                    name="25th Percentile"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="p5" 
                    stroke="none" 
                    fill="#ef4444" 
                    fillOpacity={0.1} 
                    name="5th Percentile"
                  />
                  
                  {/* Median line */}
                  <Line 
                    type="monotone" 
                    dataKey="p50" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={false}
                    name="Median"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Additional Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{results.statistics.maxDrawdown}%</div>
                <div className="text-sm text-muted-foreground">Max Drawdown</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{results.statistics.sharpeRatio}</div>
                <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{results.statistics.volatility}%</div>
                <div className="text-sm text-muted-foreground">Portfolio Volatility</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{results.statistics.probabilityTarget}%</div>
                <div className="text-sm text-muted-foreground">Target Achievement</div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
                <div>
                  <h5 className="font-medium text-foreground mb-2">Key Insights</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• There is a {results.statistics.probabilityPositive}% probability of achieving positive returns over {parameters.timeHorizon} years</li>
                    <li>• The median portfolio value after {parameters.timeHorizon} years is ${(results.statistics.finalValueP50 / 1000000).toFixed(2)}M</li>
                    <li>• In 95% of scenarios, the portfolio value will be above ${(results.statistics.finalValueP5 / 1000000).toFixed(2)}M</li>
                    <li>• The worst-case scenario shows a maximum drawdown of {results.statistics.maxDrawdown}%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!results && !isRunning && (
          <div className="text-center py-12">
            <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">Monte Carlo Simulation</h4>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Configure your portfolio parameters and run a Monte Carlo simulation to explore potential future outcomes 
              and understand the range of possible returns.
            </p>
            <Button onClick={runSimulation} size="lg">
              Start Simulation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonteCarloSimulation;