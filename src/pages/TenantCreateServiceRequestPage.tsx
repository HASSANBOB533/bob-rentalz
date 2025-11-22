import { ArrowLeft, Home, Wrench, FileText, MessageCircle, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function TenantCreateServiceRequestPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceType = searchParams.get('type') || 'Maintenance';

  const [formData, setFormData] = useState({
    property: '',
    priority: 'medium',
    subject: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  // Mock properties for selection
  const rentedProperties = [
    { id: 1, name: 'Modern 2BR Apartment in New Cairo' },
    { id: 2, name: 'Spacious 3BR Penthouse in Maadi' },
  ];

  const serviceTypeConfig: Record<string, { icon: any; color: string; title: string }> = {
    Housekeeping: {
      icon: Home,
      color: '#0E56A4',
      title: 'Housekeeping Request',
    },
    Maintenance: {
      icon: Wrench,
      color: '#E9C500',
      title: 'Maintenance Request',
    },
    'Document Request': {
      icon: FileText,
      color: '#0E56A4',
      title: 'Document Request',
    },
    'General Inquiry': {
      icon: MessageCircle,
      color: '#E9C500',
      title: 'General Inquiry',
    },
  };

  const config = serviceTypeConfig[serviceType] || serviceTypeConfig['Maintenance'];
  const IconComponent = config.icon;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.property) {
      toast.error('Please select a property');
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

    // Mock submission
    toast.success('Service request submitted successfully!');
    setTimeout(() => {
      navigate('/tenant/service-requests');
    }, 1000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/tenant/service-requests')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Service Requests</span>
      </button>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <IconComponent className="w-8 h-8" style={{ color: config.color }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0E56A4] mb-1">{config.title}</h1>
              <p className="text-sm text-gray-600">
                Fill out the form below to submit your request
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
        >
          {/* Property Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.property}
              onChange={(e) => setFormData({ ...formData, property: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
              required
            >
              <option value="">Select a property</option>
              {rentedProperties.map((property) => (
                <option key={property.id} value={property.name}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          {serviceType === 'Maintenance' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['low', 'medium', 'high'].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority })}
                    className={`px-4 py-2.5 rounded-lg border-2 font-medium transition-all ${
                      formData.priority === priority
                        ? 'border-[#0E56A4] bg-[#0E56A4] text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-[#0E56A4]'
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder={`e.g., ${serviceType === 'Maintenance' ? 'Air conditioning not working' : serviceType === 'Housekeeping' ? 'Weekly cleaning service' : serviceType === 'Document Request' ? 'Rental certificate needed' : 'Question about lease terms'}`}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detailed information about your request..."
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Preferred Date & Time */}
          {(serviceType === 'Maintenance' || serviceType === 'Housekeeping') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 8PM)</option>
                </select>
              </div>
            </div>
          )}

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
            <div className="space-y-3">
              {/* Upload Button */}
              <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#0E56A4] cursor-pointer transition-colors">
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload photos or documents</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Attachment List */}
              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/tenant/service-requests')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#0E56A4] text-white rounded-lg font-medium hover:bg-[#0A3F79] transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
