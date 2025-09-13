import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements = [] }) => {
  const recentAchievements = achievements?.slice(0, 4);

  const getBadgeColor = (type) => {
    switch (type) {
      case 'streak': return 'from-orange-400 to-red-500';
      case 'completion': return 'from-green-400 to-emerald-500';
      case 'score': return 'from-blue-400 to-indigo-500';
      case 'milestone': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'streak': return 'Flame';
      case 'completion': return 'CheckCircle';
      case 'score': return 'Star';
      case 'milestone': return 'Trophy';
      default: return 'Award';
    }
  };

  if (achievements?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Recent Achievements
          </h3>
          <Icon name="Award" size={20} className="text-muted-foreground" />
        </div>
        <div className="text-center py-8">
          <Icon name="Trophy" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-body">
            Complete lessons to earn your first achievement!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Recent Achievements
        </h3>
        <div className="flex items-center space-x-1">
          <Icon name="Award" size={20} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{achievements?.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {recentAchievements?.map((achievement) => (
          <div 
            key={achievement?.id}
            className="relative group cursor-pointer"
          >
            <div className={`bg-gradient-to-br ${getBadgeColor(achievement?.type)} rounded-lg p-4 text-white transition-transform duration-200 group-hover:scale-105`}>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-2">
                  <Icon 
                    name={getBadgeIcon(achievement?.type)} 
                    size={20} 
                    color="white" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {achievement?.title}
                  </h4>
                  <p className="text-xs text-white/80 truncate">
                    {achievement?.description}
                  </p>
                </div>
              </div>
              
              {achievement?.isNew && (
                <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                  New!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {achievements?.length > 4 && (
        <div className="mt-4 text-center">
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
            View All Achievements ({achievements?.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;