import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonContent = ({ 
  lessonData = {},
  onAnswer,
  showFeedback = false,
  userAnswer = null,
  correctAnswer = null
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const {
    type = 'vocabulary',
    question = "What does 'Hola' mean in English?",
    image = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    audio: audioUrl = null,
    options = [
      { id: 'a', text: 'Hello', isCorrect: true },
      { id: 'b', text: 'Goodbye', isCorrect: false },
      { id: 'c', text: 'Thank you', isCorrect: false },
      { id: 'd', text: 'Please', isCorrect: false }
    ],
    explanation = "Hola is the most common greeting in Spanish, equivalent to 'Hello' in English.",
    pronunciation = "/ˈo.la/",
    culturalNote = "In Spanish-speaking countries, 'Hola' is used in both formal and informal situations."
  } = lessonData;

  useEffect(() => {
    if (audioUrl) {
      const audioElement = new Audio(audioUrl);
      audioElement?.addEventListener('ended', () => setIsPlaying(false));
      setAudio(audioElement);

      return () => {
        audioElement?.pause();
        audioElement?.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [audioUrl]);

  const handlePlayAudio = () => {
    if (!audio) return;

    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
    } else {
      audio?.play();
      setIsPlaying(true);
    }
  };

  const handleAnswerSelect = (optionId) => {
    if (showFeedback) return;
    setSelectedAnswer(optionId);
    onAnswer?.(optionId);
  };

  const getOptionStyle = (option) => {
    if (!showFeedback) {
      return selectedAnswer === option?.id
        ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card hover:border-primary/50 hover:bg-muted/50';
    }

    if (option?.isCorrect) {
      return 'border-success bg-success/10 text-success';
    }

    if (selectedAnswer === option?.id && !option?.isCorrect) {
      return 'border-error bg-error/10 text-error';
    }

    return 'border-border bg-muted/30 text-muted-foreground';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Content Card */}
      <div className="bg-card rounded-lg shadow-card border border-border overflow-hidden">
        {/* Image Section */}
        {image && (
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <Image
              src={image}
              alt="Lesson visual"
              className="w-full h-full object-cover"
            />
            {audioUrl && (
              <div className="absolute bottom-4 right-4">
                <Button
                  variant="default"
                  size="icon"
                  onClick={handlePlayAudio}
                  className="shadow-lg"
                >
                  <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          {/* Question */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-2">
              {question}
            </h2>
            {pronunciation && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Volume2" size={16} />
                <span className="font-mono text-sm">{pronunciation}</span>
              </div>
            )}
          </div>

          {/* Audio Controls (if no image) */}
          {audioUrl && !image && (
            <div className="mb-6 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePlayAudio}
                iconName={isPlaying ? 'Pause' : 'Play'}
                iconPosition="left"
              >
                {isPlaying ? 'Pause Audio' : 'Play Audio'}
              </Button>
            </div>
          )}

          {/* Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {options?.map((option) => (
              <button
                key={option?.id}
                onClick={() => handleAnswerSelect(option?.id)}
                disabled={showFeedback}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-102 ${getOptionStyle(option)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option?.text}</span>
                  {showFeedback && option?.isCorrect && (
                    <Icon name="Check" size={20} className="text-success" />
                  )}
                  {showFeedback && selectedAnswer === option?.id && !option?.isCorrect && (
                    <Icon name="X" size={20} className="text-error" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback Section */}
          {showFeedback && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  correctAnswer ? 'bg-success/20' : 'bg-error/20'
                }`}>
                  <Icon 
                    name={correctAnswer ? 'Check' : 'X'} 
                    size={16} 
                    className={correctAnswer ? 'text-success' : 'text-error'} 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-2">
                    {correctAnswer ? 'Correct!' : 'Not quite right'}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {explanation}
                  </p>
                  {culturalNote && (
                    <div className="bg-accent/10 rounded-md p-3 border border-accent/20">
                      <div className="flex items-start space-x-2">
                        <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Cultural Note</h4>
                          <p className="text-sm text-muted-foreground">{culturalNote}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonContent;