import { ArrowLeft, Mail, Phone, Building, Calendar, FileText, MessageSquare } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArchivedChat, ChatMessage } from '../components/ArchivedChat';
import { ArchivedRentalSummary } from '../components/ArchivedRentalSummary';
import { DashboardLayout } from '../components/DashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Mock data for a single tenant detail
const MOCK_TENANT_DETAILS = {
  id: '1',
  name: 'Karim Nabil',
  email: 'karim.nabil@example.com',
  phone: '+20 100 555 6666',
  avatar: 'https://i.pravatar.cc/150?img=11',
  status: 'Past Tenant',
  property: {
    name: 'Luxury 3BR Apartment',
    location: 'New Cairo, 5th Settlement',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    price: 'EGP 25,000/mo',
  },
  lease: {
    start: 'Jan 1, 2023',
    end: 'Dec 31, 2023',
    term: '12 Months',
  },
  documents: [
    { id: 1, name: 'Lease Agreement.pdf', date: 'Jan 1, 2023' },
    { id: 2, name: 'Security Deposit Receipt.pdf', date: 'Jan 1, 2023' },
    { id: 3, name: 'Move-out Inspection.pdf', date: 'Dec 31, 2023' },
  ],
  chatHistory: [
    {
      id: 1,
      sender: 'tenant',
      text: 'Hi, I wanted to confirm the move-out inspection time.',
      time: 'Dec 28, 2023, 10:00 AM',
    },
    {
      id: 2,
      sender: 'owner',
      text: 'Hello Karim, yes, we are set for Dec 31st at 2 PM.',
      time: 'Dec 28, 2023, 10:15 AM',
    },
    { id: 3, sender: 'tenant', text: 'Great, thank you!', time: 'Dec 28, 2023, 10:16 AM' },
  ],
};

export default function OwnerPastTenantDetailPage() {
  const { tenantId } = useParams();
  const navigate = useNavigate();

  // In a real app, fetch based on tenantId
  const tenant = MOCK_TENANT_DETAILS;

  const archivedMessages: ChatMessage[] = tenant.chatHistory.map((msg) => ({
    id: msg.id,
    text: msg.text,
    sender: msg.sender as 'tenant' | 'owner',
    timestamp: msg.time,
  }));

  return (
    <DashboardLayout userRole="owner">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate('/owner/past-tenants')}
          className="inline-flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Past Tenants</span>
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={tenant.avatar}
                alt={tenant.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{tenant.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-gray-200">
                    {tenant.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-100">
            {/* Contact Info (Read Only) */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0E56A4]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{tenant.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0E56A4]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{tenant.phone}</span>
                </div>
              </div>
            </div>

            {/* Lease Summary */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Lease Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">{tenant.property.name}</p>
                    <p className="text-xs text-gray-500">{tenant.property.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {tenant.lease.start} - {tenant.lease.end}
                    </p>
                    <p className="text-xs text-gray-500">Term: {tenant.lease.term}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="chat">Archived Chat</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Lease Documents</h3>
                <p className="text-sm text-gray-500">Archived documents for this tenancy</p>
              </div>
              <div className="divide-y divide-gray-100">
                {tenant.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 hover:bg-gray-50 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.date}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0E56A4] hover:text-[#0A3F79] hover:bg-blue-50"
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Archived Chat Tab */}
          <TabsContent value="chat">
            <ArchivedRentalSummary
              propertyName={tenant.property.name}
              propertyRef="BOB-NC-3BR-019"
              leaseStart={tenant.lease.start}
              leaseEnd={tenant.lease.end}
              leaseDuration={tenant.lease.term}
              finalRent={tenant.property.price}
              tenantName={tenant.name}
              ownerName="Me"
            />
            <ArchivedChat
              messages={archivedMessages}
              endDate={tenant.lease.end}
              viewingAs="owner"
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
