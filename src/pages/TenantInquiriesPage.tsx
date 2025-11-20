import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function TenantInquiriesPage() {
  const navigate = useNavigate();

  // Placeholder data
  const inquiries = [
    {
      id: 1,
      propertyName: 'Modern 2BR Apartment in New Cairo',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop',
      agentName: 'Sarah Johnson',
      agentRole: 'Real Estate Agent',
      message: 'Hi, I\'m interested in viewing this property. Is it available next week?',
      status: 'Replied',
      timestamp: '2 hours ago',
      lastReply: 'Yes, we can schedule a viewing for Tuesday at 3 PM.'
    },
    {
      id: 2,
      propertyName: 'Luxury Villa with Private Pool',
      propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=100&h=100&fit=crop',
      agentName: 'Ahmed Hassan',
      agentRole: 'Property Owner',
      message: 'What are the lease terms for this villa?',
      status: 'Pending',
      timestamp: '5 hours ago',
      lastReply: null
    },
    {
      id: 3,
      propertyName: 'Cozy Studio Downtown',
      propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100&h=100&fit=crop',
      agentName: 'Mona Ali',
      agentRole: 'Real Estate Agent',
      message: 'Is the studio furnished? And are utilities included?',
      status: 'Seen',
      timestamp: '1 day ago',
      lastReply: null
    },
    {
      id: 4,
      propertyName: 'Spacious 3BR Penthouse',
      propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop',
      agentName: 'Omar Khalil',
      agentRole: 'Real Estate Agent',
      message: 'I would like to know more about the neighborhood and nearby amenities.',
      status: 'Replied',
      timestamp: '2 days ago',
      lastReply: 'The area has schools, shopping centers, and great transport links.'
    },
    {
      id: 5,
      propertyName: 'Family Apartment with Garden View',
      propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop',
      agentName: 'Layla Mohamed',
      agentRole: 'Property Owner',
      message: 'Can I bring pets? I have a small dog.',
      status: 'Replied',
      timestamp: '3 days ago',
      lastReply: 'Yes, small pets are allowed with a small deposit.'
    },
    {
      id: 6,
      propertyName: 'Modern Loft in Zamalek',
      propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop',
      agentName: 'Karim Ashraf',
      agentRole: 'Real Estate Agent',
      message: 'Is parking included with this loft?',
      status: 'Pending',
      timestamp: '4 days ago',
      lastReply: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Replied':
        return 'bg-green-100 text-green-700';
      case 'Seen':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
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
        <h2 className="text-2xl font-bold text-[#0E56A4] mb-2">
          Your Inquiries
        </h2>
        <p className="text-sm text-gray-600">Messages you have sent to owners and agents</p>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div 
            key={inquiry.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            {/* Inquiry Header */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start gap-4">
                {/* Property Thumbnail */}
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <ImageWithFallback 
                    src={inquiry.propertyImage}
                    alt={inquiry.propertyName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Property & Agent Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {inquiry.propertyName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    To: <span className="font-medium">{inquiry.agentName}</span>
                    <span className="text-gray-400"> • {inquiry.agentRole}</span>
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{inquiry.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Messages */}
            <div className="p-5 bg-gray-50">
              {/* Your Message */}
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Your message:</p>
                <div className="bg-[#0E56A4]/5 border border-[#0E56A4]/10 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{inquiry.message}</p>
                </div>
              </div>

              {/* Agent Reply */}
              {inquiry.lastReply && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Reply from {inquiry.agentName}:</p>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-sm text-gray-700">{inquiry.lastReply}</p>
                  </div>
                </div>
              )}

              {inquiry.status === 'Pending' && (
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>Waiting for response...</span>
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="px-5 py-3 bg-white border-t border-gray-100">
              <button 
                onClick={() => navigate(`/tenant/conversation/${inquiry.id}`)}
                className="text-sm text-[#0E56A4] font-medium hover:text-[#0A3F79] transition-colors"
              >
                View Full Conversation →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
