import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building, 
  MessageSquare, 
  Star, 
  Calendar,
  UserCheck,
  TrendingUp,
  MapPin,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  Eye
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// Mock Agents Data
const mockAgentsData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Sarah Anderson',
    email: 'sarah.anderson@bobrentalz.com',
    phone: '+20 100 111 2222',
    status: 'Active',
    joined: 'Dec 2023',
    role: 'Senior Agent',
    rating: 4.8,
    properties: [
      { id: '101', name: 'Luxury Villa', ref: 'BOB-NC-VIL-001', location: 'New Cairo, 5th Settlement', status: 'Pending' },
      { id: '102', name: 'Modern Apartment', ref: 'BOB-SZ-APT-045', location: 'Sheikh Zayed, Beverly Hills', status: 'Rented' },
      { id: '103', name: 'Sunny Studio', ref: 'BOB-ZS-STU-022', location: 'Zamalek, Cairo', status: 'Assigned' },
      { id: '104', name: 'Garden Duplex', ref: 'BOB-NC-DUP-089', location: 'New Cairo, Rehab City', status: 'Approved' }
    ],
    leads: [
       { id: 'L1', tenantName: 'Ahmed Zaki', propertyName: 'Luxury Villa', message: 'Is this still available for next month?', status: 'New' },
       { id: 'L2', tenantName: 'Mona Lisa', propertyName: 'Sunny Studio', message: 'I would like to schedule a viewing for this weekend.', status: 'Contacted' },
       { id: 'L3', tenantName: 'Tarek Omar', propertyName: 'Garden Duplex', message: 'What are the payment terms?', status: 'Follow-Up' }
    ],
    viewings: {
       upcoming: [
          { id: 'V1', tenantName: 'Karim Benz', propertyName: 'Luxury Villa', date: 'Oct 24, 2025', time: '10:00 AM' },
          { id: 'V2', tenantName: 'Rania Youssef', propertyName: 'Garden Duplex', date: 'Oct 25, 2025', time: '02:30 PM' }
       ],
       completed: [
          { id: 'V3', tenantName: 'Sally Ride', propertyName: 'Modern Apartment', date: 'Oct 20, 2025', notes: 'Tenant liked the kitchen but found the bedroom small.' },
          { id: 'V4', tenantName: 'Omar Sharif', propertyName: 'Sunny Studio', date: 'Oct 18, 2025', notes: 'Client is very interested, sent offer.' }
       ]
    },
    performance: {
       totalProperties: 12,
       totalLeads: 45,
       viewingsCompleted: 28,
       conversionRate: '18%'
    },
    recentActivity: [
      { id: 1, action: 'Closed Deal', detail: 'Luxury Villa - New Cairo', time: '2 days ago' },
      { id: 2, action: 'New Lead', detail: 'Mohamed Ali for Apartment', time: '5 hours ago' }
    ]
  },
  '2': {
    id: '2',
    name: 'Michael Brown',
    email: 'michael.brown@bobrentalz.com',
    phone: '+20 100 222 3333',
    status: 'Active',
    joined: 'Jan 2024',
    role: 'Agent',
    rating: 4.5,
    properties: [],
    leads: [],
    viewings: { upcoming: [], completed: [] },
    performance: { totalProperties: 0, totalLeads: 0, viewingsCompleted: 0, conversionRate: '0%' },
    recentActivity: []
  }
};

