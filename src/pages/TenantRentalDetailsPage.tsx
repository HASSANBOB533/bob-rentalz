import {
  ArrowLeft,
  Calendar,
  DollarSign,
  FileText,
  Phone,
  Mail,
  Building,
  MapPin,
  Download,
  MessageCircle,
  Bed,
  Bath,
  Maximize,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PropertyCodeDisplay } from '../components/PropertyCodeDisplay';
import { addPropertyMetadata } from '../utils/propertyUtils';

export default function TenantRentalDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock rental agreement data with metadata
  const rentalDataRaw = {
    1: {
      id: 1,
      propertyTitle: 'Modern 2BR Apartment in New Cairo',
      title: 'Modern 2BR Apartment in New Cairo',
      propertyLocation: 'New Cairo, Cairo',
      location: 'New Cairo, Cairo',
      propertyImage:
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
      bedrooms: 2,
      bathrooms: 2,
      area: '120 sqm',
      monthlyRent: 15000,
      securityDeposit: 30000,
      leaseStart: 'January 1, 2024',
      leaseEnd: 'December 31, 2024',
      leaseDuration: '12 months',
      contractNumber: 'BOB-2024-001234',
      status: 'Active',
      cycle: 1,
      landlord: {
        name: 'Sarah Johnson',
        type: 'Owner',
        phone: '+20 123 456 7890',
        email: 'sarah.johnson@bob.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      paymentHistory: [
        { month: 'November 2024', amount: 15000, date: 'Nov 1, 2024', status: 'Paid' },
        { month: 'October 2024', amount: 15000, date: 'Oct 1, 2024', status: 'Paid' },
        { month: 'September 2024', amount: 15000, date: 'Sep 1, 2024', status: 'Paid' },
      ],
      documents: [
        { name: 'Lease Agreement', type: 'PDF', date: 'Jan 1, 2024' },
        { name: 'Property Inspection Report', type: 'PDF', date: 'Jan 1, 2024' },
        { name: 'Security Deposit Receipt', type: 'PDF', date: 'Jan 1, 2024' },
      ],
    },
    2: {
      id: 2,
      propertyTitle: 'Spacious 3BR Penthouse',
      title: 'Spacious 3BR Penthouse',
      propertyLocation: 'Maadi, Cairo',
      location: 'Maadi, Cairo',
      propertyImage:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop',
      bedrooms: 3,
      bathrooms: 2,
      area: '200 sqm',
      monthlyRent: 28000,
      securityDeposit: 56000,
      leaseStart: 'March 15, 2024',
      leaseEnd: 'March 14, 2025',
      leaseDuration: '12 months',
      contractNumber: 'BOB-2024-005678',
      status: 'Active',
      cycle: 2,
      landlord: {
        name: 'Ahmed Hassan',
        type: 'Owner',
        phone: '+20 111 222 3333',
        email: 'ahmed.hassan@bob.com',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      paymentHistory: [
        { month: 'November 2024', amount: 28000, date: 'Nov 15, 2024', status: 'Paid' },
        { month: 'October 2024', amount: 28000, date: 'Oct 15, 2024', status: 'Paid' },
        { month: 'September 2024', amount: 28000, date: 'Sep 15, 2024', status: 'Paid' },
      ],
      documents: [
        { name: 'Lease Agreement', type: 'PDF', date: 'Mar 15, 2024' },
        { name: 'Property Inspection Report', type: 'PDF', date: 'Mar 15, 2024' },
        { name: 'Security Deposit Receipt', type: 'PDF', date: 'Mar 15, 2024' },
      ],
    },
  };

  // Add metadata to rental data
  const rentalData = Object.fromEntries(
    Object.entries(rentalDataRaw).map(([key, value]) => [key, addPropertyMetadata(value)]),
  );

  const rental = rentalData[id as keyof typeof rentalData];

  if (!rental) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-xl mb-4 text-gray-700">Rental Agreement Not Found</h2>
            <button
              onClick={() => navigate('/tenant/rented')}
              className="px-4 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#0A3F79] transition-colors"
            >
              Back to Rented Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/tenant/rented')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Rented Properties</span>
      </button>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Image */}
            <div className="lg:col-span-1">
              <div className="relative h-64 lg:h-full bg-gray-200">
                <ImageWithFallback
                  src={rental.propertyImage}
                  alt={rental.propertyTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {rental.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="lg:col-span-2 p-6">
              <h1 className="text-2xl font-bold text-[#0E56A4] mb-2">{rental.propertyTitle}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{rental.propertyLocation}</span>
              </div>

              {/* Property Features */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Bed className="w-5 h-5 text-[#0E56A4]" />
                  <span className="text-sm">{rental.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Bath className="w-5 h-5 text-[#0E56A4]" />
                  <span className="text-sm">{rental.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Maximize className="w-5 h-5 text-[#0E56A4]" />
                  <span className="text-sm">{rental.area}</span>
                </div>
              </div>

              {/* Contract Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contract Number</p>
                  <p className="font-semibold text-gray-900">{rental.contractNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Monthly Rent</p>
                  <p className="font-semibold text-[#0E56A4]">
                    EGP {rental.monthlyRent.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Lease Duration</p>
                  <p className="font-semibold text-gray-900">{rental.leaseDuration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Security Deposit</p>
                  <p className="font-semibold text-gray-900">
                    EGP {rental.securityDeposit.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Lease & Payment Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lease Period */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#0E56A4]" />
                <h2 className="font-semibold text-gray-900">Lease Period</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Lease Start</p>
                  <p className="font-semibold text-gray-900">{rental.leaseStart}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Lease End</p>
                  <p className="font-semibold text-gray-900">{rental.leaseEnd}</p>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#0E56A4]" />
                  <h2 className="font-semibold text-gray-900">Payment History</h2>
                </div>
                <button className="text-xs text-[#0E56A4] hover:text-[#0A3F79] font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {rental.paymentHistory.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{payment.month}</p>
                      <p className="text-xs text-gray-500">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        EGP {payment.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600">{payment.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#0E56A4]" />
                <h2 className="font-semibold text-gray-900">Rental Documents</h2>
              </div>
              <div className="space-y-3">
                {rental.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {doc.type} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Landlord Contact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-5 h-5 text-[#0E56A4]" />
                <h2 className="font-semibold text-gray-900">Landlord Contact</h2>
              </div>

              {/* Landlord Profile */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={rental.landlord.image}
                    alt={rental.landlord.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{rental.landlord.name}</h3>
                  <p className="text-xs text-gray-500">{rental.landlord.type}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${rental.landlord.phone}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#0E56A4] rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{rental.landlord.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${rental.landlord.email}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#E9C500] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#0E56A4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {rental.landlord.email}
                    </p>
                  </div>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => {
                    const message = `Hello, I'm contacting you regarding the property: ${rental.propertyTitle}`;
                    const whatsappUrl = `https://wa.me/${rental.landlord.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20BD5A] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Landlord
                </button>

                <button
                  onClick={() => navigate('/tenant/service-requests')}
                  className="w-full py-3 bg-[#0E56A4] text-white rounded-lg font-medium hover:bg-[#0A3F79] transition-colors"
                >
                  Request Maintenance
                </button>

                <button
                  onClick={() => navigate('/tenant/documents')}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  View All Documents
                </button>
              </div>

              {/* Property Code Display with QR */}
              <PropertyCodeDisplay
                shortcode={rental.shortcode}
                referenceCode={rental.referenceCode}
                qrCode={rental.qrCode}
                variant="full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
