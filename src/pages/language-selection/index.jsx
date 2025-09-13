import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import LanguageCard from './components/LanguageCard';
import SearchAndFilters from './components/SearchAndFilters';
import ProficiencyAssessmentModal from './components/ProficiencyAssessmentModal';
import RecommendedLanguages from './components/RecommendedLanguages';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user profile data
  const userProfile = {
    nativeLanguage: 'English',
    learningGoals: 'Career advancement',
    timeCommitment: 15,
    region: 'North America'
  };

  // Mock languages data
  const languages = [
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      category: 'popular',
      region: 'european',
      learners: '24M+',
      timeToFluency: '24 weeks',
      difficulty: 2,
      difficultyLabel: 'Easy',
      availableLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
      isPopular: true
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      category: 'popular',
      region: 'european',
      learners: '18M+',
      timeToFluency: '30 weeks',
      difficulty: 3,
      difficultyLabel: 'Medium',
      availableLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      isPopular: true
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      category: 'popular',
      region: 'european',
      learners: '12M+',
      timeToFluency: '36 weeks',
      difficulty: 4,
      difficultyLabel: 'Hard',
      availableLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
      isPopular: true
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      category: 'european',
      region: 'european',
      learners: '8M+',
      timeToFluency: '26 weeks',
      difficulty: 2,
      difficultyLabel: 'Easy',
      availableLevels: ['A1', 'A2', 'B1', 'B2'],
      isPopular: false
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      category: 'european',
      region: 'european',
      learners: '6M+',
      timeToFluency: '24 weeks',
      difficulty: 2,
      difficultyLabel: 'Easy',
      availableLevels: ['A1', 'A2', 'B1', 'B2'],
      isPopular: false
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      category: 'european',
      region: 'european',
      learners: '5M+',
      timeToFluency: '44 weeks',
      difficulty: 5,
      difficultyLabel: 'Very Hard',
      availableLevels: ['A1', 'A2', 'B1'],
      isPopular: false
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      category: 'asian',
      region: 'asian',
      learners: '4M+',
      timeToFluency: '88 weeks',
      difficulty: 5,
      difficultyLabel: 'Very Hard',
      availableLevels: ['N5', 'N4', 'N3', 'N2'],
      isPopular: false
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      category: 'asian',
      region: 'asian',
      learners: '3M+',
      timeToFluency: '88 weeks',
      difficulty: 5,
      difficultyLabel: 'Very Hard',
      availableLevels: ['Level 1', 'Level 2', 'Level 3'],
      isPopular: false
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      category: 'asian',
      region: 'asian',
      learners: '2M+',
      timeToFluency: '88 weeks',
      difficulty: 5,
      difficultyLabel: 'Very Hard',
      availableLevels: ['HSK 1', 'HSK 2', 'HSK 3'],
      isPopular: false
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      category: 'african',
      region: 'african',
      learners: '1M+',
      timeToFluency: '88 weeks',
      difficulty: 5,
      difficultyLabel: 'Very Hard',
      availableLevels: ['A1', 'A2', 'B1'],
      isPopular: false
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      category: 'asian',
      region: 'asian',
      learners: '800K+',
      timeToFluency: '44 weeks',
      difficulty: 4,
      difficultyLabel: 'Hard',
      availableLevels: ['Basic', 'Intermediate'],
      isPopular: false
    },
    {
      code: 'nl',
      name: 'Dutch',
      nativeName: 'Nederlands',
      flag: '🇳🇱',
      category: 'european',
      region: 'european',
      learners: '600K+',
      timeToFluency: '24 weeks',
      difficulty: 2,
      difficultyLabel: 'Easy',
      availableLevels: ['A1', 'A2', 'B1'],
      isPopular: false
    }
  ];

  // Mock recommended languages based on user profile
  const recommendedLanguages = [
    {
      ...languages?.find(lang => lang?.code === 'es'),
      recommendationReason: 'Popular'
    },
    {
      ...languages?.find(lang => lang?.code === 'fr'),
      recommendationReason: 'Career+'
    }
  ];

  // Filter languages based on search and category
  const filteredLanguages = languages?.filter(language => {
    const matchesSearch = language?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         language?.nativeName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           language?.category === selectedCategory ||
                           (selectedCategory === 'popular' && language?.isPopular);
    
    return matchesSearch && matchesCategory;
  });

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleStartLearning = () => {
    if (selectedLanguage) {
      setShowAssessmentModal(true);
    }
  };

  const handleAssessmentComplete = (assessmentResult) => {
    setIsLoading(true);
    
    // Simulate saving assessment results
    setTimeout(() => {
      // Store results in localStorage for demo purposes
      localStorage.setItem('selectedLanguage', JSON.stringify(assessmentResult?.language));
      localStorage.setItem('proficiencyLevel', assessmentResult?.proficiencyLevel);
      localStorage.setItem('assessmentScore', assessmentResult?.assessmentScore?.toString() || '0');
      
      setShowAssessmentModal(false);
      setIsLoading(false);
      navigate('/learning-dashboard');
    }, 1500);
  };

  const handleSkipSelection = () => {
    navigate('/learning-dashboard');
  };

  useEffect(() => {
    // Check if user already has a selected language
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      try {
        const parsedLanguage = JSON.parse(savedLanguage);
        setSelectedLanguage(parsedLanguage);
      } catch (error) {
        console.error('Error parsing saved language:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-card">
                <Icon name="Languages" size={32} color="white" />
              </div>
            </div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Choose Your Language Journey
            </h1>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Select the language you want to master and we'll create a personalized learning path just for you.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search and Filters */}
            <SearchAndFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              totalLanguages={languages?.length}
              filteredCount={filteredLanguages?.length}
            />

            {/* Languages Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  Available Languages
                </h2>
                {selectedLanguage && (
                  <div className="flex items-center space-x-2 text-sm text-success">
                    <Icon name="Check" size={16} />
                    <span>{selectedLanguage?.name} selected</span>
                  </div>
                )}
              </div>

              {filteredLanguages?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredLanguages?.map((language) => (
                    <LanguageCard
                      key={language?.code}
                      language={language}
                      isSelected={selectedLanguage?.code === language?.code}
                      onSelect={handleLanguageSelect}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                    No languages found
                  </h3>
                  <p className="text-muted-foreground font-body">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recommended Languages */}
            <RecommendedLanguages
              recommendedLanguages={recommendedLanguages}
              selectedLanguage={selectedLanguage}
              onLanguageSelect={handleLanguageSelect}
              userProfile={userProfile}
            />

            {/* Selection Summary */}
            {selectedLanguage && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Your Selection
                </h3>
                
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{selectedLanguage?.flag}</span>
                  <div>
                    <div className="font-medium text-foreground">
                      {selectedLanguage?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedLanguage?.nativeName}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="text-foreground font-medium">
                      {selectedLanguage?.difficultyLabel}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time to fluency:</span>
                    <span className="text-foreground font-medium">
                      {selectedLanguage?.timeToFluency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active learners:</span>
                    <span className="text-foreground font-medium">
                      {selectedLanguage?.learners}
                    </span>
                  </div>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={handleStartLearning}
                  loading={isLoading}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Start Learning
                </Button>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={handleSkipSelection}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Skip for now
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => navigate('/user-profile-settings')}
                  iconName="Settings"
                  iconPosition="left"
                >
                  Update preferences
                </Button>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="bg-accent/10 rounded-lg border border-accent/20 p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Lightbulb" size={20} className="text-accent" />
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Pro Tip
                </h3>
              </div>
              <p className="text-sm text-muted-foreground font-body">
                Choose a language you're genuinely interested in. Your motivation will be the key to success in your learning journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Proficiency Assessment Modal */}
      <ProficiencyAssessmentModal
        isOpen={showAssessmentModal}
        onClose={() => setShowAssessmentModal(false)}
        selectedLanguage={selectedLanguage}
        onComplete={handleAssessmentComplete}
      />
    </div>
  );
};

export default LanguageSelection;