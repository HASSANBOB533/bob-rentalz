import { ArrowLeft, Clock, Plus, Filter, CheckCircle2, Circle, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

export default function TenantRentedServiceRequestsPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  // Mock Data with the requested statuses: Received, In Progress, Completed
  const serviceRequests = [
    {
      id: 1,
      type: 'Maintenance',
      property: 'Modern 2BR Apartment',
      issue: 'Air conditioning not cooling properly',
      description:
        "The AC unit in the master bedroom is not cooling effectively. It runs but doesn't reach the set temperature.",
      date: '2024-01-15',
      status: 'In Progress', // Blue
      priority: 'High',
      assignedTo: 'John Technician',
      timeline: {
        received: '2024-01-15',
        inProgress: '2024-01-16',
        completed: null,
      },
    },
    {
      id: 2,
      type: 'Housekeeping',
      property: 'Modern 2BR Apartment',
      issue: 'Deep cleaning service request',
      description: 'Request for deep cleaning of entire apartment including kitchen and bathrooms.',
      date: '2024-01-10',
      status: 'Completed', // Green
      priority: 'Medium',
      assignedTo: 'Cleaning Team A',
      timeline: {
        received: '2024-01-10',
        inProgress: '2024-01-11',
        completed: '2024-01-12',
      },
    },
    {
      id: 3,
      type: 'Document Request',
      property: 'Modern 2BR Apartment',
      issue: 'Need copy of lease agreement',
      description: 'Require a digital copy of the signed lease agreement for personal records.',
      date: '2024-01-08',
      status: 'Completed', // Green
      priority: 'Low',
      assignedTo: 'Property Manager',
      timeline: {
        received: '2024-01-08',
        inProgress: '2024-01-08',
        completed: '2024-01-09',
      },
    },
    {
      id: 4,
      type: 'Maintenance',
      property: 'Modern 2BR Apartment',
      issue: 'Kitchen sink drain is slow',
      description: 'Water drains slowly from kitchen sink. May need drain cleaning or repair.',
      date: '2024-01-20',
      status: 'Received', // Yellow
      priority: 'Medium',
      assignedTo: 'Pending Assignment',
      timeline: {
        received: '2024-01-20',
        inProgress: null,
        completed: null,
      },
    },
  ];

  // Status Color Logic
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'Received':
        return 'bg-[#F7C948]/10 text-[#F7C948] border-[#F7C948]/20 hover:bg-[#F7C948]/20'; // Yellow
      case 'In Progress':
        return 'bg-[#0E56A4]/10 text-[#0E56A4] border-[#0E56A4]/20 hover:bg-[#0E56A4]/20'; // Blue
      case 'Completed':
        return 'bg-[#2ECC71]/10 text-[#2ECC71] border-[#2ECC71]/20 hover:bg-[#2ECC71]/20'; // Green
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Maintenance':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Housekeeping':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Document Request':
        return 'bg-green-50 text-green-700 border-green-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  // Filter logic
  const filteredRequests = serviceRequests.filter((request) => {
    const statusMatch = filterStatus === 'All' || request.status === filterStatus;
    const typeMatch = filterType === 'All' || request.type === filterType;
    return statusMatch && typeMatch;
  });

  // Timeline Component
  const RequestTimeline = ({ status }: { status: string }) => {
    const steps = ['Received', 'In Progress', 'Completed'];
    const currentStepIndex = steps.indexOf(status);

    return (
      <div className="relative w-full mt-4 mb-2">
        {/* Progress Bar Background */}
        <div className="absolute top-1.5 left-0 w-full h-0.5 bg-gray-200 rounded-full" />

        {/* Active Progress Bar */}
        <div
          className="absolute top-1.5 left-0 h-0.5 bg-[#0E56A4] rounded-full transition-all duration-500"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between items-center w-full">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isFuture = index > currentStepIndex;

            return (
              <div key={step} className="flex flex-col items-center gap-2">
                <div
                  className={`w-3.5 h-3.5 rounded-full border-[2px] z-10 flex items-center justify-center bg-white transition-colors duration-300
                    ${
                      isCurrent
                        ? 'border-[#0E56A4] scale-110'
                        : isCompleted
                          ? 'border-[#0E56A4] bg-[#0E56A4]'
                          : 'border-gray-300'
                    }
                  `}
                >
                  {isCompleted && !isCurrent && (
                    <div className="w-full h-full rounded-full bg-[#0E56A4]" />
                  )}
                  {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-[#0E56A4]" />}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-300
                    ${
                      isCurrent
                        ? 'text-[#0E56A4] font-semibold'
                        : isCompleted
                          ? 'text-[#0E56A4]'
                          : 'text-gray-400'
                    }
                  `}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout userRole="renter" userName="Mohamed Ibrahim">
      <div className="space-y-6 px-4 sm:px-0">
        {/* Back Button */}
        <button
          onClick={() => navigate('/tenant/rented/dashboard')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0E56A4]">Service Requests</h1>
            <p className="text-gray-600 mt-1">
              Track and manage your maintenance and service requests
            </p>
          </div>
          <Button
            onClick={() => navigate('/tenant/rented/new-request')}
            className="bg-[#0E56A4] hover:bg-[#0A3F79] text-white shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-5 h-5 text-[#0E56A4]" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4]"
              >
                <option>All</option>
                <option>Received</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4]"
              >
                <option>All</option>
                <option>Maintenance</option>
                <option>Housekeeping</option>
                <option>Document Request</option>
              </select>
            </div>
          </div>
        </div>

        {/* Service Requests List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {filterStatus === 'All' && filterType === 'All'
                ? 'All Requests'
                : `Filtered Results (${filteredRequests.length})`}
            </h2>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100 border-dashed">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No requests found</h3>
              <p className="text-gray-500">Try adjusting your filters or create a new request.</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col gap-4">
                  {/* Card Header: Type, Date, Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={`${getTypeColor(request.type)} font-medium border`}
                      >
                        {request.type}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {request.date}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getStatusBadgeStyles(request.status)} border font-semibold px-3 py-1`}
                    >
                      {request.status}
                    </Badge>
                  </div>

                  {/* Card Content: Title, Description */}
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{request.issue}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{request.description}</p>
                  </div>

                  {/* Timeline */}
                  <div className="py-2 px-1">
                    <RequestTimeline status={request.status} />
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Footer: Agent, Property */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Assigned to:</span>
                      <span className="font-medium text-gray-900">{request.assignedTo}</span>
                    </div>
                    <div className="hidden sm:block text-gray-400 text-xs">{request.property}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
