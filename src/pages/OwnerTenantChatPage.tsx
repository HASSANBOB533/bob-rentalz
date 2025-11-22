import { ArrowLeft, Send, MapPin, Home, Calendar, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DashboardLayout } from '../components/DashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export default function OwnerTenantChatPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState('');

  // Mock data for properties with ownership info
  const MOCK_PROPERTIES = [
    { id: '1', status: 'Rented', ownerId: 'owner-1', hasActiveTenant: true },
    { id: '2', status: 'Active', ownerId: 'owner-1', hasActiveTenant: false },
    { id: '3', status: 'Rented', ownerId: 'owner-1', hasActiveTenant: true },
    { id: '4', status: 'Active', ownerId: 'owner-1', hasActiveTenant: false },
    { id: '5', status: 'Draft', ownerId: 'owner-1', hasActiveTenant: false },
    { id: '6', status: 'Rented', ownerId: 'owner-1', hasActiveTenant: true },
    { id: '7', status: 'Rented', ownerId: 'owner-1', hasActiveTenant: true },
  ];

  // Mock logged-in owner ID (in a real app, this would come from auth context)
  const currentOwnerId = 'owner-1';

  // Permission checks on mount
  useEffect(() => {
    const property = MOCK_PROPERTIES.find((p) => p.id === propertyId);

    // Check 1: Property exists
    if (!property) {
      toast.error('Property not found.');
      navigate('/owner/messages');
      return;
    }

    // Check 2: Property belongs to current owner
    if (property.ownerId !== currentOwnerId) {
      toast.error("You don't have access to this property's tenant chat.");
      navigate('/owner/messages');
      return;
    }

    // Check 3: Property has an active tenant
    if (!property.hasActiveTenant || property.status !== 'Rented') {
      toast.error(
        'No active tenant found for this property. You can only message tenants with an active lease.',
      );
      navigate('/owner/messages');
      return;
    }
  }, [propertyId, navigate]);

  // Mock data for property and tenant
  const propertyChats: Record<string, any> = {
    '1': {
      propertyName: 'Luxury 3BR Apartment',
      propertyLocation: 'New Cairo, 5th Settlement',
      propertyPrice: 'EGP 25,000/month',
      tenantName: 'Sarah Ahmed',
      tenantAvatar: 'https://i.pravatar.cc/150?img=1',
      leaseStart: 'Jan 1, 2024',
      leaseEnd: 'Dec 31, 2024',
      leaseStatus: 'Active',
      messages: [
        {
          id: 1,
          sender: 'system',
          text: 'Lease started on January 1, 2024',
          timestamp: 'Jan 1, 2024',
          date: 'Jan 1',
        },
        {
          id: 2,
          sender: 'tenant',
          senderName: 'Sarah Ahmed',
          text: "Hi! The heating system doesn't seem to be working properly. Could you please have someone take a look?",
          timestamp: '2 days ago',
          date: 'Nov 16',
        },
        {
          id: 3,
          sender: 'owner',
          senderName: 'You',
          text: "Hello Sarah! I'll send a technician tomorrow morning. Is 10 AM convenient for you?",
          timestamp: '2 days ago',
          date: 'Nov 16',
        },
        {
          id: 4,
          sender: 'tenant',
          senderName: 'Sarah Ahmed',
          text: 'Perfect! 10 AM works great. Thank you for the quick response.',
          timestamp: '2 days ago',
          date: 'Nov 16',
        },
      ],
    },
    '3': {
      propertyName: 'Spacious 2BR Penthouse',
      propertyLocation: 'Maadi, Sarayat',
      propertyPrice: 'EGP 35,000/month',
      tenantName: 'Mohamed Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=12',
      leaseStart: 'Mar 15, 2024',
      leaseEnd: 'Mar 14, 2025',
      leaseStatus: 'Active',
      messages: [
        {
          id: 1,
          sender: 'system',
          text: 'Lease started on March 15, 2024',
          timestamp: 'Mar 15, 2024',
          date: 'Mar 15',
        },
        {
          id: 2,
          sender: 'tenant',
          senderName: 'Mohamed Hassan',
          text: "Good morning! I wanted to inform you that I'll be traveling for a month. The property will be empty but secure.",
          timestamp: '1 week ago',
          date: 'Nov 11',
        },
        {
          id: 3,
          sender: 'owner',
          senderName: 'You',
          text: 'Thank you for letting me know, Mohamed. Have a safe trip!',
          timestamp: '1 week ago',
          date: 'Nov 11',
        },
      ],
    },
    '6': {
      propertyName: 'Sea View Apartment',
      propertyLocation: 'Alexandria, Miami',
      propertyPrice: 'EGP 28,000/month',
      tenantName: 'Layla Ibrahim',
      tenantAvatar: 'https://i.pravatar.cc/150?img=5',
      leaseStart: 'Feb 1, 2024',
      leaseEnd: 'Jan 31, 2025',
      leaseStatus: 'Ending Soon',
      messages: [
        {
          id: 1,
          sender: 'system',
          text: 'Lease started on February 1, 2024',
          timestamp: 'Feb 1, 2024',
          date: 'Feb 1',
        },
        {
          id: 2,
          sender: 'owner',
          senderName: 'You',
          text: 'Hi Layla, I wanted to reach out regarding the lease renewal. Are you interested in extending for another year?',
          timestamp: '3 days ago',
          date: 'Nov 15',
        },
        {
          id: 3,
          sender: 'tenant',
          senderName: 'Layla Ibrahim',
          text: "Hello! I'm still considering my options. Can I let you know by the end of this week?",
          timestamp: '3 days ago',
          date: 'Nov 15',
        },
        {
          id: 4,
          sender: 'owner',
          senderName: 'You',
          text: "Of course! Take your time. Just let me know when you've decided.",
          timestamp: '3 days ago',
          date: 'Nov 15',
        },
      ],
    },
    '7': {
      propertyName: 'Modern Studio in Zamalek',
      propertyLocation: 'Cairo, Zamalek',
      propertyPrice: 'EGP 18,000/month',
      tenantName: 'Ahmed Mahmoud',
      tenantAvatar: 'https://i.pravatar.cc/150?img=8',
      leaseStart: 'Apr 1, 2024',
      leaseEnd: 'Feb 28, 2026',
      leaseStatus: 'Active',
      messages: [
        {
          id: 1,
          sender: 'system',
          text: 'Lease started on April 1, 2024',
          timestamp: 'Apr 1, 2024',
          date: 'Apr 1',
        },
        {
          id: 2,
          sender: 'tenant',
          senderName: 'Ahmed Mahmoud',
          text: 'Good afternoon! The air conditioning unit is making unusual noises. Could you arrange for a maintenance check?',
          timestamp: '5 days ago',
          date: 'Nov 13',
        },
        {
          id: 3,
          sender: 'owner',
          senderName: 'You',
          text: "Thank you for letting me know. I'll send a technician this afternoon to take a look.",
          timestamp: '5 days ago',
          date: 'Nov 13',
        },
        {
          id: 4,
          sender: 'tenant',
          senderName: 'Ahmed Mahmoud',
          text: 'The air conditioning has been fixed. Thank you!',
          timestamp: '4 days ago',
          date: 'Nov 14',
        },
      ],
    },
  };

  const chat = propertyId ? propertyChats[propertyId] : null;

  if (!chat) {
    return (
      <DashboardLayout userRole="owner">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Property Not Found</h2>
            <Button onClick={() => navigate('/owner/properties')}>Back to My Properties</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageText);
      setMessageText('');
      toast.success('Message sent successfully!');
    }
  };

  const getLeaseStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Ending Soon':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <DashboardLayout userRole="owner">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            {/* Back Button & Title */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <button
                onClick={() => navigate('/owner/messages')}
                className="text-[#0E56A4] hover:text-[#0A3F79] transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-semibold text-[#0E56A4] mb-1">Chat with Tenant</h1>
                <p className="text-sm text-gray-600">Active lease conversation</p>
              </div>
            </div>

            {/* Lease Status Badge */}
            <Badge className={getLeaseStatusColor(chat.leaseStatus)}>{chat.leaseStatus}</Badge>
          </div>

          {/* Info Notice */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-900 font-medium">Post-Rental Communication</p>
                <p className="text-sm text-green-700 mt-1">
                  This conversation is between you and your current tenant for this property. You
                  can communicate directly about maintenance, lease renewals, and property-related
                  matters.
                </p>
              </div>
            </div>
          </div>

          {/* Property and Tenant Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Property Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-[#0E56A4]" />
                Property
              </h3>

              <div>
                <h4 className="font-semibold text-[#0E56A4] mb-2">{chat.propertyName}</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{chat.propertyLocation}</span>
                  </div>
                  <p className="text-lg font-bold text-[#0E56A4]">{chat.propertyPrice}</p>
                </div>
              </div>
            </div>

            {/* Tenant Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700">Active Tenant</Badge>
              </h3>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={chat.tenantAvatar}
                  alt={chat.tenantName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{chat.tenantName}</h4>
                  <p className="text-sm text-gray-500">Current Tenant</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-[#0E56A4]" />
                <span>
                  {chat.leaseStart} - {chat.leaseEnd}
                </span>
              </div>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Conversation Header */}
            <div className="border-b border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Messages</h3>
              <p className="text-sm text-gray-500 mt-1">Direct communication with your tenant</p>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
              {chat.messages.map((message: any) => (
                <div key={message.id}>
                  {message.sender === 'system' ? (
                    // System Message
                    <div className="flex justify-center my-4">
                      <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-medium">
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    // Regular Message
                    <div
                      className={`flex ${message.sender === 'tenant' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          message.sender === 'tenant'
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-[#0E56A4] text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className={`text-xs font-medium ${
                              message.sender === 'owner' ? 'text-white/80' : 'text-gray-600'
                            }`}
                          >
                            {message.senderName}
                          </p>
                        </div>
                        <p className="text-sm break-words">{message.text}</p>
                        <p
                          className={`text-xs mt-2 ${
                            message.sender === 'owner' ? 'text-white/60' : 'text-gray-400'
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message to your tenant..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-[#0E56A4] text-white hover:bg-[#0A3F79] px-6 py-3 h-auto"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
