import { useState } from 'react';
import { Lock, Bell, Mail, MessageSquare, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useNavigate } from 'react-router-dom';

export default function TenantSettingsPage() {
  const [settings, setSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    smsNotifications: false,
    propertyAlerts: true,
    messageNotifications: true,
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordUpdate = () => {
    // Validation
    if (!settings.currentPassword) {
      toast.error('Please enter your current password');
      return;
    }
    if (!settings.newPassword) {
      toast.error('Please enter a new password');
      return;
    }
    if (settings.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (settings.newPassword !== settings.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Simulate successful password update
    toast.success('Password updated successfully!');
    
    // Clear password fields
    setSettings({
      ...settings,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleSavePreferences = () => {
    toast.success('Notification preferences saved successfully!');
  };

  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* BACK TO DASHBOARD BUTTON */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* 1️⃣ PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#0E56A4]">Settings</h1>
        <p className="text-gray-600">Manage security and notification preferences</p>
      </div>

      {/* 2️⃣ MAIN SECTIONS */}
      <div className="space-y-10">
        
        {/* SECTION A — PASSWORD CHANGE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          
          {/* Section Header */}
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#0E56A4]" />
            <h2 className="text-xl font-semibold text-[#0E56A4]">Change Password</h2>
          </div>

          <p className="text-sm text-gray-500">
            For your security, please use a strong password with at least 8 characters
          </p>

          {/* Password Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CURRENT PASSWORD */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent pr-10"
                  value={settings.currentPassword}
                  onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent pr-10"
                  value={settings.newPassword}
                  onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* CONFIRM NEW PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent pr-10"
                  value={settings.confirmPassword}
                  onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {settings.newPassword && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600">Password strength:</p>
              <div className="flex gap-1">
                <div className={`h-1 flex-1 rounded ${settings.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                <div className={`h-1 flex-1 rounded ${settings.newPassword.length >= 10 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                <div className={`h-1 flex-1 rounded ${settings.newPassword.length >= 12 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              </div>
              <p className="text-xs text-gray-500">
                {settings.newPassword.length < 8 
                  ? 'Weak - Use at least 8 characters' 
                  : settings.newPassword.length < 10 
                  ? 'Good' 
                  : 'Strong'}
              </p>
            </div>
          )}

          {/* Update Password Button */}
          <button
            onClick={handlePasswordUpdate}
            className="px-6 py-3 bg-[#0E56A4] text-white rounded-lg font-medium hover:bg-[#0c447f] transition"
          >
            Update Password
          </button>
        </div>

        {/* SECTION B — NOTIFICATION SETTINGS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          
          {/* Section Header */}
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0E56A4]" />
            <h2 className="text-xl font-semibold text-[#0E56A4]">Notification Preferences</h2>
          </div>

          <p className="text-sm text-gray-500">
            Choose how you want to receive updates and alerts
          </p>

          {/* Notification Options */}
          <div className="space-y-5">
            
            {/* EMAIL NOTIFICATIONS */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0E56A4] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    setSettings({ ...settings, emailNotifications: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
              </label>
            </div>

            {/* SMS NOTIFICATIONS */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#0E56A4] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via text message</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) =>
                    setSettings({ ...settings, smsNotifications: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
              </label>
            </div>

            {/* PROPERTY ALERTS */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-[#0E56A4] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Property Alerts</p>
                  <p className="text-sm text-gray-500">Alerts for new matching properties</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.propertyAlerts}
                  onChange={(e) =>
                    setSettings({ ...settings, propertyAlerts: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
              </label>
            </div>

            {/* MESSAGE NOTIFICATIONS */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#0E56A4] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Message Notifications</p>
                  <p className="text-sm text-gray-500">Alerts for new messages from agents</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.messageNotifications}
                  onChange={(e) =>
                    setSettings({ ...settings, messageNotifications: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
              </label>
            </div>
          </div>

          {/* Save Preferences Button */}
          <button
            onClick={handleSavePreferences}
            className="w-full py-3 bg-[#0E56A4] text-white rounded-lg font-medium hover:bg-[#0c447f] transition"
          >
            Save Preferences
          </button>
        </div>

        {/* ACCOUNT SECURITY NOTICE */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-[#0E56A4] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-[#0E56A4] mb-1">Security Tip</h3>
              <p className="text-sm text-gray-600">
                We recommend using a unique password and enabling all notification options to stay updated on new properties and messages. Never share your password with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
