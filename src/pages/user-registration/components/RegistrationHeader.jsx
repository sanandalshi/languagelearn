import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/user-login');
  };

  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-card">
          <Icon name="Languages" size={32} color="white" />
        </div>
      </div>

      {/* Title and Description */}
      <div className="space-y-3">
        <h1 className="text-4xl font-heading font-bold text-foreground">
          Join LinguaLearn
        </h1>
        <p className="text-lg text-muted-foreground font-body max-w-md mx-auto">
          Start your personalized language learning journey today. Join millions of learners worldwide.
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center space-x-8 text-sm">
        <div className="text-center">
          <div className="font-semibold text-foreground">2.5M+</div>
          <div className="text-muted-foreground">Active Learners</div>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <div className="font-semibold text-foreground">40+</div>
          <div className="text-muted-foreground">Languages</div>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <div className="font-semibold text-foreground">4.8★</div>
          <div className="text-muted-foreground">User Rating</div>
        </div>
      </div>

      {/* Login Link */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-muted-foreground font-body">
          Already have an account?
        </span>
        <Button
          variant="link"
          size="sm"
          onClick={handleLoginRedirect}
          className="p-0 h-auto font-medium"
        >
          Sign in here
        </Button>
      </div>
    </div>
  );
};

export default RegistrationHeader;