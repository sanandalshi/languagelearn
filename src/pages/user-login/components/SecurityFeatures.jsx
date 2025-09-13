import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const [attemptCount, setAttemptCount] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [rateLimitWarning, setRateLimitWarning] = useState(false);

  useEffect(() => {
    // Check for previous failed attempts in localStorage
    const failedAttempts = localStorage.getItem('loginAttempts');
    if (failedAttempts) {
      const attempts = parseInt(failedAttempts);
      setAttemptCount(attempts);
      if (attempts >= 3) {
        setShowCaptcha(true);
      }
      if (attempts >= 5) {
        setRateLimitWarning(true);
      }
    }
  }, []);

  const incrementAttempts = () => {
    const newCount = attemptCount + 1;
    setAttemptCount(newCount);
    localStorage.setItem('loginAttempts', newCount?.toString());
    
    if (newCount >= 3) {
      setShowCaptcha(true);
    }
    if (newCount >= 5) {
      setRateLimitWarning(true);
    }
  };

  const resetAttempts = () => {
    setAttemptCount(0);
    setShowCaptcha(false);
    setRateLimitWarning(false);
    localStorage.removeItem('loginAttempts');
  };

  if (!showCaptcha && !rateLimitWarning) {
    return null;
  }

  return (
    <div className="space-y-3">
      {rateLimitWarning && (
        <div className="bg-warning/10 border border-warning/20 rounded-md p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-warning font-medium">
              Multiple failed attempts detected
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Please wait before trying again or contact support if you need help.
          </p>
        </div>
      )}

      {showCaptcha && (
        <div className="bg-muted/50 border border-border rounded-md p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              Security Verification
            </span>
            <Icon name="Shield" size={16} className="text-primary" />
          </div>
          
          {/* Mock CAPTCHA */}
          <div className="bg-card border border-border rounded p-3 text-center">
            <div className="text-lg font-mono text-foreground mb-2 select-none">
              7 + 3 = ?
            </div>
            <input
              type="text"
              placeholder="Enter answer"
              className="w-20 px-2 py-1 text-center border border-border rounded text-sm"
              maxLength="2"
            />
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Complete this verification to continue
          </p>
        </div>
      )}

      {attemptCount > 0 && (
        <div className="text-center">
          <button
            onClick={resetAttempts}
            className="text-xs text-primary hover:text-primary/80 underline"
          >
            Reset security checks
          </button>
        </div>
      )}
    </div>
  );
};

export default SecurityFeatures;