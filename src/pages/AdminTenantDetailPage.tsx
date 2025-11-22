import {
  ArrowLeft,
  UserCircle,
  Phone,
  Building,
  User,
  CheckCircle,
  Home,
  FileText,
  Upload,
  Trash2,
  Plus,
  AlertTriangle,
  Archive,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { ArchivedChat, ChatMessage } from '../components/ArchivedChat';
import { ArchivedRentalSummary } from '../components/ArchivedRentalSummary';
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
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { adminApi } from '../lib/supabase/adminApi';

export default function AdminTenantDetailPage() {
  const { tenantId } = useParams();
  const navigate = useNavigate();

  // Mock Data Setup
  const mockTenants: Record<string, any> = {
    '3': {
      id: '3',
      name: 'Sara Ibrahim',
      email: 'sara.ibrahim@email.com',
      phone: '+20 100 333 4444',
      status: 'Prospect',
      assignedAgent: 'Sarah Anderson',
      assignedAgentId: '1',
      joinedDate: 'Nov 10, 2025',
      currentProperty: null, // Not assigned yet
      inquiries: [
        {
          id: '1',
          property: 'Modern 2BR Apartment',
          city: 'Maadi',
          status: 'Interested',
          date: 'Nov 15',
        },
      ],
    },
    '4': {
      // Ready for Approval
      id: '4',
      name: 'Mohamed Ali',
      email: 'mohamed.ali@email.com',
      phone: '+20 100 444 5555',
      status: 'Prospect',
      assignedAgent: 'Michael Brown',
      assignedAgentId: '2',
      joinedDate: 'Nov 8, 2025',
      currentProperty: { id: 'p2', name: 'Luxury Villa - New Cairo', price: 45000 },
      inquiries: [],
    },
    '5': {
      // Approved, ready for Rent
      id: '5',
      name: 'Nour Ibrahim',
      email: 'nour.ibrahim@email.com',
      phone: '+20 100 555 6666',
      status: 'Approved',
      assignedAgent: 'Sarah Anderson',
      assignedAgentId: '1',
      joinedDate: 'Nov 5, 2025',
      currentProperty: { id: 'p3', name: 'Penthouse Suite - Zamalek', price: 35000 },
      inquiries: [],
    },
    '1': {
      // Rented - Lease Expiring Soon (Within 60 days)
      id: '1',
      name: 'Layla Hassan',
      email: 'layla.hassan@email.com',
      phone: '+20 100 111 2222',
      status: 'Rented',
      assignedAgent: 'Sarah Anderson',
      assignedAgentId: '1',
      joinedDate: 'Nov 15, 2024',
      currentProperty: { id: 'p1', name: 'Modern 2BR Apartment - Maadi', price: 18000 },
      leaseStart: 'Nov 15, 2024',
      leaseEnd: 'Dec 15, 2025', // Expiring soon (relative to Nov 19, 2025)
      monthlyRent: 'EGP 18,000',
      securityDeposit: 'EGP 36,000',
    },
    '7': {
      id: '7',
      name: 'Khaled Youssef',
      email: 'khaled.youssef@email.com',
      phone: '+20 100 777 8888',
      status: 'Past Tenant',
      assignedAgent: 'Sarah Anderson',
      assignedAgentId: '1',
      joinedDate: 'Oct 10, 2023',
      currentProperty: { id: 'p1', name: 'Luxury Villa - New Cairo', price: 45000 },
      leaseStart: 'Nov 15, 2023',
      leaseEnd: 'Nov 15, 2024',
    },
  };

  const initialTenant = tenantId ? mockTenants[tenantId] : null;
  const [tenant, setTenant] = useState(initialTenant);

  // State for documents
  const [documents, setDocuments] = useState([
    { id: 1, name: 'ID_Front.jpg', type: 'ID Proof', date: '2025-11-10', uploadedBy: 'Admin' },
    {
      id: 2,
      name: 'Lease_Agreement_Signed.pdf',
      type: 'Contract',
      date: '2025-11-15',
      uploadedBy: 'Admin',
    },
  ]);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ type: '', notes: '', file: null as File | null });
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [isEndTenancyModalOpen, setIsEndTenancyModalOpen] = useState(false);

  // Renewal State
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [renewForm, setRenewForm] = useState({ start: '', end: '' });

  // Mock available properties
  const availableProperties = [
    { id: 'p1', name: 'Modern 2BR Apartment - Maadi', price: 18000 },
    { id: 'p2', name: 'Luxury Villa - New Cairo', price: 45000 },
    { id: 'p3', name: 'Penthouse Suite - Zamalek', price: 35000 },
  ];

  if (!tenant) {
    return (
      <AdminDashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tenant Not Found</h2>
          <Button onClick={() => navigate('/admin/tenants')}>Back to Tenants</Button>
        </div>
      </AdminDashboardLayout>
    );
  }

  // Actions
  const handleAssignProperty = () => {
    if (!selectedPropertyId) {
      toast.error('Please select a property');
      return;
    }
    const prop = availableProperties.find((p) => p.id === selectedPropertyId);
    setTenant({ ...tenant, currentProperty: prop });
    toast.success('Property assigned successfully');
  };

  const handleApproveTenant = () => {
    setTenant({ ...tenant, status: 'Approved' });
    toast.success('Tenant Approved! Now you can upload documents and mark as rented.');
  };

  const handleMarkAsRented = () => {
    setTenant({ ...tenant, status: 'Rented', leaseStart: '2025-11-20', leaseEnd: '2026-11-20' });
    toast.success('Tenant successfully marked as Rented!');
  };

  const handleEndTenancy = () => {
    setTenant({
      ...tenant,
      status: 'Past Tenant',
      // Keep current property for history reference
    });
    setIsEndTenancyModalOpen(false);
    toast.success('Tenancy marked as completed. Tenant archived.');
  };

  const handleRenewLease = () => {
    if (!renewForm.start || !renewForm.end) {
      toast.error('Please select both start and end dates');
      return;
    }
    // In a real app, we would probably validate dates (end > start)
    setTenant({ ...tenant, leaseStart: renewForm.start, leaseEnd: renewForm.end });
    setIsRenewModalOpen(false);
    setRenewForm({ start: '', end: '' });
    toast.success('Lease successfully renewed.');
  };

  const handleUploadDocument = () => {
    if (!uploadForm.type || !uploadForm.file) {
      toast.error('Please select a document type and file');
      return;
    }
    const newDoc = {
      id: Date.now(),
      name: uploadForm.file.name,
      type: uploadForm.type,
      date: new Date().toISOString().split('T')[0],
      uploadedBy: 'Admin',
    };
    setDocuments([newDoc, ...documents]);
    setIsUploadOpen(false);
    setUploadForm({ type: '', notes: '', file: null });
    toast.success('Document uploaded successfully');
  };

  // Helper to calculate days until expiry
  const calculateDaysUntilExpiry = (endDateString: string) => {
    if (!endDateString) return 999;
    const end = new Date(endDateString);
    const now = new Date(); // Today: Nov 19, 2025
    // Reset time parts to compare dates only
    end.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    const diffTime = end.getTime() - now.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysUntilExpiry = tenant?.leaseEnd ? calculateDaysUntilExpiry(tenant.leaseEnd) : 999;

  // Conditions
  const isLeaseEnded = tenant.status === 'Rented' && daysUntilExpiry < 0;
  const isLeaseExpiringSoon =
    tenant.status === 'Rented' && daysUntilExpiry >= 0 && daysUntilExpiry <= 60;

  const auditLogEntries: AuditLogEntry[] = [
    {
      id: 1,
      title: 'Tenant Marked as Rented',
      description: 'Admin assigned tenant to property.',
      timestamp: 'Feb 3, 2025 – 10:15 AM',
    },
    {
      id: 2,
      title: 'Lease Document Uploaded',
      description: 'Contract.pdf added by Admin.',
      timestamp: 'Feb 1, 2025 – 4:02 PM',
    },
  ];

  const archivedMessages: ChatMessage[] = [
    {
      id: 1,
      text: 'Hello, when is the final inspection?',
      sender: 'tenant',
      timestamp: 'Nov 14, 2024 10:00 AM',
    },
    {
      id: 2,
      text: 'Hi Khaled, we can schedule it for tomorrow at 2 PM.',
      sender: 'agent',
      timestamp: 'Nov 14, 2024 10:15 AM',
    },
    {
      id: 3,
      text: 'That works for me, thanks.',
      sender: 'tenant',
      timestamp: 'Nov 14, 2024 10:20 AM',
    },
    {
      id: 4,
      text: 'All keys were returned on 12 Jan 2025.',
      sender: 'agent',
      timestamp: 'Jan 12, 2025 4:00 PM',
    },
    {
      id: 5,
      text: 'Thank you for the stay, we appreciate your tenancy.',
      sender: 'agent',
      timestamp: 'Jan 12, 2025 4:05 PM',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Rented':
        return <Badge className="bg-green-100 text-green-700">Rented</Badge>;
      case 'Approved':
        return <Badge className="bg-blue-100 text-blue-700">Approved</Badge>;
      case 'Past Tenant':
        return <Badge className="bg-gray-100 text-gray-700">Past Tenant</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-700">Prospect</Badge>;
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/tenants')}
          className="inline-flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tenants</span>
        </button>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#0E56A4]">{tenant.name}</h1>
              {tenant.status === 'Past Tenant' && (
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-200">
                  Past Tenant
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-sm">ID: {tenant.id}</span>
              <span>•</span>
              <span className="text-sm">Joined: {tenant.joinedDate}</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">{getStatusBadge(tenant.status)}</div>
        </div>

        {/* Lifecycle Timeline */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-2">
          <LifecycleTimeline type="tenant" currentStage={tenant.status} />
        </div>

        {/* Lease Ended Alert */}
        {isLeaseEnded && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-yellow-800">Lease Ended</h3>
              <p className="text-sm text-yellow-700 mt-1">
                The lease period for this tenant has ended. You can now mark the tenancy as
                completed.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${tenant.status === 'Past Tenant' ? 'bg-gray-200' : 'bg-[#E9C500]'}`}
                >
                  <UserCircle
                    className={`w-12 h-12 ${tenant.status === 'Past Tenant' ? 'text-gray-500' : 'text-[#0E56A4]'}`}
                  />
                </div>
                <h3 className="font-bold text-xl text-gray-900">{tenant.name}</h3>
                <p className="text-sm text-gray-500">{tenant.email}</p>
              </div>
              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone
                  </span>
                  <span className="font-medium">{tenant.phone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <User className="w-4 h-4" /> Agent
                  </span>
                  <span className="font-medium">{tenant.assignedAgent || 'Unassigned'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Workflow & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. ASSIGNED PROPERTY BLOCK */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-[#0E56A4]" />
                {tenant.status === 'Past Tenant' ? 'Previous Property' : 'Assigned Property'}
              </h2>

              {tenant.currentProperty ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900">{tenant.currentProperty.name}</h4>
                    <p className="text-sm text-[#0E56A4] font-medium">
                      EGP {tenant.currentProperty.price.toLocaleString()}/mo
                    </p>
                    {(tenant.status === 'Rented' || tenant.status === 'Past Tenant') && (
                      <div className="mt-1 text-xs text-gray-500 space-y-1">
                        <p>Lease Start: {tenant.leaseStart}</p>
                        <p
                          className={
                            tenant.status === 'Past Tenant' ? 'text-red-600 font-medium' : ''
                          }
                        >
                          Lease End: {tenant.leaseEnd}
                        </p>
                      </div>
                    )}
                  </div>
                  <Link to={`/admin/properties/${tenant.currentProperty.id}`}>
                    <Button variant="outline" size="sm">
                      View Property
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {tenant.status === 'Past Tenant' ? (
                    <p className="text-sm text-gray-500">No active property assignment.</p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">
                        No property assigned yet. Select a property to proceed.
                      </p>
                      <div className="flex gap-3">
                        <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Property..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableProperties.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={handleAssignProperty} className="bg-[#0E56A4]">
                          Assign
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 2. WORKFLOW ACTIONS (Hidden for Past Tenant) */}
            {tenant.status !== 'Past Tenant' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0E56A4]" />
                  Workflow Actions
                </h2>

                {/* Step 1: Approval */}
                {tenant.status === 'Prospect' && (
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-100 mb-4">
                    <div>
                      <h4 className="font-medium text-yellow-900">Step 1: Approve Tenant</h4>
                      <p className="text-xs text-yellow-700 mt-1">
                        {tenant.currentProperty
                          ? 'Tenant has an assigned property. Ready for approval.'
                          : 'Assign a property above to enable approval.'}
                      </p>
                    </div>
                    <Button
                      onClick={handleApproveTenant}
                      disabled={!tenant.currentProperty}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      Approve Tenant
                    </Button>
                  </div>
                )}

                {/* Step 2: Mark as Rented */}
                {tenant.status === 'Approved' && (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div>
                      <h4 className="font-medium text-blue-900">Step 2: Mark as Rented</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Create lease and finalize rental. Ensure documents are uploaded below.
                      </p>
                    </div>
                    <Button
                      onClick={handleMarkAsRented}
                      className="bg-[#0E56A4] hover:bg-[#093B74] text-white"
                    >
                      Mark as Rented
                    </Button>
                  </div>
                )}

                {/* Step 3: Lease Renewal (Visible if Rented and Expiring Soon) */}
                {isLeaseExpiringSoon && (
                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-100 mb-4">
                    <div>
                      <h4 className="font-medium text-indigo-900">Lease Renewal</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        Available only before lease expiry.
                      </p>
                    </div>
                    <Dialog open={isRenewModalOpen} onOpenChange={setIsRenewModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#0E56A4] hover:bg-[#093B74] text-white">
                          <Calendar className="w-4 h-4 mr-2" /> Renew Lease
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Renew Tenant Lease</DialogTitle>
                          <DialogDescription>
                            Update the lease period for this tenant.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="start">New Lease Start Date</Label>
                            <Input
                              id="start"
                              type="date"
                              value={renewForm.start}
                              onChange={(e) =>
                                setRenewForm({ ...renewForm, start: e.target.value })
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="end">New Lease End Date</Label>
                            <Input
                              id="end"
                              type="date"
                              value={renewForm.end}
                              onChange={(e) => setRenewForm({ ...renewForm, end: e.target.value })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsRenewModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleRenewLease} className="bg-[#0E56A4] text-white">
                            Confirm
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {/* Step 4: End Tenancy (Visible only if Lease Ended) */}
                {isLeaseEnded && (
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                    <div>
                      <h4 className="font-medium text-red-900">Lease Ended</h4>
                      <p className="text-xs text-red-700 mt-1">
                        The lease period has passed. Confirm move-out and archive tenant.
                      </p>
                    </div>
                    <Dialog open={isEndTenancyModalOpen} onOpenChange={setIsEndTenancyModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#0E56A4] hover:bg-[#093B74] text-white">
                          <Archive className="w-4 h-4 mr-2" /> Mark Tenancy as Completed
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm End of Tenancy</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to mark this tenancy as completed? This will
                            archive the tenant and mark the property as vacant.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEndTenancyModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleEndTenancy} className="bg-[#0E56A4] text-white">
                            Confirm
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            )}

            {/* 3. DOCUMENTS (Visible for Approved, Rented, and Past) */}
            {(tenant.status === 'Approved' ||
              tenant.status === 'Rented' ||
              tenant.status === 'Past Tenant') && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#0E56A4]" />
                    {tenant.status === 'Past Tenant' ? 'Archived Documents' : 'Documents'}
                  </h2>
                  {tenant.status !== 'Past Tenant' && (
                    <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-[#0E56A4] border-[#0E56A4]"
                        >
                          <Plus className="w-4 h-4 mr-2" /> Upload
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Document</DialogTitle>
                          <DialogDescription>
                            Upload contracts, IDs, or proof of payment.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Type</Label>
                            <Select
                              value={uploadForm.type}
                              onValueChange={(v) => setUploadForm({ ...uploadForm, type: v })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="ID Proof">ID Proof</SelectItem>
                                <SelectItem value="Payment Proof">Payment Proof</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>File</Label>
                            <Input
                              type="file"
                              onChange={(e) =>
                                setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleUploadDocument}>Upload</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {documents.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {documents.map((doc) => (
                      <div key={doc.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">
                              {doc.type} • {doc.date}
                            </p>
                          </div>
                        </div>
                        {tenant.status !== 'Past Tenant' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={async () => {
                              const { success, error } = await adminApi.softDeleteDocument(doc.id);
                              if (success) {
                                toast.success('Document deleted successfully');
                                // Remove from local state
                                setDocuments(documents.filter((d) => d.id !== doc.id));
                              } else {
                                toast.error(
                                  error ||
                                    'Failed to delete document. You may not have admin permissions.',
                                );
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 text-sm bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    No documents uploaded yet.
                  </div>
                )}
              </div>
            )}

            {/* 4. ARCHIVED CHAT (Visible for Past Tenants) */}
            {tenant.status === 'Past Tenant' && (
              <div className="mb-6">
                <ArchivedChat
                  messages={archivedMessages}
                  endDate={tenant.leaseEnd || 'Nov 15, 2024'}
                  viewingAs="admin"
                />
              </div>
            )}

            {/* Audit Log Section */}
            <div className="mt-0">
              <AuditLog entries={auditLogEntries} />
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
