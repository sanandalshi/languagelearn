import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const SocialRegistration = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social registration
      const mockUserData = {
        id: Date.now(),
        email: provider === 'google' ? 'user@gmail.com' : 'user@facebook.com',
        displayName: provider === 'google' ? 'John Doe' : 'Jane Smith',
        provider: provider,
        avatar: `https://randomuser.me/api/portraits/${provider === 'google' ? 'men' : 'women'}/32.jpg`,
        createdAt: new Date()?.toISOString()
      };
      
      localStorage.setItem('lingualearn_user', JSON.stringify(mockUserData));
      navigate('/language-selection');
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground font-body">
          Quick registration with social accounts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleSocialLogin('google')}
          loading={loadingProvider === 'google'}
          disabled={loadingProvider !== null}
          iconName="Chrome"
          iconPosition="left"
          className="justify-center"
        >
          Continue with Google
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => handleSocialLogin('facebook')}
          loading={loadingProvider === 'facebook'}
          disabled={loadingProvider !== null}
          iconName="Facebook"
          iconPosition="left"
          className="justify-center"
        >
          Continue with Facebook
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground font-body">
            Or register with email
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;