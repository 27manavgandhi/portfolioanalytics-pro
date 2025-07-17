import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import ReportTemplateCard from './components/ReportTemplateCard';
import ScheduledReportItem from './components/ScheduledReportItem';
import ReportBuilder from './components/ReportBuilder';
import EmailComposer from './components/EmailComposer';
import ReportLibrary from './components/ReportLibrary';
import ActivityFeed from './components/ActivityFeed';
import DistributionList from './components/DistributionList';

const ReportsClientCommunication = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isReportBuilderOpen, setIsReportBuilderOpen] = useState(false);
  const [isEmailComposerOpen, setIsEmailComposerOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Mock data for report templates
  const reportTemplates = [
    {
      id: 1,
      name: 'Monthly Performance Summary',
      category: 'Performance Reports',
      type: 'performance',
      description: 'Comprehensive monthly portfolio performance analysis with key metrics, charts, and benchmark comparisons.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      generationTime: '2-3 min',
      downloads: 1247,
      rating: 5,
      reviews: 89,
      isPopular: true,
      isNew: false,
      lastUpdated: 'Dec 15, 2024',
      version: '2.1'
    },
    {
      id: 2,
      name: 'Risk Analysis Report',
      category: 'Risk Management',
      type: 'risk',
      description: 'Detailed risk assessment including VaR calculations, stress testing results, and risk-adjusted returns.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      generationTime: '3-4 min',
      downloads: 892,
      rating: 4,
      reviews: 67,
      isPopular: false,
      isNew: true,
      lastUpdated: 'Dec 10, 2024',
      version: '1.3'
    },
    {
      id: 3,
      name: 'Quarterly Review',
      category: 'Performance Reports',
      type: 'summary',
      description: 'Executive summary of quarterly performance with strategic insights and market outlook.',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      generationTime: '4-5 min',
      downloads: 2156,
      rating: 5,
      reviews: 134,
      isPopular: true,
      isNew: false,
      lastUpdated: 'Dec 8, 2024',
      version: '3.0'
    },
    {
      id: 4,
      name: 'Compliance Report',
      category: 'Regulatory',
      type: 'compliance',
      description: 'Regulatory compliance overview with adherence metrics and audit trail documentation.',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      generationTime: '1-2 min',
      downloads: 543,
      rating: 4,
      reviews: 23,
      isPopular: false,
      isNew: false,
      lastUpdated: 'Dec 5, 2024',
      version: '1.8'
    },
    {
      id: 5,
      name: 'Holdings Detail Report',
      category: 'Portfolio Analysis',
      type: 'detailed',
      description: 'Comprehensive breakdown of all portfolio holdings with sector allocation and performance attribution.',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      generationTime: '2-3 min',
      downloads: 756,
      rating: 4,
      reviews: 45,
      isPopular: false,
      isNew: true,
      lastUpdated: 'Dec 12, 2024',
      version: '2.0'
    },
    {
      id: 6,
      name: 'ESG Impact Report',
      category: 'Sustainability',
      type: 'performance',
      description: 'Environmental, Social, and Governance impact analysis with sustainability metrics and scoring.',
      thumbnail: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=300&fit=crop',
      generationTime: '3-4 min',
      downloads: 324,
      rating: 5,
      reviews: 18,
      isPopular: false,
      isNew: true,
      lastUpdated: 'Dec 14, 2024',
      version: '1.0'
    }
  ];

  // Mock data for scheduled reports
  const scheduledReports = [
    {
      id: 1,
      name: 'Monthly Performance Update',
      template: 'Monthly Performance Summary',
      frequency: 'monthly',
      nextRun: 'Jan 1, 2025 9:00 AM',
      recipients: 45,
      portfolio: 'Growth Portfolio A',
      status: 'active',
      lastSent: 'Dec 1, 2024'
    },
    {
      id: 2,
      name: 'Weekly Risk Summary',
      template: 'Risk Analysis Report',
      frequency: 'weekly',
      nextRun: 'Dec 23, 2024 8:00 AM',
      recipients: 12,
      portfolio: 'Conservative Fund B',
      status: 'active',
      lastSent: 'Dec 16, 2024'
    },
    {
      id: 3,
      name: 'Quarterly Board Report',
      template: 'Quarterly Review',
      frequency: 'quarterly',
      nextRun: 'Mar 31, 2025 10:00 AM',
      recipients: 8,
      portfolio: 'All Portfolios',
      status: 'paused',
      lastSent: 'Sep 30, 2024'
    }
  ];

  // Mock data for generated reports
  const generatedReports = [
    {
      id: 1,
      name: 'Growth Portfolio A - December 2024 Performance',
      type: 'performance',
      portfolio: 'Growth Portfolio A',
      createdAt: 'Dec 15, 2024',
      size: 2457600,
      downloads: 23,
      status: 'completed',
      description: 'Monthly performance analysis with benchmark comparison and risk metrics',
      version: '1.0',
      versions: ['1.0']
    },
    {
      id: 2,
      name: 'Risk Assessment - Q4 2024',
      type: 'risk',
      portfolio: 'Conservative Fund B',
      createdAt: 'Dec 10, 2024',
      size: 1843200,
      downloads: 15,
      status: 'completed',
      description: 'Quarterly risk analysis with VaR calculations and stress testing',
      version: '2.1',
      versions: ['1.0', '2.0', '2.1']
    },
    {
      id: 3,
      name: 'ESG Impact Report - November 2024',
      type: 'compliance',
      portfolio: 'ESG Focused E',
      createdAt: 'Dec 5, 2024',
      size: 3276800,
      downloads: 8,
      status: 'completed',
      description: 'Environmental, Social, and Governance impact assessment',
      version: '1.0',
      versions: ['1.0']
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'report_generated',
      user: 'John Doe',
      action: 'generated',
      target: 'Monthly Performance Summary',
      details: 'For Growth Portfolio A',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      portfolio: 'Growth Portfolio A',
      status: 'success'
    },
    {
      id: 2,
      type: 'email_sent',
      user: 'Sarah Wilson',
      action: 'sent email to',
      target: '12 clients',
      details: 'Weekly market update with performance highlights',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      portfolio: 'Conservative Fund B',
      status: 'success'
    },
    {
      id: 3,
      type: 'report_downloaded',
      user: 'Michael Chen',
      action: 'downloaded',
      target: 'Risk Analysis Report',
      details: 'Q4 2024 version',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      portfolio: 'Tech Innovation D',
      status: 'success'
    },
    {
      id: 4,
      type: 'schedule_created',
      user: 'Emily Rodriguez',
      action: 'created schedule for',
      target: 'Quarterly Review',
      details: 'Set to run every quarter at 10:00 AM',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      portfolio: 'All Portfolios',
      status: 'success'
    },
    {
      id: 5,
      type: 'report_failed',
      user: 'System',
      action: 'failed to generate',
      target: 'Compliance Report',
      details: 'Data source unavailable - retrying in 30 minutes',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      portfolio: 'Balanced Strategy C',
      status: 'failed'
    }
  ];

  // Mock data for distribution lists
  const distributionLists = [
    {
      id: 1,
      name: 'High Net Worth Clients',
      recipients: [
        { name: 'Robert Johnson', email: 'robert.johnson@email.com' },
        { name: 'Patricia Williams', email: 'patricia.williams@email.com' },
        { name: 'David Brown', email: 'david.brown@email.com' },
        { name: 'Jennifer Davis', email: 'jennifer.davis@email.com' },
        { name: 'Christopher Miller', email: 'christopher.miller@email.com' }
      ],
      createdAt: '2024-11-15T10:00:00Z'
    },
    {
      id: 2,
      name: 'Institutional Investors',
      recipients: [
        { name: 'Goldman Sachs', email: 'reports@goldmansachs.com' },
        { name: 'BlackRock Inc', email: 'client.reports@blackrock.com' },
        { name: 'Vanguard Group', email: 'institutional@vanguard.com' }
      ],
      createdAt: '2024-10-20T14:30:00Z'
    },
    {
      id: 3,
      name: 'Board Members',
      recipients: [
        { name: 'Chairman Smith', email: 'chairman@company.com' },
        { name: 'Director Jones', email: 'director.jones@company.com' },
        { name: 'CFO Anderson', email: 'cfo@company.com' }
      ],
      createdAt: '2024-09-10T09:15:00Z'
    }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Performance Reports', label: 'Performance Reports' },
    { value: 'Risk Management', label: 'Risk Management' },
    { value: 'Regulatory', label: 'Regulatory' },
    { value: 'Portfolio Analysis', label: 'Portfolio Analysis' },
    { value: 'Sustainability', label: 'Sustainability' }
  ];

  const tabs = [
    { id: 'templates', label: 'Templates', icon: 'FileText' },
    { id: 'scheduled', label: 'Scheduled', icon: 'Calendar' },
    { id: 'library', label: 'Library', icon: 'Archive' },
    { id: 'distribution', label: 'Distribution', icon: 'Users' }
  ];

  const filteredTemplates = reportTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setIsReportBuilderOpen(true);
  };

  const handleTemplatePreview = (template) => {
    console.log('Preview template:', template);
  };

  const handleTemplateCustomize = (template) => {
    setSelectedTemplate(template);
    setIsReportBuilderOpen(true);
  };

  const handleReportSave = (reportConfig) => {
    console.log('Save report:', reportConfig);
  };

  const handleEmailSend = (emailData) => {
    console.log('Send email:', emailData);
  };

  const handleScheduledReportEdit = (report) => {
    console.log('Edit scheduled report:', report);
  };

  const handleScheduledReportPause = (report) => {
    console.log('Pause/Resume scheduled report:', report);
  };

  const handleScheduledReportDelete = (report) => {
    console.log('Delete scheduled report:', report);
  };

  const handleScheduledReportHistory = (report) => {
    console.log('View history for scheduled report:', report);
  };

  const handleReportDownload = (report) => {
    console.log('Download report:', report);
  };

  const handleReportDelete = (report) => {
    console.log('Delete report:', report);
  };

  const handleReportDuplicate = (report) => {
    console.log('Duplicate report:', report);
  };

  const handleReportShare = (report) => {
    console.log('Share report:', report);
  };

  const handleCreateDistributionList = (listData) => {
    console.log('Create distribution list:', listData);
  };

  const handleEditDistributionList = (list) => {
    console.log('Edit distribution list:', list);
  };

  const handleDeleteDistributionList = (listId) => {
    console.log('Delete distribution list:', listId);
  };

  return (
    <>
      <Helmet>
        <title>Reports & Client Communication - PortfolioAnalytics Pro</title>
        <meta name="description" content="Generate professional reports and manage client communications with automated scheduling and distribution." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="container-dashboard py-8">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-foreground">Reports & Client Communication</h1>
                <p className="text-muted-foreground mt-2">
                  Generate professional reports and manage client communications
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsEmailComposerOpen(true)}
                  iconName="Mail"
                  iconPosition="left"
                >
                  Compose Email
                </Button>
                <Button
                  variant="default"
                  onClick={() => setIsReportBuilderOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Generate Report
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Reports Generated</p>
                    <p className="text-2xl font-semibold text-foreground">247</p>
                    <p className="text-xs text-success">+12% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={24} className="text-success" />
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Emails Sent</p>
                    <p className="text-2xl font-semibold text-foreground">1,432</p>
                    <p className="text-xs text-success">+8% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Schedules</p>
                    <p className="text-2xl font-semibold text-foreground">18</p>
                    <p className="text-xs text-muted-foreground">3 running today</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={24} className="text-accent" />
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Client Engagement</p>
                    <p className="text-2xl font-semibold text-foreground">94%</p>
                    <p className="text-xs text-success">+2% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-warning" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Navigation Tabs */}
                <div className="flex items-center space-x-1 mb-6 bg-muted/30 p-1 rounded-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Templates Tab */}
                {activeTab === 'templates' && (
                  <div className="space-y-6">
                    {/* Search and Filters */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search templates..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        className="w-64"
                      />
                    </div>

                    {/* Templates Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {filteredTemplates.map((template) => (
                        <ReportTemplateCard
                          key={template.id}
                          template={template}
                          onSelect={handleTemplateSelect}
                          onPreview={handleTemplatePreview}
                          onCustomize={handleTemplateCustomize}
                        />
                      ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                      <div className="text-center py-12">
                        <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search or category filter
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Scheduled Tab */}
                {activeTab === 'scheduled' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground">Scheduled Reports</h2>
                      <Button
                        variant="outline"
                        iconName="Plus"
                        iconPosition="left"
                      >
                        New Schedule
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {scheduledReports.map((report) => (
                        <ScheduledReportItem
                          key={report.id}
                          report={report}
                          onEdit={handleScheduledReportEdit}
                          onPause={handleScheduledReportPause}
                          onDelete={handleScheduledReportDelete}
                          onViewHistory={handleScheduledReportHistory}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Library Tab */}
                {activeTab === 'library' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground">Report Library</h2>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" iconName="Upload">
                          Import
                        </Button>
                        <Button variant="outline" size="sm" iconName="Download">
                          Export All
                        </Button>
                      </div>
                    </div>

                    <ReportLibrary
                      reports={generatedReports}
                      onDownload={handleReportDownload}
                      onDelete={handleReportDelete}
                      onDuplicate={handleReportDuplicate}
                      onShare={handleReportShare}
                    />
                  </div>
                )}

                {/* Distribution Tab */}
                {activeTab === 'distribution' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground">Distribution Management</h2>
                    </div>

                    <DistributionList
                      lists={distributionLists}
                      onCreateList={handleCreateDistributionList}
                      onEditList={handleEditDistributionList}
                      onDeleteList={handleDeleteDistributionList}
                    />
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <ActivityFeed activities={recentActivities} />
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <ReportBuilder
          isOpen={isReportBuilderOpen}
          onClose={() => {
            setIsReportBuilderOpen(false);
            setSelectedTemplate(null);
          }}
          template={selectedTemplate}
          onSave={handleReportSave}
        />

        <EmailComposer
          isOpen={isEmailComposerOpen}
          onClose={() => setIsEmailComposerOpen(false)}
          onSend={handleEmailSend}
        />
      </div>
    </>
  );
};

export default ReportsClientCommunication;