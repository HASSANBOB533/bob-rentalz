import { MessageSquare, AlertTriangle } from 'lucide-react';

export interface ChatMessage {
  id: string | number;
  text: string;
  sender: 'tenant' | 'owner' | 'agent';
  timestamp: string;
}

interface ArchivedChatProps {
  messages: ChatMessage[];
  endDate: string;
  title?: string;
  viewingAs?: 'admin' | 'tenant' | 'owner';
}

export function ArchivedChat({
  messages,
  endDate,
  title = 'Archived Conversation',
  viewingAs = 'admin',
}: ArchivedChatProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0E56A4]" />
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Read-only view of past messages.</p>
        </div>
        <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
          Archived
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center justify-center gap-2 text-sm text-gray-600">
        <AlertTriangle className="w-4 h-4 text-gray-500" />
        <span>
          Chat closed — tenancy ended on <span className="font-medium">{endDate}</span>.
        </span>
      </div>

      {/* Chat Area */}
      <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-white">
        {messages.map((msg) => {
          // Determine alignment based on viewingAs
          // Admin: Tenant Left, Owner/Agent Right
          // Tenant: Tenant Right, Owner/Agent Left
          // Owner: Owner/Agent Right, Tenant Left

          let alignRight = false;
          if (viewingAs === 'admin') {
            alignRight = msg.sender !== 'tenant'; // Owner/Agent on right
          } else if (viewingAs === 'tenant') {
            alignRight = msg.sender === 'tenant'; // Me (Tenant) on right
          } else if (viewingAs === 'owner') {
            alignRight = msg.sender !== 'tenant'; // Me (Owner) on right
          }

          return (
            <div
              key={msg.id}
              className={`flex w-full ${alignRight ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] flex flex-col ${alignRight ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-sm opacity-70 ${
                    !alignRight
                      ? 'bg-gray-100 text-gray-800 rounded-tl-none'
                      : 'bg-gray-200 text-gray-800 rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {msg.sender === 'tenant' ? 'Tenant' : 'Owner/Agent'} • {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disabled Input Area */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="relative">
          <div className="w-full bg-gray-200 border border-gray-300 text-gray-500 rounded-lg px-4 py-3 text-sm cursor-not-allowed select-none text-center font-medium">
            This conversation is archived.
          </div>
        </div>
      </div>
    </div>
  );
}
