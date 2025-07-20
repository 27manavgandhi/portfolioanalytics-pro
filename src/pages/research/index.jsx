import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Icon from '../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Research = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedStock, setSelectedStock] = useState(null);

  const researchData = {
    marketOverview: {
      indices: [
        { name: 'S&P 500', value: '4,235.89', change: '+28.45', changePercent: '+0.68%' },
        { name: 'NASDAQ', value: '13,456.78', change: '+145.23', changePercent: '+1.09%' },
        { name: 'DOW', value: '33,875.24', change: '+89.67', changePercent: '+0.27%' },
        { name: 'VIX', value: '18.42', change: '-1.23', changePercent: '-6.25%' }
      ],
      sectors: [
        { name: 'Technology', performance: '+2.3%', color: 'text-success' },
        { name: 'Healthcare', performance: '+1.8%', color: 'text-success' },
        { name: 'Financial', performance: '+1.2%', color: 'text-success' },
        { name: 'Energy', performance: '-0.8%', color: 'text-error' },
        { name: 'Consumer', performance: '+0.5%', color: 'text-success' },
        { name: 'Industrial', performance: '-0.3%', color: 'text-error' }
      ]
    },
    topMovers: {
      gainers: [
        { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$465.80', change: '+8.7%' },
        { symbol: 'TSLA', name: 'Tesla Inc', price: '$245.60', change: '+6.2%' },
        { symbol: 'AMZN', name: 'Amazon.com', price: '$152.75', change: '+4.8%' },
        { symbol: 'GOOGL', name: 'Alphabet Inc', price: '$138.90', change: '+3.2%' }
      ],
      losers: [
        { symbol: 'META', name: 'Meta Platforms', price: '$312.78', change: '-2.4%' },
        { symbol: 'NFLX', name: 'Netflix Inc', price: '$425.30', change: '-1.8%' },
        { symbol: 'PYPL', name: 'PayPal Holdings', price: '$78.45', change: '-1.5%' },
        { symbol: 'UBER', name: 'Uber Technologies', price: '$45.20', change: '-1.2%' }
      ]
    },
    analystRecommendations: [
      { 
        symbol: 'AAPL', 
        name: 'Apple Inc.', 
        rating: 'Buy', 
        targetPrice: '$195.00', 
        analyst: 'Goldman Sachs',
        date: '2025-01-20'
      },
      { 
        symbol: 'MSFT', 
        name: 'Microsoft Corp.', 
        rating: 'Strong Buy', 
        targetPrice: '$450.00', 
        analyst: 'Morgan Stanley',
        date: '2025-01-19'
      },
      { 
        symbol: 'GOOGL', 
        name: 'Alphabet Inc.', 
        rating: 'Buy', 
        targetPrice: '$160.00', 
        analyst: 'JPMorgan',
        date: '2025-01-18'
      }
    ]
  };

  const mockChartData = [
    { date: '2025-01-15', price: 180.25 },
    { date: '2025-01-16', price: 182.45 },
    { date: '2025-01-17', price: 179.80 },
    { date: '2025-01-18', price: 185.30 },
    { date: '2025-01-19', price: 183.70 },
    { date: '2025-01-20', price: 185.42 }
  ];

  const volumeData = [
    { date: '2025-01-15', volume: 45000000 },
    { date: '2025-01-16', volume: 52000000 },
    { date: '2025-01-17', volume: 38000000 },
    { date: '2025-01-18', volume: 61000000 },
    { date: '2025-01-19', volume: 48000000 },
    { date: '2025-01-20', volume: 55000000 }
  ];

  const tabs = [
    { id: 'overview', label: 'Market Overview', icon: 'BarChart3' },
    { id: 'movers', label: 'Top Movers', icon: 'TrendingUp' },
    { id: 'analysis', label: 'Stock Analysis', icon: 'Search' },
    { id: 'recommendations', label: 'Analyst Reports', icon: 'FileText' }
  ];

  const handleStockSearch = (symbol) => {
    // Mock stock data
    const stockData = {
      symbol: symbol.toUpperCase(),
      name: 'Company Name',
      price: 185.42,
      change: 2.34,
      changePercent: 1.28,
      marketCap: '2.85T',
      pe: 28.5,
      eps: 6.50,
      dividend: '0.92',
      volume: '55.2M'
    };
    setSelectedStock(stockData);
  };

  return (
    <>
      <Helmet>
        <title>Market Research - PortfolioAnalytics Pro</title>
        <meta name="description" content="Comprehensive market research with real-time data, analyst recommendations, and stock analysis tools." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="container-dashboard py-8">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">Market Research</h1>
                <p className="text-muted-foreground">
                  Real-time market data, analysis, and investment research
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button variant="outline" iconName="Bell">
                  Set Alerts
                </Button>
                <Button variant="outline" iconName="Download">
                  Export Report
                </Button>
                <Button variant="default" iconName="RefreshCw">
                  Refresh Data
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                    selectedTab === tab.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {/* Market Overview Tab */}
              {selectedTab === 'overview' && (
                <div className="space-y-8">
                  {/* Market Indices */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="TrendingUp" size={20} className="text-primary" />
                        <span>Major Indices</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {researchData.marketOverview.indices.map((index) => (
                          <div key={index.name} className="bg-muted/30 rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-2">{index.name}</h4>
                            <div className="text-2xl font-bold text-foreground">{index.value}</div>
                            <div className={`text-sm ${index.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
                              {index.change} ({index.changePercent})
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sector Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="PieChart" size={20} className="text-primary" />
                        <span>Sector Performance</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {researchData.marketOverview.sectors.map((sector) => (
                          <div key={sector.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <span className="font-medium text-foreground">{sector.name}</span>
                            <span className={`font-bold ${sector.color}`}>{sector.performance}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>S&P 500 - 5 Day Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={mockChartData}>
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Top Movers Tab */}
              {selectedTab === 'movers' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Gainers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-success">
                        <Icon name="ArrowUp" size={20} />
                        <span>Top Gainers</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {researchData.topMovers.gainers.map((stock) => (
                          <div key={stock.symbol} className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                            <div>
                              <div className="font-bold text-foreground">{stock.symbol}</div>
                              <div className="text-sm text-muted-foreground">{stock.name}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-foreground">{stock.price}</div>
                              <div className="text-sm font-medium text-success">{stock.change}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Losers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-error">
                        <Icon name="ArrowDown" size={20} />
                        <span>Top Losers</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {researchData.topMovers.losers.map((stock) => (
                          <div key={stock.symbol} className="flex items-center justify-between p-3 bg-error/5 rounded-lg">
                            <div>
                              <div className="font-bold text-foreground">{stock.symbol}</div>
                              <div className="text-sm text-muted-foreground">{stock.name}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-foreground">{stock.price}</div>
                              <div className="text-sm font-medium text-error">{stock.change}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Stock Analysis Tab */}
              {selectedTab === 'analysis' && (
                <div className="space-y-8">
                  {/* Search Bar */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Input
                            type="text"
                            placeholder="Enter stock symbol (e.g., AAPL)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            iconName="Search"
                          />
                        </div>
                        <Button 
                          onClick={() => handleStockSearch(searchTerm)}
                          disabled={!searchTerm}
                        >
                          Analyze
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stock Analysis Results */}
                  {selectedStock && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Stock Info */}
                      <Card>
                        <CardHeader>
                          <CardTitle>{selectedStock.symbol}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="text-3xl font-bold text-foreground">${selectedStock.price}</div>
                              <div className={`text-sm ${selectedStock.change >= 0 ? 'text-success' : 'text-error'}`}>
                                {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change} ({selectedStock.changePercent}%)
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Market Cap:</span>
                                <span className="text-foreground">{selectedStock.marketCap}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">P/E Ratio:</span>
                                <span className="text-foreground">{selectedStock.pe}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">EPS:</span>
                                <span className="text-foreground">${selectedStock.eps}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Dividend:</span>
                                <span className="text-foreground">${selectedStock.dividend}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Volume:</span>
                                <span className="text-foreground">{selectedStock.volume}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Price Chart */}
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Price Chart</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64 mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={mockChartData}>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                          
                          {/* Volume Chart */}
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={volumeData}>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="volume" fill="#3b82f6" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}

              {/* Analyst Recommendations Tab */}
              {selectedTab === 'recommendations' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="FileText" size={20} className="text-primary" />
                      <span>Latest Analyst Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {researchData.analystRecommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-bold text-foreground">{rec.symbol}</span>
                              <span className="text-sm text-muted-foreground ml-2">{rec.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">{rec.date}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className={`px-2 py-1 rounded-sm text-xs font-medium ${
                                rec.rating === 'Strong Buy' ? 'bg-success text-success-foreground' :
                                rec.rating === 'Buy' ? 'bg-success/70 text-success-foreground' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {rec.rating}
                              </span>
                              <span className="text-sm text-muted-foreground ml-2">by {rec.analyst}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Target: </span>
                              <span className="font-bold text-foreground">{rec.targetPrice}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Research;