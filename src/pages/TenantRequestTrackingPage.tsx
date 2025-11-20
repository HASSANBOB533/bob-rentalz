import { DashboardLayout } from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, CheckCircle, AlertCircle, Home, Wrench, FileText, MessageCircle } from 'lucide-react';

export default function TenantRequestTrackingPage() {
  const navigate = useNavigate();

  // Placeholder tracking data
  const requests = [
    {
      id: 1,
      type: 'Maintenance',
      icon: Wrench,
      property: 'Modern 2BR Apartment in New Cairo',
      description: 'Air conditioning not working properly in master bedroom',
      submittedDate: 'Nov 13, 2024',
      status: 'In Progress',
      notes: 'Technician scheduled for tomorrow at 2 PM',
      timeline: [
        { date: 'Nov 13, 2024 - 10:30 AM', event: 'Request submitted', completed: true },
        { date: 'Nov 13, 2024 - 2:15 PM', event: 'Request acknowledged by landlord', completed: true },
        { date: 'Nov 14, 2024 - 11:00 AM', event: 'Technician assigned', completed: true },
        { date: 'Nov 15, 2024 - 2:00 PM', event: 'Scheduled repair visit', completed: false },
        { date: 'Pending', event: 'Issue resolved', completed: false }
      ]
    },
    {
      id: 2,
      type: 'Housekeeping',
      icon: Home,
      property: 'Modern 2BR Apartment in New Cairo',
      description: 'Deep cleaning service requested for end of month',
      submittedDate: 'Nov 10, 2024',
      status: 'Completed',
      notes: 'Service completed successfully. Thank you!',
      timeline: [
        { date: 'Nov 10, 2024 - 9:00 AM', event: 'Request submitted', completed: true },
        { date: 'Nov 10, 2024 - 3:30 PM', event: 'Service scheduled', completed: true },
        { date: 'Nov 12, 2024 - 10:00 AM', event: 'Cleaning team arrived', completed: true },
        { date: 'Nov 12, 2024 - 2:00 PM', event: 'Service completed', completed: true }
      ]
    },
    {
      id: 3,
      type: 'Document Request',
      icon: FileText,
      property: 'Spacious 3BR Penthouse',
      description: 'Rental certificate needed for visa application',
      submittedDate: 'Nov 12, 2024',
      status: 'Pending',
      notes: 'Request received. Processing within 2-3 business days.',
      timeline: [
        { date: 'Nov 12, 2024 - 1:45 PM', event: 'Request submitted', completed: true },
        { date: 'Nov 12, 2024 - 4:20 PM', event: 'Request acknowledged', completed: true },
        { date: 'Pending', event: 'Document prepared', completed: false },
        { date: 'Pending', event: 'Document sent', completed: false }
      ]
    },
    {
      id: 4,
      type: 'General Inquiry',
      icon: MessageCircle,
      property: 'Modern 2BR Apartment in New Cairo',
      description: 'Question about parking space allocation',
      submittedDate: 'Nov 8, 2024',
      status: 'Completed',
      notes: 'Parking space B-24 has been assigned to your unit.',
      timeline: [
        { date: 'Nov 8, 2024 - 11:20 AM', event: 'Inquiry submitted', completed: true },
        { date: 'Nov 8, 2024 - 5:40 PM', event: 'Response received', completed: true }
      ]
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout pageTitle="Request Tracking" userName="John Doe" userRole="Tenant">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <button
          onClick={() => navigate('/tenant/service-requests')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Service Requests
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0E56A4] mb-2">
            Request Tracking
          </h2>
          <p className="text-sm text-gray-600">Monitor the status of your service requests</p>
        </div>

        {/* Requests Timeline */}
        <div className="space-y-6">
          {requests.map((request) => {
            const IconComponent = request.icon;
            
            return (
              <div 
                key={request.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Request Header */}
                <div className="p-5 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#0E56A4]/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-[#0E56A4]" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{request.type}</h3>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1 line-clamp-1">{request.property}</p>
                        <p className="text-sm text-gray-700 mb-2">{request.description}</p>
                        <p className="text-xs text-gray-500">Submitted on {request.submittedDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {getStatusIcon(request.status)}
                    </div>
                  </div>

                  {/* Notes */}
                  {request.notes && (
                    <div className="mt-4 bg-blue-50 border-l-4 border-[#0E56A4] rounded p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Update: </span>
                        {request.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div className="p-5">
                  <h4 className="font-medium text-gray-900 mb-4">Progress Timeline</h4>
                  
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                    
                    {/* Timeline Items */}
                    <div className="space-y-4">
                      {request.timeline.map((item, index) => (
                        <div key={index} className="relative flex gap-4">
                          {/* Circle Indicator */}
                          <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            item.completed 
                              ? 'bg-[#0E56A4]' 
                              : 'bg-white border-2 border-gray-300'
                          }`}>
                            {item.completed && (
                              <CheckCircle className="w-4 h-4 text-white" fill="white" />
                            )}
                          </div>
                          
                          {/* Timeline Content */}
                          <div className="flex-1 pb-2">
                            <p className={`text-sm font-medium ${
                              item.completed ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {item.event}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <button className="text-sm text-[#0E56A4] font-medium hover:text-[#0A3F79] transition-colors">
                    View Full Details
                  </button>
                  {request.status !== 'Completed' && (
                    <button className="text-sm text-red-600 font-medium hover:text-red-700 transition-colors">
                      Cancel Request
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
