import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AnalyticsFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: 'custom',
    startDate: '2024-01-01',
    endDate: '2024-07-17',
    benchmark: 'sp500',
    portfolios: ['growth-a'],
    metrics: ['returns', 'risk', 'alpha'],
    currency: 'USD',
    frequency: 'daily'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const benchmarkOptions = [
    { value: 'sp500', label: 'S&P 500' },
    { value: 'nasdaq', label: 'NASDAQ Composite' },
    { value: 'russell2000', label: 'Russell 2000' },
    { value: 'msci-world', label: 'MSCI World' },
    { value: 'custom', label: 'Custom Benchmark' }
  ];

  const portfolioOptions = [
    { value: 'growth-a', label: 'Growth Portfolio A' },
    { value: 'conservative-b', label: 'Conservative Fund B' },
    { value: 'balanced-c', label: 'Balanced Strategy C' },
    { value: 'tech-d', label: 'Tech Innovation D' },
    { value: 'esg-e', label: 'ESG Focused E' }
  ];

  const dateRangeOptions = [
    { value: '1M', label: 'Last Month' },
    { value: '3M', label: 'Last 3 Months' },
    { value: '6M', label: 'Last 6 Months' },
    { value: '1Y', label: 'Last Year' },
    { value: '3Y', label: 'Last 3 Years' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const metricOptions = [
    { id: 'returns', label: 'Returns Analysis', description: 'Total return, annualized return' },
    { id: 'risk', label: 'Risk Metrics', description: 'VaR, volatility, drawdown' },
    { id: 'alpha', label: 'Alpha & Beta', description: 'Risk-adjusted performance' },
    { id: 'sharpe', label: 'Sharpe Ratio', description: 'Risk-adjusted return ratio' },
    { id: 'correlation', label: 'Correlation', description: 'Asset correlation analysis' },
    { id: 'attribution', label: 'Performance Attribution', description: 'Sector and asset contribution' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleMetricToggle = (metricId) => {
    const newMetrics = filters.metrics.includes(metricId)
      ? filters.metrics.filter(m => m !== metricId)
      : [...filters.metrics, metricId];
    handleFilterChange('metrics', newMetrics);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '1Y',
      startDate: '',
      endDate: '',
      benchmark: 'sp500',
      portfolios: ['growth-a'],
      metrics: ['returns', 'risk', 'alpha'],
      currency: 'USD',
      frequency: 'daily'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-primary" />
          <h3 className="font-medium text-foreground">Analysis Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            iconName="RotateCcw"
            iconSize={14}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={14}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
          
          {filters.dateRange === 'custom' && (
            <>
              <Input
                label="Start Date"
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </>
          )}
        </div>

        {/* Benchmark and Portfolio Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Benchmark"
            options={benchmarkOptions}
            value={filters.benchmark}
            onChange={(value) => handleFilterChange('benchmark', value)}
          />
          
          <Select
            label="Portfolios"
            options={portfolioOptions}
            value={filters.portfolios}
            onChange={(value) => handleFilterChange('portfolios', value)}
            multiple
            searchable
          />
        </div>

        {isExpanded && (
          <>
            {/* Currency and Frequency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Currency"
                options={currencyOptions}
                value={filters.currency}
                onChange={(value) => handleFilterChange('currency', value)}
              />
              
              <Select
                label="Data Frequency"
                options={frequencyOptions}
                value={filters.frequency}
                onChange={(value) => handleFilterChange('frequency', value)}
              />
            </div>

            {/* Metrics Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Analysis Metrics
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {metricOptions.map((metric) => (
                  <div key={metric.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={filters.metrics.includes(metric.id)}
                      onChange={() => handleMetricToggle(metric.id)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium text-sm text-foreground">{metric.label}</div>
                      <div className="text-xs text-muted-foreground">{metric.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">Quick filters:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            handleFilterChange('dateRange', '1M');
            handleFilterChange('metrics', ['returns', 'risk']);
          }}
        >
          Monthly Review
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            handleFilterChange('dateRange', '1Y');
            handleFilterChange('metrics', ['returns', 'risk', 'alpha', 'sharpe']);
          }}
        >
          Annual Analysis
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            handleFilterChange('metrics', ['correlation', 'attribution']);
          }}
        >
          Risk Analysis
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsFilters;