import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Icon from '../AppIcon';

const LanguageSelectionModal = ({ 
  isOpen = true, 
  onClose, 
  onLanguageSelect,
  selectedLanguage = null,
  isOnboarding = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState(selectedLanguage);
  const [proficiencyLevel, setProficiencyLevel] = useState('beginner');

  const languages = [
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', learners: '24M+' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', learners: '18M+' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', learners: '12M+' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', learners: '8M+' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', learners: '6M+' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', learners: '5M+' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', learners: '4M+' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', learners: '3M+' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', learners: '2M+' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', learners: '1M+' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', learners: '800K+' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', learners: '600K+' }
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to this language' },
    { value: 'elementary', label: 'Elementary', description: 'Know some basics' },
    { value: 'intermediate', label: 'Intermediate', description: 'Can have conversations' },
    { value: 'advanced', label: 'Advanced', description: 'Fluent speaker' }
  ];

  const filteredLanguages = languages?.filter(lang =>
    lang?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    lang?.nativeName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleLanguageSelect = (language) => {
    setSelectedLang(language);
  };

  const handleConfirm = () => {
    if (selectedLang) {
      onLanguageSelect?.({
        language: selectedLang,
        proficiencyLevel
      });
      onClose?.();
    }
  };

  const handleSkip = () => {
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-lg shadow-modal border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                {isOnboarding ? 'Choose Your Language' : 'Change Language'}
              </h2>
              <p className="text-muted-foreground font-body mt-1">
                {isOnboarding 
                  ? 'Select the language you want to learn and your current level' :'Update your language preference and proficiency level'
                }
              </p>
            </div>
            {!isOnboarding && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <Icon name="X" size={20} />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Search */}
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Language Grid */}
          <div className="mb-8">
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Available Languages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredLanguages?.map((language) => (
                <button
                  key={language?.code}
                  onClick={() => handleLanguageSelect(language)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-102 ${
                    selectedLang?.code === language?.code
                      ? 'border-primary bg-primary/10 shadow-hover'
                      : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language?.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {language?.name}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {language?.nativeName}
                      </div>
                      <div className="text-xs text-accent font-mono mt-1">
                        {language?.learners} learners
                      </div>
                    </div>
                    {selectedLang?.code === language?.code && (
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Proficiency Level */}
          {selectedLang && (
            <div className="mb-6">
              <h3 className="text-lg font-heading font-medium text-foreground mb-4">
                Your Current Level in {selectedLang?.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {proficiencyLevels?.map((level) => (
                  <button
                    key={level?.value}
                    onClick={() => setProficiencyLevel(level?.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-102 ${
                      proficiencyLevel === level?.value
                        ? 'border-secondary bg-secondary/10 shadow-hover'
                        : 'border-border bg-card hover:border-secondary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">
                          {level?.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {level?.description}
                        </div>
                      </div>
                      {proficiencyLevel === level?.value && (
                        <Icon name="Check" size={20} className="text-secondary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            {isOnboarding && (
              <Button
                variant="ghost"
                onClick={handleSkip}
              >
                Skip for now
              </Button>
            )}
            
            <div className="flex items-center space-x-3 ml-auto">
              {!isOnboarding && (
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              )}
              
              <Button
                variant="default"
                onClick={handleConfirm}
                disabled={!selectedLang}
                iconName="ArrowRight"
                iconPosition="right"
              >
                {isOnboarding ? 'Start Learning' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionModal;