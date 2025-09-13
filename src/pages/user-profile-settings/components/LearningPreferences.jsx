import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LearningPreferences = ({ preferences, onPreferencesUpdate }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner', description: 'New to this language' },
    { value: 'elementary', label: 'Elementary', description: 'Know some basics' },
    { value: 'intermediate', label: 'Intermediate', description: 'Can have conversations' },
    { value: 'advanced', label: 'Advanced', description: 'Fluent speaker' }
  ];

  const dailyGoalOptions = [
    { value: '5', label: '5 minutes', description: 'Light practice' },
    { value: '10', label: '10 minutes', description: 'Regular practice' },
    { value: '15', label: '15 minutes', description: 'Serious practice' },
    { value: '30', label: '30 minutes', description: 'Intensive practice' },
    { value: '60', label: '1 hour', description: 'Maximum commitment' }
  ];

  const reminderTimeOptions = [
    { value: '08:00', label: '8:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '22:00', label: '10:00 PM' }
  ];

  const handlePreferenceChange = (key, value) => {
    setLocalPreferences(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onPreferencesUpdate(localPreferences);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalPreferences(preferences);
    setHasChanges(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Learning Preferences
          </h3>
          <p className="text-muted-foreground font-body mt-1">
            Customize your learning experience and daily goals
          </p>
        </div>
        <Icon name="Settings" size={24} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Goal */}
        <Select
          label="Daily Learning Goal"
          description="How much time do you want to spend learning each day?"
          options={dailyGoalOptions}
          value={localPreferences?.dailyGoal}
          onChange={(value) => handlePreferenceChange('dailyGoal', value)}
        />

        {/* Difficulty Level */}
        <Select
          label="Current Difficulty Level"
          description="Adjust the complexity of your lessons"
          options={difficultyOptions}
          value={localPreferences?.difficultyLevel}
          onChange={(value) => handlePreferenceChange('difficultyLevel', value)}
        />

        {/* Reminder Time */}
        <Select
          label="Practice Reminder Time"
          description="When should we remind you to practice?"
          options={reminderTimeOptions}
          value={localPreferences?.reminderTime}
          onChange={(value) => handlePreferenceChange('reminderTime', value)}
        />

        {/* Audio Speed */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Audio Playback Speed
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.25"
              value={localPreferences?.audioSpeed}
              onChange={(e) => handlePreferenceChange('audioSpeed', e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5x</span>
              <span className="font-medium text-foreground">
                {localPreferences?.audioSpeed}x
              </span>
              <span>2x</span>
            </div>
          </div>
        </div>
      </div>
      {/* Notification Preferences */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Notification Preferences
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Daily Practice Reminders"
            description="Get notified when it's time to practice"
            checked={localPreferences?.notifications?.dailyReminders}
            onChange={(e) => handlePreferenceChange('notifications', {
              ...localPreferences?.notifications,
              dailyReminders: e?.target?.checked
            })}
          />

          <Checkbox
            label="Achievement Notifications"
            description="Celebrate your milestones and badges"
            checked={localPreferences?.notifications?.achievements}
            onChange={(e) => handlePreferenceChange('notifications', {
              ...localPreferences?.notifications,
              achievements: e?.target?.checked
            })}
          />

          <Checkbox
            label="Weekly Progress Reports"
            description="Receive weekly summaries of your progress"
            checked={localPreferences?.notifications?.weeklyReports}
            onChange={(e) => handlePreferenceChange('notifications', {
              ...localPreferences?.notifications,
              weeklyReports: e?.target?.checked
            })}
          />

          <Checkbox
            label="Streak Reminders"
            description="Don't break your learning streak"
            checked={localPreferences?.notifications?.streakReminders}
            onChange={(e) => handlePreferenceChange('notifications', {
              ...localPreferences?.notifications,
              streakReminders: e?.target?.checked
            })}
          />
        </div>
      </div>
      {/* Learning Features */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Learning Features
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Auto-play Audio"
            description="Automatically play pronunciation audio"
            checked={localPreferences?.features?.autoPlayAudio}
            onChange={(e) => handlePreferenceChange('features', {
              ...localPreferences?.features,
              autoPlayAudio: e?.target?.checked
            })}
          />

          <Checkbox
            label="Show Hints"
            description="Display helpful hints during exercises"
            checked={localPreferences?.features?.showHints}
            onChange={(e) => handlePreferenceChange('features', {
              ...localPreferences?.features,
              showHints: e?.target?.checked
            })}
          />

          <Checkbox
            label="Spaced Repetition"
            description="Review words based on forgetting curve"
            checked={localPreferences?.features?.spacedRepetition}
            onChange={(e) => handlePreferenceChange('features', {
              ...localPreferences?.features,
              spacedRepetition: e?.target?.checked
            })}
          />

          <Checkbox
            label="Offline Mode"
            description="Download lessons for offline practice"
            checked={localPreferences?.features?.offlineMode}
            onChange={(e) => handlePreferenceChange('features', {
              ...localPreferences?.features,
              offlineMode: e?.target?.checked
            })}
          />
        </div>
      </div>
      {/* Save Actions */}
      {hasChanges && (
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              You have unsaved changes
            </p>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPreferences;