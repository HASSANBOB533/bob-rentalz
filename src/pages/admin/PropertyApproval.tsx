import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../../components/Navbar';
import {
  CheckCircle,
  XCircle,
  Eye,
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Maximize,
  Calendar,
  User,
  X,
  Video,
  Image as ImageIcon,
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  description: string;
  property_type: string;
  location: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnishing: string;
  status: string;
  reference_code: string;
  images: string[];
  video_url: string | null;
  amenities: string[];
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  owner_id: string;
  owner_email?: string;
}

export default function PropertyApproval() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select(
          `
          *,
          profiles:owner_id (email)
        `
        )
        .order('created_at', { ascending: false });

      if (filter === 'pending') {
        query = query.eq('status', 'pending_approval');
      } else if (filter === 'approved') {
        query = query.eq('status', 'available');
      } else if (filter === 'rejected') {
        query = query.eq('status', 'rejected');
      }

      const { data, error } = await query;

      if (error) throw error;

      const propertiesWithOwner = data.map((prop: any) => ({
        ...prop,
        owner_email: prop.profiles?.email || 'Unknown',
      }));

      setProperties(propertiesWithOwner);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (propertyId: string) => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('properties')
        .update({
          status: 'available',
          verified: true,
        })
        .eq('id', propertyId);

      if (error) throw error;

      alert('Property approved successfully!');
      setSelectedProperty(null);
      fetchProperties();
    } catch (error: any) {
      console.error('Error approving property:', error);
      alert('Failed to approve property: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (propertyId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('properties')
        .update({
          status: 'rejected',
          verified: false,
        })
        .eq('id', propertyId);

      if (error) throw error;

      alert('Property rejected successfully!');
      setSelectedProperty(null);
      fetchProperties();
    } catch (error: any) {
      console.error('Error rejecting property:', error);
      alert('Failed to reject property: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending_approval: 'bg-yellow-100 text-yellow-800',
      available: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      rented: 'bg-blue-100 text-blue-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending_approval: 'Pending Approval',
      available: 'Approved',
      rejected: 'Rejected',
      rented: 'Rented',
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-36 lg:pt-52">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Home className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Property Approval</h1>
                  <p className="text-gray-600 mt-1">Review and approve property listings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pending ({properties.filter((p) => p.status === 'pending_approval').length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'approved'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'rejected'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Rejected
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Properties
            </button>
          </div>

          {/* Properties List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No properties found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Property Image */}
                  <div className="relative h-48 bg-gray-200">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Home className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          property.status
                        )}`}
                      >
                        {getStatusText(property.status)}
                      </span>
                    </div>
                  </div>

                  {/* Property Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {property.description || 'No description'}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{property.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold text-blue-600">
                          AED {property.price.toLocaleString()}/mo
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>{property.bedrooms || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>{property.bathrooms || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Maximize className="w-4 h-4" />
                          <span>{property.area || 0} sqft</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{property.owner_email}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProperty(property)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.title}</h2>
                <p className="text-sm text-gray-600">Ref: {selectedProperty.reference_code}</p>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Images Gallery */}
              {selectedProperty.images && selectedProperty.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Property Images ({selectedProperty.images.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProperty.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Video */}
              {selectedProperty.video_url && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Property Video
                  </h3>
                  <video
                    src={selectedProperty.video_url}
                    controls
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedProperty.property_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Furnishing:</span>
                      <span className="font-medium">{selectedProperty.furnishing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-blue-600">
                        AED {selectedProperty.price.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms:</span>
                      <span className="font-medium">{selectedProperty.bedrooms || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms:</span>
                      <span className="font-medium">{selectedProperty.bathrooms || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{selectedProperty.area || 0} sqft</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Location</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">City/Area:</span>
                      <span className="font-medium">{selectedProperty.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="font-medium">{selectedProperty.address || 'N/A'}</span>
                    </div>
                    {selectedProperty.latitude && selectedProperty.longitude && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coordinates:</span>
                        <span className="font-medium text-xs">
                          {selectedProperty.latitude.toFixed(6)}, {selectedProperty.longitude.toFixed(6)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedProperty.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedProperty.description}</p>
                </div>
              )}

              {/* Amenities */}
              {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Amenities ({selectedProperty.amenities.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Owner Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Owner Information</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{selectedProperty.owner_email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedProperty.status === 'pending_approval' && (
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    onClick={() => handleReject(selectedProperty.id)}
                    disabled={actionLoading}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    {actionLoading ? 'Processing...' : 'Reject Property'}
                  </button>
                  <button
                    onClick={() => handleApprove(selectedProperty.id)}
                    disabled={actionLoading}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {actionLoading ? 'Processing...' : 'Approve Property'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
