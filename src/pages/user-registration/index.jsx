import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import TermsAndPrivacy from './components/TermsAndPrivacy';

const UserRegistration = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <>
      <Helmet>
        <title>Sign Up - LinguaLearn | Start Your Language Learning Journey</title>
        <meta name="description" content="Create your free LinguaLearn account and join millions of learners worldwide. Choose from 40+ languages with personalized learning paths." />
        <meta name="keywords" content="language learning, sign up, registration, multilingual education, online courses" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="mb-12">
              <RegistrationHeader />
            </div>

            {/* Registration Card */}
            <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
              <div className="p-8">
                {/* Social Registration */}
                <div className="mb-8">
                  <SocialRegistration />
                </div>

                {/* Registration Form */}
                <div className="mb-8">
                  <RegistrationForm />
                </div>

                {/* Terms and Privacy */}
                <div className="mb-6">
                  <TermsAndPrivacy
                    onAcceptanceChange={setTermsAccepted}
                    isAccepted={termsAccepted}
                  />
                </div>
              </div>
            </div>

            {/* Footer Information */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground font-body">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>Cancel anytime</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4 font-body">
                © {new Date()?.getFullYear()} LinguaLearn. All rights reserved. | 
                <span className="mx-1">Made with ❤️ for language learners worldwide</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;