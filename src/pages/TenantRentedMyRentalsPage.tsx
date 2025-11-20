import { DashboardLayout } from '../components/DashboardLayout';
import { ArrowLeft, MapPin, Calendar, Phone, Mail, QrCode, FileText, Wrench } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function TenantRentedMyRentalsPage() {
  const navigate = useNavigate();

  const activeRentals = [
    {
      id: '1',
      title: 'Modern 2BR Apartment',
      location: 'New Cairo, Cairo',
      monthlyRent: 'EGP 15,000',
      leaseStart: 'Jan 1, 2024',
      leaseEnd: 'Dec 31, 2024',
      referenceCode: 'BOB-NC-2BR-001',
      landlordName: 'Ahmed Hassan',
      landlordPhone: '+20 100 123 4567',
      landlordEmail: 'ahmed.hassan@bob.com',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      status: 'Active'
    }
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
        <div>
          <h1 className="text-3xl font-bold text-[#0E56A4]">My Rentals</h1>
          <p className="text-gray-600 mt-1">View and manage your active rental properties</p>
        </div>

        {/* Rentals List */}
        <div className="space-y-5">
          {activeRentals.map((rental) => (
            <div 
              key={rental.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Property Image */}
                <div className="relative h-64 md:h-auto">
                  <ImageWithFallback
                    src={rental.image}
                    alt={rental.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {rental.status} Lease
                  </div>
                </div>

                {/* Property Details */}
                <div className="col-span-2 p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{rental.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{rental.location}</span>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                        <span className="text-sm text-gray-600">Reference:</span>
                        <span className="font-mono font-semibold text-[#0E56A4]">{rental.referenceCode}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-[#0E56A4]">{rental.monthlyRent}</p>
                      <p className="text-sm text-gray-500">per month</p>
                    </div>
                  </div>

                  {/* Lease Period */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#0E56A4]" />
                      <div>
                        <p className="text-xs text-gray-600">Lease Start</p>
                        <p className="font-medium">{rental.leaseStart}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#0E56A4]" />
                      <div>
                        <p className="text-xs text-gray-600">Lease End</p>
                        <p className="font-medium">{rental.leaseEnd}</p>
                      </div>
                    </div>
                  </div>

                  {/* Landlord Info */}
                  <div className="mb-5 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm font-medium text-[#0E56A4] mb-2">Landlord Contact</p>
                    <div className="space-y-2">
                      <p className="font-medium">{rental.landlordName}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{rental.landlordPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{rental.landlordEmail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      onClick={() => navigate(`/tenant/rented/rental-details/${rental.id}`)}
                      className="bg-[#0E56A4] hover:bg-[#0A3F79] text-white"
                      size="sm"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => navigate(`/tenant/rented/qr-code/${rental.id}`)}
                      variant="outline"
                      size="sm"
                    >
                      <QrCode className="w-4 h-4 mr-1" />
                      QR Code
                    </Button>
                    <Button
                      onClick={() => navigate('/tenant/rented/new-request')}
                      variant="outline"
                      size="sm"
                      className="border-[#E9C500] text-[#E9C500] hover:bg-[#E9C500]/10"
                    >
                      <Wrench className="w-4 h-4 mr-1" />
                      Service
                    </Button>
                    <Button
                      onClick={() => navigate('/tenant/rented/documents')}
                      variant="outline"
                      size="sm"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      Documents
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
