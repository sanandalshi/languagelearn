import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const RegistrationPrompt = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/user-registration');
  };

  return (
    <div className="mt-8 text-center">
      <div className="bg-muted/30 rounded-lg p-6 border border-border">
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          New to LinguaLearn?
        </h3>
        <p className="text-muted-foreground font-body mb-4">
          Join thousands of learners mastering new languages with our interactive platform.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Free to start</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>30+ languages</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Progress tracking</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleCreateAccount}
          className="mt-4"
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Account
        </Button>
      </div>

      <p className="text-xs text-muted-foreground font-body mt-4">
        By signing in, you agree to our{' '}
        <button className="text-primary hover:text-primary/80 underline">
          Terms of Service
        </button>{' '}
        and{' '}
        <button className="text-primary hover:text-primary/80 underline">
          Privacy Policy
        </button>
      </p>
    </div>
  );
};

export default RegistrationPrompt;