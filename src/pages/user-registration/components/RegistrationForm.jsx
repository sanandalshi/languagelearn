import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    nativeLanguage: '',
    targetLanguage: '',
    proficiencyLevel: '',
    learningGoals: []
  });
  const [errors, setErrors] = useState({});

  const nativeLanguages = [
    { value: 'en', label: 'English 🇺🇸' },
    { value: 'es', label: 'Spanish 🇪🇸' },
    { value: 'fr', label: 'French 🇫🇷' },
    { value: 'de', label: 'German 🇩🇪' },
    { value: 'it', label: 'Italian 🇮🇹' },
    { value: 'pt', label: 'Portuguese 🇵🇹' },
    { value: 'ru', label: 'Russian 🇷🇺' },
    { value: 'ja', label: 'Japanese 🇯🇵' },
    { value: 'ko', label: 'Korean 🇰🇷' },
    { value: 'zh', label: 'Chinese 🇨🇳' },
    { value: 'ar', label: 'Arabic 🇸🇦' },
    { value: 'hi', label: 'Hindi 🇮🇳' }
  ];

  const targetLanguages = [
    { value: 'es', label: 'Spanish 🇪🇸' },
    { value: 'fr', label: 'French 🇫🇷' },
    { value: 'de', label: 'German 🇩🇪' },
    { value: 'it', label: 'Italian 🇮🇹' },
    { value: 'pt', label: 'Portuguese 🇵🇹' },
    { value: 'ru', label: 'Russian 🇷🇺' },
    { value: 'ja', label: 'Japanese 🇯🇵' },
    { value: 'ko', label: 'Korean 🇰🇷' },
    { value: 'zh', label: 'Chinese 🇨🇳' },
    { value: 'ar', label: 'Arabic 🇸🇦' },
    { value: 'hi', label: 'Hindi 🇮🇳' },
    { value: 'en', label: 'English 🇺🇸' }
  ];

  const proficiencyLevels = [
    { 
      value: 'beginner', 
      label: 'Beginner', 
      description: 'New to this language - starting from basics' 
    },
    { 
      value: 'intermediate', 
      label: 'Intermediate', 
      description: 'Can understand and use familiar expressions' 
    },
    { 
      value: 'advanced', 
      label: 'Advanced', 
      description: 'Can communicate fluently and understand complex texts' 
    }
  ];

  const learningGoalOptions = [
    { id: 'travel', label: 'Travel & Tourism', description: 'Learn for vacation and travel experiences' },
    { id: 'business', label: 'Business & Career', description: 'Professional communication and advancement' },
    { id: 'academic', label: 'Academic Studies', description: 'Educational purposes and exam preparation' },
    { id: 'personal', label: 'Personal Interest', description: 'Hobby and personal enrichment' },
    { id: 'family', label: 'Family & Heritage', description: 'Connect with family roots and culture' },
    { id: 'relocation', label: 'Relocation', description: 'Moving to a new country or region' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGoalToggle = (goalId) => {
    setFormData(prev => ({
      ...prev,
      learningGoals: prev?.learningGoals?.includes(goalId)
        ? prev?.learningGoals?.filter(id => id !== goalId)
        : [...prev?.learningGoals, goalId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.displayName) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData?.nativeLanguage) {
      newErrors.nativeLanguage = 'Please select your native language';
    }

    if (!formData?.targetLanguage) {
      newErrors.targetLanguage = 'Please select your target language';
    }

    if (!formData?.proficiencyLevel) {
      newErrors.proficiencyLevel = 'Please select your proficiency level';
    }

    if (formData?.nativeLanguage === formData?.targetLanguage && formData?.nativeLanguage) {
      newErrors.targetLanguage = 'Target language must be different from native language';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage for demo
      localStorage.setItem('lingualearn_user', JSON.stringify({
        ...formData,
        id: Date.now(),
        createdAt: new Date()?.toISOString()
      }));
      
      navigate('/language-selection');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium text-foreground">
          Basic Information
        </h3>
        
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Display Name"
          type="text"
          placeholder="How should we call you?"
          value={formData?.displayName}
          onChange={(e) => handleInputChange('displayName', e?.target?.value)}
          error={errors?.displayName}
          description="This will be shown on your profile and leaderboards"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            description="At least 8 characters"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
        </div>
      </div>
      {/* Language Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium text-foreground">
          Language Preferences
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Native Language"
            placeholder="Select your native language"
            options={nativeLanguages}
            value={formData?.nativeLanguage}
            onChange={(value) => handleInputChange('nativeLanguage', value)}
            error={errors?.nativeLanguage}
            searchable
            required
          />

          <Select
            label="Target Language"
            placeholder="Language you want to learn"
            options={targetLanguages}
            value={formData?.targetLanguage}
            onChange={(value) => handleInputChange('targetLanguage', value)}
            error={errors?.targetLanguage}
            searchable
            required
          />
        </div>

        <Select
          label="Current Proficiency Level"
          placeholder="Select your current level"
          options={proficiencyLevels}
          value={formData?.proficiencyLevel}
          onChange={(value) => handleInputChange('proficiencyLevel', value)}
          error={errors?.proficiencyLevel}
          required
        />
      </div>
      {/* Learning Goals */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium text-foreground">
          Learning Goals
        </h3>
        <p className="text-sm text-muted-foreground font-body">
          Select all that apply to personalize your learning experience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {learningGoalOptions?.map((goal) => (
            <div key={goal?.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200">
              <Checkbox
                checked={formData?.learningGoals?.includes(goal?.id)}
                onChange={() => handleGoalToggle(goal?.id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  {goal?.label}
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  {goal?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="text-error text-sm font-body bg-error/10 p-3 rounded-md border border-error/20">
          {errors?.submit}
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-8"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;