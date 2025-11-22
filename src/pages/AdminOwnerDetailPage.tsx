import {
  ArrowLeft,
  Building,
  User,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Edit,
  Eye,
  Tag,
  Hash,
  UserCog,
  CheckCircle,
  XCircle,
  Send,
  Paperclip,
} from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

// Define types for our mock data
type OwnerData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  joined: string;
  propertiesCount: number;
  avatar: string;
  properties: Array<{
    id: string;
    name: string;
    ref: string;
    status: string;
    price: string;
    views: number;
    leads: number;
    city: string;
    tenantName?: string;
    tenantId?: string;
    leaseStart?: string;
    leaseEnd?: string;
  }>;
  leads: Array<{
    id: string;
    tenantName: string;
    propertyName: string;
    status: string;
    date: string;
  }>;
  tenants: Array<{
    tenantId: string;
    name: string;
    propertyName: string;
    leaseStart: string;
    leaseEnd: string;
    status: string;
  }>;
  messages: Array<{
    id: number;
    sender: string;
    text: string;
    timestamp: string;
  }>;
};

// Mock Data Store
const mockOwnersData: Record<string, OwnerData> = {
  ahmedId: {
    id: 'ahmedId',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+20 100 123 4567',
    status: 'Active',
    joined: 'Jan 2024',
    propertiesCount: 3,
    avatar: 'https://i.pravatar.cc/150?img=68',
    properties: [
      {
        id: '101',
        name: 'Luxury 4BR Villa with Pool',
        ref: 'BOB-NC-VIL-0041-R1',
        status: 'Pending',
        price: 'EGP 45,000/mo',
        views: 120,
        leads: 5,
        city: 'New Cairo',
      },
      {
        id: '105',
        name: 'Luxury Villa',
        ref: 'BOB-NC-VIL-0092-R2',
        status: 'Assigned',
        price: 'EGP 38,000/mo',
        views: 198,
        leads: 22,
        city: 'New Cairo',
      },
      {
        id: '205',
        name: 'Modern Apartment',
        ref: 'BOB-SZ-APT-0033-R1',
        status: 'Draft',
        price: 'EGP 25,000/mo',
        views: 0,
        leads: 0,
        city: 'Sheikh Zayed',
      },
    ],
    leads: [
      {
        id: 'L1',
        tenantName: 'Mohamed Hassan',
        propertyName: 'Luxury 4BR Villa with Pool',
        status: 'New',
        date: '2 hours ago',
      },
      {
        id: 'L2',
        tenantName: 'Sara Ibrahim',
        propertyName: 'Luxury Villa',
        status: 'Contacted',
        date: '1 day ago',
      },
    ],
    tenants: [
      {
        tenantId: '101',
        name: 'Layla Hassan',
        propertyName: 'Luxury Villa',
        leaseStart: 'Nov 1, 2025',
        leaseEnd: 'Nov 1, 2026',
        status: 'Active',
      },
    ],
    messages: [
      {
        id: 1,
        sender: 'owner',
        text: 'Hello Admin, I need help updating my property listing.',
        timestamp: '2 days ago',
      },
      {
        id: 2,
        sender: 'admin',
        text: 'Hi Ahmed, sure thing. Which property are you referring to?',
        timestamp: '2 days ago',
      },
      {
        id: 3,
        sender: 'owner',
        text: 'The Luxury Villa in New Cairo (ID: 105).',
        timestamp: '1 day ago',
      },
    ],
  },
  saraId: {
    id: 'saraId',
    name: 'Sara Mohamed',
    email: 'sara.mohamed@email.com',
    phone: '+20 100 234 5678',
    status: 'Active',
    joined: 'Feb 2024',
    propertiesCount: 2,
    avatar: 'https://i.pravatar.cc/150?img=32',
    properties: [
      {
        id: '301',
        name: 'Downtown Studio',
        ref: 'BOB-DT-STU-0012-R1',
        status: 'Active',
        price: 'EGP 15,000/mo',
        views: 85,
        leads: 12,
        city: 'Cairo',
      },
      {
        id: '302',
        name: 'Zamalek Apartment',
        ref: 'BOB-ZM-APT-0045-R1',
        status: 'Rented',
        price: 'EGP 30,000/mo',
        views: 210,
        leads: 8,
        city: 'Cairo',
        tenantName: 'Omar Youssef',
        tenantId: '102',
        leaseStart: 'Jan 1, 2025',
        leaseEnd: 'Jan 1, 2026',
      },
    ],
    leads: [
      {
        id: 'L3',
        tenantName: 'Karim Nabil',
        propertyName: 'Downtown Studio',
        status: 'New',
        date: '5 hours ago',
      },
    ],
    tenants: [
      {
        tenantId: '102',
        name: 'Omar Youssef',
        propertyName: 'Zamalek Apartment',
        leaseStart: 'Jan 1, 2025',
        leaseEnd: 'Jan 1, 2026',
        status: 'Active',
      },
    ],
    messages: [
      {
        id: 1,
        sender: 'owner',
        text: 'Hi, when will I receive the rent payment for this month?',
        timestamp: '1 day ago',
      },
    ],
  },
  mohamedId: {
    id: 'mohamedId',
    name: 'Mohamed Ali',
    email: 'mohamed.ali@email.com',
    phone: '+20 100 345 6789',
    status: 'Active',
    joined: 'Mar 2024',
    propertiesCount: 1,
    avatar: 'https://i.pravatar.cc/150?img=11',
    properties: [
      {
        id: '401',
        name: 'Seaside Chalet',
        ref: 'BOB-NC-CH-0088-R1',
        status: 'Active',
        price: 'EGP 12,000/night',
        views: 340,
        leads: 45,
        city: 'North Coast',
      },
    ],
    leads: [],
    tenants: [],
    messages: [],
  },
};

