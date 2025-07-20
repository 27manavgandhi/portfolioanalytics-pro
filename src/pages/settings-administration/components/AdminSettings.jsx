import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdminSettings = () => {
  const [selectedTab, setSelectedTab] = useState('users');
  const [isLoading, setIsLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'analyst',
    department: 'Investment Management'
  });

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Portfolio Manager",
      department: "Investment Management",
      status: "active",
      lastLogin: "2024-07-17 14:30",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Senior Analyst",
      department: "Research",
      status: "active",
      lastLogin: "2024-07-17 13:45",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9b6c0e5?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@company.com",
      role: "Risk Manager",
      department: "Risk Management",
      status: "inactive",
      lastLogin: "2024-07-15 16:20",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "Compliance Officer",
      department: "Compliance",
      status: "active",
      lastLogin: "2024-07-17 15:10",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-07-17 15:30:45",
      user: "John Doe",
      action: "Portfolio Created",
      details: "Created new portfolio \'Tech Growth Fund'",
      ipAddress: "192.168.1.100",
      severity: "info"
    },
    {
      id: 2,
      timestamp: "2024-07-17 15:25:12",
      user: "Sarah Johnson",
      action: "User Login",
      details: "Successful login from Chrome browser",
      ipAddress: "192.168.1.101",
      severity: "info"
    },
    {
      id: 3,
      timestamp: "2024-07-17 15:20:33",
      user: "System",
      action: "Security Alert",
      details: "Failed login attempt detected",
      ipAddress: "203.0.113.45",
      severity: "warning"
    },
    {
      id: 4,
      timestamp: "2024-07-17 15:15:22",
      user: "Emily Rodriguez",
      action: "Permission Changed",
      details: "Updated user permissions for Michael Chen",
      ipAddress: "192.168.1.102",
      severity: "high"
    },
    {
      id: 5,
      timestamp: "2024-07-17 15:10:11",
      user: "John Doe",
      action: "Data Export",
      details: "Exported portfolio performance report",
      ipAddress: "192.168.1.100",
      severity: "info"
    }
  ];

  const systemMetrics = [
    { label: "Active Users", value: "24", change: "+2", trend: "up" },
    { label: "Total Portfolios", value: "156", change: "+8", trend: "up" },
    { label: "System Uptime", value: "99.9%", change: "0.0%", trend: "stable" },
    { label: "API Calls Today", value: "12,847", change: "+1,234", trend: "up" },
    { label: "Storage Used", value: "2.4 TB", change: "+120 GB", trend: "up" },
    { label: "Database Size", value: "1.8 TB", change: "+89 GB", trend: "up" }
  ];

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'portfolio_manager', label: 'Portfolio Manager' },
    { value: 'analyst', label: 'Senior Analyst' },
    { value: 'risk_manager', label: 'Risk Manager' },
    { value: 'compliance', label: 'Compliance Officer' },
    { value: 'client', label: 'Client' }
  ];

  const departmentOptions = [
    { value: 'Investment Management', label: 'Investment Management' },
    { value: 'Risk Management', label: 'Risk Management' },
    { value: 'Research', label: 'Research' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Compliance', label: 'Compliance' },
    { value: 'Client Relations', label: 'Client Relations' }
  ];

  const handleAddUser = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setNewUserData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'analyst',
      department: 'Investment Management'
    });
  };

  const handleUserAction = (userId, action) => {
    console.log(`${action} user:`, userId);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10';
      case 'warning': return 'bg-warning/10';
      case 'info': return 'bg-primary/10';
      default: return 'bg-muted/10';
    }
  };

  const tabs = [
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'permissions', label: 'Permissions', icon: 'Shield' },
    { id: 'audit', label: 'Audit Logs', icon: 'FileText' },
    { id: 'system', label: 'System Monitor', icon: 'Activity' }
  ];

  return (
    <div className="space-y-6">
      {/* Admin Tabs */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* User Management Tab */}
        {selectedTab === 'users' && (
          <div className="space-y-6">
            {/* Add New User */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-4">Add New User</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  label="First Name"
                  value={newUserData.firstName}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                />
                <Input
                  label="Last Name"
                  value={newUserData.lastName}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
                <Select
                  label="Role"
                  options={roleOptions}
                  value={newUserData.role}
                  onChange={(value) => setNewUserData(prev => ({ ...prev, role: value }))}
                />
                <Select
                  label="Department"
                  options={departmentOptions}
                  value={newUserData.department}
                  onChange={(value) => setNewUserData(prev => ({ ...prev, department: value }))}
                />
                <div className="flex items-end">
                  <Button
                    variant="default"
                    loading={isLoading}
                    iconName="UserPlus"
                    iconPosition="left"
                    onClick={handleAddUser}
                    fullWidth
                  >
                    Add User
                  </Button>
                </div>
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Existing Users</h4>
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-foreground">{user.name}</p>
                        <span className={user.status === 'active' ? 'status-positive' : 'status-neutral'}>
                          {user.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.role} • {user.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right mr-4">
                      <p className="text-xs text-muted-foreground">Last login</p>
                      <p className="text-xs text-foreground">{user.lastLogin}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUserAction(user.id, 'edit')}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUserAction(user.id, 'delete')}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {selectedTab === 'permissions' && (
          <div className="space-y-6">
            <h4 className="font-medium text-foreground">Role-Based Access Control</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {roleOptions.map((role) => (
                <div key={role.value} className="bg-muted/30 rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-3">{role.label}</h5>
                  <div className="space-y-2">
                    <Checkbox label="View Portfolios" checked />
                    <Checkbox label="Create Portfolios" checked={role.value !== 'client'} />
                    <Checkbox label="Edit Portfolios" checked={['admin', 'portfolio_manager'].includes(role.value)} />
                    <Checkbox label="Delete Portfolios" checked={role.value === 'admin'} />
                    <Checkbox label="View Reports" checked />
                    <Checkbox label="Generate Reports" checked={role.value !== 'client'} />
                    <Checkbox label="User Management" checked={role.value === 'admin'} />
                    <Checkbox label="System Settings" checked={role.value === 'admin'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {selectedTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-foreground">Audit Logs</h4>
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Logs
              </Button>
            </div>
            
            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${getSeverityBg(log.severity)}`}>
                      <div className={`w-full h-full rounded-full ${getSeverityColor(log.severity)} opacity-60`}></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-foreground text-sm">{log.action}</p>
                        <span className={`text-xs px-2 py-1 rounded ${getSeverityBg(log.severity)} ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.user} • {log.timestamp} • {log.ipAddress}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Monitor Tab */}
        {selectedTab === 'system' && (
          <div className="space-y-6">
            <h4 className="font-medium text-foreground">System Metrics</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={metric.trend === 'up' ? 'TrendingUp' : metric.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                        size={16} 
                        className={metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-error' : 'text-muted-foreground'} 
                      />
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-error' : 'text-muted-foreground'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-3">System Health</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Database Connection</span>
                  <span className="status-positive">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">API Services</span>
                  <span className="status-positive">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Background Jobs</span>
                  <span className="status-positive">Running</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Cache System</span>
                  <span className="status-positive">Optimal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Security Monitoring</span>
                  <span className="status-positive">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;