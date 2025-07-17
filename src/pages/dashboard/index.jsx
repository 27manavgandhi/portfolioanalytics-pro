import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PortfolioSummaryCard from './components/PortfolioSummaryCard';
import AllocationChart from './components/AllocationChart';
import PerformanceChart from './components/PerformanceChart';
import HoldingsTable from './components/HoldingsTable';
import MarketNews from './components/MarketNews';
import QuickActions from './components/QuickActions';
import UpcomingEvents from './components/UpcomingEvents';
import RiskMetrics from './components/RiskMetrics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketStatus, setMarketStatus] = useState('open');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate market status
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 9 && hour < 16) {
      setMarketStatus('open');
    } else if (hour >= 16 && hour < 20) {
      setMarketStatus('after-hours');
    } else {
      setMarketStatus('closed');
    }

    return () => clearInterval(timer);
  }, []);

  const portfolioSummaryData = [
    {
      title: 'Total Portfolio Value',
      value: '$2,847,392',
      change: 34250,
      changePercent: 1.22,
      icon: 'Wallet',
      trend: 'TrendingUp'
    },
    {
      title: 'Daily P&L',
      value: '$34,250',
      change: 34250,
      changePercent: 1.22,
      icon: 'TrendingUp',
      trend: 'TrendingUp'
    },
    {
      title: 'Total Return',
      value: '18.4%',
      change: 2.1,
      changePercent: 2.1,
      icon: 'Target',
      trend: 'TrendingUp'
    },
    {
      title: 'Cash Available',
      value: '$156,890',
      change: -12500,
      changePercent: -7.4,
      icon: 'Banknote',
      trend: 'TrendingDown'
    }
  ];

  const getMarketStatusColor = () => {
    switch (marketStatus) {
      case 'open': return 'text-success';
      case 'after-hours': return 'text-warning';
      default: return 'text-error';
    }
  };

  const getMarketStatusText = () => {
    switch (marketStatus) {
      case 'open': return 'Market Open';
      case 'after-hours': return 'After Hours';
      default: return 'Market Closed';
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - PortfolioAnalytics Pro</title>
        <meta name="description" content="Portfolio management dashboard with real-time analytics, performance tracking, and risk management tools." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="container-dashboard py-8">
            <Breadcrumb />
            
            {/* Dashboard Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  Portfolio Dashboard
                </h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>Last updated: {currentTime.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${marketStatus === 'open' ? 'bg-success' : marketStatus === 'after-hours' ? 'bg-warning' : 'bg-error'}`} />
                    <span className={getMarketStatusColor()}>{getMarketStatusText()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button variant="outline" iconName="Download">
                  Export Data
                </Button>
                <Button variant="outline" iconName="Settings">
                  Customize
                </Button>
                <Button variant="default" iconName="RefreshCw">
                  Refresh
                </Button>
              </div>
            </div>

            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {portfolioSummaryData.map((data, index) => (
                <PortfolioSummaryCard
                  key={index}
                  title={data.title}
                  value={data.value}
                  change={data.change}
                  changePercent={data.changePercent}
                  icon={data.icon}
                  trend={data.trend}
                />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <AllocationChart />
              <PerformanceChart />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              {/* Holdings Table - Takes 2 columns on xl screens */}
              <div className="xl:col-span-2">
                <HoldingsTable />
              </div>
              
              {/* Right Sidebar */}
              <div className="space-y-6">
                <QuickActions />
                <UpcomingEvents />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RiskMetrics />
              <MarketNews />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;