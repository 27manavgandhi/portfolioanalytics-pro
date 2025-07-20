import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useToast } from '../../../components/ui/Toast';

const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const actions = [
    {
      id: 1,
      title: 'Add Transaction',
      description: 'Record buy/sell orders',
      icon: 'Plus',
      color: 'bg-primary/10 text-primary',
      action: () => navigate('/transactions')
    },
    {
      id: 2,
      title: 'Generate Report',
      description: 'Create performance report',
      icon: 'FileText',
      color: 'bg-success/10 text-success',
      action: () => navigate('/reports-client-communication')
    },
    {
      id: 3,
      title: 'Rebalance Portfolio',
      description: 'Optimize asset allocation',
      icon: 'RotateCcw',
      color: 'bg-warning/10 text-warning',
      action: () => {
        toast.info('Rebalancing analysis started', { 
          title: 'Portfolio Rebalancing',
          duration: 3000 
        });
      }
    },
    {
      id: 4,
      title: 'Risk Analysis',
      description: 'Run risk assessment',
      icon: 'Shield',
      color: 'bg-error/10 text-error',
      action: () => navigate('/analytics-performance')
    },
    {
      id: 5,
      title: 'Market Research',
      description: 'View market insights',
      icon: 'TrendingUp',
      color: 'bg-accent/10 text-accent',
      action: () => navigate('/research')
    },
    {
      id: 6,
      title: 'Schedule Meeting',
      description: 'Plan client review',
      icon: 'Calendar',
      color: 'bg-secondary/10 text-secondary',
      action: () => navigate('/calendar')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            onClick={action.action}
            className="w-full justify-start p-4 h-auto hover:bg-muted/50"
          >
            <div className="flex items-center space-x-4 w-full">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                <Icon name={action.icon} size={18} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-foreground">
                  {action.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {action.description}
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;