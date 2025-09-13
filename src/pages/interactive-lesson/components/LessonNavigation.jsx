import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LessonNavigation = ({ 
  currentStep = 1,
  totalSteps = 10,
  onNext,
  onPrevious,
  onSkip,
  onComplete,
  canProceed = false,
  showFeedback = false,
  isLastStep = false
}) => {
  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
    } else {
      onNext?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      onPrevious?.();
    }
  };

  return (
    <div className="sticky bottom-0 bg-card border-t border-border shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Previous Button */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="default"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
              className="min-w-[100px]"
            >
              Previous
            </Button>

            {!showFeedback && (
              <Button
                variant="ghost"
                size="default"
                onClick={onSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                Skip
              </Button>
            )}
          </div>

          {/* Center Section - Step Indicator (Mobile Hidden) */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalSteps, 5) }, (_, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                
                return (
                  <div
                    key={stepNumber}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary scale-125' 
                        : isCompleted 
                        ? 'bg-success' :'bg-muted'
                    }`}
                  />
                );
              })}
              {totalSteps > 5 && (
                <span className="text-xs text-muted-foreground ml-2">
                  +{totalSteps - 5} more
                </span>
              )}
            </div>
          </div>

          {/* Right Section - Next/Complete Button */}
          <div className="flex items-center space-x-3">
            {showFeedback && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Review complete</span>
              </div>
            )}

            <Button
              variant="default"
              size="default"
              onClick={handleNext}
              disabled={!canProceed && !showFeedback}
              iconName={isLastStep ? 'Check' : 'ChevronRight'}
              iconPosition="right"
              className="min-w-[120px]"
            >
              {isLastStep ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="sm:hidden mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-foreground font-medium">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonNavigation;