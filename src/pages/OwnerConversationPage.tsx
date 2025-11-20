import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  MapPin,
  Home
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { DashboardLayout } from '../components/DashboardLayout';
import { useState } from 'react';
import { Button } from '../components/ui/button';

export default function OwnerConversationPage() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState('');

  // Mock conversation data based on lead ID
  const conversations: Record<string, any> = {
    '1': {
      tenantName: 'Sarah Ahmed',
      tenantAvatar: 'https://i.pravatar.cc/150?img=1',
      propertyName: 'Luxury 3BR Apartment',
      propertyLocation: 'New Cairo, Cairo',
      propertyPrice: 'EGP 25,000/month',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'Hi, I\'m interested in viewing this property. Is it still available?',
          timestamp: '2 hours ago',
          date: 'Today'
        },
        {
          id: 2,
          sender: 'owner',
          text: 'Yes! The property is available. When would you like to schedule a viewing?',
          timestamp: '1 hour ago',
          date: 'Today'
        }
      ]
    },
    '2': {
      tenantName: 'Mohamed Hassan',
      tenantAvatar: 'https://i.pravatar.cc/150?img=12',
      propertyName: 'Modern Villa with Pool',
      propertyLocation: 'Sheikh Zayed, Giza',
      propertyPrice: 'EGP 45,000/month',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'Hello, I would like to schedule a viewing for this weekend. Please let me know your availability.',
          timestamp: '5 hours ago',
          date: 'Today'
        }
      ]
    },
    '3': {
      tenantName: 'Layla Ibrahim',
      tenantAvatar: 'https://i.pravatar.cc/150?img=5',
      propertyName: 'Spacious 2BR Penthouse',
      propertyLocation: 'Maadi, Cairo',
      propertyPrice: 'EGP 18,000/month',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'Is the property pet-friendly? I have a small dog.',
          timestamp: '1 day ago',
          date: 'Yesterday'
        }
      ]
    },
    '4': {
      tenantName: 'Omar Youssef',
      tenantAvatar: 'https://i.pravatar.cc/150?img=13',
      propertyName: 'Sea View Apartment',
      propertyLocation: 'New Alamein, North Coast',
      propertyPrice: 'EGP 30,000/month',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'I saw your listing and I\'m very interested. Can we discuss the lease terms?',
          timestamp: '1 day ago',
          date: 'Yesterday'
        },
        {
          id: 2,
          sender: 'owner',
          text: 'Of course! The lease is for 12 months minimum. The deposit is 2 months rent.',
          timestamp: '1 day ago',
          date: 'Yesterday'
        }
      ]
    },
    '5': {
      tenantName: 'Fatima Ali',
      tenantAvatar: 'https://i.pravatar.cc/150?img=9',
      propertyName: 'Luxury 3BR Apartment',
      propertyLocation: 'New Cairo, Cairo',
      propertyPrice: 'EGP 25,000/month',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'Thank you for your response. I have decided to go with another property.',
          timestamp: '3 days ago',
          date: '3 days ago'
        }
      ]
    },
    '6': {
      tenantName: 'Karim Nabil',
      tenantAvatar: 'https://i.pravatar.cc/150?img=14',
      propertyName: 'Cozy Studio Apartment',
      propertyLocation: 'Heliopolis, Cairo',
      propertyPrice: 'EGP 8,500/month',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'What utilities are included in the rent? Is internet included?',
          timestamp: '3 days ago',
          date: '3 days ago'
        }
      ]
    },
    '7': {
      tenantName: 'Nadia Samir',
      tenantAvatar: 'https://i.pravatar.cc/150?img=10',
      propertyName: 'Modern Villa with Pool',
      propertyLocation: 'Sheikh Zayed, Giza',
      propertyPrice: 'EGP 45,000/month',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'Can I move in by the 1st of next month?',
          timestamp: '5 days ago',
          date: '5 days ago'
        }
      ]
    },
    '8': {
      tenantName: 'Youssef Mahmoud',
      tenantAvatar: 'https://i.pravatar.cc/150?img=15',
      propertyName: 'Family Duplex - 4BR',
      propertyLocation: '6th October, Giza',
      propertyPrice: 'EGP 35,000/month',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'Is there parking available? How many cars?',
          timestamp: '1 week ago',
          date: '1 week ago'
        }
      ]
    }
  };

  const conversation = conversations[leadId || '1'];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  if (!conversation) {
    return (
      <DashboardLayout userRole="owner">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Conversation Not Found</h2>
            <Button onClick={() => navigate('/owner/leads')}>
              Back to Leads Center
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="owner">
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              {/* Back Button & Tenant Info */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <button
                  onClick={() => navigate('/owner/leads')}
                  className="text-[#0E56A4] hover:text-[#0A3F79] transition-colors flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <img
                  src={conversation.tenantAvatar}
                  alt={conversation.tenantName}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                
                <div className="min-w-0 flex-1">
                  <h2 className="text-[#0E56A4] truncate">{conversation.tenantName}</h2>
                  <p className="text-sm text-gray-500 truncate">{conversation.propertyName}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Property Card */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-lg">
              <Home className="w-5 h-5 text-[#0E56A4] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900">{conversation.propertyName}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{conversation.propertyLocation}</span>
                  <span className="text-[#E9C500] font-semibold ml-2">{conversation.propertyPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <div className="max-w-5xl mx-auto space-y-4">
            {conversation.messages.map((message: any) => (
              <div key={message.id}>
                {/* Date Separator */}
                {message.id === 1 && (
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                      {message.date}
                    </span>
                  </div>
                )}

                {/* Message */}
                <div className={`flex ${message.sender === 'owner' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${message.sender === 'owner' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'owner'
                          ? 'bg-[#0E56A4] text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">{message.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex items-end gap-3">
              <button
                type="button"
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
              </div>
              
              <Button
                type="submit"
                disabled={!messageText.trim()}
                className="p-2.5 bg-[#0E56A4] text-white hover:bg-[#0A3F79] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
