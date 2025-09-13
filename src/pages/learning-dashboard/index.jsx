import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressCard from './components/ProgressCard';
import LessonCard from './components/LessonCard';
import WeeklyStats from './components/WeeklyStats';
import AchievementBadges from './components/AchievementBadges';
import QuickActions from './components/QuickActions';
import PracticeReminders from './components/PracticeReminders';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const LearningDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('Spanish');
  const [userName, setUserName] = useState('Alex');

  // Mock data for dashboard
  const todaysLessons = [
    {
      id: 1,
      title: "Family Vocabulary",
      type: "vocabulary",
      duration: 15,
      difficulty: "beginner",
      progress: 0,
      isCompleted: false,
      isLocked: false,
      description: "Learn essential family member names and relationships in Spanish.",
      skillsToLearn: ["madre", "padre", "hermano", "hermana", "abuelo"]
    },
    {
      id: 2,
      title: "Present Tense Verbs",
      type: "grammar",
      duration: 20,
      difficulty: "intermediate",
      progress: 65,
      isCompleted: false,
      isLocked: false,
      description: "Master regular and irregular present tense verb conjugations.",
      skillsToLearn: ["ser", "estar", "tener", "hacer", "ir"]
    },
    {
      id: 3,
      title: "Restaurant Conversation",
      type: "listening",
      duration: 12,
      difficulty: "intermediate",
      progress: 100,
      isCompleted: true,
      isLocked: false,
      description: "Practice understanding conversations in restaurant settings.",
      skillsToLearn: ["ordering", "menu", "payment", "reservations"]
    },
    {
      id: 4,
      title: "Pronunciation Practice",
      type: "speaking",
      duration: 18,
      difficulty: "beginner",
      progress: 0,
      isCompleted: false,
      isLocked: false,
      description: "Improve your Spanish pronunciation with guided exercises.",
      skillsToLearn: ["rolling R", "vowel sounds", "stress patterns"]
    },
    {
      id: 5,
      title: "Advanced Grammar",
      type: "grammar",
      duration: 25,
      difficulty: "advanced",
      progress: 0,
      isCompleted: false,
      isLocked: true,
      description: "Complex grammar structures for advanced learners.",
      skillsToLearn: ["subjunctive", "conditional", "passive voice"]
    },
    {
      id: 6,
      title: "Travel Phrases",
      type: "vocabulary",
      duration: 10,
      difficulty: "beginner",
      progress: 30,
      isCompleted: false,
      isLocked: false,
      description: "Essential phrases for traveling in Spanish-speaking countries.",
      skillsToLearn: ["airport", "hotel", "directions", "transportation"]
    }
  ];

  const weeklyData = [
    { minutes: 45, completed: true },  // Monday
    { minutes: 30, completed: true },  // Tuesday
    { minutes: 60, completed: true },  // Wednesday
    { minutes: 25, completed: true },  // Thursday
    { minutes: 40, completed: true },  // Friday
    { minutes: 20, completed: false }, // Saturday
    { minutes: 0, completed: false }   // Sunday
  ];

  const achievements = [
    {
      id: 1,
      title: "Week Warrior",
      description: "7-day streak completed",
      type: "streak",
      isNew: true,
      earnedDate: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      title: "Vocabulary Master",
      description: "100 words learned",
      type: "completion",
      isNew: false,
      earnedDate: new Date(Date.now() - 172800000)
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "100% on grammar quiz",
      type: "score",
      isNew: true,
      earnedDate: new Date(Date.now() - 259200000)
    },
    {
      id: 4,
      title: "Beginner Graduate",
      description: "Completed beginner level",
      type: "milestone",
      isNew: false,
      earnedDate: new Date(Date.now() - 604800000)
    }
  ];

  const practiceReminders = [
    {
      id: 1,
      title: "Family Vocabulary Review",
      type: "Spaced Repetition",
      dueDate: new Date(Date.now() - 3600000),
      priority: "high",
      wordsCount: 15,
      estimatedTime: 5
    },
    {
      id: 2,
      title: "Verb Conjugation Practice",
      type: "Grammar Review",
      dueDate: new Date(Date.now() - 7200000),
      priority: "medium",
      wordsCount: 8,
      estimatedTime: 8
    },
    {
      id: 3,
      title: "Restaurant Phrases",
      type: "Vocabulary Review",
      dueDate: new Date(Date.now() - 10800000),
      priority: "low",
      wordsCount: 12,
      estimatedTime: 6
    }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Check for user name
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  const handleStartLesson = (lesson) => {
    navigate('/interactive-lesson', { 
      state: { 
        lessonId: lesson?.id,
        lessonType: lesson?.type,
        lessonTitle: lesson?.title
      }
    });
  };

  const handleContinueLesson = (lesson) => {
    navigate('/interactive-lesson', { 
      state: { 
        lessonId: lesson?.id,
        lessonType: lesson?.type,
        lessonTitle: lesson?.title,
        progress: lesson?.progress
      }
    });
  };

  const handleQuickAction = (actionId) => {
    navigate('/interactive-lesson', { 
      state: { 
        lessonType: actionId,
        isQuickPractice: true
      }
    });
  };

  const handleReviewClick = (reminder) => {
    navigate('/interactive-lesson', { 
      state: { 
        lessonType: 'review',
        reviewData: reminder
      }
    });
  };

  const handleProfileClick = () => {
    navigate('/user-profile-settings');
  };

  const handleLanguageChange = () => {
    navigate('/language-selection');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[76px] pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Welcome back, {userName}!
                </h1>
                <p className="text-muted-foreground font-body mt-1">
                  Ready to continue learning {currentLanguage}?
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLanguageChange}
                  iconName="Globe"
                  iconPosition="left"
                >
                  {currentLanguage}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleProfileClick}
                >
                  <Icon name="User" size={20} />
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="mb-8">
            <ProgressCard 
              currentStreak={7}
              dailyGoal={30}
              completedToday={25}
              overallProficiency={68}
              nextMilestone="Intermediate Level"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Lessons */}
            <div className="lg:col-span-2 space-y-8">
              {/* Today's Lessons */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-semibold text-foreground">
                    Today's Lessons
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Library"
                    iconPosition="left"
                  >
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {todaysLessons?.map((lesson) => (
                    <LessonCard
                      key={lesson?.id}
                      lesson={lesson}
                      onStartLesson={handleStartLesson}
                      onContinueLesson={handleContinueLesson}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <QuickActions onActionClick={handleQuickAction} />
            </div>

            {/* Right Column - Stats & Achievements */}
            <div className="space-y-8">
              {/* Weekly Stats */}
              <WeeklyStats 
                weeklyData={weeklyData}
                totalMinutes={220}
                lessonsCompleted={12}
                averageScore={85}
              />

              {/* Achievement Badges */}
              <AchievementBadges achievements={achievements} />

              {/* Practice Reminders */}
              <PracticeReminders 
                reminders={practiceReminders}
                onReviewClick={handleReviewClick}
              />
            </div>
          </div>

          {/* Bottom Section - Additional Actions */}
          <div className="mt-12 bg-card rounded-lg border border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Explore More Features
                </h3>
                <p className="text-muted-foreground font-body mt-1">
                  Discover additional tools to enhance your learning experience
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  Progress Report
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Users"
                  iconPosition="left"
                >
                  Study Groups
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningDashboard;