import {
  ArrowLeft,
  Bell,
  Lock,
  Eye,
  Mail,
  MessageSquare,
  Calendar,
  Shield,
  Download,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';

export default function TenantRentedSettingsPage() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    serviceRequestUpdates: true,
    paymentReminders: true,
    maintenanceSchedule: true,
    propertyNews: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    showEmail: false,
    showPhone: false,
  });

  const handleSaveNotifications = () => {
    // Save notification preferences
    console.log('Saving notifications:', notifications);
  };

  const handleSavePrivacy = () => {
    // Save privacy settings
    console.log('Saving privacy:', privacy);
  };

  return (
    <DashboardLayout userRole="renter" userName="Mohamed Ibrahim">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/tenant/rented/dashboard')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#0E56A4]">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
        </div>

        <div className="space-y-6">
          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#0E56A4]/10 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#0E56A4]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                <p className="text-sm text-gray-600">Choose how you want to receive updates</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={(e) =>
                      setNotifications({ ...notifications, emailNotifications: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive text messages</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.smsNotifications}
                    onChange={(e) =>
                      setNotifications({ ...notifications, smsNotifications: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.pushNotifications}
                    onChange={(e) =>
                      setNotifications({ ...notifications, pushNotifications: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
                </label>
              </div>

              <div className="pt-4 space-y-3">
                <p className="text-sm font-semibold text-gray-700">Notification Types</p>

                <div className="flex items-center justify-between py-2">
                  <p className="text-sm text-gray-700">Service Request Updates</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.serviceRequestUpdates}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          serviceRequestUpdates: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <p className="text-sm text-gray-700">Payment Reminders</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.paymentReminders}
                      onChange={(e) =>
                        setNotifications({ ...notifications, paymentReminders: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <p className="text-sm text-gray-700">Maintenance Schedule</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.maintenanceSchedule}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          maintenanceSchedule: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <p className="text-sm text-gray-700">Property News & Updates</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.propertyNews}
                      onChange={(e) =>
                        setNotifications({ ...notifications, propertyNews: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSaveNotifications}
                  className="bg-[#0E56A4] hover:bg-[#0A3F79] text-white"
                >
                  Save Notification Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#0E56A4]/10 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#0E56A4]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Security</h2>
                <p className="text-sm text-gray-600">Manage your account security settings</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Change Password
                </span>
                <span className="text-gray-400">→</span>
              </Button>

              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Two-Factor Authentication
                </span>
                <span className="text-sm text-gray-500">Not Enabled</span>
              </Button>

              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Login History
                </span>
                <span className="text-gray-400">→</span>
              </Button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#0E56A4]/10 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#0E56A4]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
                <p className="text-sm text-gray-600">Control your privacy preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Visibility
                </label>
                <select
                  value={privacy.profileVisibility}
                  onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                >
                  <option value="private">Private - Only visible to landlord</option>
                  <option value="limited">Limited - Visible to property team</option>
                  <option value="public">Public - Visible to all</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Show Email Address</p>
                  <p className="text-sm text-gray-600">Allow property team to see your email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacy.showEmail}
                    onChange={(e) => setPrivacy({ ...privacy, showEmail: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Show Phone Number</p>
                  <p className="text-sm text-gray-600">Allow property team to see your phone</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacy.showPhone}
                    onChange={(e) => setPrivacy({ ...privacy, showPhone: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0E56A4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0E56A4]"></div>
                </label>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSavePrivacy}
                  className="bg-[#0E56A4] hover:bg-[#0A3F79] text-white"
                >
                  Save Privacy Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#0E56A4]/10 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-[#0E56A4]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
                <p className="text-sm text-gray-600">Download or delete your data</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download My Data
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Request Account Deletion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
