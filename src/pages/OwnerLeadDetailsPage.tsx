import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  MapPin,
  Home,
  User,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Shield
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { DashboardLayout } from '../components/DashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export default function OwnerLeadDetailsPage() {
  const { leadId } = useParams();
  const navigate = useNavigate();

  // Mock conversation data based on lead ID
  const conversations: Record<string, any> = {
    '1': {
      tenantName: 'Sarah Ahmed',
      tenantAvatar: 'https://i.pravatar.cc/150?img=1',
      tenantPhone: '+20 100 123 4567',
      tenantEmail: 'sarah.ahmed@example.com',
      propertyName: 'Luxury 3BR Apartment',
      propertyLocation: 'New Cairo, Cairo',
      propertyPrice: 'EGP 25,000/month',
      propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      status: 'New',
      agentName: 'Ahmed Mansour',
      agentAvatar: 'https://i.pravatar.cc/150?img=33',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          senderName: 'Sarah Ahmed',
          text: 'Hi, I\'m interested in viewing this property. Is it still available?',
          timestamp: '2 hours ago',
          date: 'Today'
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Ahmed Mansour',
          text: 'Yes! The property is available. When would you like to schedule a viewing?',
          timestamp: '1 hour ago',
          date: 'Today'
        },
        {
          id: 3,
          sender: 'tenant',
          senderName: 'Sarah Ahmed',
          text: 'I\'m available this Saturday afternoon. Does 2 PM work?',
          timestamp: '30 minutes ago',
          date: 'Today'
        }
      ]
    },
    '2': {
      tenantName: 'Mohamed Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=12',
      tenantPhone: '+20 101 234 5678',
      tenantEmail: 'mohamed.hassan@example.com',
      propertyName: 'Modern Villa with Pool',
      propertyLocation: 'Sheikh Zayed, Giza',
      propertyPrice: 'EGP 45,000/month',
      propertyImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      status: 'Contacted',
      agentName: 'Fatima El-Sayed',
      agentAvatar: 'https://i.pravatar.cc/150?img=44',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          senderName: 'Mohamed Hassan',
          text: 'Hello, I would like to schedule a viewing for this weekend. Please let me know your availability.',
          timestamp: '5 hours ago',
          date: 'Today'
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Fatima El-Sayed',
          text: 'Hello Mohamed! I\'d be happy to arrange a viewing. This weekend works perfectly. Would Saturday at 10 AM be convenient for you?',
          timestamp: '4 hours ago',
          date: 'Today'
        }
      ]
    },
    '3': {
      tenantName: 'Layla Ibrahim',
      tenantAvatar: 'https://i.pravatar.cc/150?img=5',
      tenantPhone: '+20 102 345 6789',
      tenantEmail: 'layla.ibrahim@example.com',
      propertyName: 'Spacious 2BR Penthouse',
      propertyLocation: 'Maadi, Cairo',
      propertyPrice: 'EGP 18,000/month',
      propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      status: 'New',
      agentName: 'Omar Khalil',
      agentAvatar: 'https://i.pravatar.cc/150?img=51',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          senderName: 'Layla Ibrahim',
          text: 'Is the property pet-friendly? I have a small dog.',
          timestamp: '1 day ago',
          date: 'Yesterday'
        }
      ]
    },
    '4': {
      tenantName: 'Omar Youssef',
      tenantAvatar: 'https://i.pravatar.cc/150?img=13',
      tenantPhone: '+20 103 456 7890',
      tenantEmail: 'omar.youssef@example.com',
      propertyName: 'Sea View Apartment',
      propertyLocation: 'New Alamein, North Coast',
      propertyPrice: 'EGP 30,000/month',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      status: 'Contacted',
      agentName: 'Mona Saad',
      agentAvatar: 'https://i.pravatar.cc/150?img=47',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          senderName: 'Omar Youssef',
          text: 'I saw your listing and I\'m very interested. Can we discuss the lease terms?',
          timestamp: '1 day ago',
          date: 'Yesterday'
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Mona Saad',
          text: 'Of course! The lease is for 12 months minimum. The deposit is 2 months rent. We can schedule a call to discuss all the details.',
          timestamp: '1 day ago',
          date: 'Yesterday'
        },
        {
          id: 3,
          sender: 'tenant',
          senderName: 'Omar Youssef',
          text: 'That sounds great. I\'m available tomorrow afternoon for a call.',
          timestamp: '1 day ago',
          date: 'Yesterday'
        }
      ]
    }
  };

  const conversation = leadId ? conversations[leadId] : null;

  if (!conversation) {
    return (
      <DashboardLayout userRole="owner">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lead Not Found</h2>
            <Button onClick={() => navigate('/owner/leads')}>
              Back to Leads Center
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
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
                onClick={() => navigate('/owner/leads')}
                className="text-[#0E56A4] hover:text-[#0A3F79] transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-semibold text-[#0E56A4] mb-1">Lead Details</h1>
                <p className="text-sm text-gray-600">Read-only view of prospect inquiry</p>
              </div>
            </div>

            {/* Status Badge */}
            <Badge className={getStatusColor(conversation.status)}>
              {conversation.status}
            </Badge>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium">Agent-Managed Communication</p>
                <p className="text-sm text-blue-700 mt-1">
                  Conversations with prospects are managed by your assigned agent. You can monitor progress here.
                </p>
              </div>
            </div>
          </div>

          {/* Lead Summary Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Tenant Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0E56A4]" />
                Tenant (Prospect)
              </h3>
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={conversation.tenantAvatar}
                  alt={conversation.tenantName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{conversation.tenantName}</h4>
                  <p className="text-sm text-gray-500">Interested Prospect</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-[#0E56A4]" />
                  <span>{conversation.tenantPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-[#0E56A4]" />
                  <span>{conversation.tenantEmail}</span>
                </div>
              </div>
            </div>

            {/* Agent Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#E9C500]" />
                Assigned Agent
              </h3>
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={conversation.agentAvatar}
                  alt={conversation.agentName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{conversation.agentName}</h4>
                  <p className="text-sm text-gray-500">Managing this lead</p>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Your assigned agent is handling all communication and scheduling with this prospect.
              </p>
            </div>
          </div>

          {/* Property Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-[#0E56A4]" />
              Property
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <ImageWithFallback
                src={conversation.propertyImage}
                alt={conversation.propertyName}
                className="w-full sm:w-32 h-32 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-[#0E56A4] mb-2">{conversation.propertyName}</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{conversation.propertyLocation}</span>
                  </div>
                  <p className="text-lg font-bold text-[#0E56A4]">{conversation.propertyPrice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation Timeline (Read-Only) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Conversation Header */}
            <div className="border-b border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#0E56A4]" />
                Conversation History
              </h3>
              <p className="text-sm text-gray-500 mt-1">Read-only timeline of all messages</p>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
              {conversation.messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'tenant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'tenant'
                        ? 'bg-gray-100 text-gray-900'
                        : message.sender === 'agent'
                        ? 'bg-[#0E56A4] text-white'
                        : 'bg-[#E9C500] text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-xs font-medium ${
                        message.sender === 'agent' ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {message.senderName}
                      </p>
                      <span className={`text-xs ${
                        message.sender === 'agent' ? 'text-white/60' : 'text-gray-400'
                      }`}>
                        • {message.sender === 'tenant' ? 'Prospect' : 'Agent'}
                      </span>
                    </div>
                    <p className="text-sm break-words">{message.text}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className={`w-3 h-3 ${
                        message.sender === 'agent' ? 'text-white/60' : 'text-gray-400'
                      }`} />
                      <span className={`text-xs ${
                        message.sender === 'agent' ? 'text-white/60' : 'text-gray-400'
                      }`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Read-Only Notice */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-gray-400" />
                <p>
                  This conversation is managed by your agent. You cannot send messages to prospects directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
