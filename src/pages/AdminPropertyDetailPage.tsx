import {
  ArrowLeft,
  MapPin,
  CheckCircle,
  XCircle,
  User,
  Eye,
  UserPlus,
  AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { AuditLog, AuditLogEntry } from '../components/AuditLog';
import { LifecycleTimeline } from '../components/LifecycleTimeline';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { adminApi } from '../lib/supabase/adminApi';

export default function AdminPropertyDetailPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isVacateModalOpen, setIsVacateModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Determine previous page for back button context
  const fromAgents = location.state?.from?.includes('/admin/agents');

  // Mock property data
  const mockProperties: Record<string, any> = {
    '101': {
      id: '101',
      name: 'Luxury 4BR Villa with Pool',
      description: 'Stunning luxury villa featuring 4 spacious bedrooms, private swimming pool.',
      owner: {
        name: 'Ahmed Hassan',
        phone: '+20 100 123 4567',
        email: 'ahmed.hassan@email.com',
        joinedDate: 'Jan 2024',
      },
      city: 'New Cairo',
      area: '5th Settlement',
      propertyType: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      price: 45000,
      status: 'Pending',
      views: 0,
      leads: 0,
      assignedAgent: null,
      assignedTenant: null,
      amenities: ['Parking', 'Garden', 'Pool', 'Security', 'Gym'],
      submittedDate: '2 hours ago',
    },
    '103': {
      id: '103',
      name: 'Spacious Penthouse',
      description: 'Elegant penthouse with breathtaking city views.',
      owner: {
        name: 'Mohamed Ali',
        phone: '+20 100 234 5678',
        email: 'mohamed.ali@email.com',
        joinedDate: 'Feb 2024',
      },
      city: 'Zamalek',
      area: 'Nile View',
      propertyType: 'Penthouse',
      bedrooms: 3,
      bathrooms: 3,
      price: 35000,
      status: 'Approved',
      views: 45,
      leads: 8,
      assignedAgent: null,
      assignedTenant: null,
      amenities: ['Parking', 'Security', 'Elevator'],
      submittedDate: '1 day ago',
    },
    '106': {
      id: '106',
      name: 'Rented Villa in Katameya',
      description: 'Beautiful villa with established tenancy.',
      owner: {
        name: 'Nour Hassan',
        phone: '+20 100 999 8888',
        email: 'nour@email.com',
        joinedDate: 'Mar 2024',
      },
      city: 'New Cairo',
      area: 'Katameya',
      propertyType: 'Villa',
      bedrooms: 5,
      bathrooms: 4,
      price: 65000,
      status: 'Rented',
      views: 320,
      leads: 15,
      assignedAgent: 'Sarah Anderson',
      assignedTenant: 'Tamer Hosny',
      assignedTenantId: '1',
      leaseStart: '2023-11-01',
      leaseEnd: '2024-11-01', // Past date for demo
      amenities: ['Pool', 'Garden', 'Security'],
      submittedDate: '1 year ago',
    },
  };

  const [property, setProperty] = useState(propertyId ? mockProperties[propertyId] : null);

  // Mock agents
  const mockAgents = [
    { id: '1', name: 'Sarah Anderson' },
    { id: '2', name: 'Michael Brown' },
  ];

  // Mock prospects (available for assignment)
  const mockProspects = [
    { id: '3', name: 'Sara Ibrahim' },
    { id: '4', name: 'Mohamed Ali' },
  ];

  if (!property) {
    return (
      <AdminDashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Property Not Found</h2>
          <Button onClick={() => navigate('/admin/properties')}>Back to Properties</Button>
        </div>
      </AdminDashboardLayout>
    );
  }

  const handleApprove = async () => {
    // Call the secure admin API to verify the property
    const { success, error } = await adminApi.verifyProperty(propertyId!);

    if (success) {
      setProperty({ ...property, status: 'Approved' });
      toast.success('Property verified and approved successfully!');
    } else {
      toast.error(error || 'Failed to approve property. You may not have admin permissions.');
    }
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) return toast.error('Please provide a reason');
    setProperty({
      ...property,
      status: 'Rejected',
      rejectionDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      rejectionReason: rejectionReason,
    });
    setIsRejectModalOpen(false);
    toast.success('Property rejected.');
  };

  const handleAssignAgent = () => {
    if (!selectedAgent) return toast.error('Please select an agent');
    setProperty({ ...property, assignedAgent: 'Sarah Anderson' }); // Mock update
    toast.success('Agent assigned successfully!');
  };

  const handleAssignTenant = () => {
    if (!selectedTenant) return toast.error('Please select a tenant');
    const tenantName = mockProspects.find((t) => t.id === selectedTenant)?.name;
    setProperty({ ...property, assignedTenant: tenantName });
    toast.success(`Tenant ${tenantName} assigned successfully!`);
  };

  const handleMarkAsRented = () => {
    if (!property.assignedTenant) return toast.error('No tenant assigned.');
    setProperty({
      ...property,
      status: 'Rented',
      leaseStart: '2024-11-20',
      leaseEnd: '2025-11-20',
    });
    toast.success('Property marked as Rented!');
  };

  const handleMarkAsVacated = () => {
    setProperty({
      ...property,
      status: 'Approved', // Or whatever status "Vacant/Available" maps to. Usually 'Approved' means available for rent.
      assignedTenant: null,
      leaseStart: null,
      leaseEnd: null,
    });
    setIsVacateModalOpen(false);
    toast.success('Property marked as Vacated. It is now listed as Available.');
  };

  const isLeaseEnded =
    property.status === 'Rented' && property.leaseEnd && new Date(property.leaseEnd) < new Date();

  const auditLogEntries: AuditLogEntry[] = [
    {
      id: 1,
      title: 'Listing Approved by Admin',
      description: 'The property was approved and published.',
      timestamp: 'Jan 12, 2025 – 3:42 PM',
    },
    {
      id: 2,
      title: 'Agent Assigned',
      description: 'Assigned to Sarah Anderson.',
      timestamp: 'Jan 10, 2025 – 2:18 PM',
    },
    {
      id: 3,
      title: 'Owner Updated Listing',
      description: 'New photos added.',
      timestamp: 'Jan 9, 2025 – 9:33 AM',
    },
  ];

  const getStatusBadge = (status: string) => {
    const map: any = {
      Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      Approved: { bg: 'bg-blue-100', text: 'text-blue-700' },
      Rented: { bg: 'bg-green-100', text: 'text-green-700' },
      Rejected: { bg: 'bg-red-100', text: 'text-red-700' },
    };
    const s = map[status] || map['Pending'];
    return <Badge className={`${s.bg} ${s.text}`}>{status}</Badge>;
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin/properties')}
            className="flex items-center gap-2 text-[#0E56A4]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Properties
          </button>
        </div>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">{property.name}</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {property.city}, {property.area}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {property.status === 'Approved' && property.assignedTenant && (
              <Button onClick={handleMarkAsRented} className="bg-[#0E56A4] text-white">
                <CheckCircle className="w-4 h-4 mr-2" /> Mark as Rented
              </Button>
            )}
            {getStatusBadge(property.status)}
          </div>
        </div>

        {/* Lifecycle Timeline */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-2">
          <LifecycleTimeline type="property" currentStage={property.status} />
        </div>

        {/* Rejection Info Block */}
        {property.status === 'Rejected' && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-red-800">
                Rejected by Admin on {property.rejectionDate || 'Today'}
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Reason: {property.rejectionReason || 'Does not meet requirements.'}
              </p>
            </div>
          </div>
        )}

        {/* Lease Ended Notification */}
        {isLeaseEnded && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-yellow-800">Lease Ended</h3>
              <p className="text-sm text-yellow-700 mt-1">
                The lease for this property ended on <strong>{property.leaseEnd}</strong>. Please
                confirm if the tenant has moved out.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{property.propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium text-[#0E56A4]">
                    EGP {property.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-medium">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-medium">{property.bathrooms}</p>
                </div>
              </div>
              <p className="text-gray-700">{property.description}</p>
            </div>

            {/* Current Tenant (Rented Only) */}
            {property.status === 'Rented' && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="font-semibold mb-4">Current Tenant</h2>
                {property.assignedTenantId ? (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg text-gray-900">
                          {property.assignedTenant}
                        </span>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          Rented
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">
                        Tenant ID: {property.assignedTenantId}
                      </p>
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-gray-500 block text-xs">Lease Start</span>
                          <span className="font-medium">{property.leaseStart}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block text-xs">Lease End</span>
                          <span className="font-medium">{property.leaseEnd}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate(`/admin/tenants/${property.assignedTenantId}`)}
                      className="bg-[#0E56A4] text-white hover:bg-[#0A3F79] whitespace-nowrap"
                    >
                      <Eye className="w-4 h-4 mr-2" /> View Tenant
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200 italic">
                    No tenant assigned.
                  </div>
                )}
              </div>
            )}

            {/* Owner Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="font-semibold mb-4">Owner Information</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">{property.owner.name}</p>
                  <p className="text-sm text-gray-500">{property.owner.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="space-y-6">
            {/* Moderation */}
            {property.status === 'Pending' && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="font-semibold mb-4">Moderation</h2>
                <div className="flex gap-3 mb-4">
                  <Button
                    onClick={handleApprove}
                    className="flex-1 bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
                  >
                    Approve
                  </Button>
                  <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex-1 bg-[#D9534F] text-white hover:bg-[#C9302C]">
                        Reject
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject Listing</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to reject this listing? This action cannot be undone
                          immediately.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <label className="text-sm font-medium mb-2 block">
                          Reason for Rejection
                        </label>
                        <Textarea
                          placeholder="Please provide a short explanation..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={handleReject}
                          className="bg-[#D9534F] text-white hover:bg-[#C9302C]"
                        >
                          Submit
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}

            {/* Agent Assignment */}
            {(property.status === 'Approved' || property.status === 'Pending') && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="font-semibold mb-4">Agent Assignment</h2>
                {property.assignedAgent ? (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{property.assignedAgent}</span>
                    <Button variant="ghost" size="sm" className="text-[#0E56A4]">
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockAgents.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAssignAgent} className="w-full bg-[#0E56A4]">
                      Assign Agent
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Tenant Assignment */}
            {property.status === 'Approved' && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="font-semibold mb-4">Tenant Assignment</h2>
                {property.assignedTenant ? (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700 mb-1">Assigned Tenant:</p>
                    <p className="font-bold text-blue-900">{property.assignedTenant}</p>
                    <p className="text-xs text-blue-600 mt-2">Ready to Mark as Rented.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">
                      Assign a prospect to this property to start the rental process.
                    </p>
                    <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Prospect" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProspects.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleAssignTenant}
                      variant="outline"
                      className="w-full border-[#0E56A4] text-[#0E56A4]"
                    >
                      <UserPlus className="w-4 h-4 mr-2" /> Assign Tenant
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Lease Management (Only for Rented) */}
            {property.status === 'Rented' && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="font-semibold mb-4">Lease Information</h2>
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Tenant</span>
                    <span className="text-sm font-medium">{property.assignedTenant}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Lease Start</span>
                    <span className="text-sm font-medium">{property.leaseStart}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Lease End</span>
                    <span className="text-sm font-medium">{property.leaseEnd}</span>
                  </div>
                </div>

                {isLeaseEnded && (
                  <Dialog open={isVacateModalOpen} onOpenChange={setIsVacateModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-[#0E56A4] text-white hover:bg-[#093B74]">
                        Mark as Vacated
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm End of Tenancy</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to mark this property as vacated? This will change
                          the property status to available and archive the tenant&apos;s lease.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsVacateModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleMarkAsVacated} className="bg-[#0E56A4] text-white">
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Audit Log Section */}
        <div className="mt-8">
          <AuditLog entries={auditLogEntries} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
