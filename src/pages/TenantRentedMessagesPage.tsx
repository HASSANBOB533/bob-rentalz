import { DashboardLayout } from '../components/DashboardLayout';
import { ArrowLeft, Send, Paperclip, Search, User, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useState } from 'react';

export default function TenantRentedMessagesPage() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');
  const [showConversationList, setShowConversationList] = useState(true);

  const conversations = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      role: 'Landlord',
      property: 'Modern 2BR Apartment',
      avatar: 'AH',
      lastMessage: 'Thank you for the update. Let me know if you need anything else.',
      time: '2 hours ago',
      unread: 0
    },
    {
      id: 2,
      name: 'Sarah Anderson',
      role: 'Property Manager',
      property: 'Modern 2BR Apartment',
      avatar: 'SA',
      lastMessage: 'The maintenance team will arrive tomorrow at 9 AM.',
      time: '1 day ago',
      unread: 2
    },
    {
      id: 3,
      name: 'John Technician',
      role: 'Maintenance',
      property: 'Modern 2BR Apartment',
      avatar: 'JT',
      lastMessage: 'AC repair completed. Please test it and let me know.',
      time: '3 days ago',
      unread: 0
    }
  ];

  // Separate messages for each conversation
  const allMessages = {
    1: [ // Ahmed Hassan - Landlord
      {
        id: 1,
        conversationId: 1,
        sender: 'Ahmed Hassan',
        senderRole: 'Landlord',
        message: 'Hello Mohamed! How are you settling into the apartment?',
        time: '10:30 AM',
        date: 'Jan 15',
        isOwn: false
      },
      {
        id: 2,
        conversationId: 1,
        sender: 'You',
        senderRole: 'Tenant',
        message: 'Hi Ahmed! Everything is great, thank you. The apartment is wonderful.',
        time: '10:45 AM',
        date: 'Jan 15',
        isOwn: true
      },
      {
        id: 3,
        conversationId: 1,
        sender: 'Ahmed Hassan',
        senderRole: 'Landlord',
        message: 'That\'s great to hear! If you need anything at all, please don\'t hesitate to reach out.',
        time: '11:00 AM',
        date: 'Jan 15',
        isOwn: false
      },
      {
        id: 4,
        conversationId: 1,
        sender: 'You',
        senderRole: 'Tenant',
        message: 'Thank you! I noticed the AC in the master bedroom isn\'t cooling properly. I\'ve submitted a service request.',
        time: '2:15 PM',
        date: 'Jan 15',
        isOwn: true
      },
      {
        id: 5,
        conversationId: 1,
        sender: 'Ahmed Hassan',
        senderRole: 'Landlord',
        message: 'I see the request. I\'ve assigned John, our technician. He\'ll contact you to schedule a visit.',
        time: '2:30 PM',
        date: 'Jan 15',
        isOwn: false
      },
      {
        id: 6,
        conversationId: 1,
        sender: 'You',
        senderRole: 'Tenant',
        message: 'Perfect, thank you for the quick response!',
        time: '2:35 PM',
        date: 'Jan 15',
        isOwn: true
      },
      {
        id: 7,
        conversationId: 1,
        sender: 'Ahmed Hassan',
        senderRole: 'Landlord',
        message: 'Thank you for the update. Let me know if you need anything else.',
        time: '3:00 PM',
        date: 'Jan 15',
        isOwn: false
      }
    ],
    2: [ // Sarah Anderson - Property Manager
      {
        id: 1,
        conversationId: 2,
        sender: 'Sarah Anderson',
        senderRole: 'Property Manager',
        message: 'Good morning Mohamed! I\'m Sarah, your property manager. Feel free to reach out anytime.',
        time: '9:00 AM',
        date: 'Jan 14',
        isOwn: false
      },
      {
        id: 2,
        conversationId: 2,
        sender: 'You',
        senderRole: 'Tenant',
        message: 'Good morning Sarah! Nice to meet you. I have a maintenance request for the AC.',
        time: '9:15 AM',
        date: 'Jan 14',
        isOwn: true
      },
      {
        id: 3,
        conversationId: 2,
        sender: 'Sarah Anderson',
        senderRole: 'Property Manager',
        message: 'I\'ve received your request. I\'ll coordinate with our maintenance team right away.',
        time: '9:30 AM',
        date: 'Jan 14',
        isOwn: false
      },
      {
        id: 4,
        conversationId: 2,
        sender: 'Sarah Anderson',
        senderRole: 'Property Manager',
        message: 'Good news! The maintenance team will arrive tomorrow at 9 AM.',
        time: '11:00 AM',
        date: 'Jan 14',
        isOwn: false
      },
      {
        id: 5,
        conversationId: 2,
        sender: 'You',
        senderRole: 'Tenant',
        message: 'That\'s perfect! I\'ll be home at that time. Thank you!',
        time: '11:15 AM',
        date: 'Jan 14',
        isOwn: true
      }
    ],
    3: [ // John Technician - Maintenance
      {
        id: 1,
        conversationId: 3,
        sender: 'John Technician',
        senderRole: 'Maintenance',
        message: 'Hello! I\'m John from maintenance. I\'ll be visiting tomorrow at 9 AM for the AC repair.',
        time: '2:00 PM',
        date: 'Jan 13',
        isOwn: false
      },
      {
        id: 2,
        conversationId: 3,
        sender: 'You',
        senderRole: 'Tenant',
        message: 'Hi John! Thank you for letting me know. I\'ll be home.',
        time: '2:10 PM',
        date: 'Jan 13',
        isOwn: true
      },
      {
        id: 3,
        conversationId: 3,
        sender: 'John Technician',
        senderRole: 'Maintenance',
        message: 'Great! I\'ll bring all the necessary tools and parts.',
        time: '2:15 PM',
        date: 'Jan 13',
        isOwn: false
      },
      {
        id: 4,
        conversationId: 3,
        sender: 'John Technician',
        senderRole: 'Maintenance',
        message: 'AC repair completed. Please test it and let me know.',
        time: '10:30 AM',
        date: 'Jan 14',
        isOwn: false
      },
      {
        id: 5,
        conversationId: 3,
        sender: 'You',
        senderRole: 'Tenant',
        message: 'Tested it! Working perfectly now. Thank you so much!',
        time: '11:00 AM',
        date: 'Jan 14',
        isOwn: true
      },
      {
        id: 6,
        conversationId: 3,
        sender: 'John Technician',
        senderRole: 'Maintenance',
        message: 'You\'re welcome! If you have any issues, don\'t hesitate to contact me.',
        time: '11:15 AM',
        date: 'Jan 14',
        isOwn: false
      }
    ]
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const selectedConvo = conversations.find(c => c.id === selectedConversation);
  const messages = selectedConversation ? allMessages[selectedConversation as keyof typeof allMessages] || [] : [];

  const handleSelectConversation = (id: number) => {
    setSelectedConversation(id);
    setShowConversationList(false); // Hide list on mobile when conversation is selected
  };

  const handleBackToList = () => {
    setShowConversationList(true);
  };

  return (
    <DashboardLayout userRole="renter" userName="Mohamed Ibrahim">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/tenant/rented/dashboard')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#0E56A4]">Messages</h1>
          <p className="text-gray-600 mt-1">Chat with your landlord and property team</p>
        </div>

        {/* Messages Interface */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 min-h-[400px] md:h-[600px]">
            
            {/* Left Sidebar - Conversations List */}
            <div className={`${showConversationList ? 'block' : 'hidden'} md:block border-r border-gray-200 flex flex-col`}>
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4]"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((convo) => (
                  <div
                    key={convo.id}
                    onClick={() => handleSelectConversation(convo.id)}
                    className={`p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      selectedConversation === convo.id ? 'bg-blue-50 border-l-4 border-l-[#0E56A4]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-[#0E56A4] text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                        {convo.avatar}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="font-semibold text-gray-900 truncate">{convo.name}</p>
                            <p className="text-xs text-gray-500">{convo.role}</p>
                          </div>
                          {convo.unread > 0 && (
                            <span className="bg-[#E9C500] text-gray-900 text-xs font-semibold px-2 py-0.5 rounded-full">
                              {convo.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-1">{convo.lastMessage}</p>
                        <p className="text-xs text-gray-400">{convo.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Chat Area */}
            <div className={`${!showConversationList ? 'block' : 'hidden'} md:block md:col-span-2 flex flex-col min-h-[500px] md:min-h-0`}>
              {selectedConvo ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      {/* Back button for mobile */}
                      <button
                        onClick={handleBackToList}
                        className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      
                      <div className="w-10 h-10 bg-[#0E56A4] text-white rounded-full flex items-center justify-center font-semibold">
                        {selectedConvo.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{selectedConvo.name}</p>
                        <p className="text-sm text-gray-600">{selectedConvo.role} • {selectedConvo.property}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] md:max-w-[70%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                          {!msg.isOwn && (
                            <p className="text-xs text-gray-500 mb-1 ml-1">{msg.sender}</p>
                          )}
                          <div
                            className={`p-3 rounded-lg ${
                              msg.isOwn
                                ? 'bg-[#0E56A4] text-white rounded-br-none'
                                : 'bg-white text-gray-900 rounded-bl-none shadow-sm border border-gray-100'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 ml-1">
                            {msg.date} at {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-[#0E56A4] transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <div className="flex-1">
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Type your message..."
                          rows={1}
                          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] resize-none"
                        />
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        className="bg-[#0E56A4] hover:bg-[#0A3F79] text-white"
                        disabled={!messageInput.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Select a conversation to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex gap-3">
            <User className="w-5 h-5 text-[#0E56A4] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-[#0E56A4] mb-1">Communication Guidelines</h3>
              <p className="text-sm text-gray-600">
                This messaging system is for property-related communication with your landlord and property team. For urgent maintenance issues, please submit a service request or call the emergency number.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
