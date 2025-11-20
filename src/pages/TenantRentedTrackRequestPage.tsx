import { DashboardLayout } from '../components/DashboardLayout';
import { ArrowLeft, CheckCircle, Clock, User, Calendar, MapPin, Wrench } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function TenantRentedTrackRequestPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const request = {
    id: 1,
    type: 'Maintenance',
    property: 'Modern 2BR Apartment',
    propertyAddress: '123 Palm Street, New Cairo',
    referenceCode: 'SR-2024-001',
    issue: 'Air conditioning not cooling properly',
    description: 'The AC unit in the master bedroom is not cooling effectively. It runs but doesn\'t reach the set temperature. The issue started about 3 days ago.',
    dateSubmitted: '2024-01-15',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'John Technician',
    assignedPhone: '+20 100 987 6543',
    estimatedCompletion: '2024-01-18',
    preferredDate: '2024-01-16',
    preferredTime: 'Morning (8 AM - 12 PM)',
    allowEntry: 'Yes',
    timeline: [
      {
        id: 1,
        status: 'Submitted',
        description: 'Service request submitted by tenant',
        date: '2024-01-15',
        time: '10:30 AM',
        completed: true,
        icon: <CheckCircle className="w-5 h-5" />
      },
      {
        id: 2,
        status: 'Assigned',
        description: 'Request assigned to John Technician',
        date: '2024-01-15',
        time: '2:15 PM',
        completed: true,
        icon: <User className="w-5 h-5" />
      },
      {
        id: 3,
        status: 'Scheduled',
        description: 'Visit scheduled for January 16, 2024 at 9:00 AM',
        date: '2024-01-15',
        time: '3:30 PM',
        completed: true,
        icon: <Calendar className="w-5 h-5" />
      },
      {
        id: 4,
        status: 'In Progress',
        description: 'Technician is currently working on the issue',
        date: '2024-01-16',
        time: '9:15 AM',
        completed: true,
        icon: <Wrench className="w-5 h-5" />
      },
      {
        id: 5,
        status: 'Completed',
        description: 'Service request completed',
        date: '',
        time: '',
        completed: false,
        icon: <CheckCircle className="w-5 h-5" />
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Maintenance':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Housekeeping':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Document Request':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'General Inquiry':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <DashboardLayout userRole="renter" userName="Mohamed Ibrahim">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/tenant/rented/service-requests')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Service Requests
        </button>

        {/* Page Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getTypeColor(request.type)}`}>
                  {request.type}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getPriorityColor(request.priority)}`}>
                  {request.priority} Priority
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0E56A4] mb-2">{request.issue}</h1>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {request.property} - {request.propertyAddress}
                </p>
                <p className="font-mono font-medium text-gray-900">Reference: {request.referenceCode}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Timeline - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Timeline */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-6">Request Timeline</h2>
              
              <div className="space-y-0">
                {request.timeline.map((item, index) => (
                  <div key={item.id} className="relative">
                    {/* Connecting Line */}
                    {index < request.timeline.length - 1 && (
                      <div 
                        className={`absolute left-[19px] top-10 w-0.5 h-[calc(100%+8px)] ${
                          item.completed ? 'bg-[#0E56A4]' : 'bg-gray-300'
                        }`}
                      />
                    )}
                    
                    {/* Timeline Item */}
                    <div className="flex gap-4 pb-8">
                      {/* Icon */}
                      <div 
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          item.completed 
                            ? 'bg-[#0E56A4] text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {item.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <h3 className={`font-semibold mb-1 ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                          {item.status}
                        </h3>
                        <p className={`text-sm mb-2 ${item.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {item.description}
                        </p>
                        {item.date && (
                          <p className={`text-xs ${item.completed ? 'text-gray-500' : 'text-gray-400'}`}>
                            {item.date} at {item.time}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Request Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="text-gray-900">{request.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Submitted On</p>
                    <p className="font-medium">{request.dateSubmitted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Completion</p>
                    <p className="font-medium">{request.estimatedCompletion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Preferred Date</p>
                    <p className="font-medium">{request.preferredDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Preferred Time</p>
                    <p className="font-medium">{request.preferredTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Assigned Technician */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Assigned To</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#0E56A4] rounded-full flex items-center justify-center text-white font-semibold">
                  JT
                </div>
                <div>
                  <p className="font-semibold">{request.assignedTo}</p>
                  <p className="text-sm text-gray-600">Maintenance Technician</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{request.assignedPhone}</span>
                </div>
              </div>
            </div>

            {/* Access Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Access Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Entry Permission</p>
                  <p className="font-medium">{request.allowEntry}</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs text-blue-700">
                    {request.allowEntry === 'Yes' 
                      ? 'Technician is authorized to enter if you are not home.'
                      : 'You will need to be present for this service.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Actions</h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/tenant/rented/messages')}
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-300 hover:bg-red-50"
                >
                  Cancel Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
