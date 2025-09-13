import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProficiencyAssessmentModal = ({ 
  isOpen, 
  onClose, 
  selectedLanguage, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [assessmentType, setAssessmentType] = useState(null); // 'test' or 'beginner'

  const assessmentQuestions = [
    {
      id: 1,
      question: `How would you say "Hello, how are you?" in ${selectedLanguage?.name}?`,
      options: [
        { id: 'a', text: 'Hola, ¿cómo estás?', isCorrect: true },
        { id: 'b', text: 'Bonjour, comment allez-vous?', isCorrect: false },
        { id: 'c', text: 'Guten Tag, wie geht es Ihnen?', isCorrect: false },
        { id: 'd', text: "I don't know", isCorrect: false }
      ]
    },
    {
      id: 2,
      question: `What does "Gracias" mean in English?`,
      options: [
        { id: 'a', text: 'Please', isCorrect: false },
        { id: 'b', text: 'Thank you', isCorrect: true },
        { id: 'c', text: 'Excuse me', isCorrect: false },
        { id: 'd', text: "I don't know", isCorrect: false }
      ]
    },
    {
      id: 3,
      question: `Which sentence is grammatically correct?`,
      options: [
        { id: 'a', text: 'Yo soy estudiante', isCorrect: true },
        { id: 'b', text: 'Yo es estudiante', isCorrect: false },
        { id: 'c', text: 'Yo son estudiante', isCorrect: false },
        { id: 'd', text: "I don't know", isCorrect: false }
      ]
    }
  ];

  const handleAssessmentTypeSelect = (type) => {
    setAssessmentType(type);
    if (type === 'beginner') {
      onComplete({
        language: selectedLanguage,
        proficiencyLevel: 'beginner',
        assessmentScore: 0,
        skipAssessment: true
      });
    } else {
      setCurrentStep(1);
    }
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleNext = () => {
    if (currentStep < assessmentQuestions?.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate score and complete assessment
      let correctAnswers = 0;
      assessmentQuestions?.forEach(question => {
        const selectedAnswer = selectedAnswers?.[question?.id];
        const correctOption = question?.options?.find(opt => opt?.isCorrect);
        if (selectedAnswer === correctOption?.id) {
          correctAnswers++;
        }
      });

      const score = (correctAnswers / assessmentQuestions?.length) * 100;
      let proficiencyLevel = 'beginner';
      
      if (score >= 80) proficiencyLevel = 'intermediate';
      else if (score >= 60) proficiencyLevel = 'elementary';

      onComplete({
        language: selectedLanguage,
        proficiencyLevel,
        assessmentScore: score,
        skipAssessment: false
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setAssessmentType(null);
    }
  };

  if (!isOpen || !selectedLanguage) return null;

  return (
    <div className="fixed inset-0 z-[1200] bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-lg shadow-modal border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                {assessmentType === null ? 'Proficiency Assessment' : `${selectedLanguage?.name} Assessment`}
              </h2>
              <p className="text-muted-foreground font-body mt-1">
                {assessmentType === null 
                  ? `Let's determine your current level in ${selectedLanguage?.name}`
                  : `Question ${currentStep} of ${assessmentQuestions?.length}`
                }
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {assessmentType === null ? (
            /* Assessment Type Selection */
            (<div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="BookOpen" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Choose Your Starting Point
                </h3>
                <p className="text-muted-foreground font-body">
                  Help us customize your learning experience
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAssessmentTypeSelect('test')}
                  className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Brain" size={20} className="text-secondary" />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">
                      Take Assessment
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">
                    Answer a few questions to determine your current proficiency level and get personalized recommendations.
                  </p>
                  <div className="mt-3 text-xs text-accent font-medium">
                    ~3 minutes
                  </div>
                </button>

                <button
                  onClick={() => handleAssessmentTypeSelect('beginner')}
                  className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="Play" size={20} className="text-success" />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">
                      Start as Beginner
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">
                    I'm completely new to this language. Start me from the very beginning with basic vocabulary and phrases.
                  </p>
                  <div className="mt-3 text-xs text-success font-medium">
                    Skip to lessons
                  </div>
                </button>
              </div>
            </div>)
          ) : (
            /* Assessment Questions */
            (<div className="space-y-6">
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / assessmentQuestions?.length) * 100}%` }}
                />
              </div>
              {/* Question */}
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  {assessmentQuestions?.[currentStep - 1]?.question}
                </h3>

                <div className="space-y-3">
                  {assessmentQuestions?.[currentStep - 1]?.options?.map((option) => (
                    <button
                      key={option?.id}
                      onClick={() => handleAnswerSelect(assessmentQuestions?.[currentStep - 1]?.id, option?.id)}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:scale-102 ${
                        selectedAnswers?.[assessmentQuestions?.[currentStep - 1]?.id] === option?.id
                          ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers?.[assessmentQuestions?.[currentStep - 1]?.id] === option?.id
                            ? 'border-primary bg-primary' :'border-muted-foreground'
                        }`}>
                          {selectedAnswers?.[assessmentQuestions?.[currentStep - 1]?.id] === option?.id && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="font-body text-foreground">{option?.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>)
          )}
        </div>

        {/* Footer */}
        {assessmentType !== null && (
          <div className="px-6 py-4 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                {currentStep === 1 ? 'Back' : 'Previous'}
              </Button>

              <Button
                variant="default"
                onClick={handleNext}
                disabled={!selectedAnswers?.[assessmentQuestions?.[currentStep - 1]?.id]}
                iconName={currentStep === assessmentQuestions?.length ? 'Check' : 'ChevronRight'}
                iconPosition="right"
              >
                {currentStep === assessmentQuestions?.length ? 'Complete' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProficiencyAssessmentModal;