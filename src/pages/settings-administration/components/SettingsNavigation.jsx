import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsNavigation = ({ activeSection, onSectionChange }) => {
  const navigationItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and credentials'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password, MFA, and session management'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Email, SMS, and alert preferences'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      description: 'Dashboard, charts, and display settings'
    },
    {
      id: 'admin',
      label: 'Administration',
      icon: 'Users',
      description: 'User management and system settings'
    }
  ];

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
            activeSection === item.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Icon name={item.icon} size={20} />
          <div>
            <p className="font-medium">{item.label}</p>
            <p className={`text-xs ${
              activeSection === item.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
            }`}>
              {item.description}
            </p>
          </div>
        </button>
      ))}
    </nav>
  );
};

export default SettingsNavigation;