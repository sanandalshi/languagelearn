import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonSidebar = ({ 
  lessonData = {},
  isVisible = true,
  onToggle
}) => {
  const [activeTab, setActiveTab] = useState('context');

  const {
    contextNotes = `Spanish greetings are an essential part of daily communication. Understanding when and how to use different greetings helps you navigate social situations with confidence.\n\nKey points to remember:\n• 'Hola' works in all situations\n• Time-specific greetings show cultural awareness\n• Tone and body language matter`,
    grammarRules = `Greeting Structure:\n• Most Spanish greetings are standalone expressions\n• No complex grammar rules for basic greetings\n• Gender doesn't affect greeting words\n\nCommon Patterns:\n• Buenos + time of day (Buenos días, Buenas tardes)\n• ¿Cómo + question word? (¿Cómo estás?, ¿Cómo te llamas?)`,
    vocabulary = [
      { word: 'Hola', pronunciation: '/ˈo.la/', meaning: 'Hello', usage: 'Universal greeting' },
      { word: 'Buenos días', pronunciation: '/ˈbwe.nos ˈdi.as/', meaning: 'Good morning', usage: 'Until noon' },
      { word: 'Buenas tardes', pronunciation: '/ˈbwe.nas ˈtar.des/', meaning: 'Good afternoon', usage: 'Noon to evening' },
      { word: 'Buenas noches', pronunciation: '/ˈbwe.nas ˈno.tʃes/', meaning: 'Good evening/night', usage: 'After sunset' }
    ],
    tips = [
      'Practice pronunciation by listening to native speakers',
      'Pay attention to the time of day when choosing greetings',
      'Smile and make eye contact when greeting someone',
      'In formal situations, add "señor", "señora", or "señorita"'
    ]
  } = lessonData;

  const tabs = [
    { id: 'context', label: 'Context', icon: 'BookOpen' },
    { id: 'grammar', label: 'Grammar', icon: 'FileText' },
    { id: 'vocabulary', label: 'Vocabulary', icon: 'List' },
    { id: 'tips', label: 'Tips', icon: 'Lightbulb' }
  ];

  if (!isVisible) {
    return (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
        <Button
          variant="default"
          size="icon"
          onClick={onToggle}
          className="shadow-lg"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border shadow-lg h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Lesson Guide
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors duration-200 ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </div>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'context' && (
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground mb-2">Cultural Context</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {contextNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'grammar' && (
          <div className="space-y-4">
            <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/20">
              <div className="flex items-start space-x-3">
                <Icon name="FileText" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground mb-2">Grammar Rules</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {grammarRules}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vocabulary' && (
          <div className="space-y-3">
            {vocabulary?.map((item, index) => (
              <div key={index} className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{item?.word}</h4>
                  <span className="text-xs font-mono text-muted-foreground">
                    {item?.pronunciation}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{item?.meaning}</p>
                <p className="text-xs text-accent">{item?.usage}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-3">
            {tips?.map((tip, index) => (
              <div key={index} className="bg-success/10 rounded-lg p-3 border border-success/20">
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonSidebar;