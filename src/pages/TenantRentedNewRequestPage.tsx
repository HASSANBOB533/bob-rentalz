import {
  ArrowLeft,
  Wrench,
  Sparkles,
  FileText,
  MessageCircle,
  Calendar,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';

export default function TenantRentedNewRequestPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    property: 'Modern 2BR Apartment',
    type: '',
    priority: 'Medium',
    subject: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
    allowEntry: 'yes',
  });

  const requestTypes = [
    {
      id: 'maintenance',
      label: 'Maintenance',
      icon: <Wrench className="w-6 h-6" />,
      description: 'Repairs, plumbing, electrical issues',
      color: 'blue',
    },
    {
      id: 'housekeeping',
      label: 'Housekeeping',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Cleaning services, deep cleaning',
      color: 'purple',
    },
    {
      id: 'document',
      label: 'Document Request',
      icon: <FileText className="w-6 h-6" />,
      description: 'Lease copies, receipts, certificates',
      color: 'green',
    },
    {
      id: 'inquiry',
      label: 'General Inquiry',
      icon: <MessageCircle className="w-6 h-6" />,
      description: 'Questions, general assistance',
      color: 'gray',
    },
  ];

  const getTypeColor = (color: string) => {
    const colors = {
      blue: 'border-blue-300 bg-blue-50 hover:border-blue-500',
      purple: 'border-purple-300 bg-purple-50 hover:border-purple-500',
      green: 'border-green-300 bg-green-50 hover:border-green-500',
      gray: 'border-gray-300 bg-gray-50 hover:border-gray-500',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getSelectedTypeColor = (color: string) => {
    const colors = {
      blue: 'border-blue-500 bg-blue-100 ring-2 ring-blue-500',
      purple: 'border-purple-500 bg-purple-100 ring-2 ring-purple-500',
      green: 'border-green-500 bg-green-100 ring-2 ring-green-500',
      gray: 'border-gray-500 bg-gray-100 ring-2 ring-gray-500',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.type) {
      toast.error('Please select a request type');
      return;
    }
    if (!formData.subject) {
      toast.error('Please enter a subject');
      return;
    }
    if (!formData.description) {
      toast.error('Please provide a description');
      return;
    }

    // Success
    toast.success('Service request submitted successfully!');
    setTimeout(() => {
      navigate('/tenant/rented/service-requests');
    }, 1500);
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
          <h1 className="text-3xl font-bold text-[#0E56A4]">New Service Request</h1>
          <p className="text-gray-600 mt-1">Submit a new maintenance or service request</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Selection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
            <select
              value={formData.property}
              onChange={(e) => setFormData({ ...formData, property: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E56A4]"
              required
            >
              <option>Modern 2BR Apartment</option>
            </select>
          </div>

          {/* Request Type Selection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Request Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {requestTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`p-4 border-2 rounded-xl transition-all text-left ${
                    formData.type === type.id
                      ? getSelectedTypeColor(type.color)
                      : getTypeColor(type.color)
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`mb-2 ${formData.type === type.id ? 'text-' + type.color + '-700' : 'text-gray-600'}`}
                    >
                      {type.icon}
                    </div>
                    <p className="font-semibold text-sm mb-1">{type.label}</p>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div className="flex gap-3">
              {['Low', 'Medium', 'High'].map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority })}
                  className={`flex-1 p-3 border-2 rounded-lg font-medium transition-all ${
                    formData.priority === priority
                      ? priority === 'High'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : priority === 'Medium'
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of the issue"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E56A4]"
              required
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detailed information about your request..."
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E56A4] resize-none"
              required
            />
          </div>

          {/* Scheduling */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Preferred Scheduling (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E56A4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Preferred Time
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E56A4]"
                >
                  <option value="">Select time slot</option>
                  <option value="morning">Morning (8 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Access Permission */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Allow entry if you're not home?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="allowEntry"
                  value="yes"
                  checked={formData.allowEntry === 'yes'}
                  onChange={(e) => setFormData({ ...formData, allowEntry: e.target.value })}
                  className="w-4 h-4 text-[#0E56A4] focus:ring-[#0E56A4]"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="allowEntry"
                  value="no"
                  checked={formData.allowEntry === 'no'}
                  onChange={(e) => setFormData({ ...formData, allowEntry: e.target.value })}
                  className="w-4 h-4 text-[#0E56A4] focus:ring-[#0E56A4]"
                />
                <span>No, I'll be present</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/tenant/rented/service-requests')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#0E56A4] hover:bg-[#0A3F79] text-white">
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
