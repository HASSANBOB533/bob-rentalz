import { ArrowLeft, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';

export default function OwnerSettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    leadAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    monthlyReports: true,
  });

  const handleSave = () => {
    toast.success('Settings updated successfully!');
  };

  const handlePasswordChange = () => {
    toast.success('Password changed successfully!');
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <DashboardLayout userRole="owner">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/owner/dashboard"
          className="inline-flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[#0E56A4] mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your security, notifications, and preferences</p>
        </div>

        <div className="space-y-8">
          {/* A) Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0E56A4]/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#0E56A4]" />
              </div>
              <h2 className="text-[#0E56A4]">Security & Password</h2>
            </div>

            <div className="space-y-6">
              {/* Current Password */}
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Must be at least 8 characters with letters and numbers
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                onClick={handlePasswordChange}
                className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
              >
                Update Password
              </Button>
            </div>
          </div>

          {/* B) Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#E9C500]/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#E9C500]" />
              </div>
              <h2 className="text-[#0E56A4]">Notification Preferences</h2>
            </div>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Receive email alerts for important updates
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => toggleSetting('emailNotifications')}
                />
              </div>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-500 mt-1">Get text messages for urgent updates</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={() => toggleSetting('smsNotifications')}
                />
              </div>

              {/* Lead Alerts */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">New Lead Alerts</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Get notified when someone inquires about your properties
                  </p>
                </div>
                <Switch
                  checked={settings.leadAlerts}
                  onCheckedChange={() => toggleSetting('leadAlerts')}
                />
              </div>

              {/* Marketing Emails */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Receive tips, news, and promotional content
                  </p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={() => toggleSetting('marketingEmails')}
                />
              </div>

              {/* Weekly Reports */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Weekly Performance Reports</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Get weekly summaries of your property performance
                  </p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={() => toggleSetting('weeklyReports')}
                />
              </div>

              {/* Monthly Reports */}
              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Monthly Financial Reports</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Receive detailed monthly financial summaries
                  </p>
                </div>
                <Switch
                  checked={settings.monthlyReports}
                  onCheckedChange={() => toggleSetting('monthlyReports')}
                />
              </div>
            </div>
          </div>

          {/* C) Account Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-[#0E56A4] mb-6">Account Actions</h2>

            <div className="space-y-4">
              {/* Two-Factor Authentication */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#0E56A4] text-[#0E56A4] hover:bg-[#0E56A4]/10"
                  >
                    Enable
                  </Button>
                </div>
              </div>

              {/* Download Data */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Download Your Data</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Get a copy of your account data and property information
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Download
                  </Button>
                </div>
              </div>

              {/* Delete Account */}
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-red-900">Delete Account</h3>
                    <p className="text-sm text-red-600 mt-1">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex-1 sm:flex-initial border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 sm:flex-initial bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
