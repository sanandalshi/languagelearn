import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      description: 'Practice new words',
      icon: 'BookOpen',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      id: 'grammar',
      title: 'Grammar',
      description: 'Learn language rules',
      icon: 'FileText',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      id: 'speaking',
      title: 'Speaking',
      description: 'Improve pronunciation',
      icon: 'Mic',
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    },
    {
      id: 'listening',
      title: 'Listening',
      description: 'Train your ear',
      icon: 'Headphones',
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-6">
        Quick Practice
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            size="lg"
            onClick={() => onActionClick?.(action?.id)}
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-200"
            iconName={action?.icon}
          >
            <div className="text-center">
              <div className="font-medium text-sm">{action?.title}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {action?.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;