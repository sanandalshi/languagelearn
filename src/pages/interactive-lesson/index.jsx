import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LessonHeader from './components/LessonHeader';
import LessonContent from './components/LessonContent';
import LessonNavigation from './components/LessonNavigation';
import LessonSidebar from './components/LessonSidebar';
import SpeakingExercise from './components/SpeakingExercise';
import Icon from '../../components/AppIcon';


const InteractiveLesson = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);

  // Mock lesson data
  const lessonData = {
    id: 'spanish-greetings-001',
    title: 'Spanish Greetings',
    type: 'Vocabulary',
    totalSteps: 8,
    steps: [
      {
        id: 1,
        type: 'vocabulary',
        question: "What does 'Hola' mean in English?",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
        audio: null,
        options: [
          { id: 'a', text: 'Hello', isCorrect: true },
          { id: 'b', text: 'Goodbye', isCorrect: false },
          { id: 'c', text: 'Thank you', isCorrect: false },
          { id: 'd', text: 'Please', isCorrect: false }
        ],
        explanation: "Hola is the most common greeting in Spanish, equivalent to 'Hello' in English.",
        pronunciation: "/ˈo.la/",
        culturalNote: "In Spanish-speaking countries, 'Hola' is used in both formal and informal situations."
      },
      {
        id: 2,
        type: 'vocabulary',
        question: "Which greeting would you use in the morning?",
        image: "https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?w=400&h=300&fit=crop",
        audio: null,
        options: [
          { id: 'a', text: 'Buenas noches', isCorrect: false },
          { id: 'b', text: 'Buenos días', isCorrect: true },
          { id: 'c', text: 'Buenas tardes', isCorrect: false },
          { id: 'd', text: 'Hasta luego', isCorrect: false }
        ],
        explanation: "Buenos días means \'Good morning\' and is used from dawn until noon.",
        pronunciation: "/ˈbwe.nos ˈdi.as/",
        culturalNote: "Time-specific greetings show cultural awareness and respect in Spanish-speaking cultures."
      },
      {
        id: 3,
        type: 'listening',
        question: "Listen to the audio and select the correct greeting:",
        image: "https://images.pixabay.com/photo/2017/03/27/13/54/person-2178868_1280.jpg?w=400&h=300&fit=crop",
        audio: "https://example.com/audio/buenas-tardes.mp3",
        options: [
          { id: 'a', text: 'Buenos días', isCorrect: false },
          { id: 'b', text: 'Buenas tardes', isCorrect: true },
          { id: 'c', text: 'Buenas noches', isCorrect: false },
          { id: 'd', text: 'Hola', isCorrect: false }
        ],
        explanation: "Buenas tardes means \'Good afternoon\' and is used from noon until evening.",
        pronunciation: "/ˈbwe.nas ˈtar.des/",
        culturalNote: "Afternoon greetings typically start around 12 PM and continue until sunset."
      },
      {
        id: 4,
        type: 'speaking',
        phrase: "Hola, ¿cómo estás?",
        translation: "Hello, how are you?",
        pronunciation: "/ˈo.la ˈko.mo es.ˈtas/",
        audioUrl: "https://example.com/audio/hola-como-estas.mp3",
        tips: "Focus on rolling the \'r\' sound and emphasize the accent on \'estás'"
      },
      {
        id: 5,
        type: 'vocabulary',
        question: "What is the appropriate response to \'¿Cómo estás?'",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop",
        audio: null,
        options: [
          { id: 'a', text: 'Muy bien, gracias', isCorrect: true },
          { id: 'b', text: 'Hola', isCorrect: false },
          { id: 'c', text: 'Adiós', isCorrect: false },
          { id: 'd', text: 'Por favor', isCorrect: false }
        ],
        explanation: "Muy bien, gracias means 'Very well, thank you' - a polite response to asking how someone is.",
        pronunciation: "/mui βjen ˈɡɾa.θjas/",
        culturalNote: "It's polite to ask '¿Y tú?' (And you?) after responding to show interest in the other person."
      },
      {
        id: 6,
        type: 'vocabulary',
        question: "Which word means \'goodbye\' in Spanish?",
        image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?w=400&h=300&fit=crop",
        audio: null,
        options: [
          { id: 'a', text: 'Hola', isCorrect: false },
          { id: 'b', text: 'Gracias', isCorrect: false },
          { id: 'c', text: 'Adiós', isCorrect: true },
          { id: 'd', text: 'Por favor', isCorrect: false }
        ],
        explanation: "Adiós is the standard way to say \'goodbye\' in Spanish.",
        pronunciation: "/a.ˈðjos/",
        culturalNote: "Adiós implies a more final goodbye, while 'Hasta luego' means 'See you later'."
      },
      {
        id: 7,
        type: 'vocabulary',
        question: "What does 'Hasta luego' mean?",
        image: "https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=400&h=300&fit=crop",
        audio: null,
        options: [
          { id: 'a', text: 'Good morning', isCorrect: false },
          { id: 'b', text: 'Thank you', isCorrect: false },
          { id: 'c', text: 'See you later', isCorrect: true },
          { id: 'd', text: 'Excuse me', isCorrect: false }
        ],
        explanation: "Hasta luego means \'See you later\' and implies you\'ll see the person again soon.",
        pronunciation: "/ˈas.ta ˈlwe.ɣo/",
        culturalNote: "This is a casual way to say goodbye when you expect to see someone again."
      },
      {
        id: 8,
        type: 'review',
        question: "Complete the conversation: 'Hola, ¿cómo estás?' - '_____, ¿y tú?'",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
        audio: null,
        options: [
          { id: 'a', text: 'Adiós', isCorrect: false },
          { id: 'b', text: 'Muy bien, gracias', isCorrect: true },
          { id: 'c', text: 'Buenos días', isCorrect: false },
          { id: 'd', text: 'Por favor', isCorrect: false }
        ],
        explanation: "This completes a natural conversation flow in Spanish greetings.",
        pronunciation: "/mui βjen ˈɡɾa.θjas i tu/",
        culturalNote: "Adding \'¿y tú?\' shows politeness and interest in the other person\'s wellbeing."
      }
    ],
    contextNotes: `Spanish greetings are an essential part of daily communication. Understanding when and how to use different greetings helps you navigate social situations with confidence.\n\nKey points to remember:\n• 'Hola' works in all situations\n• Time-specific greetings show cultural awareness\n• Tone and body language matter`,
    grammarRules: `Greeting Structure:\n• Most Spanish greetings are standalone expressions\n• No complex grammar rules for basic greetings\n• Gender doesn't affect greeting words\n\nCommon Patterns:\n• Buenos + time of day (Buenos días, Buenas tardes)\n• ¿Cómo + question word? (¿Cómo estás?, ¿Cómo te llamas?)`,
    vocabulary: [
      { word: 'Hola', pronunciation: '/ˈo.la/', meaning: 'Hello', usage: 'Universal greeting' },
      { word: 'Buenos días', pronunciation: '/ˈbwe.nos ˈdi.as/', meaning: 'Good morning', usage: 'Until noon' },
      { word: 'Buenas tardes', pronunciation: '/ˈbwe.nas ˈtar.des/', meaning: 'Good afternoon', usage: 'Noon to evening' },
      { word: 'Buenas noches', pronunciation: '/ˈbwe.nas ˈno.tʃes/', meaning: 'Good evening/night', usage: 'After sunset' }
    ],
    tips: [
      'Practice pronunciation by listening to native speakers','Pay attention to the time of day when choosing greetings','Smile and make eye contact when greeting someone','In formal situations, add "señor", "señora", or "señorita"'
    ]
  };

  const currentStepData = lessonData?.steps?.[currentStep - 1];
  const isLastStep = currentStep === lessonData?.totalSteps;
  const canProceed = userAnswers?.[currentStep] !== undefined || showFeedback;

  useEffect(() => {
    // Reset feedback when step changes
    setShowFeedback(false);
  }, [currentStep]);

  const handleAnswer = (answer) => {
    setUserAnswers(prev => ({ ...prev, [currentStep]: answer }));
    
    // Show feedback after a short delay
    setTimeout(() => {
      setShowFeedback(true);
    }, 500);
  };

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    setLessonComplete(true);
    // Simulate saving progress
    setTimeout(() => {
      navigate('/learning-dashboard');
    }, 2000);
  };

  const handleExit = () => {
    navigate('/learning-dashboard');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSpeakingComplete = (accuracy) => {
    setUserAnswers(prev => ({ ...prev, [currentStep]: accuracy }));
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleSpeakingSkip = () => {
    handleSkip();
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  if (lessonComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={40} className="text-success" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Lesson Complete!
          </h1>
          <p className="text-muted-foreground mb-4">
            Great job! You've completed the Spanish Greetings lesson.
          </p>
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-[60px]">
        <LessonHeader
          lessonTitle={lessonData?.title}
          lessonType={lessonData?.type}
          currentStep={currentStep}
          totalSteps={lessonData?.totalSteps}
          onExit={handleExit}
          onBookmark={handleBookmark}
          isBookmarked={isBookmarked}
        />

        <div className="flex">
          {/* Main Content Area */}
          <div className={`flex-1 transition-all duration-300 ${sidebarVisible ? 'mr-80' : 'mr-0'}`}>
            <div className="p-4 lg:p-6 pb-32">
              {currentStepData?.type === 'speaking' ? (
                <SpeakingExercise
                  exerciseData={currentStepData}
                  onComplete={handleSpeakingComplete}
                  onSkip={handleSpeakingSkip}
                />
              ) : (
                <LessonContent
                  lessonData={currentStepData}
                  onAnswer={handleAnswer}
                  showFeedback={showFeedback}
                  userAnswer={userAnswers?.[currentStep]}
                  correctAnswer={currentStepData?.options?.find(opt => opt?.isCorrect)?.id === userAnswers?.[currentStep]}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className={`fixed right-0 top-[120px] bottom-0 transition-transform duration-300 z-40 ${
            sidebarVisible ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <LessonSidebar
              lessonData={lessonData}
              isVisible={sidebarVisible}
              onToggle={toggleSidebar}
            />
          </div>
        </div>

        {/* Navigation */}
        <LessonNavigation
          currentStep={currentStep}
          totalSteps={lessonData?.totalSteps}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSkip={handleSkip}
          onComplete={handleComplete}
          canProceed={canProceed}
          showFeedback={showFeedback}
          isLastStep={isLastStep}
        />
      </div>
    </div>
  );
};

export default InteractiveLesson;