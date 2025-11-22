import { ChevronLeft, FileText, Download, Image, File } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';

export default function TenantDocumentsPage() {
  const navigate = useNavigate();

  // Placeholder documents
  const documents = [
    {
      id: 1,
      name: 'Rental Contract Agreement',
      type: 'PDF',
      fileSize: '2.4 MB',
      uploadedDate: 'Jan 1, 2024',
      category: 'Contract',
      icon: FileText,
    },
    {
      id: 2,
      name: 'Passport Copy',
      type: 'PDF',
      fileSize: '1.8 MB',
      uploadedDate: 'Jan 1, 2024',
      category: 'Identification',
      icon: FileText,
    },
    {
      id: 3,
      name: 'National ID Document',
      type: 'JPG',
      fileSize: '3.2 MB',
      uploadedDate: 'Jan 1, 2024',
      category: 'Identification',
      icon: Image,
    },
    {
      id: 4,
      name: 'Electricity Bill - January',
      type: 'PDF',
      fileSize: '856 KB',
      uploadedDate: 'Feb 1, 2024',
      category: 'Utility Bills',
      icon: FileText,
    },
    {
      id: 5,
      name: 'Water Bill - January',
      type: 'PDF',
      fileSize: '720 KB',
      uploadedDate: 'Feb 1, 2024',
      category: 'Utility Bills',
      icon: FileText,
    },
    {
      id: 6,
      name: 'Home Insurance Policy',
      type: 'PDF',
      fileSize: '1.5 MB',
      uploadedDate: 'Jan 15, 2024',
      category: 'Insurance',
      icon: FileText,
    },
    {
      id: 7,
      name: 'Move-In Inspection Report',
      type: 'PDF',
      fileSize: '4.2 MB',
      uploadedDate: 'Jan 1, 2024',
      category: 'Contract',
      icon: FileText,
    },
    {
      id: 8,
      name: 'Payment Receipt - Jan 2024',
      type: 'PDF',
      fileSize: '512 KB',
      uploadedDate: 'Jan 5, 2024',
      category: 'Payments',
      icon: FileText,
    },
    {
      id: 9,
      name: 'Property Photos',
      type: 'JPG',
      fileSize: '6.8 MB',
      uploadedDate: 'Jan 1, 2024',
      category: 'Contract',
      icon: Image,
    },
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'text-red-500 bg-red-50';
      case 'JPG':
      case 'PNG':
        return 'text-blue-500 bg-blue-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  // Group documents by category
  const categories = [...new Set(documents.map((doc) => doc.category))];

  return (
    <DashboardLayout pageTitle="Document Center" userName="John Doe" userRole="Tenant">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <button
          onClick={() => navigate('/tenant/rented')}
          className="flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Rented Properties
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0E56A4] mb-2">Document Center</h2>
          <p className="text-sm text-gray-600">Access your rental documents</p>
        </div>

        {/* Documents by Category */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryDocs = documents.filter((doc) => doc.category === category);

            return (
              <div key={category}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryDocs.map((document) => {
                    const IconComponent = document.icon;

                    return (
                      <div
                        key={document.id}
                        className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 border border-gray-100 p-5"
                      >
                        {/* Document Icon */}
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(document.type)}`}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                              {document.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-medium">
                                {document.type}
                              </span>
                              <span>{document.fileSize}</span>
                            </div>
                          </div>
                        </div>

                        {/* Document Details */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Uploaded</span>
                            <span className="text-gray-700 font-medium">
                              {document.uploadedDate}
                            </span>
                          </div>
                        </div>

                        {/* Download Button */}
                        <button className="w-full px-4 py-2.5 bg-[#0E56A4] text-white rounded-lg text-sm font-medium hover:bg-[#0A3F79] transition-colors flex items-center justify-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Document Section */}
        <div className="mt-8 bg-[#0E56A4]/5 border-2 border-dashed border-[#0E56A4]/30 rounded-xl p-8 text-center">
          <File className="w-12 h-12 text-[#0E56A4] mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Need to upload a document?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Contact your landlord or agent to submit additional documents
          </p>
          <button className="px-6 py-2.5 bg-[#0E56A4] text-white rounded-lg text-sm font-medium hover:bg-[#0A3F79] transition-colors">
            Contact Landlord
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
