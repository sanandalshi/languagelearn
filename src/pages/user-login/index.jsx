import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLoginOptions from './components/SocialLoginOptions';
import RegistrationPrompt from './components/RegistrationPrompt';
import SecurityFeatures from './components/SecurityFeatures';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      const session = JSON.parse(userSession);
      // Check if session is still valid (example: within 24 hours)
      const loginTime = new Date(session.loginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
      
      if (hoursDiff < 24 || session?.rememberMe) {
        navigate('/learning-dashboard');
      }
    }
  }, [navigate]);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div 
            className="flex justify-center mb-4 cursor-pointer transition-transform duration-150 ease-out hover:scale-105"
            onClick={handleLogoClick}
          >
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="Languages" size={28} color="white" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground font-body">
            Sign in to continue your language learning journey
          </p>
        </div>

        {/* Main Login Card */}
        <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
          <div className="p-6">
            {/* Social Login Options */}
            <SocialLoginOptions />

            {/* Login Form */}
            <div className="mt-6">
              <LoginForm />
            </div>

            {/* Security Features */}
            <div className="mt-6">
              <SecurityFeatures />
            </div>
          </div>
        </div>

        {/* Registration Prompt */}
        <RegistrationPrompt />

        {/* Additional Features */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={16} />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Globe" size={16} />
              <span>30+ Languages</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date()?.getFullYear()} LinguaLearn. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;