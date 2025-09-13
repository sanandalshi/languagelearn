import React from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyStats = ({ 
  weeklyData = [],
  totalMinutes = 180,
  lessonsCompleted = 12,
  averageScore = 85
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxMinutes = Math.max(...weeklyData?.map(day => day?.minutes), 60);

  const getCurrentDayIndex = () => {
    const today = new Date();
    return (today?.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
  };

  const currentDayIndex = getCurrentDayIndex();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          This Week's Activity
        </h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      {/* Weekly Chart */}
      <div className="mb-6">
        <div className="flex items-end justify-between space-x-2 h-32">
          {days?.map((day, index) => {
            const dayData = weeklyData?.[index] || { minutes: 0, completed: false };
            const height = maxMinutes > 0 ? (dayData?.minutes / maxMinutes) * 100 : 0;
            const isToday = index === currentDayIndex;
            
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-24 mb-2">
                  <div 
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      dayData?.minutes > 0 
                        ? isToday 
                          ? 'bg-primary' :'bg-primary/70' :'bg-muted'
                    }`}
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                </div>
                <span className={`text-xs font-medium ${
                  isToday ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {day}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {dayData?.minutes}m
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{totalMinutes}</div>
          <div className="text-xs text-muted-foreground">Total Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{lessonsCompleted}</div>
          <div className="text-xs text-muted-foreground">Lessons Done</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{averageScore}%</div>
          <div className="text-xs text-muted-foreground">Avg Score</div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStats;