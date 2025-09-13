import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonCard = ({ 
  lesson,
  onStartLesson,
  onContinueLesson 
}) => {
  const {
    id,
    title,
    type,
    duration,
    difficulty,
    progress = 0,
    isCompleted = false,
    isLocked = false,
    description,
    skillsToLearn = []
  } = lesson;

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (lessonType) => {
    switch (lessonType) {
      case 'vocabulary': return 'BookOpen';
      case 'grammar': return 'FileText';
      case 'listening': return 'Headphones';
      case 'speaking': return 'Mic';
      case 'reading': return 'Eye';
      case 'writing': return 'PenTool';
      default: return 'Play';
    }
  };

  const handleAction = () => {
    if (progress > 0 && !isCompleted) {
      onContinueLesson?.(lesson);
    } else {
      onStartLesson?.(lesson);
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 transition-all duration-200 hover:shadow-hover hover:scale-102 ${
      isLocked ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isCompleted ? 'bg-success/20' : 'bg-primary/20'}`}>
            <Icon 
              name={isCompleted ? 'CheckCircle' : getTypeIcon(type)} 
              size={20} 
              color={isCompleted ? 'var(--color-success)' : 'var(--color-primary)'} 
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
              <span className="text-sm text-muted-foreground">{duration} min</span>
            </div>
          </div>
        </div>
        
        {isLocked && (
          <Icon name="Lock" size={20} className="text-muted-foreground" />
        )}
      </div>
      <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2">
        {description}
      </p>
      {skillsToLearn?.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {skillsToLearn?.slice(0, 3)?.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
            {skillsToLearn?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{skillsToLearn?.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      {/* Progress Bar */}
      {progress > 0 && !isCompleted && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <Button
        variant={isCompleted ? "outline" : "default"}
        size="sm"
        fullWidth
        onClick={handleAction}
        disabled={isLocked}
        iconName={isCompleted ? "RotateCcw" : (progress > 0 ? "Play" : "ArrowRight")}
        iconPosition="right"
      >
        {isCompleted ? 'Review' : (progress > 0 ? 'Continue' : 'Start Lesson')}
      </Button>
    </div>
  );
};

export default LessonCard;