import React from 'react';
import Icon from '../../../components/AppIcon';
import LanguageCard from './LanguageCard';

const RecommendedLanguages = ({ 
  recommendedLanguages, 
  selectedLanguage, 
  onLanguageSelect,
  userProfile 
}) => {
  if (!recommendedLanguages || recommendedLanguages?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Sparkles" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Recommended for You
          </h2>
          <p className="text-sm text-muted-foreground font-body">
            Based on your profile and learning goals
          </p>
        </div>
      </div>
      {/* Recommendation Reasons */}
      <div className="mb-6 space-y-2">
        {userProfile?.nativeLanguage && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Globe" size={16} />
            <span>Native {userProfile?.nativeLanguage} speaker</span>
          </div>
        )}
        {userProfile?.learningGoals && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Target" size={16} />
            <span>Goal: {userProfile?.learningGoals}</span>
          </div>
        )}
        {userProfile?.timeCommitment && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>{userProfile?.timeCommitment} minutes daily</span>
          </div>
        )}
      </div>
      {/* Recommended Languages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedLanguages?.map((language) => (
          <div key={language?.code} className="relative">
            <LanguageCard
              language={language}
              isSelected={selectedLanguage?.code === language?.code}
              onSelect={onLanguageSelect}
              showDetails={false}
            />
            
            {/* Recommendation Badge */}
            <div className="absolute -top-2 -right-2 px-2 py-1 bg-accent text-white text-xs font-medium rounded-full shadow-sm">
              {language?.recommendationReason}
            </div>
          </div>
        ))}
      </div>
      {/* Why These Languages */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="text-sm font-heading font-medium text-foreground mb-2">
          Why these languages?
        </h3>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span>Easier for English speakers to learn</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span>High demand in your region</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span>Matches your stated learning goals</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} className="text-success" />
            <span>Active learning community</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecommendedLanguages;