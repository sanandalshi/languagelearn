import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Icon from '../AppIcon';

const AuthenticationGate = ({ mode = 'login', onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const isLoginMode = mode === 'login';

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginMode) {
      if (!formData?.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onAuthSuccess) {
        onAuthSuccess();
      } else {
        navigate('/language-selection');
      }
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    const newPath = isLoginMode ? '/user-registration' : '/user-login';
    navigate(newPath);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-card">
              <Icon name="Languages" size={28} color="white" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            LinguaLearn
          </h1>
          <p className="text-muted-foreground font-body">
            {isLoginMode 
              ? 'Welcome back! Continue your learning journey.' :'Start your language learning adventure today.'
            }
          </p>
        </div>

        {/* Authentication Form */}
        <div className="bg-card rounded-lg shadow-card border border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData?.fullName}
                onChange={(e) => handleInputChange('fullName', e?.target?.value)}
                error={errors?.fullName}
                required
              />
            )}

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
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />

            {!isLoginMode && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData?.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                error={errors?.confirmPassword}
                required
              />
            )}

            {errors?.submit && (
              <div className="text-error text-sm font-body bg-error/10 p-3 rounded-md">
                {errors?.submit}
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              className="mt-6"
            >
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm font-body">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={switchMode}
                className="ml-1 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                {isLoginMode ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-body">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationGate;