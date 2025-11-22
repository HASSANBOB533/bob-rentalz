import {
  ChevronLeft,
  MapPin,
  Calendar,
  Building,
  Phone,
  Mail,
  FileText,
  Wrench,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PropertyCodeDisplay } from '../components/PropertyCodeDisplay';
import { addPropertyMetadata } from '../utils/propertyUtils';

export default function TenantRentedPropertiesPage() {
  const navigate = useNavigate();

  // Placeholder data with metadata
  const rentedProperties = [
    {
      id: 1,
      title: 'Modern 2BR Apartment in New Cairo',
      location: 'New Cairo, Cairo',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      monthlyRent: 'EGP 15,000',
      leaseStart: 'Jan 1, 2024',
      leaseEnd: 'Dec 31, 2024',
      landlordName: 'Sarah Johnson',
      landlordPhone: '+20 123 456 7890',
      landlordEmail: 'sarah.johnson@bob.com',
      status: 'Active',
      cycle: 1,
    },
    {
      id: 2,
      title: 'Spacious 3BR Penthouse',
      location: 'Maadi, Cairo',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      monthlyRent: 'EGP 28,000',
      leaseStart: 'Mar 15, 2024',
      leaseEnd: 'Mar 14, 2025',
      landlordName: 'Ahmed Hassan',
      landlordPhone: '+20 111 222 3333',
      landlordEmail: 'ahmed.hassan@bob.com',
      status: 'Active',
      cycle: 2,
    },
  ].map((property) => addPropertyMetadata(property));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6 text-sm font-medium"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0E56A4] mb-2">Rented Properties</h2>
        <p className="text-sm text-gray-600">Your active rental agreements</p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentedProperties.map((property) => (
          <div
            key={property.id}
            onClick={() => navigate(`/tenant/rental-details/${property.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
          >
            {/* Property Image */}
            <div className="relative h-48 bg-gray-200">
              <ImageWithFallback
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {property.status}
                </span>
              </div>
            </div>

            {/* Property Info */}
            <div className="p-5">
              <h3 className="font-semibold text-[#0E56A4] mb-2 line-clamp-2 min-h-[48px]">
                {property.title}
              </h3>

              <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>{property.location}</span>
              </div>

              {/* Property Code Display */}
              <PropertyCodeDisplay
                shortcode={property.shortcode}
                referenceCode={property.referenceCode}
                qrCode={property.qrCode}
                showQR={true}
                variant="compact"
                className="mb-4"
              />

              {/* Lease Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-4 h-4 text-[#0E56A4]" />
                  <span>
                    Lease: {property.leaseStart} - {property.leaseEnd}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Monthly Rent</span>
                  <span className="font-bold text-[#0E56A4]">{property.monthlyRent}</span>
                </div>
              </div>

              {/* Landlord Contact */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Landlord Contact</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Building className="w-3.5 h-3.5" />
                    <span className="truncate">{property.landlordName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{property.landlordPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{property.landlordEmail}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/tenant/rental-details/${property.id}`);
                  }}
                  className="flex-1 px-3 py-2 bg-[#0E56A4] text-white rounded-lg text-xs font-medium hover:bg-[#0A3F79] transition-colors flex items-center justify-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/tenant/service-requests');
                  }}
                  className="flex-1 px-3 py-2 bg-[#E9C500] text-[#0E56A4] rounded-lg text-xs font-medium hover:bg-[#D4B000] transition-colors flex items-center justify-center gap-1"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Request Service
                </button>
              </div>

              {/* Documents Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/tenant/documents');
                }}
                className="w-full mt-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
              >
                Documents
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
