import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState('Growth Portfolio A');
  
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const portfolioRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Portfolios', path: '/portfolio-management', icon: 'Briefcase' },
    { label: 'Analytics', path: '/analytics-performance', icon: 'TrendingUp' },
    { label: 'Reports', path: '/reports-client-communication', icon: 'FileText' },
    { label: 'Settings', path: '/settings-administration', icon: 'Settings' }
  ];

  const portfolios = [
    { id: 1, name: 'Growth Portfolio A', value: '$125.4M', performance: '+12.4%' },
    { id: 2, name: 'Conservative Fund B', value: '$89.2M', performance: '+8.1%' },
    { id: 3, name: 'Balanced Strategy C', value: '$156.8M', performance: '+10.7%' },
    { id: 4, name: 'Tech Innovation D', value: '$78.9M', performance: '+18.2%' },
    { id: 5, name: 'ESG Focused E', value: '$92.3M', performance: '+9.8%' }
  ];

  const notifications = [
    { id: 1, type: 'alert', title: 'Risk Threshold Exceeded', message: 'Growth Portfolio A volatility above 15%', time: '2 min ago', unread: true },
    { id: 2, type: 'info', title: 'Market Update', message: 'S&P 500 up 1.2% in pre-market trading', time: '15 min ago', unread: true },
    { id: 3, type: 'success', title: 'Rebalancing Complete', message: 'Conservative Fund B successfully rebalanced', time: '1 hour ago', unread: false },
    { id: 4, type: 'warning', title: 'Compliance Review', message: 'Monthly compliance report due tomorrow', time: '3 hours ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (portfolioRef.current && !portfolioRef.current.contains(event.target)) {
        setIsPortfolioOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePortfolioSelect = (portfolio) => {
    setSelectedPortfolio(portfolio.name);
    setIsPortfolioOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertCircle';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'alert': return 'text-error';
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      default: return 'text-primary';
    }
  };

  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">PortfolioAnalytics</span>
              <span className="text-xs text-muted-foreground font-medium">PRO</span>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <Icon name={item.icon} size={16} className="mr-2" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Portfolio Selector */}
          <div className="relative" ref={portfolioRef}>
            <Button
              variant="outline"
              onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
              className="hidden md:flex items-center space-x-2 min-w-48"
            >
              <Icon name="Briefcase" size={16} />
              <span className="truncate">{selectedPortfolio}</span>
              <Icon name="ChevronDown" size={14} />
            </Button>

            {isPortfolioOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevated z-1010">
                <div className="p-3 border-b border-border">
                  <h3 className="font-medium text-sm text-foreground">Select Portfolio</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {portfolios.map((portfolio) => (
                    <button
                      key={portfolio.id}
                      onClick={() => handlePortfolioSelect(portfolio)}
                      className="w-full px-3 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-sm text-foreground">{portfolio.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">AUM: {portfolio.value}</div>
                        </div>
                        <div className={`text-xs font-medium ${portfolio.performance.startsWith('+') ? 'text-success' : 'text-error'}`}>
                          {portfolio.performance}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-lg shadow-elevated z-1015">
                <div className="p-4 border-b border-border">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-foreground">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors ${notification.unread ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={getNotificationIcon(notification.type)} 
                          size={16} 
                          className={`mt-0.5 ${getNotificationColor(notification.type)}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm text-foreground">{notification.title}</p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" fullWidth>
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">JD</span>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-foreground">John Doe</div>
                <div className="text-xs text-muted-foreground">Portfolio Manager</div>
              </div>
              <Icon name="ChevronDown" size={14} />
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated z-1010">
                <div className="p-3 border-b border-border">
                  <div className="font-medium text-sm text-foreground">John Doe</div>
                  <div className="text-xs text-muted-foreground">john.doe@company.com</div>
                  <div className="text-xs text-muted-foreground">Portfolio Manager</div>
                </div>
                <div className="py-2">
                  <Link
                    to="/settings-administration"
                    className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Icon name="Settings" size={16} className="mr-3" />
                    Settings
                  </Link>
                  <Link
                    to="/settings-administration"
                    className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/settings-administration"
                    className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </Link>
                </div>
                <div className="border-t border-border py-2">
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;