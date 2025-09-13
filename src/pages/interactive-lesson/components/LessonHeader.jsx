import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonHeader = ({ 
  lessonTitle = "Spanish Basics",
  lessonType = "Vocabulary",
  currentStep = 1,
  totalSteps = 10,
  onExit,
  onBookmark,
  isBookmarked = false
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-card border-b border-border shadow-sm">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Exit and Lesson Info */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="hidden sm:inline">Exit</span>
            </Button>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                {lessonTitle}
              </h1>
              <span className="text-sm text-accent font-medium bg-accent/10 px-2 py-1 rounded-md">
                {lessonType}
              </span>
            </div>
          </div>

          {/* Right Section - Progress and Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">
                {currentStep} of {totalSteps}
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onBookmark}
              className={isBookmarked ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}
            >
              <Icon name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Progress Info */}
        <div className="sm:hidden mt-2 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;