export default function AdminAgentDetailPage() {
  const { agentId } = useParams();
  const navigate = useNavigate();

  const agent = agentId ? mockAgentsData[agentId] : null;

  if (!agent) {
    return (
      <AdminDashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Agent Not Found</h2>
          <Button onClick={() => navigate('/admin/agents')}>Back to Agents</Button>
        </div>
      </AdminDashboardLayout>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Approved': 'bg-blue-100 text-blue-700',
      'Assigned': 'bg-purple-100 text-purple-700',
      'Rented': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
    };
    return <Badge className={styles[status] || 'bg-gray-100 text-gray-700'}>{status}</Badge>;
  };

  const getLeadStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'New': 'bg-blue-100 text-blue-700',
      'Contacted': 'bg-yellow-100 text-yellow-700',
      'Follow-Up': 'bg-orange-100 text-orange-700',
    };
    return <Badge className={styles[status] || 'bg-gray-100 text-gray-700'}>{status}</Badge>;
  };

  const handleRemoveFromProperty = (propertyId: string) => {
    toast.success('Agent removed from property');
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/agents')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Agents
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[#E9C500] rounded-full flex items-center justify-center text-2xl font-bold text-[#0E56A4] border-4 border-white shadow-sm">
              {agent.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0E56A4] mb-1">{agent.name}</h1>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-4 h-4" />
                  {agent.role}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {agent.joined}
                </span>
                <span>•</span>
                <Badge className="bg-green-100 text-green-700">{agent.status}</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="border-[#0E56A4] text-[#0E56A4] hover:bg-blue-50">
               Edit Profile
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Contact & Activity */}
          <div className="space-y-6 lg:col-span-1">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
               <div className="space-y-4 text-sm">
                 <div className="flex items-center gap-3 text-gray-600">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0E56A4]">
                     <Mail className="w-4 h-4" />
                   </div>
                   <span className="font-medium">{agent.email}</span>
                 </div>
                 <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0E56A4]">
                     <Phone className="w-4 h-4" />
                   </div>
                   <span className="font-medium">{agent.phone}</span>
                 </div>
               </div>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
               <div className="space-y-6">
                 {agent.recentActivity && agent.recentActivity.length > 0 ? (
                   agent.recentActivity.map((activity: any, idx: number) => (
                     <div key={activity.id} className="flex gap-3 relative">
                       {idx !== agent.recentActivity.length - 1 && (
                         <div className="absolute left-[5px] top-6 bottom-[-20px] w-0.5 bg-gray-100"></div>
                       )}
                       <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-[#0E56A4] ring-4 ring-blue-50 flex-shrink-0 z-10"></div>
                       <div>
                         <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                         <p className="text-xs text-gray-500 mt-0.5">{activity.detail}</p>
                         <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                           <Clock className="w-3 h-3" /> {activity.time}
                         </p>
                       </div>
                     </div>
                   ))
                 ) : (
                   <p className="text-sm text-gray-500">No recent activity.</p>
                 )}
               </div>
             </div>
          </div>

          {/* Right Column: Main Management Sections */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* 1. Assigned Properties */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-[#0E56A4]">Assigned Properties</h3>
                 <Badge variant="secondary">{agent.properties.length}</Badge>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                 {agent.properties.map((prop: any) => (
                   <div key={prop.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors shadow-sm flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="font-semibold text-gray-900 line-clamp-1">{prop.name}</h4>
                         {getStatusBadge(prop.status)}
                      </div>
                      <p className="text-xs text-gray-500 mb-3 font-mono bg-gray-50 inline-block px-1.5 py-0.5 rounded self-start">
                         {prop.ref}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
                         <MapPin className="w-3 h-3" />
                         {prop.location}
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                         <Button variant="link" size="sm" className="text-red-500 hover:text-red-700 p-0 h-auto text-xs" onClick={() => handleRemoveFromProperty(prop.id)}>
                            <Trash2 className="w-3 h-3 mr-1"/> Remove
                         </Button>
                         <Link to={`/admin/properties/${prop.id}`}>
                            <Button size="sm" variant="outline" className="border-[#0E56A4] text-[#0E56A4] hover:bg-blue-50 h-8 text-xs">
                               View Property
                            </Button>
                         </Link>
                      </div>
                   </div>
                 ))}
                 {agent.properties.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500 italic">
                       No properties assigned.
                    </div>
                 )}
              </div>
            </div>

            {/* 2. Assigned Leads */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-[#0E56A4]">Assigned Leads</h3>
                 <Badge variant="secondary">{agent.leads.length}</Badge>
               </div>
               <div className="divide-y divide-gray-200">
                 {agent.leads.map((lead: any) => (
                   <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="font-semibold text-gray-900">{lead.tenantName}</span>
                               {getLeadStatusBadge(lead.status)}
                            </div>
                            <p className="text-sm text-[#0E56A4] font-medium mb-1">{lead.propertyName}</p>
                            <p className="text-sm text-gray-600 line-clamp-1">"{lead.message}"</p>
                         </div>
                         <Button size="sm" className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]">
                            View Conversation
                         </Button>
                      </div>
                   </div>
                 ))}
                 {agent.leads.length === 0 && (
                    <div className="p-8 text-center text-gray-500 italic">
                       No assigned leads.
                    </div>
                 )}
               </div>
            </div>

            {/* 3. Upcoming & Completed Viewings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-6 border-b border-gray-200">
                 <h3 className="text-lg font-bold text-[#0E56A4]">Viewings</h3>
               </div>
               <div className="p-6">
                  <Tabs defaultValue="upcoming">
                     <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                     </TabsList>
                     
                     <TabsContent value="upcoming" className="space-y-4">
                        {agent.viewings.upcoming.map((viewing: any) => (
                           <div key={viewing.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-gray-200 bg-white shadow-sm gap-4">
                              <div className="flex items-start gap-4">
                                 <div className="bg-blue-50 p-3 rounded-lg flex flex-col items-center justify-center min-w-[60px] text-[#0E56A4]">
                                    <span className="text-xs font-bold uppercase">{viewing.date.split(' ')[0]}</span>
                                    <span className="text-lg font-bold">{viewing.date.split(' ')[1].replace(',', '')}</span>
                                 </div>
                                 <div>
                                    <h4 className="font-semibold text-gray-900">{viewing.propertyName}</h4>
                                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                       <UserCheck className="w-3 h-3"/> {viewing.tenantName}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                       <Clock className="w-3 h-3"/> {viewing.time}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex gap-2 w-full sm:w-auto">
                                 <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none">Confirm</Button>
                                 <Button size="sm" variant="outline" className="flex-1 sm:flex-none">Reschedule</Button>
                                 <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-1 sm:flex-none">Cancel</Button>
                              </div>
                           </div>
                        ))}
                        {agent.viewings.upcoming.length === 0 && <p className="text-gray-500 text-center py-4">No upcoming viewings.</p>}
                     </TabsContent>

                     <TabsContent value="completed" className="space-y-4">
                        {agent.viewings.completed.map((viewing: any) => (
                           <div key={viewing.id} className="flex flex-col sm:flex-row items-start justify-between p-4 rounded-lg border border-gray-200 bg-gray-50 gap-4">
                              <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-gray-900">{viewing.propertyName}</h4>
                                    <Badge variant="outline" className="bg-gray-200 text-gray-700">Completed</Badge>
                                 </div>
                                 <p className="text-sm text-gray-600 mb-2">Tenant: {viewing.tenantName}</p>
                                 <div className="bg-white p-2 rounded border border-gray-200 text-sm text-gray-600 italic">
                                    "{viewing.notes}"
                                 </div>
                              </div>
                              <div className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-1">
                                 <Calendar className="w-3 h-3"/> {viewing.date}
                              </div>
                           </div>
                        ))}
                        {agent.viewings.completed.length === 0 && <p className="text-gray-500 text-center py-4">No completed viewings.</p>}
                     </TabsContent>
                  </Tabs>
               </div>
            </div>

            {/* 4. Agent Performance Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-6 border-b border-gray-200">
                 <h3 className="text-lg font-bold text-[#0E56A4]">Performance Overview</h3>
               </div>
               <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                     <p className="text-3xl font-bold text-[#0E56A4] mb-1">{agent.performance.totalProperties}</p>
                     <p className="text-xs text-blue-700 uppercase font-semibold tracking-wide">Properties</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                     <p className="text-3xl font-bold text-purple-700 mb-1">{agent.performance.totalLeads}</p>
                     <p className="text-xs text-purple-700 uppercase font-semibold tracking-wide">Total Leads</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                     <p className="text-3xl font-bold text-green-700 mb-1">{agent.performance.viewingsCompleted}</p>
                     <p className="text-xs text-green-700 uppercase font-semibold tracking-wide">Viewings</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                     <p className="text-3xl font-bold text-orange-700 mb-1">{agent.performance.conversionRate}</p>
                     <p className="text-xs text-orange-700 uppercase font-semibold tracking-wide">Conversion</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}