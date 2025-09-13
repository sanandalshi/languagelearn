import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguageSettings = ({ languageSettings, onLanguageUpdate }) => {
  const [showAddLanguage, setShowAddLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const availableLanguages = [
    { value: 'es', label: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { value: 'fr', label: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { value: 'de', label: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { value: 'it', label: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { value: 'pt', label: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    { value: 'ru', label: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
    { value: 'ja', label: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { value: 'ko', label: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { value: 'zh', label: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { value: 'ar', label: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' }
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'elementary', label: 'Elementary' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const nativeLanguageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Spanish', flag: '🇪🇸' },
    { value: 'fr', label: 'French', flag: '🇫🇷' },
    { value: 'de', label: 'German', flag: '🇩🇪' },
    { value: 'pt', label: 'Portuguese', flag: '🇵🇹' },
    { value: 'ru', label: 'Russian', flag: '🇷🇺' },
    { value: 'zh', label: 'Chinese', flag: '🇨🇳' },
    { value: 'ja', label: 'Japanese', flag: '🇯🇵' }
  ];

  const handleAddLanguage = () => {
    if (selectedLanguage && selectedLevel) {
      const language = availableLanguages?.find(lang => lang?.value === selectedLanguage);
      const newLanguage = {
        ...language,
        level: selectedLevel,
        progress: 0,
        addedDate: new Date()?.toLocaleDateString()
      };
      
      onLanguageUpdate('add', newLanguage);
      setSelectedLanguage('');
      setSelectedLevel('beginner');
      setShowAddLanguage(false);
    }
  };

  const handleRemoveLanguage = (languageCode) => {
    onLanguageUpdate('remove', languageCode);
  };

  const handleSetPrimary = (languageCode) => {
    onLanguageUpdate('setPrimary', languageCode);
  };

  const handleLevelChange = (languageCode, newLevel) => {
    onLanguageUpdate('updateLevel', { code: languageCode, level: newLevel });
  };

  const handleNativeLanguageChange = (newNativeLanguage) => {
    onLanguageUpdate('setNative', newNativeLanguage);
  };

  const filteredLanguages = availableLanguages?.filter(
    lang => !languageSettings?.learningLanguages?.some(learning => learning?.value === lang?.value)
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Language Settings
          </h3>
          <p className="text-muted-foreground font-body mt-1">
            Manage your learning languages and proficiency levels
          </p>
        </div>
        <Icon name="Languages" size={24} className="text-muted-foreground" />
      </div>
      {/* Native Language */}
      <div className="mb-8">
        <Select
          label="Native Language"
          description="Your primary language for translations and explanations"
          options={nativeLanguageOptions?.map(lang => ({
            ...lang,
            label: `${lang?.flag} ${lang?.label}`
          }))}
          value={languageSettings?.nativeLanguage}
          onChange={handleNativeLanguageChange}
        />
      </div>
      {/* Learning Languages */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-heading font-medium text-foreground">
            Learning Languages
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddLanguage(!showAddLanguage)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Language
          </Button>
        </div>

        {/* Add Language Form */}
        {showAddLanguage && (
          <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select
                label="Select Language"
                options={filteredLanguages?.map(lang => ({
                  ...lang,
                  label: `${lang?.flag} ${lang?.label}`
                }))}
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                placeholder="Choose a language..."
              />
              
              <Select
                label="Proficiency Level"
                options={proficiencyLevels}
                value={selectedLevel}
                onChange={setSelectedLevel}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="default"
                size="sm"
                onClick={handleAddLanguage}
                disabled={!selectedLanguage}
                iconName="Plus"
                iconPosition="left"
              >
                Add Language
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddLanguage(false)}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Current Learning Languages */}
        <div className="space-y-4">
          {languageSettings?.learningLanguages?.map((language) => (
            <div
              key={language?.value}
              className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language?.flag}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h5 className="font-medium text-foreground">
                        {language?.label}
                      </h5>
                      {language?.isPrimary && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {language?.nativeName} • Added {language?.addedDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Select
                  options={proficiencyLevels}
                  value={language?.level}
                  onChange={(newLevel) => handleLevelChange(language?.value, newLevel)}
                  className="w-32"
                />

                {!language?.isPrimary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetPrimary(language?.value)}
                    iconName="Star"
                    iconPosition="left"
                  >
                    Set Primary
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveLanguage(language?.value)}
                  iconName="Trash2"
                  className="text-error hover:text-error hover:bg-error/10"
                />
              </div>
            </div>
          ))}
        </div>

        {languageSettings?.learningLanguages?.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Languages" size={48} className="mx-auto mb-4 opacity-50" />
            <p className="font-body">No learning languages added yet</p>
            <p className="text-sm">Click "Add Language" to start learning</p>
          </div>
        )}
      </div>
      {/* Language Learning Tips */}
      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h5 className="font-medium text-foreground mb-1">
              Language Learning Tips
            </h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Focus on one primary language for faster progress</li>
              <li>• Set realistic proficiency levels to get appropriate content</li>
              <li>• Your native language helps with better explanations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;