import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProfileHeader from './components/ProfileHeader';
import LearningPreferences from './components/LearningPreferences';
import LanguageSettings from './components/LanguageSettings';
import PrivacySettings from './components/PrivacySettings';
import SubscriptionSettings from './components/SubscriptionSettings';
import AccessibilitySettings from './components/AccessibilitySettings';
import SecuritySettings from './components/SecuritySettings';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock user profile data
  const [userProfile, setUserProfile] = useState({
    displayName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    bio: "Passionate language learner exploring Spanish and French. Love connecting with people from different cultures through language exchange.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "March 2023",
    totalPoints: 12450,
    languages: [
      { name: "Spanish", flag: "🇪🇸", level: "Intermediate" },
      { name: "French", flag: "🇫🇷", level: "Beginner" }
    ]
  });

  // Mock learning preferences
  const [learningPreferences, setLearningPreferences] = useState({
    dailyGoal: "15",
    difficultyLevel: "intermediate",
    reminderTime: "18:00",
    audioSpeed: "1",
    notifications: {
      dailyReminders: true,
      achievements: true,
      weeklyReports: false,
      streakReminders: true
    },
    features: {
      autoPlayAudio: true,
      showHints: true,
      spacedRepetition: true,
      offlineMode: false
    }
  });

  // Mock language settings
  const [languageSettings, setLanguageSettings] = useState({
    nativeLanguage: "en",
    learningLanguages: [
      {
        value: "es",
        label: "Spanish",
        flag: "🇪🇸",
        nativeName: "Español",
        level: "intermediate",
        progress: 65,
        isPrimary: true,
        addedDate: "2023-03-15"
      },
      {
        value: "fr",
        label: "French",
        flag: "🇫🇷",
        nativeName: "Français",
        level: "beginner",
        progress: 25,
        isPrimary: false,
        addedDate: "2023-06-20"
      }
    ]
  });

  // Mock privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "friends",
    shareProgress: true,
    showInLeaderboards: true,
    allowStudyBuddyMatching: true,
    shareUsageData: false,
    marketing: {
      promotionalEmails: false,
      productUpdates: true,
      researchParticipation: false
    },
    dataRetention: "2years"
  });

  // Mock subscription data
  const [subscriptionData, setSubscriptionData] = useState({
    currentPlan: "premium",
    planName: "Premium",
    price: "$9.99",
    period: "month",
    status: "active",
    nextBilling: "January 13, 2025",
    accessUntil: null
  });

  // Mock accessibility settings
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: "medium",
    contrast: "normal",
    animations: "full",
    audioSpeed: "1",
    audioVolume: "75",
    highContrast: false,
    largeClickTargets: false,
    focusIndicators: true,
    reduceMotion: false,
    preventAutoplay: false,
    audioDescriptions: false,
    soundEffects: true,
    captions: false,
    keyboardNavigation: true,
    skipLinks: true,
    tabTrapping: true,
    screenReaderSupport: false,
    liveRegions: true,
    descriptiveLinks: true
  });

  // Mock security data
  const [securityData, setSecurityData] = useState({
    passwordLastChanged: "November 15, 2024",
    twoFactorEnabled: false,
    lastLogin: "December 13, 2024 at 6:30 PM"
  });

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'learning', label: 'Learning', icon: 'BookOpen' },
    { id: 'languages', label: 'Languages', icon: 'Languages' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'subscription', label: 'Subscription', icon: 'CreditCard' },
    { id: 'accessibility', label: 'Accessibility', icon: 'Accessibility' },
    { id: 'security', label: 'Security', icon: 'Lock' }
  ];

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
    showSuccess();
  };

  const handlePreferencesUpdate = (updatedPreferences) => {
    setLearningPreferences(updatedPreferences);
    showSuccess();
  };

  const handleLanguageUpdate = (action, data) => {
    switch (action) {
      case 'add':
        setLanguageSettings(prev => ({
          ...prev,
          learningLanguages: [...prev?.learningLanguages, data]
        }));
        break;
      case 'remove':
        setLanguageSettings(prev => ({
          ...prev,
          learningLanguages: prev?.learningLanguages?.filter(lang => lang?.value !== data)
        }));
        break;
      case 'setPrimary':
        setLanguageSettings(prev => ({
          ...prev,
          learningLanguages: prev?.learningLanguages?.map(lang => ({
            ...lang,
            isPrimary: lang?.value === data
          }))
        }));
        break;
      case 'updateLevel':
        setLanguageSettings(prev => ({
          ...prev,
          learningLanguages: prev?.learningLanguages?.map(lang =>
            lang?.value === data?.code ? { ...lang, level: data?.level } : lang
          )
        }));
        break;
      case 'setNative':
        setLanguageSettings(prev => ({ ...prev, nativeLanguage: data }));
        break;
    }
    showSuccess();
  };

  const handlePrivacyUpdate = (updatedPrivacy) => {
    setPrivacySettings(updatedPrivacy);
    showSuccess();
  };

  const handleSubscriptionUpdate = (action, data) => {
    switch (action) {
      case 'changePlan':
        setSubscriptionData(prev => ({ ...prev, currentPlan: data }));
        break;
      case 'cancel':
        setSubscriptionData(prev => ({
          ...prev,
          status: 'cancelled',
          accessUntil: 'January 13, 2025'
        }));
        break;
      case 'resume':
        setSubscriptionData(prev => ({
          ...prev,
          status: 'active',
          accessUntil: null
        }));
        break;
    }
    showSuccess();
  };

  const handleAccessibilityUpdate = (updatedAccessibility) => {
    setAccessibilitySettings(updatedAccessibility);
    showSuccess();
  };

  const handleSecurityUpdate = (action, data) => {
    switch (action) {
      case 'changePassword':
        setSecurityData(prev => ({
          ...prev,
          passwordLastChanged: new Date()?.toLocaleDateString()
        }));
        break;
      case 'enable2FA':
        setSecurityData(prev => ({ ...prev, twoFactorEnabled: true }));
        break;
      case 'disable2FA':
        setSecurityData(prev => ({ ...prev, twoFactorEnabled: false }));
        break;
      case 'logoutSession': case'logoutAllSessions':
        // Handle session logout
        break;
    }
    showSuccess();
  };

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileHeader
            userProfile={userProfile}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      case 'learning':
        return (
          <LearningPreferences
            preferences={learningPreferences}
            onPreferencesUpdate={handlePreferencesUpdate}
          />
        );
      case 'languages':
        return (
          <LanguageSettings
            languageSettings={languageSettings}
            onLanguageUpdate={handleLanguageUpdate}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            privacySettings={privacySettings}
            onPrivacyUpdate={handlePrivacyUpdate}
          />
        );
      case 'subscription':
        return (
          <SubscriptionSettings
            subscriptionData={subscriptionData}
            onSubscriptionUpdate={handleSubscriptionUpdate}
          />
        );
      case 'accessibility':
        return (
          <AccessibilitySettings
            accessibilitySettings={accessibilitySettings}
            onAccessibilityUpdate={handleAccessibilityUpdate}
          />
        );
      case 'security':
        return (
          <SecuritySettings
            securityData={securityData}
            onSecurityUpdate={handleSecurityUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-[60px]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Settings
              </h1>
              <p className="text-muted-foreground font-body mt-2">
                Manage your account, preferences, and learning experience
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/learning-dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <nav className="space-y-2">
                  {settingsTabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 z-[1100] animate-slide-in">
          <div className="bg-success text-success-foreground px-4 py-3 rounded-lg shadow-card flex items-center space-x-2">
            <Icon name="Check" size={20} />
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileSettings;