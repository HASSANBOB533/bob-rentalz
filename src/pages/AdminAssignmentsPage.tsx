import { Building, Search, User, MapPin, MessageSquare, GitBranch } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminDashboardLayout } from '../components/AdminDashboardLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';

type FilterType = 'all' | 'unassigned' | 'assigned';

export default function AdminAssignmentsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('unassigned');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const [assignmentNotes, setAssignmentNotes] = useState('');

  // Mock properties data
  const mockProperties = [
    {
      id: '103',
      name: 'Spacious Penthouse',
      city: 'Zamalek',
      area: 'Nile View',
      owner: 'Mohamed Ali',
      assignedAgent: null,
      leads: 8,
      status: 'Approved',
      views: 45,
    },
    {
      id: '201',
      name: '3BR Apartment in Maadi',
      city: 'Maadi',
      area: 'Sarayat',
      owner: 'Fatima Ahmed',
      assignedAgent: null,
      leads: 15,
      status: 'Approved',
      views: 120,
    },
    {
      id: '202',
      name: 'Studio in Downtown',
      city: 'Downtown Cairo',
      area: 'Tahrir',
      owner: 'Omar Ibrahim',
      assignedAgent: null,
      leads: 12,
      status: 'Approved',
      views: 89,
    },
    {
      id: '104',
      name: 'Modern 2BR Apartment',
      city: 'Sheikh Zayed',
      area: 'Beverly Hills',
      owner: 'Sara Mohamed',
      assignedAgent: 'Sarah Anderson',
      assignedAgentId: '1',
      leads: 18,
      status: 'Assigned',
      views: 142,
    },
    {
      id: '105',
      name: 'Luxury Villa',
      city: 'New Cairo',
      area: '5th Settlement',
      owner: 'Ahmed Hassan',
      assignedAgent: 'Michael Brown',
      assignedAgentId: '2',
      leads: 22,
      status: 'Assigned',
      views: 198,
    },
  ];

  // Mock agents data
  const mockAgents = [
    { id: '1', name: 'Sarah Anderson', properties: 12, activeLeads: 23, status: 'Active' },
    { id: '2', name: 'Michael Brown', properties: 15, activeLeads: 31, status: 'Active' },
    { id: '3', name: 'Emma Wilson', properties: 8, activeLeads: 18, status: 'Active' },
    { id: '4', name: 'David Martinez', properties: 10, activeLeads: 25, status: 'Active' },
  ];

  // Filter properties
  const filteredProperties = mockProperties.filter((property) => {
    const statusMatch =
      activeFilter === 'all' ||
      (activeFilter === 'unassigned' && !property.assignedAgent) ||
      (activeFilter === 'assigned' && property.assignedAgent);

    const searchMatch =
      searchQuery === '' ||
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  const handleOpenAssignModal = (property: any) => {
    setSelectedProperty(property);
    setSelectedAgentId(property.assignedAgentId || '');
    setAssignmentNotes('');
    setShowAssignModal(true);
  };

  const handleAssign = () => {
    if (!selectedAgentId) {
      toast.error('Please select an agent');
      return;
    }
    const agent = mockAgents.find((a) => a.id === selectedAgentId);
    toast.success(`Property assigned to ${agent?.name} successfully!`);
    setShowAssignModal(false);
    setSelectedProperty(null);
    setSelectedAgentId('');
    setAssignmentNotes('');
  };

  return (
    <AdminDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">Property Assignments</h1>
          <p className="text-gray-600">Assign and manage property-agent relationships</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('unassigned')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'unassigned'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Unassigned
            </button>
            <button
              onClick={() => setActiveFilter('assigned')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'assigned'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              Assigned
            </button>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#0E56A4] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0E56A4]'
              }`}
            >
              All
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by property, city, or owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Properties List */}
        <div className="space-y-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Property Icon */}
                  <div className="w-16 h-16 bg-[#E9C500]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="w-8 h-8 text-[#0E56A4]" />
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{property.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {property.city}, {property.area}
                          </span>
                          <span>•</span>
                          <span>Owner: {property.owner}</span>
                        </div>
                      </div>
                      {property.assignedAgent ? (
                        <Badge className="bg-purple-100 text-purple-700">Assigned</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700">Unassigned</Badge>
                      )}
                    </div>

                    {/* Stats & Agent */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>{property.views} views</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {property.leads} leads
                      </span>
                      {property.assignedAgent && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[#0E56A4] font-medium">
                            <User className="w-4 h-4" />
                            {property.assignedAgent}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#0E56A4] text-[#0E56A4] hover:bg-blue-50"
                        onClick={() =>
                          navigate(`/admin/properties/${property.id}`, {
                            state: { from: '/admin/assignments' },
                          })
                        }
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleOpenAssignModal(property)}
                        className="bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
                      >
                        <GitBranch className="w-4 h-4 mr-2" />
                        {property.assignedAgent ? 'Change Agent' : 'Assign Agent'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredProperties.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Properties</p>
                <p className="text-2xl font-bold text-[#0E56A4]">{mockProperties.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Unassigned</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockProperties.filter((p) => !p.assignedAgent).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Assigned</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockProperties.filter((p) => p.assignedAgent).length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Assignment Modal */}
        {showAssignModal && selectedProperty && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Assign Property to Agent
                </h2>

                {/* Property Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Property</p>
                  <p className="font-semibold text-gray-900">{selectedProperty.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedProperty.city}, {selectedProperty.area}
                  </p>
                </div>

                {/* Agent Selection */}
                <div className="mb-6">
                  <Label htmlFor="agent-select">Select Agent *</Label>
                  <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                    <SelectTrigger id="agent-select" className="mt-1.5">
                      <SelectValue placeholder="Choose an agent..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAgents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name} - {agent.properties} properties, {agent.activeLeads} active
                          leads
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <Label htmlFor="notes">Assignment Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this assignment..."
                    rows={3}
                    value={assignmentNotes}
                    onChange={(e) => setAssignmentNotes(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleAssign}
                    className="flex-1 bg-[#0E56A4] text-white hover:bg-[#0A3F79]"
                  >
                    Confirm Assignment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAssignModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
