import { DashboardLayout } from '../components/DashboardLayout';
import { 
  Building, 
  FileText, 
  MapPin, 
  Calendar,
  Phone,
  Mail,
  QrCode,
  ArrowRight,
  Clock,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { LifecycleTimeline } from '../components/LifecycleTimeline';

export default function TenantRentedDashboardPage() {
  const navigate = useNavigate();
  
  // Dynamic user info
  const tenantName = "Mohamed Ibrahim";
  
  // Placeholder data - Active Rentals
  // Dec 31, 2024 is in the past relative to Nov 2025.
  const activeRentals = [
    {
      id: '1',
      title: 'Modern 2BR Apartment',
      location: 'New Cairo, Cairo',
      monthlyRent: 'EGP 15,000',
      leaseStart: 'Jan 1, 2024',
      leaseEnd: 'Dec 31, 2024', // Past date
      referenceCode: 'BOB-NC-2BR-001',
      landlordName: 'Ahmed Hassan',
      landlordPhone: '+20 100 123 4567',
      landlordEmail: 'ahmed.hassan@bob.com',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'
    }
  ];

  // Recent Service Requests
  const recentServiceRequests = [
    {
      id: 1,
      type: 'Maintenance',
      property: 'Modern 2BR Apartment',
      issue: 'Air conditioning not cooling properly',
      date: '2024-01-15',
      status: 'In Progress',
      priority: 'High'
    },
    {
      id: 2,
      type: 'Housekeeping',
      property: 'Modern 2BR Apartment',
      issue: 'Deep cleaning service request',
      date: '2024-01-10',
      status: 'Completed',
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'Document Request',
      property: 'Modern 2BR Apartment',
      issue: 'Need copy of lease agreement',
      date: '2024-01-08',
      status: 'Completed',
      priority: 'Low'
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
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const isLeaseEnded = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <DashboardLayout
      userRole="renter"
      userName={tenantName}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6 md:space-y-7 lg:space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#0E56A4] to-[#0A3F79] rounded-2xl p-6 md:p-8 text-white">
          <h1 className="text-2xl md:text-3xl mb-2">Welcome back, {tenantName}</h1>
          <p className="text-white/90 text-sm md:text-base">Manage your rentals and service requests</p>
        </div>

        {/* Lifecycle Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-2">
          <LifecycleTimeline type="tenant" currentStage="Rented" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Rentals</p>
                <p className="text-3xl mt-1">{activeRentals.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#0E56A4]/10 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-[#0E56A4]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Requests</p>
                <p className="text-3xl mt-1">{recentServiceRequests.filter(r => r.status === 'In Progress' || r.status === 'Pending').length}</p>
              </div>
              <div className="w-12 h-12 bg-[#E9C500]/10 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-[#E9C500]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Documents</p>
                <p className="text-3xl mt-1">8</p>
              </div>
              <div className="w-12 h-12 bg-[#0E56A4]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#0E56A4]" />
              </div>
            </div>
          </div>
        </div>

        {/* My Rentals Section */}
        <div className="bg-white rounded-2xl p-6 md:p-7 lg:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl">My Rentals</h2>
            <Button
              onClick={() => navigate('/tenant/rented/my-rentals')}
              variant="outline"
              className="border-[#0E56A4] text-[#0E56A4] hover:bg-[#0E56A4]/10"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-4 md:space-y-5">
            {activeRentals.map((rental) => {
               const leaseEnded = isLeaseEnded(rental.leaseEnd);
               return (
              <div 
                key={rental.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Property Image */}
                  <div className="relative h-48 md:h-auto">
                    <ImageWithFallback
                      src={rental.image}
                      alt={rental.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${leaseEnded ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                      {leaseEnded ? 'Lease Ended' : 'Active Lease'}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="col-span-2 p-5 md:p-6">
                    {leaseEnded && (
                       <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                             <p className="text-sm font-bold text-yellow-800">Lease Ended</p>
                             <p className="text-xs text-yellow-700">
                                The lease for this property ended on {rental.leaseEnd}. Please contact the owner or admin for renewal or move-out procedures.
                             </p>
                          </div>
                       </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{rental.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{rental.location}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg text-sm">
                          <span className="text-gray-600">Ref:</span>
                          <span className="font-mono font-semibold text-[#0E56A4]">{rental.referenceCode}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-[#0E56A4]">{rental.monthlyRent}</p>
                        <p className="text-xs text-gray-500">per month</p>
                      </div>
                    </div>

                    {/* Lease Period */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#0E56A4]" />
                        <span className="text-gray-600">Start:</span>
                        <span className="font-medium">{rental.leaseStart}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#0E56A4]" />
                        <span className="text-gray-600">End:</span>
                        <span className={`font-medium ${leaseEnded ? 'text-red-600' : ''}`}>{rental.leaseEnd}</span>
                      </div>
                    </div>

                    {/* Landlord Info */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2">Landlord Contact</p>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{rental.landlordName}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Phone className="w-3 h-3" />
                          <span>{rental.landlordPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Mail className="w-3 h-3" />
                          <span>{rental.landlordEmail}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button
                        onClick={() => navigate(`/tenant/rented/rental-details/${rental.id}`)}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => navigate(`/tenant/rented/qr-code/${rental.id}`)}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        <QrCode className="w-3 h-3 mr-1" />
                        QR Code
                      </Button>
                      <Button
                        onClick={() => navigate('/tenant/rented/new-request')}
                        variant="outline"
                        size="sm"
                        className="text-xs border-[#E9C500] text-[#E9C500] hover:bg-[#E9C500]/10"
                      >
                        <Wrench className="w-3 h-3 mr-1" />
                        Service
                      </Button>
                      <Button
                        onClick={() => navigate('/tenant/rented/documents')}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>

        {/* Recent Service Requests Section */}
        <div className="bg-white rounded-2xl p-6 md:p-7 lg:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl">Recent Service Requests</h2>
            <Button
              onClick={() => navigate('/tenant/rented/service-requests')}
              variant="outline"
              className="border-[#0E56A4] text-[#0E56A4] hover:bg-[#0E56A4]/10"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-3">
            {recentServiceRequests.map((request) => (
              <div 
                key={request.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer"
                onClick={() => navigate(`/tenant/rented/track-request/${request.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-[#0E56A4]/10 text-[#0E56A4] rounded text-xs font-medium">
                        {request.type}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority} Priority
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{request.issue}</h4>
                    <p className="text-sm text-gray-600 mb-2">{request.property}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {request.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tenant/rented/track-request/${request.id}`);
                      }}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      Track
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create New Request Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              onClick={() => navigate('/tenant/rented/new-request')}
              className="w-full bg-[#0E56A4] hover:bg-[#0A3F79] text-white"
            >
              <Wrench className="w-4 h-4 mr-2" />
              Create New Service Request
            </Button>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div 
            className="bg-gradient-to-br from-[#0E56A4] to-[#0A3F79] rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate('/tenant/rented/documents')}
          >
            <FileText className="w-8 h-8 mb-3" />
            <h3 className="text-lg mb-1">My Documents</h3>
            <p className="text-sm text-white/80">Access lease agreements, receipts, and important documents</p>
          </div>

          <div 
            className="bg-gradient-to-br from-[#E9C500] to-[#D4AF37] rounded-xl p-6 text-gray-900 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate('/tenant/rented/messages')}
          >
            <Mail className="w-8 h-8 mb-3" />
            <h3 className="text-lg mb-1">Messages</h3>
            <p className="text-sm text-gray-800/80">Chat with your landlord and property manager</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}