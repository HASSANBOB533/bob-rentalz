import { ArrowLeft, Upload, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';
import { DashboardLayout } from '../components/DashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

export default function OwnerProfilePage() {
  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    toast.info('Changes discarded');
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
          <h1 className="text-[#0E56A4] mb-2">Profile Information</h1>
          <p className="text-gray-600">Update your personal and business details</p>
        </div>

        <div className="space-y-8">
          {/* A) Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#0E56A4]">Personal Information</h2>
              <Badge className="bg-[#E9C500] text-gray-900 border-[#E9C500]">Owner</Badge>
            </div>

            <div className="space-y-6">
              {/* Avatar Upload */}
              <div>
                <Label>Profile Picture</Label>
                <div className="mt-3 flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-[#0E56A4] transition-colors">
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload new photo</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Ahmed" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Hassan" className="mt-1.5" />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="owner@bob.com" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+20 100 123 4567" className="mt-1.5" />
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  defaultValue="123 Main Street, New Cairo, Egypt"
                  rows={3}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* B) Business Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-[#0E56A4] mb-6">Business Information</h2>
            <div className="space-y-6">
              {/* Company Name */}
              <div>
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input id="company" placeholder="e.g., Hassan Properties LLC" className="mt-1.5" />
              </div>

              {/* Tax Number */}
              <div>
                <Label htmlFor="tax-number">Tax Number (Optional)</Label>
                <Input id="tax-number" placeholder="e.g., 123-456-789" className="mt-1.5" />
                <p className="text-sm text-gray-500 mt-2">
                  For financial reporting and tax purposes
                </p>
              </div>

              {/* Business Address */}
              <div>
                <Label htmlFor="business-address">Business Address (Optional)</Label>
                <Textarea
                  id="business-address"
                  placeholder="Enter your business address if different from personal address"
                  rows={3}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Account Information (Read-only) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-[#0E56A4] mb-6">Account Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Account Type</span>
                <Badge className="bg-[#E9C500] text-gray-900 border-[#E9C500]">
                  Property Owner
                </Badge>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">January 2023</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Total Properties</span>
                <span className="font-medium text-[#0E56A4]">8 Properties</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Account Status</span>
                <Badge className="bg-green-100 text-green-700 border-green-200">Verified</Badge>
              </div>
            </div>
          </div>

          {/* C) Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 sm:flex-initial border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 sm:flex-initial bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
