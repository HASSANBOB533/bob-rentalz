import { Lock, Bell, Shield, Globe, Palette, Database, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Switch } from '../components/ui/switch';

export default function AdminSettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newPropertyAlerts: true,
    serviceRequestAlerts: true,
    assignmentNotifications: true,
    systemAlerts: true,
    weeklyReports: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    ipWhitelist: false,
  });

  const [systemSettings, setSystemSettings] = useState({
    language: 'en',
    timezone: 'Africa/Cairo',
    dateFormat: 'DD/MM/YYYY',
  });

  const handleNotificationToggle = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSecurityToggle = (key: string, value: boolean) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSecurityChange = (key: string, value: string) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSystemChange = (key: string, value: string) => {
    setSystemSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleChangePassword = () => {
    toast.info('Password change functionality coming soon');
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0E56A4]">Settings</h1>
            <p className="text-gray-600 mt-2">
              Configure your admin account and system preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-[#0E56A4]" />
                <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              </div>

              <div className="space-y-6">
                {/* Change Password */}
                <div>
                  <Label>Password</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Input type="password" value="••••••••" disabled className="flex-1" />
                    <Button
                      onClick={handleChangePassword}
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Last changed: 30 days ago</p>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="cursor-pointer">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityToggle('twoFactorAuth', checked)}
                  />
                </div>

                {/* Session Timeout */}
                <div>
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Select
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) => handleSecurityChange('sessionTimeout', value)}
                  >
                    <SelectTrigger id="session-timeout" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* IP Whitelist */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="cursor-pointer">IP Whitelist</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Only allow access from specific IP addresses
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.ipWhitelist}
                    onCheckedChange={(checked) => handleSecurityToggle('ipWhitelist', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-[#0E56A4]" />
                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="cursor-pointer">Email Notifications</Label>
                    <p className="text-sm text-gray-600 mt-1">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle('emailNotifications', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="cursor-pointer">New Property Alerts</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Get notified when new properties are submitted
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newPropertyAlerts}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle('newPropertyAlerts', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="cursor-pointer">Service Request Alerts</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Notifications for new service requests
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.serviceRequestAlerts}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle('serviceRequestAlerts', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="cursor-pointer">Assignment Notifications</Label>
                    <p className="text-sm text-gray-600 mt-1">Updates on agent assignments</p>
                  </div>
                  <Switch
                    checked={notificationSettings.assignmentNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle('assignmentNotifications', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="cursor-pointer">System Alerts</Label>
                    <p className="text-sm text-gray-600 mt-1">Critical system notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) => handleNotificationToggle('systemAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="cursor-pointer">Weekly Reports</Label>
                    <p className="text-sm text-gray-600 mt-1">Receive weekly analytics reports</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      handleNotificationToggle('weeklyReports', checked)
                    }
                  />
                </div>
              </div>
            </div>

            {/* System Preferences */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-[#0E56A4]" />
                <h2 className="text-xl font-semibold text-gray-900">System Preferences</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={systemSettings.language}
                    onValueChange={(value) => handleSystemChange('language', value)}
                  >
                    <SelectTrigger id="language" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic (العربية)</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={systemSettings.timezone}
                    onValueChange={(value) => handleSystemChange('timezone', value)}
                  >
                    <SelectTrigger id="timezone" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Cairo">Cairo (GMT+2)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Asia/Dubai">Dubai (GMT+4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select
                    value={systemSettings.dateFormat}
                    onValueChange={(value) => handleSystemChange('dateFormat', value)}
                  >
                    <SelectTrigger id="date-format" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Database className="w-5 h-5 text-[#0E56A4]" />
                <h2 className="text-xl font-semibold text-gray-900">Advanced Settings</h2>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance & Theme
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="w-4 h-4 mr-2" />
                  Data Export & Backup
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  System Maintenance Mode
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleSaveSettings}
                className="flex-1 sm:flex-initial bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
              >
                Save Settings
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-initial border-gray-300">
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
