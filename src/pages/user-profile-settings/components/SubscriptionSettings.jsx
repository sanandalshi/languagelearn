import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SubscriptionSettings = ({ subscriptionData, onSubscriptionUpdate }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(subscriptionData?.currentPlan);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Basic lessons access',
        'Limited daily practice',
        'Community support',
        'Basic progress tracking'
      ],
      limitations: [
        'Max 3 languages',
        'Limited offline content',
        'Ads supported'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      popular: true,
      features: [
        'Unlimited lessons access',
        'Unlimited daily practice',
        'Priority support',
        'Advanced progress analytics',
        'Offline lesson downloads',
        'Ad-free experience',
        'Speaking exercises',
        'Grammar explanations'
      ]
    },
    {
      id: 'family',
      name: 'Family',
      price: '$19.99',
      period: 'month',
      features: [
        'Everything in Premium',
        'Up to 6 family members',
        'Parental controls',
        'Family progress dashboard',
        'Shared achievements',
        'Priority customer support'
      ]
    }
  ];

  const paymentMethods = [
    {
      id: 'card-1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false
    }
  ];

  const billingHistory = [
    {
      id: 'inv-001',
      date: '2024-12-13',
      amount: '$9.99',
      plan: 'Premium Monthly',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'inv-002',
      date: '2024-11-13',
      amount: '$9.99',
      plan: 'Premium Monthly',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'inv-003',
      date: '2024-10-13',
      amount: '$9.99',
      plan: 'Premium Monthly',
      status: 'paid',
      downloadUrl: '#'
    }
  ];

  const handlePlanChange = (planId) => {
    setSelectedPlan(planId);
    onSubscriptionUpdate('changePlan', planId);
  };

  const handleCancelSubscription = () => {
    onSubscriptionUpdate('cancel');
  };

  const handleResumeSubscription = () => {
    onSubscriptionUpdate('resume');
  };

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'failed':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Subscription & Billing
          </h3>
          <p className="text-muted-foreground font-body mt-1">
            Manage your subscription plan and payment methods
          </p>
        </div>
        <Icon name="CreditCard" size={24} className="text-muted-foreground" />
      </div>
      {/* Current Subscription Status */}
      <div className="mb-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Crown" size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">
                {subscriptionData?.planName} Plan
              </h4>
              <p className="text-sm text-muted-foreground">
                {subscriptionData?.status === 'active' ? 'Active' : 'Cancelled'} • 
                Next billing: {subscriptionData?.nextBilling}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-foreground">
              {subscriptionData?.price}
            </p>
            <p className="text-sm text-muted-foreground">
              per {subscriptionData?.period}
            </p>
          </div>
        </div>
        
        {subscriptionData?.status === 'cancelled' && (
          <div className="flex items-center justify-between p-3 bg-warning/10 rounded-md border border-warning/20">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-warning font-medium">
                Subscription cancelled - Access until {subscriptionData?.accessUntil}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResumeSubscription}
              iconName="Play"
              iconPosition="left"
            >
              Resume
            </Button>
          </div>
        )}
      </div>
      {/* Available Plans */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Available Plans
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans?.map((plan) => (
            <div
              key={plan?.id}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedPlan === plan?.id
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              } ${plan?.popular ? 'ring-2 ring-accent/20' : ''}`}
            >
              {plan?.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h5 className="text-lg font-heading font-semibold text-foreground">
                  {plan?.name}
                </h5>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-foreground">
                    {plan?.price}
                  </span>
                  {plan?.period !== 'forever' && (
                    <span className="text-muted-foreground">/{plan?.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {plan?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
                {plan?.limitations?.map((limitation, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name="X" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{limitation}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={selectedPlan === plan?.id ? 'default' : 'outline'}
                size="sm"
                fullWidth
                onClick={() => handlePlanChange(plan?.id)}
                disabled={selectedPlan === plan?.id}
              >
                {selectedPlan === plan?.id ? 'Current Plan' : 'Select Plan'}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Methods */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-heading font-medium text-foreground">
            Payment Methods
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPaymentForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Card
          </Button>
        </div>

        <div className="space-y-3">
          {paymentMethods?.map((method) => (
            <div
              key={method?.id}
              className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <Icon name={getCardIcon(method?.type)} size={20} className="text-muted-foreground" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">
                      •••• •••• •••• {method?.last4}
                    </span>
                    {method?.isDefault && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expires {method?.expiryMonth}/{method?.expiryYear}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!method?.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Star"
                    iconPosition="left"
                  >
                    Set Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  className="text-error hover:text-error hover:bg-error/10"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Billing History */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Billing History
        </h4>
        <div className="space-y-3">
          {billingHistory?.map((invoice) => (
            <div
              key={invoice?.id}
              className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">
                      {invoice?.plan}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(invoice?.status)}`}>
                      {invoice?.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(invoice.date)?.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-semibold text-foreground">
                  {invoice?.amount}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Subscription Actions */}
      {subscriptionData?.status === 'active' && subscriptionData?.currentPlan !== 'free' && (
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between p-4 bg-error/5 rounded-lg border border-error/20">
            <div>
              <h5 className="font-medium text-foreground">Cancel Subscription</h5>
              <p className="text-sm text-muted-foreground">
                You'll keep access until your next billing date
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleCancelSubscription}
              iconName="X"
              iconPosition="left"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSettings;