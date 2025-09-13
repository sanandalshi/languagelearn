import React, { useState, useEffect } from 'react';
import Button from './Button';


const LessonNavigationControls = ({ 
  lessonData = {},
  currentStep = 1,
  totalSteps = 10,
  onNext,
  onPrevious,
  onComplete,
  onExit,
  audioUrl = null,
  isExerciseMode = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioUrl) {
      const audioElement = new Audio(audioUrl);
      audioElement?.addEventListener('ended', () => setIsPlaying(false));
      audioElement?.addEventListener('timeupdate', () => {
        if (audioElement?.duration) {
          setProgress((audioElement?.currentTime / audioElement?.duration) * 100);
        }
      });
      setAudio(audioElement);

      return () => {
        audioElement?.pause();
        audioElement?.removeEventListener('ended', () => setIsPlaying(false));
        audioElement?.removeEventListener('timeupdate', () => {});
      };
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
    } else {
      audio?.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentStep === totalSteps) {
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

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="sticky top-[76px] z-[900] bg-card border-b border-border shadow-sm">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Exit and Progress */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Exit
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">
                {currentStep} of {totalSteps}
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>

          {/* Center Section - Audio Controls */}
          {audioUrl && (
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                iconName={isPlaying ? 'Pause' : 'Play'}
                iconPosition="left"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              {/* Audio Progress */}
              <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Right Section - Navigation */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={handleNext}
              iconName={currentStep === totalSteps ? 'Check' : 'ChevronRight'}
              iconPosition="right"
            >
              {currentStep === totalSteps ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Exercise Mode Controls */}
        {isExerciseMode && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Lightbulb"
                  iconPosition="left"
                >
                  Hint
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Volume2"
                  iconPosition="left"
                >
                  Repeat
                </Button>
                
                <Button
                  variant="success"
                  size="sm"
                  iconName="Send"
                  iconPosition="right"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonNavigationControls;