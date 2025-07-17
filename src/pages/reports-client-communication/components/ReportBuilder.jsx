import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportBuilder = ({ isOpen, onClose, template, onSave }) => {
  const [reportConfig, setReportConfig] = useState({
    name: template?.name || '',
    portfolio: 'growth-portfolio-a',
    dateRange: 'last-month',
    customStartDate: '',
    customEndDate: '',
    includePerformance: true,
    includeRisk: true,
    includeHoldings: true,
    includeTransactions: false,
    includeBenchmark: true,
    logoUrl: '',
    colorScheme: 'default',
    headerText: '',
    footerText: '',
    clientMessage: ''
  });

  const portfolioOptions = [
    { value: 'growth-portfolio-a', label: 'Growth Portfolio A' },
    { value: 'conservative-fund-b', label: 'Conservative Fund B' },
    { value: 'balanced-strategy-c', label: 'Balanced Strategy C' },
    { value: 'tech-innovation-d', label: 'Tech Innovation D' },
    { value: 'esg-focused-e', label: 'ESG Focused E' }
  ];

  const dateRangeOptions = [
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const colorSchemeOptions = [
    { value: 'default', label: 'Default Blue' },
    { value: 'professional', label: 'Professional Gray' },
    { value: 'modern', label: 'Modern Green' },
    { value: 'corporate', label: 'Corporate Navy' }
  ];

  const handleInputChange = (field, value) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(reportConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Report Builder</h2>
            <p className="text-sm text-muted-foreground">Customize your report template</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-140px)]">
          {/* Configuration Panel */}
          <div className="w-1/2 p-6 border-r border-border overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Settings */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Basic Settings</h3>
                <div className="space-y-4">
                  <Input
                    label="Report Name"
                    value={reportConfig.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter report name"
                  />
                  
                  <Select
                    label="Portfolio"
                    options={portfolioOptions}
                    value={reportConfig.portfolio}
                    onChange={(value) => handleInputChange('portfolio', value)}
                  />
                  
                  <Select
                    label="Date Range"
                    options={dateRangeOptions}
                    value={reportConfig.dateRange}
                    onChange={(value) => handleInputChange('dateRange', value)}
                  />
                  
                  {reportConfig.dateRange === 'custom' && (
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start Date"
                        type="date"
                        value={reportConfig.customStartDate}
                        onChange={(e) => handleInputChange('customStartDate', e.target.value)}
                      />
                      <Input
                        label="End Date"
                        type="date"
                        value={reportConfig.customEndDate}
                        onChange={(e) => handleInputChange('customEndDate', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Content Sections */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Content Sections</h3>
                <div className="space-y-3">
                  {[
                    { key: 'includePerformance', label: 'Performance Summary', icon: 'TrendingUp' },
                    { key: 'includeRisk', label: 'Risk Analysis', icon: 'Shield' },
                    { key: 'includeHoldings', label: 'Holdings Breakdown', icon: 'PieChart' },
                    { key: 'includeTransactions', label: 'Transaction History', icon: 'ArrowRightLeft' },
                    { key: 'includeBenchmark', label: 'Benchmark Comparison', icon: 'BarChart3' }
                  ].map((section) => (
                    <div key={section.key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={section.key}
                        checked={reportConfig[section.key]}
                        onChange={(e) => handleInputChange(section.key, e.target.checked)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <Icon name={section.icon} size={16} className="text-muted-foreground" />
                      <label htmlFor={section.key} className="text-sm text-foreground">
                        {section.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branding */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Branding</h3>
                <div className="space-y-4">
                  <Input
                    label="Logo URL"
                    value={reportConfig.logoUrl}
                    onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  
                  <Select
                    label="Color Scheme"
                    options={colorSchemeOptions}
                    value={reportConfig.colorScheme}
                    onChange={(value) => handleInputChange('colorScheme', value)}
                  />
                  
                  <Input
                    label="Header Text"
                    value={reportConfig.headerText}
                    onChange={(e) => handleInputChange('headerText', e.target.value)}
                    placeholder="Custom header text"
                  />
                  
                  <Input
                    label="Footer Text"
                    value={reportConfig.footerText}
                    onChange={(e) => handleInputChange('footerText', e.target.value)}
                    placeholder="Custom footer text"
                  />
                </div>
              </div>

              {/* Client Message */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Client Message</h3>
                <textarea
                  value={reportConfig.clientMessage}
                  onChange={(e) => handleInputChange('clientMessage', e.target.value)}
                  placeholder="Add a personalized message for your clients..."
                  className="w-full h-24 px-3 py-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-1/2 p-6 bg-muted/30">
            <div className="h-full flex flex-col">
              <h3 className="font-medium text-foreground mb-4">Preview</h3>
              <div className="flex-1 bg-white rounded-lg border border-border p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center border-b border-border pb-4">
                    {reportConfig.logoUrl && (
                      <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-3"></div>
                    )}
                    <h1 className="text-xl font-semibold text-foreground">{reportConfig.name || 'Report Name'}</h1>
                    <p className="text-sm text-muted-foreground">Portfolio Performance Report</p>
                    {reportConfig.headerText && (
                      <p className="text-sm text-muted-foreground mt-2">{reportConfig.headerText}</p>
                    )}
                  </div>

                  {/* Content Sections Preview */}
                  <div className="space-y-4">
                    {reportConfig.includePerformance && (
                      <div className="border border-border rounded-lg p-4">
                        <h3 className="font-medium text-foreground mb-2">Performance Summary</h3>
                        <div className="h-32 bg-muted rounded flex items-center justify-center">
                          <Icon name="TrendingUp" size={32} className="text-muted-foreground" />
                        </div>
                      </div>
                    )}

                    {reportConfig.includeRisk && (
                      <div className="border border-border rounded-lg p-4">
                        <h3 className="font-medium text-foreground mb-2">Risk Analysis</h3>
                        <div className="h-24 bg-muted rounded flex items-center justify-center">
                          <Icon name="Shield" size={24} className="text-muted-foreground" />
                        </div>
                      </div>
                    )}

                    {reportConfig.includeHoldings && (
                      <div className="border border-border rounded-lg p-4">
                        <h3 className="font-medium text-foreground mb-2">Holdings Breakdown</h3>
                        <div className="h-24 bg-muted rounded flex items-center justify-center">
                          <Icon name="PieChart" size={24} className="text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Client Message */}
                  {reportConfig.clientMessage && (
                    <div className="border border-border rounded-lg p-4 bg-primary/5">
                      <h3 className="font-medium text-foreground mb-2">Message from Your Portfolio Manager</h3>
                      <p className="text-sm text-muted-foreground">{reportConfig.clientMessage}</p>
                    </div>
                  )}

                  {/* Footer */}
                  {reportConfig.footerText && (
                    <div className="text-center border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground">{reportConfig.footerText}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;