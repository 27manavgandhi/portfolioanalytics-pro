import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesSettings = () => {
  const [dashboardPreferences, setDashboardPreferences] = useState({
    defaultView: 'overview',
    refreshInterval: '30',
    showWelcomeMessage: true,
    compactMode: false,
    showTooltips: true
  });

  const [chartPreferences, setChartPreferences] = useState({
    defaultChartType: 'line',
    colorScheme: 'professional',
    showGridLines: true,
    animateCharts: true,
    defaultTimeframe: '1Y'
  });

  const [displayPreferences, setDisplayPreferences] = useState({
    theme: 'light',
    currency: 'USD',
    numberFormat: 'US',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'America/New_York'
  });

  const [dataPreferences, setDataPreferences] = useState({
    defaultPortfolio: 'growth-portfolio-a',
    showPercentages: true,
    showAbsoluteValues: true,
    roundingPrecision: '2',
    showBenchmarkComparison: true
  });

  const [isSaving, setIsSaving] = useState(false);

  const viewOptions = [
    { value: 'overview', label: 'Portfolio Overview' },
    { value: 'performance', label: 'Performance Dashboard' },
    { value: 'analytics', label: 'Analytics View' },
    { value: 'holdings', label: 'Holdings Summary' }
  ];

  const refreshOptions = [
    { value: '10', label: '10 seconds' },
    { value: '30', label: '30 seconds' },
    { value: '60', label: '1 minute' },
    { value: '300', label: '5 minutes' },
    { value: '600', label: '10 minutes' }
  ];

  const chartTypeOptions = [
    { value: 'line', label: 'Line Chart' },
    { value: 'candlestick', label: 'Candlestick Chart' },
    { value: 'area', label: 'Area Chart' },
    { value: 'bar', label: 'Bar Chart' }
  ];

  const colorSchemeOptions = [
    { value: 'professional', label: 'Professional Blue' },
    { value: 'classic', label: 'Classic Green/Red' },
    { value: 'modern', label: 'Modern Gradient' },
    { value: 'monochrome', label: 'Monochrome' }
  ];

  const timeframeOptions = [
    { value: '1D', label: '1 Day' },
    { value: '1W', label: '1 Week' },
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '6M', label: '6 Months' },
    { value: '1Y', label: '1 Year' },
    { value: '3Y', label: '3 Years' },
    { value: '5Y', label: '5 Years' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' }
  ];

  const numberFormatOptions = [
    { value: 'US', label: 'US Format (1,000.00)' },
    { value: 'EU', label: 'European Format (1.000,00)' },
    { value: 'IN', label: 'Indian Format (1,00,000.00)' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
    { value: 'DD MMM YYYY', label: 'DD MMM YYYY (Verbose)' }
  ];

  const timezoneOptions = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Zurich", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Hong_Kong", label: "Hong Kong Time (HKT)" }
  ];

  const portfolioOptions = [
    { value: 'growth-portfolio-a', label: 'Growth Portfolio A' },
    { value: 'conservative-fund-b', label: 'Conservative Fund B' },
    { value: 'balanced-strategy-c', label: 'Balanced Strategy C' },
    { value: 'tech-innovation-d', label: 'Tech Innovation D' },
    { value: 'esg-focused-e', label: 'ESG Focused E' }
  ];

  const precisionOptions = [
    { value: '0', label: 'Whole numbers (123)' },
    { value: '1', label: '1 decimal place (123.4)' },
    { value: '2', label: '2 decimal places (123.45)' },
    { value: '3', label: '3 decimal places (123.456)' },
    { value: '4', label: '4 decimal places (123.4567)' }
  ];

  const handleDashboardChange = (key, value) => {
    setDashboardPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleChartChange = (key, value) => {
    setChartPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDisplayChange = (key, value) => {
    setDisplayPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataChange = (key, value) => {
    setDataPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const resetToDefaults = () => {
    setDashboardPreferences({
      defaultView: 'overview',
      refreshInterval: '30',
      showWelcomeMessage: true,
      compactMode: false,
      showTooltips: true
    });
    setChartPreferences({
      defaultChartType: 'line',
      colorScheme: 'professional',
      showGridLines: true,
      animateCharts: true,
      defaultTimeframe: '1Y'
    });
    setDisplayPreferences({
      theme: 'light',
      currency: 'USD',
      numberFormat: 'US',
      dateFormat: 'MM/DD/YYYY',
      timezone: 'America/New_York'
    });
    setDataPreferences({
      defaultPortfolio: 'growth-portfolio-a',
      showPercentages: true,
      showAbsoluteValues: true,
      roundingPrecision: '2',
      showBenchmarkComparison: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Dashboard Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Default Dashboard View"
            options={viewOptions}
            value={dashboardPreferences.defaultView}
            onChange={(value) => handleDashboardChange('defaultView', value)}
            description="The view that loads when you open the dashboard"
          />
          
          <Select
            label="Auto-refresh Interval"
            options={refreshOptions}
            value={dashboardPreferences.refreshInterval}
            onChange={(value) => handleDashboardChange('refreshInterval', value)}
            description="How often to refresh portfolio data"
          />
        </div>
        
        <div className="mt-4 space-y-3">
          <Checkbox
            label="Show welcome message"
            description="Display welcome message on dashboard load"
            checked={dashboardPreferences.showWelcomeMessage}
            onChange={(e) => handleDashboardChange('showWelcomeMessage', e.target.checked)}
          />
          
          <Checkbox
            label="Compact mode"
            description="Use smaller cards and reduced spacing"
            checked={dashboardPreferences.compactMode}
            onChange={(e) => handleDashboardChange('compactMode', e.target.checked)}
          />
          
          <Checkbox
            label="Show tooltips"
            description="Display helpful tooltips on hover"
            checked={dashboardPreferences.showTooltips}
            onChange={(e) => handleDashboardChange('showTooltips', e.target.checked)}
          />
        </div>
      </div>

      {/* Chart Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Chart Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Default Chart Type"
            options={chartTypeOptions}
            value={chartPreferences.defaultChartType}
            onChange={(value) => handleChartChange('defaultChartType', value)}
            description="Default chart type for performance displays"
          />
          
          <Select
            label="Color Scheme"
            options={colorSchemeOptions}
            value={chartPreferences.colorScheme}
            onChange={(value) => handleChartChange('colorScheme', value)}
            description="Color scheme for charts and graphs"
          />
          
          <Select
            label="Default Timeframe"
            options={timeframeOptions}
            value={chartPreferences.defaultTimeframe}
            onChange={(value) => handleChartChange('defaultTimeframe', value)}
            description="Default time period for chart displays"
          />
        </div>
        
        <div className="mt-4 space-y-3">
          <Checkbox
            label="Show grid lines"
            description="Display grid lines on charts for easier reading"
            checked={chartPreferences.showGridLines}
            onChange={(e) => handleChartChange('showGridLines', e.target.checked)}
          />
          
          <Checkbox
            label="Animate charts"
            description="Enable smooth animations when charts load or update"
            checked={chartPreferences.animateCharts}
            onChange={(e) => handleChartChange('animateCharts', e.target.checked)}
          />
        </div>
      </div>

      {/* Display Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Display Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Theme"
            options={themeOptions}
            value={displayPreferences.theme}
            onChange={(value) => handleDisplayChange('theme', value)}
            description="Choose your preferred color theme"
          />
          
          <Select
            label="Primary Currency"
            options={currencyOptions}
            value={displayPreferences.currency}
            onChange={(value) => handleDisplayChange('currency', value)}
            description="Default currency for portfolio values"
          />
          
          <Select
            label="Number Format"
            options={numberFormatOptions}
            value={displayPreferences.numberFormat}
            onChange={(value) => handleDisplayChange('numberFormat', value)}
            description="How numbers are formatted and displayed"
          />
          
          <Select
            label="Date Format"
            options={dateFormatOptions}
            value={displayPreferences.dateFormat}
            onChange={(value) => handleDisplayChange('dateFormat', value)}
            description="How dates are formatted throughout the app"
          />
          
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={displayPreferences.timezone}
            onChange={(value) => handleDisplayChange('timezone', value)}
            description="Timezone for all date and time displays"
          />
        </div>
      </div>

      {/* Data Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Data Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Default Portfolio"
            options={portfolioOptions}
            value={dataPreferences.defaultPortfolio}
            onChange={(value) => handleDataChange('defaultPortfolio', value)}
            description="Portfolio to display by default"
          />
          
          <Select
            label="Number Precision"
            options={precisionOptions}
            value={dataPreferences.roundingPrecision}
            onChange={(value) => handleDataChange('roundingPrecision', value)}
            description="Decimal places for numerical displays"
          />
        </div>
        
        <div className="mt-4 space-y-3">
          <Checkbox
            label="Show percentages"
            description="Display percentage changes alongside absolute values"
            checked={dataPreferences.showPercentages}
            onChange={(e) => handleDataChange('showPercentages', e.target.checked)}
          />
          
          <Checkbox
            label="Show absolute values"
            description="Display absolute dollar amounts"
            checked={dataPreferences.showAbsoluteValues}
            onChange={(e) => handleDataChange('showAbsoluteValues', e.target.checked)}
          />
          
          <Checkbox
            label="Show benchmark comparison"
            description="Display benchmark comparison data by default"
            checked={dataPreferences.showBenchmarkComparison}
            onChange={(e) => handleDataChange('showBenchmarkComparison', e.target.checked)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={resetToDefaults}
        >
          Reset to Defaults
        </Button>
        
        <Button
          variant="default"
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          onClick={handleSavePreferences}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default PreferencesSettings;