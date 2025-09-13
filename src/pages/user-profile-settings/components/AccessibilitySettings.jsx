import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AccessibilitySettings = ({ accessibilitySettings, onAccessibilityUpdate }) => {
  const [localSettings, setLocalSettings] = useState(accessibilitySettings);
  const [hasChanges, setHasChanges] = useState(false);

  const fontSizeOptions = [
    { value: 'small', label: 'Small', description: '14px - Compact text' },
    { value: 'medium', label: 'Medium', description: '16px - Default size' },
    { value: 'large', label: 'Large', description: '18px - Easier to read' },
    { value: 'extra-large', label: 'Extra Large', description: '20px - Maximum readability' }
  ];

  const contrastOptions = [
    { value: 'normal', label: 'Normal', description: 'Standard contrast' },
    { value: 'high', label: 'High Contrast', description: 'Enhanced visibility' },
    { value: 'dark', label: 'Dark Mode', description: 'Dark background theme' }
  ];

  const animationOptions = [
    { value: 'full', label: 'Full Animations', description: 'All animations enabled' },
    { value: 'reduced', label: 'Reduced Motion', description: 'Minimal animations' },
    { value: 'none', label: 'No Animations', description: 'Static interface' }
  ];

  const audioSpeedOptions = [
    { value: '0.5', label: '0.5x - Very Slow' },
    { value: '0.75', label: '0.75x - Slow' },
    { value: '1', label: '1x - Normal' },
    { value: '1.25', label: '1.25x - Fast' },
    { value: '1.5', label: '1.5x - Very Fast' }
  ];

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onAccessibilityUpdate(localSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalSettings(accessibilitySettings);
    setHasChanges(false);
  };

  const handleTestAudio = () => {
    // Simulate audio test
    console.log('Testing audio with current settings');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Accessibility Settings
          </h3>
          <p className="text-muted-foreground font-body mt-1">
            Customize the interface for better accessibility and comfort
          </p>
        </div>
        <Icon name="Accessibility" size={24} className="text-muted-foreground" />
      </div>
      {/* Visual Settings */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Visual Settings
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Font Size"
            description="Adjust text size throughout the application"
            options={fontSizeOptions}
            value={localSettings?.fontSize}
            onChange={(value) => handleSettingChange('fontSize', value)}
          />

          <Select
            label="Display Theme"
            description="Choose contrast and color scheme"
            options={contrastOptions}
            value={localSettings?.contrast}
            onChange={(value) => handleSettingChange('contrast', value)}
          />
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="High Contrast Mode"
            description="Increase contrast for better visibility"
            checked={localSettings?.highContrast}
            onChange={(e) => handleSettingChange('highContrast', e?.target?.checked)}
          />

          <Checkbox
            label="Large Click Targets"
            description="Make buttons and interactive elements larger"
            checked={localSettings?.largeClickTargets}
            onChange={(e) => handleSettingChange('largeClickTargets', e?.target?.checked)}
          />

          <Checkbox
            label="Focus Indicators"
            description="Show clear focus outlines for keyboard navigation"
            checked={localSettings?.focusIndicators}
            onChange={(e) => handleSettingChange('focusIndicators', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Motion Settings */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Motion & Animation
        </h4>
        <Select
          label="Animation Preferences"
          description="Control interface animations and transitions"
          options={animationOptions}
          value={localSettings?.animations}
          onChange={(value) => handleSettingChange('animations', value)}
        />

        <div className="mt-4 space-y-4">
          <Checkbox
            label="Reduce Motion"
            description="Minimize animations that might cause discomfort"
            checked={localSettings?.reduceMotion}
            onChange={(e) => handleSettingChange('reduceMotion', e?.target?.checked)}
          />

          <Checkbox
            label="Auto-play Prevention"
            description="Prevent videos and animations from auto-playing"
            checked={localSettings?.preventAutoplay}
            onChange={(e) => handleSettingChange('preventAutoplay', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Audio Settings */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Audio & Sound
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Audio Playback Speed"
            description="Default speed for pronunciation audio"
            options={audioSpeedOptions}
            value={localSettings?.audioSpeed}
            onChange={(value) => handleSettingChange('audioSpeed', value)}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Audio Volume
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={localSettings?.audioVolume}
                onChange={(e) => handleSettingChange('audioVolume', e?.target?.value)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span className="font-medium text-foreground">
                  {localSettings?.audioVolume}%
                </span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="Audio Descriptions"
            description="Enable detailed audio descriptions for visual content"
            checked={localSettings?.audioDescriptions}
            onChange={(e) => handleSettingChange('audioDescriptions', e?.target?.checked)}
          />

          <Checkbox
            label="Sound Effects"
            description="Play sound effects for interactions and feedback"
            checked={localSettings?.soundEffects}
            onChange={(e) => handleSettingChange('soundEffects', e?.target?.checked)}
          />

          <Checkbox
            label="Captions"
            description="Show captions for all audio content"
            checked={localSettings?.captions}
            onChange={(e) => handleSettingChange('captions', e?.target?.checked)}
          />

          <div className="flex items-center space-x-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestAudio}
              iconName="Volume2"
              iconPosition="left"
            >
              Test Audio
            </Button>
            <span className="text-sm text-muted-foreground">
              Test current audio settings
            </span>
          </div>
        </div>
      </div>
      {/* Keyboard Navigation */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Keyboard & Navigation
        </h4>
        <div className="space-y-4">
          <Checkbox
            label="Keyboard Navigation"
            description="Enable full keyboard navigation support"
            checked={localSettings?.keyboardNavigation}
            onChange={(e) => handleSettingChange('keyboardNavigation', e?.target?.checked)}
          />

          <Checkbox
            label="Skip Links"
            description="Show skip navigation links for screen readers"
            checked={localSettings?.skipLinks}
            onChange={(e) => handleSettingChange('skipLinks', e?.target?.checked)}
          />

          <Checkbox
            label="Tab Trapping"
            description="Keep focus within modal dialogs and popups"
            checked={localSettings?.tabTrapping}
            onChange={(e) => handleSettingChange('tabTrapping', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Screen Reader Support */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Screen Reader Support
        </h4>
        <div className="space-y-4">
          <Checkbox
            label="Enhanced Screen Reader Support"
            description="Provide detailed descriptions and ARIA labels"
            checked={localSettings?.screenReaderSupport}
            onChange={(e) => handleSettingChange('screenReaderSupport', e?.target?.checked)}
          />

          <Checkbox
            label="Live Region Announcements"
            description="Announce dynamic content changes"
            checked={localSettings?.liveRegions}
            onChange={(e) => handleSettingChange('liveRegions', e?.target?.checked)}
          />

          <Checkbox
            label="Descriptive Link Text"
            description="Use descriptive text for all links and buttons"
            checked={localSettings?.descriptiveLinks}
            onChange={(e) => handleSettingChange('descriptiveLinks', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Accessibility Tips */}
      <div className="mb-8 bg-accent/10 rounded-lg p-4 border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h5 className="font-medium text-foreground mb-2">
              Accessibility Tips
            </h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use keyboard shortcuts: Tab (navigate), Enter (activate), Esc (close)</li>
              <li>• Enable high contrast mode for better visibility</li>
              <li>• Adjust audio speed to match your learning pace</li>
              <li>• Turn on captions if you have hearing difficulties</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Save Actions */}
      {hasChanges && (
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              You have unsaved accessibility changes
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
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilitySettings;