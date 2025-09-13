import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SpeakingExercise = ({ 
  exerciseData = {},
  onComplete,
  onSkip
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const {
    phrase = "Hola, ¿cómo estás?",
    translation = "Hello, how are you?",
    pronunciation = "/ˈo.la ˈko.mo es.ˈtas/",
    audioUrl = null,
    tips = "Focus on rolling the 'r' sound and emphasize the accent on 'estás'"
  } = exerciseData;

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks?.push(e?.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setHasRecorded(true);
        stream?.getTracks()?.forEach(track => track?.stop());
      };

      recorder?.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setFeedback(null);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setFeedback({
        type: 'error',
        message: 'Unable to access microphone. Please check your permissions.'
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio?.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const playExample = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio?.play();
    }
  };

  const handleSubmit = () => {
    // Simulate pronunciation analysis
    const accuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
    setFeedback({
      type: accuracy >= 80 ? 'success' : 'warning',
      message: accuracy >= 80 
        ? `Great pronunciation! Accuracy: ${accuracy}%`
        : `Good effort! Try focusing on the accent marks. Accuracy: ${accuracy}%`,
      accuracy
    });

    setTimeout(() => {
      onComplete?.(accuracy);
    }, 2000);
  };

  const resetRecording = () => {
    setHasRecorded(false);
    setAudioBlob(null);
    setFeedback(null);
    setRecordingTime(0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg shadow-card border border-border p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mic" size={32} className="text-accent" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Speaking Practice
          </h2>
          <p className="text-muted-foreground">
            Listen to the example, then record yourself saying the phrase
          </p>
        </div>

        {/* Phrase Display */}
        <div className="bg-muted/30 rounded-lg p-6 mb-6 text-center">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            {phrase}
          </h3>
          <p className="text-muted-foreground mb-2">{translation}</p>
          <p className="text-sm font-mono text-accent">{pronunciation}</p>
        </div>

        {/* Example Audio */}
        <div className="flex justify-center mb-6">
          <Button
            variant="outline"
            size="lg"
            onClick={playExample}
            iconName="Volume2"
            iconPosition="left"
          >
            Listen to Example
          </Button>
        </div>

        {/* Recording Controls */}
        <div className="text-center mb-6">
          {!isRecording && !hasRecorded && (
            <Button
              variant="default"
              size="lg"
              onClick={startRecording}
              iconName="Mic"
              iconPosition="left"
              className="bg-error hover:bg-error/90"
            >
              Start Recording
            </Button>
          )}

          {isRecording && (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-4 h-4 bg-error rounded-full animate-pulse" />
                <span className="text-lg font-mono text-foreground">
                  {Math.floor(recordingTime / 60)}:{(recordingTime % 60)?.toString()?.padStart(2, '0')}
                </span>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={stopRecording}
                iconName="Square"
                iconPosition="left"
              >
                Stop Recording
              </Button>
            </div>
          )}

          {hasRecorded && !feedback && (
            <div className="space-y-4">
              <div className="flex justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={playRecording}
                  iconName={isPlaying ? 'Pause' : 'Play'}
                  iconPosition="left"
                >
                  {isPlaying ? 'Pause' : 'Play Recording'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={resetRecording}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Record Again
                </Button>
              </div>
              <Button
                variant="success"
                size="lg"
                onClick={handleSubmit}
                iconName="Send"
                iconPosition="right"
              >
                Submit for Analysis
              </Button>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Pronunciation Tip</h4>
              <p className="text-sm text-muted-foreground">{tips}</p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`rounded-lg p-4 border ${
            feedback?.type === 'success' ?'bg-success/10 border-success/20' 
              : feedback?.type === 'warning' ?'bg-warning/10 border-warning/20' :'bg-error/10 border-error/20'
          }`}>
            <div className="flex items-start space-x-3">
              <Icon 
                name={feedback?.type === 'success' ? 'CheckCircle' : feedback?.type === 'warning' ? 'AlertTriangle' : 'XCircle'} 
                size={20} 
                className={`mt-0.5 flex-shrink-0 ${
                  feedback?.type === 'success' ?'text-success' 
                    : feedback?.type === 'warning' ?'text-warning' :'text-error'
                }`} 
              />
              <div>
                <h4 className="font-medium text-foreground mb-1">Analysis Complete</h4>
                <p className="text-sm text-muted-foreground">{feedback?.message}</p>
                {feedback?.accuracy && (
                  <div className="mt-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          feedback?.accuracy >= 80 ? 'bg-success' : 'bg-warning'
                        }`}
                        style={{ width: `${feedback?.accuracy}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={onSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip Speaking Exercise
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingExercise;