import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProfileHeader = ({ userProfile, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName,
    email: userProfile?.email,
    bio: userProfile?.bio
  });
  const [profileImage, setProfileImage] = useState(userProfile?.avatar);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setIsUploading(false);
    }, 1500);
  };

  const handleSave = () => {
    onProfileUpdate({
      ...formData,
      avatar: profileImage
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      displayName: userProfile?.displayName,
      email: userProfile?.email,
      bio: userProfile?.bio
    });
    setProfileImage(userProfile?.avatar);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-4 border-background shadow-card">
              {isUploading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="Loader2" size={24} className="animate-spin text-primary" />
                </div>
              ) : (
                <Image
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-card">
                <Icon name="Camera" size={16} color="white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Member since {userProfile?.joinDate}
            </p>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <Icon name="Trophy" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">
                {userProfile?.totalPoints} points
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1 space-y-4">
          {isEditing ? (
            <>
              <Input
                label="Display Name"
                type="text"
                value={formData?.displayName}
                onChange={(e) => handleInputChange('displayName', e?.target?.value)}
                placeholder="Enter your display name"
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                placeholder="Enter your email"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bio
                </label>
                <textarea
                  value={formData?.bio}
                  onChange={(e) => handleInputChange('bio', e?.target?.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  iconName="Check"
                  iconPosition="left"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  iconName="X"
                  iconPosition="left"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  {userProfile?.displayName}
                </h2>
                <p className="text-muted-foreground font-body">
                  {userProfile?.email}
                </p>
              </div>
              
              {userProfile?.bio && (
                <p className="text-foreground font-body leading-relaxed">
                  {userProfile?.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {userProfile?.languages?.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    <span>{lang?.flag}</span>
                    <span>{lang?.name}</span>
                    <span className="text-xs opacity-75">({lang?.level})</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconPosition="left"
                className="mt-4"
              >
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;