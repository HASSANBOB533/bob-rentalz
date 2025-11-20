import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Search, ArrowLeft } from 'lucide-react';

export default function AgentConversationPage() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = useState(Number(leadId) || 1);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations list
  const conversations = [
    {
      id: 1,
      tenantName: "Mohamed Hassan",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastMessage: "Yes, I can visit on Friday...",
      time: "2h",
      unread: 2,
      propertyTitle: "Modern 2BR Apartment in New Cairo",
      referenceCode: "BOB-NC-APT-1023-R2 • X7PM3C",
      propertyId: 1
    },
    {
      id: 2,
      tenantName: "Sara Ibrahim",
      avatar: "https://i.pravatar.cc/150?img=23",
      lastMessage: "Thanks! I will send documents.",
      time: "1d",
      unread: 0,
      propertyTitle: "Luxury Villa with Private Pool",
      referenceCode: "BOB-MD-VIL-0041-R1 • LQ9X7P",
      propertyId: 2
    },
    {
      id: 3,
      tenantName: "Hassan Ali",
      avatar: "https://i.pravatar.cc/150?img=33",
      lastMessage: "Looking forward to viewing tomorrow!",
      time: "3d",
      unread: 0,
      propertyTitle: "Family Apartment in October City",
      referenceCode: "BOB-O6-APT-2331-R3 • P7HZ9Q",
      propertyId: 3
    },
    {
      id: 4,
      tenantName: "Nadia Mahmoud",
      avatar: "https://i.pravatar.cc/150?img=45",
      lastMessage: "Perfect! See you at 3 PM.",
      time: "4h",
      unread: 1,
      propertyTitle: "Spacious 3BR Penthouse",
      referenceCode: "BOB-MD-PNT-0512-R1 • K2MN8V",
      propertyId: 4
    },
    {
      id: 5,
      tenantName: "Ahmed Khalil",
      avatar: "https://i.pravatar.cc/150?img=51",
      lastMessage: "What about parking space?",
      time: "5h",
      unread: 0,
      propertyTitle: "Modern Loft in Zamalek",
      referenceCode: "BOB-ZM-LFT-0891-R2 • T5WX4R",
      propertyId: 5
    },
    {
      id: 6,
      tenantName: "Layla Fouad",
      avatar: "https://i.pravatar.cc/150?img=26",
      lastMessage: "Thank you for your help!",
      time: "2w",
      unread: 0,
      propertyTitle: "Cozy Studio Downtown",
      referenceCode: "BOB-DT-STD-1457-R1 • M9PL2K",
      propertyId: 6
    },
    {
      id: 7,
      tenantName: "Omar Said",
      avatar: "https://i.pravatar.cc/150?img=14",
      lastMessage: "Great, I'll bring my dog to the viewing.",
      time: "6h",
      unread: 3,
      propertyTitle: "Garden View Apartment",
      referenceCode: "BOB-NC-APT-0782-R3 • Y8QN6B",
      propertyId: 7
    },
    {
      id: 8,
      tenantName: "Fatima Youssef",
      avatar: "https://i.pravatar.cc/150?img=29",
      lastMessage: "I have all the documents ready.",
      time: "1d",
      unread: 0,
      propertyTitle: "Luxury 4BR Villa",
      referenceCode: "BOB-SZ-VIL-0234-R1 • A3FK7D",
      propertyId: 8
    }
  ];

  // Mock messages for active conversation
  const getMessagesForConversation = (conversationId: number) => {
    const messageData: Record<number, any[]> = {
      1: [
        { id: 1, from: "tenant", text: "Hi! Is the apartment still available for rent?", time: "10:30 AM" },
        { id: 2, from: "agent", text: "Yes, it is available. Would you like to schedule a visit?", time: "10:31 AM" },
        { id: 3, from: "tenant", text: "Yes please! I'm available on Friday afternoon.", time: "10:33 AM" },
        { id: 4, from: "agent", text: "Perfect! How about Friday at 3 PM? I can meet you at the property.", time: "10:35 AM" },
        { id: 5, from: "tenant", text: "Yes, I can visit on Friday at 3 PM. What's the exact address?", time: "10:40 AM" }
      ],
      2: [
        { id: 1, from: "tenant", text: "Hello, I saw your listing for the villa. Can you send me more photos?", time: "Yesterday" },
        { id: 2, from: "agent", text: "Of course! I'll send you additional photos of the pool area and garden.", time: "Yesterday" },
        { id: 3, from: "tenant", text: "Thank you! The property looks amazing.", time: "Yesterday" },
        { id: 4, from: "agent", text: "Would you like to schedule a viewing? I can show you around this week.", time: "Yesterday" },
        { id: 5, from: "tenant", text: "Thanks! I will send documents soon.", time: "Yesterday" }
      ],
      3: [
        { id: 1, from: "tenant", text: "I want to apply for this property immediately.", time: "3 days ago" },
        { id: 2, from: "agent", text: "Great! I'll send you the application form. Can you provide references?", time: "3 days ago" },
        { id: 3, from: "tenant", text: "Yes, I have references from my previous landlord.", time: "3 days ago" },
        { id: 4, from: "agent", text: "Perfect! Let's schedule a viewing first. Tomorrow at 2 PM?", time: "3 days ago" },
        { id: 5, from: "tenant", text: "Looking forward to viewing tomorrow!", time: "3 days ago" }
      ],
      4: [
        { id: 1, from: "tenant", text: "I confirmed the viewing for tomorrow at 3 PM.", time: "4 hours ago" },
        { id: 2, from: "agent", text: "Excellent! I'll prepare all the property details for you.", time: "4 hours ago" },
        { id: 3, from: "tenant", text: "Should I bring any documents?", time: "4 hours ago" },
        { id: 4, from: "agent", text: "Just bring your ID. We can discuss the application process during the viewing.", time: "3 hours ago" },
        { id: 5, from: "tenant", text: "Perfect! See you at 3 PM.", time: "3 hours ago" }
      ],
      5: [
        { id: 1, from: "tenant", text: "What are the nearby amenities? Schools, hospitals, etc.?", time: "5 hours ago" },
        { id: 2, from: "agent", text: "Great question! There's a school 5 minutes away and a hospital within 10 minutes.", time: "5 hours ago" },
        { id: 3, from: "tenant", text: "That's perfect. What about parking space?", time: "5 hours ago" }
      ],
      6: [
        { id: 1, from: "tenant", text: "I've decided to go with another property.", time: "2 weeks ago" },
        { id: 2, from: "agent", text: "Thank you for letting me know. If you need anything in the future, feel free to reach out!", time: "2 weeks ago" },
        { id: 3, from: "tenant", text: "Thank you for your help!", time: "2 weeks ago" }
      ],
      7: [
        { id: 1, from: "tenant", text: "Is the property pet-friendly? I have a small dog.", time: "6 hours ago" },
        { id: 2, from: "agent", text: "Let me check with the owner. What breed is your dog?", time: "6 hours ago" },
        { id: 3, from: "tenant", text: "It's a small Shih Tzu, very quiet and well-trained.", time: "6 hours ago" },
        { id: 4, from: "agent", text: "Good news! The owner is okay with small pets. Would you like to schedule a viewing?", time: "5 hours ago" },
        { id: 5, from: "tenant", text: "Great, I'll bring my dog to the viewing.", time: "5 hours ago" }
      ],
      8: [
        { id: 1, from: "tenant", text: "I'm very interested in this villa. When can I view it?", time: "1 day ago" },
        { id: 2, from: "agent", text: "Tomorrow works well. How about 4 PM?", time: "1 day ago" },
        { id: 3, from: "tenant", text: "Perfect! Should I bring documents?", time: "1 day ago" },
        { id: 4, from: "agent", text: "Yes, please bring ID and proof of income if possible.", time: "1 day ago" },
        { id: 5, from: "tenant", text: "I have all the documents ready.", time: "1 day ago" }
      ]
    };
    return messageData[conversationId] || [];
  };

  // Get active conversation details
  const activeConv = conversations.find(c => c.id === activeConversation);
  const messages = getMessagesForConversation(activeConversation);

  // Filter conversations by search
  const filteredConversations = conversations.filter(c =>
    c.tenantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      alert(`Message sent: ${messageInput}`);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* BACK TO DASHBOARD BUTTON */}
      <button
        onClick={() => navigate('/agent/dashboard')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* Page wrapper with two-column layout */}
      <div className="flex h-[calc(100vh-180px)] bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        
        {/* LEFT COLUMN - Conversation List */}
        <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-[#0E56A4]">Messages</h2>
          </div>

          {/* Search Bar */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tenants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  setActiveConversation(conversation.id);
                  navigate(`/agent/conversation/${conversation.id}`);
                }}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition flex items-center gap-3 border-b border-gray-100 ${
                  activeConversation === conversation.id ? "bg-gray-100" : ""
                }`}
              >
                <img 
                  src={conversation.avatar} 
                  alt={conversation.tenantName}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-800 truncate">{conversation.tenantName}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{conversation.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="flex-shrink-0 w-5 h-5 bg-[#0E56A4] text-white rounded-full flex items-center justify-center text-xs">
                    {conversation.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - Chat Window */}
        <div className="flex-1 flex flex-col bg-white">
          
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b bg-white">
                <div className="flex items-center gap-3">
                  <img 
                    src={activeConv.avatar} 
                    alt={activeConv.tenantName}
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{activeConv.tenantName}</h3>
                    <p className="text-xs text-gray-500">
                      Ref: {activeConv.referenceCode}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/tenant/property-details/${activeConv.propertyId}`, {
                    state: { fromDashboard: true, dashboardType: 'agent-conversation', conversationId: activeConversation }
                  })}
                  className="px-3 py-2 text-sm border border-[#0E56A4] text-[#0E56A4] rounded-lg hover:bg-[#0E56A4]/10 transition"
                >
                  View Property
                </button>
              </div>

              {/* Property Info Banner */}
              <div className="px-4 py-3 bg-[#0E56A4]/5 border-b border-[#0E56A4]/10">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Property:</span> {activeConv.propertyTitle}
                </p>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.from === 'tenant' ? (
                      // Tenant message (left aligned, gray)
                      <div className="max-w-[70%]">
                        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                          <p className="text-sm text-gray-800">{msg.text}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ) : (
                      // Agent message (right aligned, blue)
                      <div className="max-w-[70%]">
                        <div className="bg-[#0E56A4] p-3 rounded-xl shadow-sm">
                          <p className="text-sm text-white">{msg.text}</p>
                          <p className="text-[10px] text-gray-200 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input Bar */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-[#0E56A4] text-white rounded-xl hover:bg-[#0c447f] transition flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Empty state when no conversation is selected
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0E56A4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#0E56A4]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No conversation selected</h3>
                <p className="text-gray-600">Select a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}