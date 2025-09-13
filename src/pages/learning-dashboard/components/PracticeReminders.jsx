import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PracticeReminders = ({ reminders = [], onReviewClick }) => {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  if (reminders?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Practice Reminders
          </h3>
          <Icon name="Clock" size={20} className="text-muted-foreground" />
        </div>
        <div className="text-center py-6">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <p className="text-muted-foreground font-body">
            All caught up! No pending reviews.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Practice Reminders
        </h3>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={20} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{reminders?.length}</span>
        </div>
      </div>
      <div className="space-y-3">
        {reminders?.slice(0, 4)?.map((reminder) => (
          <div 
            key={reminder?.id}
            className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${getPriorityColor(reminder?.priority)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground truncate">
                  {reminder?.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {reminder?.type} • Due {formatTimeAgo(reminder?.dueDate)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-muted rounded-md">
                    {reminder?.wordsCount} words
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ~{reminder?.estimatedTime} min
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReviewClick?.(reminder)}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Review
              </Button>
            </div>
          </div>
        ))}
      </div>
      {reminders?.length > 4 && (
        <div className="mt-4 text-center">
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
            View All Reminders ({reminders?.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticeReminders;