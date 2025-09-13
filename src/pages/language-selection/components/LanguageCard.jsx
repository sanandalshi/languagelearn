import React from 'react';
import Icon from '../../../components/AppIcon';


const LanguageCard = ({ 
  language, 
  isSelected, 
  onSelect, 
  showDetails = true 
}) => {
  const handleCardClick = () => {
    onSelect(language);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-hover ${
        isSelected
          ? 'border-primary bg-primary/10 shadow-card'
          : 'border-border bg-card hover:border-primary/50'
      }`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={16} color="white" />
        </div>
      )}
      {/* Flag and Language Name */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-4xl">{language?.flag}</div>
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            {language?.name}
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            {language?.nativeName}
          </p>
        </div>
      </div>
      {showDetails && (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm font-medium text-foreground">
                {language?.learners}
              </div>
              <div className="text-xs text-muted-foreground">Learners</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm font-medium text-foreground">
                {language?.timeToFluency}
              </div>
              <div className="text-xs text-muted-foreground">To Fluency</div>
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Difficulty:</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5]?.map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= language?.difficulty
                      ? 'bg-accent' :'bg-muted'
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">
                {language?.difficultyLabel}
              </span>
            </div>
          </div>

          {/* Available Levels */}
          <div className="flex flex-wrap gap-1 mb-4">
            {language?.availableLevels?.map((level) => (
              <span
                key={level}
                className="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded-full font-medium"
              >
                {level}
              </span>
            ))}
          </div>
        </>
      )}
      {/* Popular Badge */}
      {language?.isPopular && (
        <div className="absolute top-3 left-3 px-2 py-1 bg-success text-white text-xs font-medium rounded-full">
          Popular
        </div>
      )}
    </div>
  );
};

export default LanguageCard;