export default function AdminOwnerDetailPage() {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [adminNotes, setAdminNotes] = useState('');
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Get owner data based on ID, fallback to Ahmed if not found (or could show 404)
  const ownerData =
    ownerId && mockOwnersData[ownerId] ? mockOwnersData[ownerId] : mockOwnersData['ahmedId'];

  // Local state for messages so we can add to them in the UI
  const [messages, setMessages] = useState(ownerData.messages);

  // Reset messages when owner changes (if we were to navigate between owners directly)
  if (messages !== ownerData.messages && messages.length === 0 && ownerData.messages.length > 0) {
    setMessages(ownerData.messages);
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Active: 'bg-green-100 text-green-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Rented: 'bg-blue-100 text-blue-700',
      Draft: 'bg-gray-100 text-gray-700',
      Suspended: 'bg-red-100 text-red-700',
      Assigned: 'bg-purple-100 text-purple-700',
    };
    return <Badge className={styles[status] || 'bg-gray-100 text-gray-700'}>{status}</Badge>;
  };

  const getLeadStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      New: 'bg-blue-100 text-blue-700',
      Contacted: 'bg-yellow-100 text-yellow-700',
      'Follow-up': 'bg-purple-100 text-purple-700',
      Closed: 'bg-gray-100 text-gray-700',
    };
    return <Badge className={styles[status] || 'bg-gray-100 text-gray-700'}>{status}</Badge>;
  };

  const handleMessageOwner = () => {
    // Reset messages to current owner's messages when opening dialog
    // In a real app, we'd probably fetch them here
    setMessages(ownerData.messages);
    setIsMessageDialogOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'admin',
      text: messageText,
      timestamp: 'Just now',
    };

    setMessages([...messages, newMessage]);
    // In a real app, we'd also update mockOwnersData[ownerId].messages
    setMessageText('');
    toast.success('Message sent to owner');
  };

  const handleSaveNotes = () => {
    toast.success('Admin notes saved');
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate('/admin/owners')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Owners
        </button>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Owner Details</h1>
            <p className="text-gray-600">View and manage owner information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Overview & Notes */}
          <div className="space-y-6 lg:col-span-1">
            {/* Owner Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#E9C500] rounded-full flex items-center justify-center overflow-hidden">
                  {ownerData.avatar ? (
                    <img
                      src={ownerData.avatar}
                      alt={ownerData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCog className="w-8 h-8 text-[#0E56A4]" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{ownerData.name}</h2>
                  <Badge className="mt-1 bg-green-100 text-green-700">{ownerData.status}</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4 text-[#0E56A4]" />
                  <span>{ownerData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-4 h-4 text-[#0E56A4]" />
                  <span>{ownerData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 text-[#0E56A4]" />
                  <span>Joined {ownerData.joined}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Building className="w-4 h-4 text-[#0E56A4]" />
                  <span>{ownerData.propertiesCount} Properties Created</span>
                </div>
              </div>
            </div>

            {/* Communication Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Communication</h3>
              <Button
                onClick={handleMessageOwner}
                className="w-full bg-[#0E56A4] text-white hover:bg-[#0A3F79] flex items-center justify-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Owner
              </Button>
            </div>

            {/* Admin Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Admin Notes</h3>
              <Textarea
                placeholder="Add internal notes about this owner..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="min-h-[120px] mb-3"
              />
              <Button
                onClick={handleSaveNotes}
                variant="outline"
                className="w-full border-[#0E56A4] text-[#0E56A4]"
              >
                Save Notes
              </Button>
            </div>
          </div>

          {/* Right Column: Properties, Leads, Tenants */}
          <div className="space-y-8 lg:col-span-2">
            {/* Properties Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#0E56A4]">Properties Owned</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {ownerData.properties.map((property) => (
                  <div key={property.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-gray-900">{property.name}</h4>
                          {getStatusBadge(property.status)}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {property.ref}
                          </span>
                          <span className="flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            ID: {property.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {property.city}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="font-medium text-[#0E56A4]">{property.price}</span>
                          <span>•</span>
                          <span>{property.views} Views</span>
                          <span>•</span>
                          <span>{property.leads} Leads</span>
                        </div>

                        {/* Current Tenant Section */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            Current Tenant
                          </p>
                          {property.status === 'Rented' && property.tenantId ? (
                            <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between gap-4">
                              <div>
                                <div className="font-medium text-gray-900 text-sm">
                                  {property.tenantName}
                                </div>
                                <div className="text-xs text-gray-500">ID: {property.tenantId}</div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {property.leaseStart} - {property.leaseEnd}
                                </div>
                              </div>
                              <Link to={`/admin/tenants/${property.tenantId}`}>
                                <Button
                                  size="sm"
                                  className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
                                >
                                  View Tenant
                                </Button>
                              </Link>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 italic">No active tenant.</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/admin/properties/${property.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#0E56A4] text-[#0E56A4]"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </Link>
                        <Link to={`/admin/properties/${property.id}/edit`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                {ownerData.properties.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No properties found for this owner.
                  </div>
                )}
              </div>
            </div>

            {/* Leads Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#0E56A4]">Active Leads</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {ownerData.leads.map((lead) => (
                  <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{lead.tenantName}</span>
                          {getLeadStatusBadge(lead.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Interested in <span className="font-medium">{lead.propertyName}</span>
                        </p>
                        <p className="text-xs text-gray-400">{lead.date}</p>
                      </div>
                      <Button size="sm" className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                        View Conversation
                      </Button>
                    </div>
                  </div>
                ))}
                {ownerData.leads.length === 0 && (
                  <div className="p-8 text-center text-gray-500">No active leads found.</div>
                )}
              </div>
            </div>

            {/* Tenants Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#0E56A4]">Current Tenants</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {ownerData.tenants.map((tenant) => (
                  <div key={tenant.tenantId} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{tenant.name}</span>
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Renting <span className="font-medium">{tenant.propertyName}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Lease: {tenant.leaseStart} - {tenant.leaseEnd}
                        </p>
                      </div>
                      <Link to={`/admin/tenants/${tenant.tenantId}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#0E56A4] text-[#0E56A4]"
                        >
                          View Tenant
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
                {ownerData.tenants.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No tenants currently renting from this owner.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Owner Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden bg-white border border-gray-200 shadow-xl">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <img
                src={ownerData.avatar}
                alt={ownerData.name}
                className="w-10 h-10 rounded-full bg-gray-100 object-cover border"
              />
              <div>
                <DialogTitle className="text-base font-semibold text-gray-900">
                  {ownerData.name}
                </DialogTitle>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                  Admin ↔ Owner Chat
                </p>
              </div>
            </div>
            <DialogDescription className="hidden">
              Chat interface between Admin and Owner
            </DialogDescription>
          </DialogHeader>

          {/* Chat Area */}
          <div className="h-[400px] overflow-y-auto p-6 bg-gray-50 flex flex-col gap-4">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
                <MessageSquare className="w-10 h-10 mb-2 opacity-20" />
                <p>Start a conversation with this owner.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'admin'
                        ? 'bg-[#0E56A4] text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        msg.sender === 'admin' ? 'text-blue-200' : 'text-gray-400'
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border-gray-200 focus-visible:ring-[#0E56A4]"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!messageText.trim()}
                className="bg-[#0E56A4] text-white hover:bg-[#0A3F79] rounded-full w-10 h-10 flex-shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
}
