import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PrivacySettings = ({ privacySettings, onPrivacyUpdate }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [localSettings, setLocalSettings] = useState(privacySettings);
  const [hasChanges, setHasChanges] = useState(false);

  const profileVisibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see your profile' },
    { value: 'friends', label: 'Friends Only', description: 'Only your friends can see your profile' },
    { value: 'private', label: 'Private', description: 'Only you can see your profile' }
  ];

  const dataRetentionOptions = [
    { value: '1year', label: '1 Year', description: 'Delete data after 1 year of inactivity' },
    { value: '2years', label: '2 Years', description: 'Delete data after 2 years of inactivity' },
    { value: '5years', label: '5 Years', description: 'Delete data after 5 years of inactivity' },
    { value: 'never', label: 'Never', description: 'Keep data indefinitely' }
  ];

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onPrivacyUpdate(localSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalSettings(privacySettings);
    setHasChanges(false);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      // Handle account deletion
      console.log('Account deletion requested');
      setShowDeleteConfirm(false);
      setDeleteConfirmText('');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Privacy & Security
          </h3>
          <p className="text-muted-foreground font-body mt-1">
            Control your data sharing and account security settings
          </p>
        </div>
        <Icon name="Shield" size={24} className="text-muted-foreground" />
      </div>
      {/* Profile Visibility */}
      <div className="mb-8">
        <Select
          label="Profile Visibility"
          description="Who can see your learning progress and achievements"
          options={profileVisibilityOptions}
          value={localSettings?.profileVisibility}
          onChange={(value) => handleSettingChange('profileVisibility', value)}
        />
      </div>
      {/* Data Sharing Preferences */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Data Sharing Preferences
        </h4>
        <div className="space-y-4">
          <Checkbox
            label="Share Progress with Friends"
            description="Allow friends to see your learning streaks and achievements"
            checked={localSettings?.shareProgress}
            onChange={(e) => handleSettingChange('shareProgress', e?.target?.checked)}
          />

          <Checkbox
            label="Participate in Leaderboards"
            description="Show your ranking in global and friend leaderboards"
            checked={localSettings?.showInLeaderboards}
            onChange={(e) => handleSettingChange('showInLeaderboards', e?.target?.checked)}
          />

          <Checkbox
            label="Allow Study Buddy Matching"
            description="Let others find you as a potential study partner"
            checked={localSettings?.allowStudyBuddyMatching}
            onChange={(e) => handleSettingChange('allowStudyBuddyMatching', e?.target?.checked)}
          />

          <Checkbox
            label="Share Anonymous Usage Data"
            description="Help improve LinguaLearn by sharing anonymous usage statistics"
            checked={localSettings?.shareUsageData}
            onChange={(e) => handleSettingChange('shareUsageData', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Marketing Preferences */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Marketing & Communications
        </h4>
        <div className="space-y-4">
          <Checkbox
            label="Promotional Emails"
            description="Receive emails about new features and special offers"
            checked={localSettings?.marketing?.promotionalEmails}
            onChange={(e) => handleSettingChange('marketing', {
              ...localSettings?.marketing,
              promotionalEmails: e?.target?.checked
            })}
          />

          <Checkbox
            label="Product Updates"
            description="Get notified about new lessons and course updates"
            checked={localSettings?.marketing?.productUpdates}
            onChange={(e) => handleSettingChange('marketing', {
              ...localSettings?.marketing,
              productUpdates: e?.target?.checked
            })}
          />

          <Checkbox
            label="Research Participation"
            description="Participate in optional surveys and research studies"
            checked={localSettings?.marketing?.researchParticipation}
            onChange={(e) => handleSettingChange('marketing', {
              ...localSettings?.marketing,
              researchParticipation: e?.target?.checked
            })}
          />
        </div>
      </div>
      {/* Data Retention */}
      <div className="mb-8">
        <Select
          label="Data Retention Policy"
          description="How long should we keep your data after account inactivity"
          options={dataRetentionOptions}
          value={localSettings?.dataRetention}
          onChange={(value) => handleSettingChange('dataRetention', value)}
        />
      </div>
      {/* Account Actions */}
      <div className="mb-8 pt-6 border-t border-border">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Account Management
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
            <div>
              <h5 className="font-medium text-foreground">Download Your Data</h5>
              <p className="text-sm text-muted-foreground">
                Export all your learning data, progress, and account information
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export Data
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-error/5 rounded-lg border border-error/20">
            <div>
              <h5 className="font-medium text-foreground">Delete Account</h5>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
      {/* Save Actions */}
      {hasChanges && (
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              You have unsaved privacy changes
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
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[1200] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-modal border border-border w-full max-w-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h4 className="text-lg font-heading font-semibold text-foreground">
                  Delete Account
                </h4>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-foreground mb-4">
                Are you sure you want to delete your account? This will permanently remove:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                <li>• All your learning progress and achievements</li>
                <li>• Your profile and personal information</li>
                <li>• All saved lessons and bookmarks</li>
                <li>• Your subscription and payment history</li>
              </ul>
              <p className="text-sm text-foreground mb-4">
                Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e?.target?.value)}
                placeholder="Type DELETE here"
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-error focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
                className="flex-1"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;