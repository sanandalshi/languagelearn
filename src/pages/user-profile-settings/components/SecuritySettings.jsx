import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import Icon from '../../../components/AppIcon';

const SecuritySettings = ({ securityData, onSecurityUpdate }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [errors, setErrors] = useState({});

  const activeSessions = [
    {
      id: 'session-1',
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      location: 'New York, NY',
      lastActive: '2024-12-13 18:30',
      isCurrent: true,
      ipAddress: '192.168.1.100'
    },
    {
      id: 'session-2',
      device: 'iPhone 15',
      browser: 'Safari Mobile',
      location: 'New York, NY',
      lastActive: '2024-12-13 16:45',
      isCurrent: false,
      ipAddress: '192.168.1.101'
    },
    {
      id: 'session-3',
      device: 'Windows PC',
      browser: 'Edge 119.0',
      location: 'Boston, MA',
      lastActive: '2024-12-12 14:20',
      isCurrent: false,
      ipAddress: '203.0.113.45'
    }
  ];

  const loginHistory = [
    {
      id: 'login-1',
      timestamp: '2024-12-13 18:30:15',
      device: 'MacBook Pro',
      location: 'New York, NY',
      status: 'success',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'login-2',
      timestamp: '2024-12-13 16:45:22',
      device: 'iPhone 15',
      location: 'New York, NY',
      status: 'success',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'login-3',
      timestamp: '2024-12-12 14:20:08',
      device: 'Windows PC',
      location: 'Boston, MA',
      status: 'success',
      ipAddress: '203.0.113.45'
    },
    {
      id: 'login-4',
      timestamp: '2024-12-11 09:15:33',
      device: 'Unknown Device',
      location: 'Unknown Location',
      status: 'failed',
      ipAddress: '198.51.100.42'
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    const newErrors = {};

    if (!passwordForm?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordForm?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSecurityUpdate('changePassword', passwordForm);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
  };

  const handleEnable2FA = () => {
    if (twoFactorCode?.length === 6) {
      onSecurityUpdate('enable2FA', twoFactorCode);
      setTwoFactorCode('');
      setShowTwoFactorSetup(false);
    }
  };

  const handleDisable2FA = () => {
    onSecurityUpdate('disable2FA');
  };

  const handleLogoutSession = (sessionId) => {
    onSecurityUpdate('logoutSession', sessionId);
  };

  const handleLogoutAllSessions = () => {
    onSecurityUpdate('logoutAllSessions');
  };

  const getDeviceIcon = (device) => {
    if (device?.includes('iPhone') || device?.includes('Android')) return 'Smartphone';
    if (device?.includes('iPad') || device?.includes('Tablet')) return 'Tablet';
    return 'Monitor';
  };

  const getStatusBadge = (status) => {
    return status === 'success' ?'bg-success/10 text-success' :'bg-error/10 text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Security Settings
          </h3>
          <p className="text-muted-foreground font-body mt-1">
            Manage your account security and authentication methods
          </p>
        </div>
        <Icon name="Shield" size={24} className="text-muted-foreground" />
      </div>
      {/* Password Settings */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-heading font-medium text-foreground">
              Password
            </h4>
            <p className="text-sm text-muted-foreground">
              Last changed: {securityData?.passwordLastChanged}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            iconName="Key"
            iconPosition="left"
          >
            Change Password
          </Button>
        </div>

        {showPasswordForm && (
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordForm?.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
                error={errors?.currentPassword}
                required
              />

              <Input
                label="New Password"
                type="password"
                value={passwordForm?.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
                error={errors?.newPassword}
                description="Must be at least 8 characters long"
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                value={passwordForm?.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
                error={errors?.confirmPassword}
                required
              />

              <div className="flex items-center space-x-3">
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  iconName="Save"
                  iconPosition="left"
                >
                  Update Password
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPasswordForm(false)}
                  iconName="X"
                  iconPosition="left"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-heading font-medium text-foreground">
              Two-Factor Authentication
            </h4>
            <p className="text-sm text-muted-foreground">
              {securityData?.twoFactorEnabled 
                ? 'Enabled - Your account is protected with 2FA' :'Disabled - Add an extra layer of security'
              }
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              securityData?.twoFactorEnabled ? 'bg-success' : 'bg-muted-foreground'
            }`} />
            <Button
              variant={securityData?.twoFactorEnabled ? 'destructive' : 'default'}
              size="sm"
              onClick={securityData?.twoFactorEnabled ? handleDisable2FA : () => setShowTwoFactorSetup(true)}
              iconName={securityData?.twoFactorEnabled ? 'ShieldOff' : 'ShieldCheck'}
              iconPosition="left"
            >
              {securityData?.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </div>
        </div>

        {showTwoFactorSetup && (
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="text-center mb-4">
              <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border">
                <div className="text-xs text-muted-foreground">QR Code</div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Scan this QR code with your authenticator app, then enter the 6-digit code below
              </p>
            </div>

            <div className="max-w-xs mx-auto">
              <Input
                label="Verification Code"
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
                placeholder="000000"
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />

              <div className="flex items-center space-x-3 mt-4">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleEnable2FA}
                  disabled={twoFactorCode?.length !== 6}
                  iconName="Check"
                  iconPosition="left"
                  fullWidth
                >
                  Enable 2FA
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTwoFactorSetup(false)}
                  iconName="X"
                  iconPosition="left"
                  fullWidth
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Active Sessions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-heading font-medium text-foreground">
            Active Sessions
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogoutAllSessions}
            iconName="LogOut"
            iconPosition="left"
          >
            Logout All
          </Button>
        </div>

        <div className="space-y-3">
          {activeSessions?.map((session) => (
            <div
              key={session?.id}
              className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-4">
                <Icon name={getDeviceIcon(session?.device)} size={20} className="text-muted-foreground" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">
                      {session?.device}
                    </span>
                    {session?.isCurrent && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session?.browser} • {session?.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last active: {session?.lastActive} • IP: {session?.ipAddress}
                  </p>
                </div>
              </div>

              {!session?.isCurrent && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLogoutSession(session?.id)}
                  iconName="LogOut"
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  Logout
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Login History */}
      <div className="mb-8">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Recent Login Activity
        </h4>
        <div className="space-y-3">
          {loginHistory?.map((login) => (
            <div
              key={login?.id}
              className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-4">
                <Icon name={getDeviceIcon(login?.device)} size={20} className="text-muted-foreground" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">
                      {login?.device}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(login?.status)}`}>
                      {login?.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {login?.location} • {login?.timestamp}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    IP: {login?.ipAddress}
                  </p>
                </div>
              </div>

              {login?.status === 'failed' && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="AlertTriangle"
                  className="text-warning"
                >
                  Report
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Security Recommendations */}
      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-accent mt-0.5" />
          <div>
            <h5 className="font-medium text-foreground mb-2">
              Security Recommendations
            </h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use a strong, unique password for your account</li>
              <li>• Enable two-factor authentication for extra security</li>
              <li>• Regularly review your active sessions and login history</li>
              <li>• Report any suspicious login attempts immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;