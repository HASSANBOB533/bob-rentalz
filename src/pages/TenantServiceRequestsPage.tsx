import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, Wrench, FileText, MessageCircle, Clock } from 'lucide-react';

export default function TenantServiceRequestsPage() {
  const navigate = useNavigate();

  // Service types
  const serviceTypes = [
    {
      id: 1,
      icon: Home,
      label: 'Housekeeping',
      description: 'Request cleaning and housekeeping services',
      color: '#0E56A4'
    },
    {
      id: 2,
      icon: Wrench,
      label: 'Maintenance',
      description: 'Report repair or maintenance issues',
      color: '#E9C500'
    },
    {
      id: 3,
      icon: FileText,
      label: 'Document Request',
      description: 'Request rental documents or certificates',
      color: '#0E56A4'
    },
    {
      id: 4,
      icon: MessageCircle,
      label: 'General Inquiry',
      description: 'Ask questions or send general messages',
      color: '#E9C500'
    }
  ];

  // Recent requests
  const recentRequests = [
    {
      id: 1,
      type: 'Maintenance',
      property: 'Modern 2BR Apartment in New Cairo',
      status: 'In Progress',
      timestamp: '2 days ago',
      description: 'Air conditioning not working properly'
    },
    {
      id: 2,
      type: 'Housekeeping',
      property: 'Modern 2BR Apartment in New Cairo',
      status: 'Completed',
      timestamp: '1 week ago',
      description: 'Deep cleaning service requested'
    },
    {
      id: 3,
      type: 'Document Request',
      property: 'Spacious 3BR Penthouse',
      status: 'Pending',
      timestamp: '3 days ago',
      description: 'Rental certificate for visa application'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleServiceClick = (serviceLabel: string) => {
    navigate(`/tenant/create-service-request?type=${encodeURIComponent(serviceLabel)}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/tenant/rented')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6 text-sm font-medium"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Rented Properties
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0E56A4] mb-2">
          Service Requests
        </h2>
        <p className="text-sm text-gray-600">Choose the service you need</p>
      </div>

      {/* Service Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {serviceTypes.map((service) => {
          const IconComponent = service.icon;
          return (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.label)}
              className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#0E56A4] transition-all duration-300 cursor-pointer flex items-center gap-4 text-left"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <IconComponent className="w-6 h-6" style={{ color: service.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{service.label}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{service.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent Requests Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-[#0E56A4] mb-1">
              Recent Requests
            </h3>
            <p className="text-sm text-gray-600">Track your submitted service requests</p>
          </div>
          <button 
            onClick={() => navigate('/tenant/request-tracking')}
            className="px-4 py-2 bg-[#0E56A4] text-white rounded-lg text-sm font-medium hover:bg-[#0A3F79] transition-colors"
          >
            View Tracking
          </button>
        </div>

        <div className="space-y-4">
          {recentRequests.map((request) => (
            <div 
              key={request.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{request.type}</h4>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">{request.property}</p>
                  <p className="text-sm text-gray-700 mb-3">{request.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Submitted {request.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
