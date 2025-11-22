import { ArrowLeft, Send, Paperclip, Phone, Video, MoreVertical, MapPin, Home } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function TenantConversationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState('');

  // Mock conversation data based on inquiry ID
  const conversations = {
    '1': {
      propertyName: 'Modern 2BR Apartment',
      propertyLocation: 'New Cairo, Cairo',
      propertyPrice: 'EGP 15,000/month',
      agentName: 'Sarah Johnson',
      agentRole: 'Senior Agent',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'Hi, I am interested in viewing this property. Is it still available?',
          timestamp: '10:30 AM',
          date: 'Today',
        },
        {
          id: 2,
          sender: 'agent',
          text: 'Yes, the property is still available! I would be happy to arrange a viewing for you.',
          timestamp: '10:45 AM',
          date: 'Today',
        },
        {
          id: 3,
          sender: 'agent',
          text: 'The property is available for viewing this weekend. What day works best for you?',
          timestamp: '10:46 AM',
          date: 'Today',
        },
      ],
    },
    '2': {
      propertyName: 'Luxury Villa with Pool',
      propertyLocation: 'Sheikh Zayed, Giza',
      propertyPrice: 'EGP 45,000/month',
      agentName: 'Ahmed Hassan',
      agentRole: 'Property Specialist',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'I am interested in scheduling a viewing.',
          timestamp: '2:15 PM',
          date: 'Yesterday',
        },
      ],
    },
    '3': {
      propertyName: 'Cozy Studio Downtown',
      propertyLocation: 'Downtown, Cairo',
      propertyPrice: 'EGP 8,500/month',
      agentName: 'Mona Ali',
      agentRole: 'Leasing Agent',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'What are the lease terms and move-in dates?',
          timestamp: '9:20 AM',
          date: '2 days ago',
        },
        {
          id: 2,
          sender: 'agent',
          text: 'The lease term is 12 months minimum, and you can move in as early as next week.',
          timestamp: '11:00 AM',
          date: '2 days ago',
        },
      ],
    },
    '4': {
      propertyName: 'Spacious 3BR Penthouse',
      propertyLocation: 'Maadi, Cairo',
      propertyPrice: 'EGP 28,000/month',
      agentName: 'Omar Khalil',
      agentRole: 'Real Estate Consultant',
      messages: [
        {
          id: 1,
          sender: 'tenant',
          text: 'Is this property pet-friendly?',
          timestamp: '4:30 PM',
          date: '3 days ago',
        },
        {
          id: 2,
          sender: 'agent',
          text: 'Great! I can arrange a tour for you next Tuesday.',
          timestamp: '5:00 PM',
          date: '3 days ago',
        },
      ],
    },
  };

  const conversation = conversations[id as keyof typeof conversations] || conversations['1'];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, send the message to the backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0E56A4]/80 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>
      </div>

      {/* Conversation Container */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Conversation Header */}
        <div className="border-b border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Agent Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#0E56A4]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#0E56A4] font-semibold">
                  {conversation.agentName.charAt(0)}
                </span>
              </div>

              {/* Agent Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{conversation.agentName}</h3>
                <p className="text-sm text-gray-500 truncate">{conversation.agentRole}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
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

          {/* Property Info */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop"
                  alt={conversation.propertyName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#0E56A4] text-sm truncate">
                  {conversation.propertyName}
                </h4>
                <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{conversation.propertyLocation}</span>
                </div>
                <p className="text-[#0E56A4] font-bold text-sm mt-1">
                  {conversation.propertyPrice}
                </p>
              </div>
              <button
                onClick={() =>
                  navigate(`/tenant/property-details/${id}`, {
                    state: { fromDashboard: true, dashboardType: 'tenant-conversation' },
                  })
                }
                className="text-xs text-[#0E56A4] hover:text-[#0E56A4]/80 font-medium whitespace-nowrap"
              >
                View Property
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'tenant' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] sm:max-w-[60%] ${
                  message.sender === 'tenant'
                    ? 'bg-[#0E56A4] text-white'
                    : 'bg-gray-100 text-gray-900'
                } rounded-2xl px-4 py-3`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'tenant' ? 'text-white/70' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="p-2 bg-[#0E56A4] hover:bg-[#0E56A4]/90 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
