import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    title: "Senior Portfolio Manager",
    department: "Investment Management",
    location: "New York, NY",
    timezone: "America/New_York",
    bio: "Experienced portfolio manager with 15+ years in institutional investment management, specializing in equity and fixed income strategies.",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const timezoneOptions = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Zurich", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Hong_Kong", label: "Hong Kong Time (HKT)" }
  ];

  const departmentOptions = [
    { value: "Investment Management", label: "Investment Management" },
    { value: "Risk Management", label: "Risk Management" },
    { value: "Research", label: "Research" },
    { value: "Operations", label: "Operations" },
    { value: "Compliance", label: "Compliance" },
    { value: "Client Relations", label: "Client Relations" }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data in real implementation
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
              <Image
                src={profileData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                <Icon name="Camera" size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-muted-foreground">{profileData.title}</p>
                <p className="text-sm text-muted-foreground">{profileData.department}</p>
              </div>
              
              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    iconName="Edit"
                    iconPosition="left"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      loading={isSaving}
                      iconName="Save"
                      iconPosition="left"
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={profileData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Job Title"
            type="text"
            value={profileData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            disabled={!isEditing}
          />
          
          <Select
            label="Department"
            options={departmentOptions}
            value={profileData.department}
            onChange={(value) => handleInputChange('department', value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Location"
            type="text"
            value={profileData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            disabled={!isEditing}
          />
          
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={profileData.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            disabled={!isEditing}
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            disabled={!isEditing}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground disabled:bg-muted disabled:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      {/* Professional Credentials */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Professional Credentials</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Award" size={20} className="text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">Chartered Financial Analyst (CFA)</p>
                <p className="text-sm text-muted-foreground">CFA Institute • Valid until Dec 2025</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="status-positive">Active</span>
              {isEditing && (
                <Button variant="ghost" size="icon">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Master of Business Administration</p>
                <p className="text-sm text-muted-foreground">Wharton School • 2008</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="status-positive">Verified</span>
              {isEditing && (
                <Button variant="ghost" size="icon">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              )}
            </div>
          </div>
          
          {isEditing && (
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              className="w-full"
            >
              Add Credential
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;