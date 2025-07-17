import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PortfolioList from './components/PortfolioList';
import PortfolioHeader from './components/PortfolioHeader';
import HoldingsTable from './components/HoldingsTable';
import PortfolioSummary from './components/PortfolioSummary';
import CreatePortfolioModal from './components/CreatePortfolioModal';
import EditPositionModal from './components/EditPositionModal';

const PortfolioManagement = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditPositionModalOpen, setIsEditPositionModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [portfolios, setPortfolios] = useState([
    {
      id: 1,
      name: "Growth Portfolio A",
      manager: "John Doe",
      type: "growth",
      status: "Active",
      totalValue: "$125.4M",
      performance: "+12.4%",
      dayChange: "+1.2%",
      holdings: 45,
      sectors: 8,
      volatility: "14.2%",
      sharpeRatio: "1.85",
      beta: "1.12",
      alpha: "2.3%",
      maxDrawdown: "-8.5%",
      benchmarkComparison: "+3.2%",
      createdDate: "Jan 15, 2024",
      lastUpdated: "2 hours ago",
      assetAllocation: [
        { type: "Equities", percentage: 75, value: "$94.1M" },
        { type: "Bonds", percentage: 15, value: "$18.8M" },
        { type: "Cash", percentage: 5, value: "$6.3M" },
        { type: "Alternatives", percentage: 3, value: "$3.8M" },
        { type: "REITs", percentage: 2, value: "$2.5M" }
      ],
      topHoldings: [
        { symbol: "AAPL", name: "Apple Inc.", weight: 8.5, change: "+2.1%" },
        { symbol: "MSFT", name: "Microsoft Corp.", weight: 7.2, change: "+1.8%" },
        { symbol: "GOOGL", name: "Alphabet Inc.", weight: 6.8, change: "-0.5%" },
        { symbol: "AMZN", name: "Amazon.com Inc.", weight: 5.9, change: "+3.2%" },
        { symbol: "TSLA", name: "Tesla Inc.", weight: 4.3, change: "+5.7%" }
      ],
      recentTransactions: [
        { type: "buy", symbol: "NVDA", shares: "500", amount: "$45,250", date: "2 hours ago" },
        { type: "sell", symbol: "META", shares: "200", amount: "$38,400", date: "1 day ago" },
        { type: "dividend", symbol: "AAPL", shares: "1,000", amount: "$2,300", date: "3 days ago" }
      ],
      performance1d: "+1.2%",
      performance1w: "+3.8%",
      performance1m: "+8.5%"
    },
    {
      id: 2,
      name: "Conservative Fund B",
      manager: "Sarah Wilson",
      type: "conservative",
      status: "Active",
      totalValue: "$89.2M",
      performance: "+8.1%",
      dayChange: "+0.3%",
      holdings: 32,
      sectors: 6,
      volatility: "8.9%",
      sharpeRatio: "1.42",
      beta: "0.68",
      alpha: "1.8%",
      maxDrawdown: "-4.2%",
      benchmarkComparison: "+1.8%",
      createdDate: "Mar 22, 2024",
      lastUpdated: "4 hours ago",
      assetAllocation: [
        { type: "Bonds", percentage: 60, value: "$53.5M" },
        { type: "Equities", percentage: 25, value: "$22.3M" },
        { type: "Cash", percentage: 10, value: "$8.9M" },
        { type: "REITs", percentage: 3, value: "$2.7M" },
        { type: "Commodities", percentage: 2, value: "$1.8M" }
      ],
      topHoldings: [
        { symbol: "BND", name: "Vanguard Total Bond Market", weight: 15.2, change: "+0.1%" },
        { symbol: "VTI", name: "Vanguard Total Stock Market", weight: 12.8, change: "+0.8%" },
        { symbol: "SCHZ", name: "Schwab Intermediate-Term Treasury", weight: 10.5, change: "+0.2%" },
        { symbol: "VTEB", name: "Vanguard Tax-Exempt Bond", weight: 8.9, change: "+0.1%" },
        { symbol: "VNQ", name: "Vanguard Real Estate", weight: 6.7, change: "+1.2%" }
      ],
      recentTransactions: [
        { type: "buy", symbol: "BND", shares: "1,000", amount: "$78,500", date: "1 day ago" },
        { type: "dividend", symbol: "VTI", shares: "800", amount: "$1,920", date: "2 days ago" },
        { type: "rebalance", symbol: "Multiple", shares: "Various", amount: "$125,000", date: "1 week ago" }
      ],
      performance1d: "+0.3%",
      performance1w: "+1.2%",
      performance1m: "+2.8%"
    },
    {
      id: 3,
      name: "Balanced Strategy C",
      manager: "Michael Chen",
      type: "balanced",
      status: "Rebalancing",
      totalValue: "$156.8M",
      performance: "+10.7%",
      dayChange: "+0.8%",
      holdings: 58,
      sectors: 10,
      volatility: "11.5%",
      sharpeRatio: "1.63",
      beta: "0.89",
      alpha: "2.1%",
      maxDrawdown: "-6.8%",
      benchmarkComparison: "+2.5%",
      createdDate: "Feb 08, 2024",
      lastUpdated: "1 hour ago",
      assetAllocation: [
        { type: "Equities", percentage: 50, value: "$78.4M" },
        { type: "Bonds", percentage: 30, value: "$47.0M" },
        { type: "Cash", percentage: 10, value: "$15.7M" },
        { type: "Alternatives", percentage: 5, value: "$7.8M" },
        { type: "REITs", percentage: 5, value: "$7.8M" }
      ],
      topHoldings: [
        { symbol: "SPY", name: "SPDR S&P 500 ETF", weight: 12.5, change: "+1.1%" },
        { symbol: "AGG", name: "iShares Core US Aggregate Bond", weight: 10.8, change: "+0.3%" },
        { symbol: "QQQ", name: "Invesco QQQ Trust", weight: 9.2, change: "+1.8%" },
        { symbol: "IWM", name: "iShares Russell 2000", weight: 7.5, change: "+2.3%" },
        { symbol: "EFA", name: "iShares MSCI EAFE", weight: 6.8, change: "+0.9%" }
      ],
      recentTransactions: [
        { type: "rebalance", symbol: "Multiple", shares: "Various", amount: "$2.1M", date: "30 minutes ago" },
        { type: "buy", symbol: "VWO", shares: "2,500", amount: "$112,500", date: "2 hours ago" },
        { type: "sell", symbol: "GLD", shares: "300", amount: "$54,900", date: "4 hours ago" }
      ],
      performance1d: "+0.8%",
      performance1w: "+2.5%",
      performance1m: "+5.2%"
    }
  ]);

  const [holdings, setHoldings] = useState([
    {
      id: 1,
      symbol: "AAPL",
      name: "Apple Inc.",
      sector: "Technology",
      shares: 1000,
      avgCost: "$150.25",
      currentPrice: "$175.80",
      marketValue: "$175,800",
      unrealizedGainLoss: "+$25,550",
      unrealizedGainLossPercent: "+17.0%",
      dayChange: "+$2,340",
      dayChangePercent: "+1.35%"
    },
    {
      id: 2,
      symbol: "MSFT",
      name: "Microsoft Corporation",
      sector: "Technology",
      shares: 800,
      avgCost: "$280.50",
      currentPrice: "$295.20",
      marketValue: "$236,160",
      unrealizedGainLoss: "+$11,760",
      unrealizedGainLossPercent: "+5.2%",
      dayChange: "+$1,888",
      dayChangePercent: "+0.81%"
    },
    {
      id: 3,
      symbol: "GOOGL",
      name: "Alphabet Inc. Class A",
      sector: "Technology",
      shares: 500,
      avgCost: "$125.75",
      currentPrice: "$138.90",
      marketValue: "$69,450",
      unrealizedGainLoss: "+$6,575",
      unrealizedGainLossPercent: "+10.5%",
      dayChange: "-$347.50",
      dayChangePercent: "-0.50%"
    },
    {
      id: 4,
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      sector: "Consumer Discretionary",
      shares: 600,
      avgCost: "$145.30",
      currentPrice: "$152.75",
      marketValue: "$91,650",
      unrealizedGainLoss: "+$4,470",
      unrealizedGainLossPercent: "+5.1%",
      dayChange: "+$2,934",
      dayChangePercent: "+3.31%"
    },
    {
      id: 5,
      symbol: "TSLA",
      name: "Tesla Inc.",
      sector: "Consumer Discretionary",
      shares: 300,
      avgCost: "$220.80",
      currentPrice: "$245.60",
      marketValue: "$73,680",
      unrealizedGainLoss: "+$7,440",
      unrealizedGainLossPercent: "+11.2%",
      dayChange: "+$4,194",
      dayChangePercent: "+6.04%"
    },
    {
      id: 6,
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      sector: "Technology",
      shares: 400,
      avgCost: "$420.25",
      currentPrice: "$465.80",
      marketValue: "$186,320",
      unrealizedGainLoss: "+$18,220",
      unrealizedGainLossPercent: "+10.8%",
      dayChange: "+$7,452",
      dayChangePercent: "+4.17%"
    },
    {
      id: 7,
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      sector: "Financials",
      shares: 700,
      avgCost: "$145.60",
      currentPrice: "$158.90",
      marketValue: "$111,230",
      unrealizedGainLoss: "+$9,310",
      unrealizedGainLossPercent: "+9.1%",
      dayChange: "+$1,557",
      dayChangePercent: "+1.42%"
    },
    {
      id: 8,
      symbol: "JNJ",
      name: "Johnson & Johnson",
      sector: "Healthcare",
      shares: 900,
      avgCost: "$165.40",
      currentPrice: "$172.30",
      marketValue: "$155,070",
      unrealizedGainLoss: "+$6,210",
      unrealizedGainLossPercent: "+4.2%",
      dayChange: "+$1,242",
      dayChangePercent: "+0.81%"
    }
  ]);

  const handlePortfolioSelect = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  const handleCreatePortfolio = (portfolioData) => {
    setPortfolios(prev => [...prev, portfolioData]);
  };

  const handleEditPosition = (position) => {
    setEditingPosition(position);
    setIsEditPositionModalOpen(true);
  };

  const handleAddPosition = () => {
    setEditingPosition(null);
    setIsEditPositionModalOpen(true);
  };

  const handleSavePosition = (positionData) => {
    if (editingPosition) {
      // Update existing position
      setHoldings(prev => prev.map(h => h.id === positionData.id ? positionData : h));
    } else {
      // Add new position
      const newPosition = {
        ...positionData,
        id: Date.now(),
        unrealizedGainLoss: "$0",
        unrealizedGainLossPercent: "0.0%",
        dayChange: "$0",
        dayChangePercent: "0.0%"
      };
      setHoldings(prev => [...prev, newPosition]);
    }
  };

  const handleDeletePositions = (positionIds) => {
    setHoldings(prev => prev.filter(h => !positionIds.includes(h.id)));
  };

  const handleImportCSV = (file) => {
    // Mock CSV import functionality
    console.log('Importing CSV file:', file.name);
    // In a real application, you would parse the CSV and add positions
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'rebalance': console.log('Rebalancing portfolio...');
        break;
      case 'add-position':
        handleAddPosition();
        break;
      case 'generate-report': console.log('Generating report...');
        break;
      case 'export-data':
        console.log('Exporting data...');
        break;
      default:
        break;
    }
  };

  const handlePortfolioEdit = () => {
    console.log('Editing portfolio:', selectedPortfolio?.name);
  };

  const handlePortfolioRebalance = () => {
    console.log('Rebalancing portfolio:', selectedPortfolio?.name);
  };

  const handlePortfolioExport = () => {
    console.log('Exporting portfolio:', selectedPortfolio?.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container-dashboard py-6">
          <Breadcrumb />
          
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Left Panel - Portfolio List */}
            <div className="col-span-12 lg:col-span-3">
              <PortfolioList
                portfolios={portfolios}
                selectedPortfolio={selectedPortfolio}
                onPortfolioSelect={handlePortfolioSelect}
                onCreatePortfolio={() => setIsCreateModalOpen(true)}
              />
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-6 space-y-6 overflow-y-auto">
              <PortfolioHeader
                portfolio={selectedPortfolio}
                onEdit={handlePortfolioEdit}
                onRebalance={handlePortfolioRebalance}
                onExport={handlePortfolioExport}
              />

              {selectedPortfolio && (
                <HoldingsTable
                  holdings={holdings}
                  onAddPosition={handleAddPosition}
                  onEditPosition={handleEditPosition}
                  onDeletePositions={handleDeletePositions}
                  onImportCSV={handleImportCSV}
                />
              )}
            </div>

            {/* Right Panel - Portfolio Summary */}
            <div className="col-span-12 lg:col-span-3">
              <PortfolioSummary
                portfolio={selectedPortfolio}
                onQuickAction={handleQuickAction}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreatePortfolioModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePortfolio={handleCreatePortfolio}
      />

      <EditPositionModal
        isOpen={isEditPositionModalOpen}
        onClose={() => setIsEditPositionModalOpen(false)}
        onSavePosition={handleSavePosition}
        position={editingPosition}
      />
    </div>
  );
};

export default PortfolioManagement;