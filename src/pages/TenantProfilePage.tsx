import { ChevronLeft, User, Mail, Phone, Globe, Camera } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function TenantProfilePage() {
  const navigate = useNavigate();

  // UI-only state (no real functionality)
  const [formData, setFormData] = useState({
    fullName: 'Mohamed Ibrahim',
    email: 'mohamed.ibrahim@email.com',
    phone: '+20 123 456 7890',
    language: 'English',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no actual save
  };

  return (
    <DashboardLayout pageTitle="Your Profile" userName="Mohamed Ibrahim" userRole="tenant">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0E56A4] mb-2">Your Profile</h2>
          <p className="text-sm text-gray-600">Manage your personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Profile Picture</h3>

              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-[#E9C500] flex items-center justify-center">
                    <User className="w-16 h-16 text-[#0E56A4]" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#0E56A4] rounded-full flex items-center justify-center shadow-lg hover:bg-[#0A3F79] transition-colors">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Click the camera icon to upload a new photo
                </p>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-white rounded-xl shadow border border-gray-100 p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Account Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-900">Jan 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Inquiries</span>
                  <span className="text-sm font-medium text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Saved Properties</span>
                  <span className="text-sm font-medium text-gray-900">24</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-6">Personal Information</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4]"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4]"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4]"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Preferred Language */}
                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Preferred Language
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4] bg-white text-gray-900"
                    >
                      <option value="English">English</option>
                      <option value="Arabic">Arabic</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Notification Preferences</h4>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#0E56A4] border-gray-300 rounded focus:ring-[#0E56A4]"
                      />
                      <span className="text-sm text-gray-700">
                        Email notifications for new properties
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#0E56A4] border-gray-300 rounded focus:ring-[#0E56A4]"
                      />
                      <span className="text-sm text-gray-700">
                        SMS alerts for inquiry responses
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#0E56A4] border-gray-300 rounded focus:ring-[#0E56A4]"
                      />
                      <span className="text-sm text-gray-700">
                        Marketing and promotional emails
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#0E56A4] text-white hover:bg-[#0A3F79] rounded-lg py-2.5 font-medium transition-colors"
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg py-2.5 font-medium transition-colors"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
