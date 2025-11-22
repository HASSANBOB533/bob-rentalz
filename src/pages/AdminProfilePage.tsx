import { User, Mail, Phone, MapPin, Shield, Camera } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

export default function AdminProfilePage() {
  const [formData, setFormData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@bob.com',
    phone: '+20 100 123 4567',
    role: 'System Administrator',
    city: 'Cairo',
    bio: 'System administrator managing the Best of Bedz Rentalz platform.',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0E56A4]">Admin Profile</h1>
            <p className="text-gray-600 mt-2">Manage your administrative account information</p>
          </div>

          <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-[#E9C500] flex items-center justify-center">
                    <User className="w-12 h-12 text-[#0E56A4]" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-[#0E56A4] text-white rounded-full hover:bg-[#0A3F79] transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Admin User</p>
                  <p className="text-sm text-gray-500 mb-3">System Administrator</p>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        className="pl-10"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="lastName"
                        type="text"
                        className="pl-10"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="city"
                      type="text"
                      className="pl-10"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    className="mt-1.5"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Admin Role Information (Read-Only) */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Administrator Privileges</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    You have full system access with administrator privileges.
                  </p>
                  <div className="bg-white border border-red-200 rounded-lg p-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Role</p>
                        <p className="font-medium text-gray-900">{formData.role}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Access Level</p>
                        <p className="font-medium text-gray-900">Full System Access</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Activity</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Last Login</p>
                  <p className="font-semibold text-gray-900">Today at 9:30 AM</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Account Created</p>
                  <p className="font-semibold text-gray-900">Jan 15, 2024</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Actions</p>
                  <p className="font-semibold text-gray-900">1,247</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleSave}
                className="flex-1 sm:flex-initial bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
              >
                Save Changes
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-initial border-gray-300">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
