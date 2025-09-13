import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressCard = ({ 
  currentStreak = 7, 
  dailyGoal = 30, 
  completedToday = 25, 
  overallProficiency = 68,
  nextMilestone = "Intermediate Level"
}) => {
  const dailyProgress = (completedToday / dailyGoal) * 100;
  
  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold">Your Progress</h2>
          <p className="text-white/80 font-body">Keep up the great work!</p>
        </div>
        <div className="bg-white/20 rounded-full p-3">
          <Icon name="Trophy" size={32} color="white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Streak */}
        <div className="text-center">
          <div className="bg-white/20 rounded-lg p-4 mb-2">
            <Icon name="Flame" size={24} color="white" className="mx-auto mb-2" />
            <div className="text-3xl font-bold">{currentStreak}</div>
            <div className="text-sm text-white/80">Day Streak</div>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="text-center">
          <div className="bg-white/20 rounded-lg p-4 mb-2">
            <Icon name="Target" size={24} color="white" className="mx-auto mb-2" />
            <div className="text-3xl font-bold">{completedToday}/{dailyGoal}</div>
            <div className="text-sm text-white/80">Minutes Today</div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${Math.min(dailyProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Overall Proficiency */}
        <div className="text-center">
          <div className="bg-white/20 rounded-lg p-4 mb-2">
            <Icon name="Award" size={24} color="white" className="mx-auto mb-2" />
            <div className="text-3xl font-bold">{overallProficiency}%</div>
            <div className="text-sm text-white/80">Proficiency</div>
          </div>
          <div className="text-xs text-white/70">Next: {nextMilestone}</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;