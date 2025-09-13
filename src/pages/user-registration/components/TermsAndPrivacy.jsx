import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TermsAndPrivacy = ({ onAcceptanceChange, isAccepted = false }) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleAcceptanceChange = (checked) => {
    onAcceptanceChange?.(checked);
  };

  const TermsModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[1200] bg-black/50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-card rounded-lg shadow-modal border border-border w-full max-w-2xl max-h-[80vh] overflow-hidden animate-scale-in">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-xl font-heading font-semibold text-foreground">
              {title}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="prose prose-sm max-w-none text-foreground font-body">
              {content}
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-border">
            <Button
              variant="default"
              onClick={onClose}
              fullWidth
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const termsContent = (
    <div className="space-y-4">
      <h4 className="font-semibold">1. Acceptance of Terms</h4>
      <p>By creating an account with LinguaLearn, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
      
      <h4 className="font-semibold">2. User Account</h4>
      <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
      
      <h4 className="font-semibold">3. Learning Content</h4>
      <p>Our educational content is provided for personal, non-commercial use. You may not redistribute, modify, or create derivative works from our materials.</p>
      
      <h4 className="font-semibold">4. User Conduct</h4>
      <p>You agree to use our platform respectfully and not engage in any activity that could harm other users or the platform's functionality.</p>
      
      <h4 className="font-semibold">5. Privacy</h4>
      <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.</p>
      
      <h4 className="font-semibold">6. Modifications</h4>
      <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>
    </div>
  );

  const privacyContent = (
    <div className="space-y-4">
      <h4 className="font-semibold">Information We Collect</h4>
      <p>We collect information you provide directly, such as your name, email, learning preferences, and progress data.</p>
      
      <h4 className="font-semibold">How We Use Your Information</h4>
      <p>We use your information to provide personalized learning experiences, track your progress, and improve our services.</p>
      
      <h4 className="font-semibold">Information Sharing</h4>
      <p>We do not sell your personal information. We may share anonymized data for research and improvement purposes.</p>
      
      <h4 className="font-semibold">Data Security</h4>
      <p>We implement industry-standard security measures to protect your personal information from unauthorized access.</p>
      
      <h4 className="font-semibold">Your Rights</h4>
      <p>You have the right to access, update, or delete your personal information at any time through your account settings.</p>
      
      <h4 className="font-semibold">Contact Us</h4>
      <p>If you have questions about this Privacy Policy, please contact us at privacy@linguallearn.com</p>
    </div>
  );

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border border-border">
          <Checkbox
            checked={isAccepted}
            onChange={(e) => handleAcceptanceChange(e?.target?.checked)}
            className="mt-1"
          />
          <div className="flex-1 text-sm font-body">
            <p className="text-foreground">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-primary hover:text-primary/80 underline font-medium"
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="text-primary hover:text-primary/80 underline font-medium"
              >
                Privacy Policy
              </button>
            </p>
            <p className="text-muted-foreground mt-1">
              Required to create your account and start learning
            </p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground font-body text-center space-y-1">
          <p>By registering, you confirm that you are at least 13 years old.</p>
          <p>We'll send you occasional updates about new features and learning tips.</p>
        </div>
      </div>
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms of Service"
        content={termsContent}
      />
      <TermsModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Privacy Policy"
        content={privacyContent}
      />
    </>
  );
};

export default TermsAndPrivacy;