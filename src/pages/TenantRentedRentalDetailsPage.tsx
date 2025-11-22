import {
  ArrowLeft,
  MapPin,
  Calendar,
  Phone,
  Mail,
  QrCode,
  DollarSign,
  FileText,
  Home,
  Bed,
  Bath,
  Maximize,
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { useNavigate, useParams } from 'react-router-dom';
import { ArchivedChat, ChatMessage } from '../components/ArchivedChat';
import { ArchivedRentalSummary } from '../components/ArchivedRentalSummary';
import { DashboardLayout } from '../components/DashboardLayout';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';

export default function TenantRentedRentalDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isPast = id === 'past';

  const activeRental = {
    id: '1',
    title: 'Modern 2BR Apartment',
    location: 'New Cairo, Cairo',
    address: '123 Palm Street, New Cairo, Cairo Governorate, Egypt',
    monthlyRent: 'EGP 15,000',
    deposit: 'EGP 30,000',
    leaseStart: 'January 1, 2024',
    leaseEnd: 'December 31, 2024',
    leaseDuration: '12 months',
    referenceCode: 'BOB-NC-2BR-001',
    qrCodeUrl: 'https://bob.rentalz.com/property/BOB-NC-2BR-001',
    landlordName: 'Ahmed Hassan',
    landlordPhone: '+20 100 123 4567',
    landlordEmail: 'ahmed.hassan@bob.com',
    propertyManager: 'Sarah Anderson',
    pmPhone: '+20 100 765 4321',
    pmEmail: 'sarah.anderson@bob.com',
    bedrooms: 2,
    bathrooms: 2,
    area: '120 sqm',
    furnished: 'Fully Furnished',
    parking: 'Yes - 1 Space',
    amenities: ['Air Conditioning', 'Balcony', 'Security', 'Gym Access', 'Pool', 'Parking'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260066-6bc35f0a1702?w=800&h=600&fit=crop',
    ],
    status: 'Active',
  };

  const pastRental = {
    ...activeRental,
    id: 'past',
    title: 'Luxury Villa (Past)',
    leaseStart: 'January 1, 2023',
    leaseEnd: 'December 31, 2023',
    status: 'Past',
  };

  const rental = isPast ? pastRental : activeRental;

  const archivedMessages: ChatMessage[] = [
    {
      id: 1,
      text: 'Hi, I wanted to confirm the move-out inspection time.',
      sender: 'tenant',
      timestamp: 'Dec 28, 2023, 10:00 AM',
    },
    {
      id: 2,
      text: 'Hello, yes, we are set for Dec 31st at 2 PM.',
      sender: 'owner',
      timestamp: 'Dec 28, 2023, 10:15 AM',
    },
    { id: 3, text: 'Great, thank you!', sender: 'tenant', timestamp: 'Dec 28, 2023, 10:16 AM' },
    {
      id: 4,
      text: 'All keys were returned on 31 Dec 2023.',
      sender: 'owner',
      timestamp: 'Dec 31, 2023 4:00 PM',
    },
    {
      id: 5,
      text: 'Thank you for the stay, we appreciate your tenancy.',
      sender: 'owner',
      timestamp: 'Dec 31, 2023 4:05 PM',
    },
  ];

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
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#0E56A4] mb-2">{rental.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin className="w-5 h-5" />
                <span>{rental.location}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Reference:</span>
                <span className="font-mono font-semibold text-[#0E56A4]">
                  {rental.referenceCode}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#0E56A4]">{rental.monthlyRent}</p>
              <p className="text-sm text-gray-500">per month</p>
              <div
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  isPast ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
                }`}
              >
                {isPast ? 'Past Lease' : 'Active Lease'}
              </div>
            </div>
          </div>
        </div>

        {/* Property Images */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Property Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rental.images.map((image, index) => (
              <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={image}
                  alt={`${rental.title} - ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lease Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Lease Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#0E56A4] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Lease Start Date</p>
                    <p className="font-semibold">{rental.leaseStart}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#0E56A4] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Lease End Date</p>
                    <p className="font-semibold">{rental.leaseEnd}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-[#0E56A4] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Monthly Rent</p>
                    <p className="font-semibold">{rental.monthlyRent}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-[#0E56A4] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Security Deposit</p>
                    <p className="font-semibold">{rental.deposit}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Bed className="w-5 h-5 text-[#0E56A4]" />
                  <div>
                    <p className="text-xs text-gray-600">Bedrooms</p>
                    <p className="font-semibold">{rental.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Bath className="w-5 h-5 text-[#0E56A4]" />
                  <div>
                    <p className="text-xs text-gray-600">Bathrooms</p>
                    <p className="font-semibold">{rental.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Maximize className="w-5 h-5 text-[#0E56A4]" />
                  <div>
                    <p className="text-xs text-gray-600">Area</p>
                    <p className="font-semibold">{rental.area}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Home className="w-5 h-5 text-[#0E56A4]" />
                  <div>
                    <p className="text-xs text-gray-600">Furnished</p>
                    <p className="font-semibold text-xs">Fully</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {rental.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#0E56A4]/10 text-[#0E56A4] rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Landlord Contact */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Landlord Contact</h2>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="font-semibold text-lg mb-3">{rental.landlordName}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-[#0E56A4]" />
                    <span>{rental.landlordPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-[#0E56A4]" />
                    <span>{rental.landlordEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Manager */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Property Manager</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-lg mb-3">{rental.propertyManager}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-[#0E56A4]" />
                    <span>{rental.pmPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-[#0E56A4]" />
                    <span>{rental.pmEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Archived Chat (Past Rentals Only) */}
            {isPast && (
              <>
                <ArchivedRentalSummary
                  propertyName={rental.title}
                  propertyRef={rental.referenceCode}
                  leaseStart={rental.leaseStart}
                  leaseEnd={rental.leaseEnd}
                  leaseDuration={rental.leaseDuration}
                  finalRent={rental.monthlyRent}
                  tenantName="Mohamed Ibrahim"
                  ownerName={rental.landlordName}
                />
                <ArchivedChat
                  messages={archivedMessages}
                  endDate={rental.leaseEnd}
                  viewingAs="tenant"
                />
              </>
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* QR Code */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Property QR Code</h2>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 flex items-center justify-center mb-4">
                <QRCode value={rental.qrCodeUrl} size={200} />
              </div>
              <p className="text-xs text-gray-600 text-center mb-4">
                Scan to view property details
              </p>
              <Button
                onClick={() => navigate(`/tenant/rented/qr-code/${rental.id}`)}
                variant="outline"
                className="w-full"
              >
                <QrCode className="w-4 h-4 mr-2" />
                View Full QR Code
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#0E56A4] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {!isPast && (
                  <Button
                    onClick={() => navigate('/tenant/rented/new-request')}
                    className="w-full bg-[#E9C500] hover:bg-[#D4AF37] text-gray-900"
                  >
                    Request Service
                  </Button>
                )}
                <Button
                  onClick={() => navigate('/tenant/rented/documents')}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Documents
                </Button>
                {!isPast && (
                  <Button
                    onClick={() => navigate('/tenant/rented/messages')}
                    variant="outline"
                    className="w-full"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Message Landlord
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
