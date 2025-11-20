import { DashboardLayout } from '../components/DashboardLayout';
import { ArrowLeft, FileText, Download, Eye, Calendar, X, FileImage } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import { Badge } from '../components/ui/badge';

// Mock Data
const DOCUMENTS_DATA = [
  {
    id: 1,
    name: 'Lease Agreement',
    category: 'Contract',
    property: 'Modern 2BR Apartment',
    date: '2024-01-01',
    size: '2.4 MB',
    format: 'PDF',
    status: 'Active',
    previewUrl: null // PDF usually doesn't have a direct image preview in this context without a service
  },
  {
    id: 2,
    name: 'Security Deposit Receipt',
    category: 'Receipt',
    property: 'Modern 2BR Apartment',
    date: '2024-01-01',
    size: '856 KB',
    format: 'PDF',
    status: 'Paid',
    previewUrl: null
  },
  {
    id: 3,
    name: 'ID Card Front',
    category: 'Identity',
    property: 'Modern 2BR Apartment',
    date: '2023-12-28',
    size: '1.2 MB',
    format: 'JPG',
    status: 'Verified',
    previewUrl: 'https://images.unsplash.com/photo-1562564025-51dc115152f2?w=400&q=80' // Mock ID preview
  },
  {
    id: 4,
    name: 'Property Inspection Report',
    category: 'Report',
    property: 'Modern 2BR Apartment',
    date: '2024-01-01',
    size: '3.2 MB',
    format: 'PDF',
    status: 'Completed',
    previewUrl: null
  },
  {
    id: 5,
    name: 'Move-in Checklist',
    category: 'Document',
    property: 'Modern 2BR Apartment',
    date: '2024-01-01',
    size: '1.1 MB',
    format: 'PDF',
    status: 'Signed',
    previewUrl: null
  },
  {
    id: 6,
    name: 'Utility Setup Guide',
    category: 'Guide',
    property: 'Modern 2BR Apartment',
    date: '2024-01-01',
    size: '892 KB',
    format: 'PDF',
    status: 'Reference',
    previewUrl: null
  }
];

export default function TenantRentedDocumentsPage() {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState<typeof DOCUMENTS_DATA[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (doc: typeof DOCUMENTS_DATA[0]) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Contract':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Receipt':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Report':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Identity':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Guide':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <DashboardLayout userRole="renter" userName="Mohamed Ibrahim">
      <div className="space-y-6 px-4 sm:px-0">
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
          <h1 className="text-3xl font-bold text-[#0E56A4]">My Documents</h1>
          <p className="text-gray-600 mt-1">Access your lease agreements, receipts, and property documents</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Documents</p>
            <p className="text-2xl font-bold text-[#0E56A4] mt-1">{DOCUMENTS_DATA.length}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-100">
            <p className="text-sm text-blue-700">Contracts</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {DOCUMENTS_DATA.filter(d => d.category === 'Contract').length}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-100">
            <p className="text-sm text-green-700">Receipts</p>
            <p className="text-2xl font-bold text-green-700 mt-1">
              {DOCUMENTS_DATA.filter(d => d.category === 'Receipt').length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-100">
            <p className="text-sm text-purple-700">Reports</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">
              {DOCUMENTS_DATA.filter(d => d.category === 'Report').length}
            </p>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS_DATA.map((doc) => (
            <div
              key={doc.id}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
              onClick={() => handleCardClick(doc)}
            >
              {/* Thumbnail Preview */}
              <div className="relative h-48 bg-gray-50 border-b border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                {doc.format === 'JPG' || doc.format === 'PNG' ? (
                  doc.previewUrl ? (
                    <img 
                      src={doc.previewUrl} 
                      alt={doc.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileImage className="w-16 h-16 text-gray-300" />
                  )
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      <FileText className="w-8 h-8 text-[#0E56A4]" />
                    </div>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {doc.format} Preview
                    </span>
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-[#0E56A4]">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <Badge variant="secondary" className={`text-[10px] px-2 py-0.5 border ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </Badge>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{doc.size}</span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1" title={doc.name}>
                  {doc.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-1">
                  {doc.property}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {doc.date}
                  </span>
                  
                  <button 
                    className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0E56A4] hover:bg-[#0E56A4] hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download logic here
                    }}
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="p-2 bg-white rounded-full shadow-sm h-fit">
               <FileText className="w-4 h-4 text-[#0E56A4]" />
            </div>
            <div>
              <h3 className="font-medium text-[#0E56A4] mb-1">Read-Only Access</h3>
              <p className="text-sm text-gray-600">
                This document archive is managed by your property manager. You can view and download files, but cannot modify or delete them. Contact support if you find any discrepancies.
              </p>
            </div>
          </div>
        </div>

        {/* Document Preview Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 flex flex-col gap-0 overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-[#0E56A4]/10 rounded-lg flex items-center justify-center">
                    {selectedDoc?.format === 'JPG' || selectedDoc?.format === 'PNG' ? (
                       <FileImage className="w-5 h-5 text-[#0E56A4]" />
                    ) : (
                       <FileText className="w-5 h-5 text-[#0E56A4]" />
                    )}
                 </div>
                 <div>
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                       {selectedDoc?.name}
                    </DialogTitle>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                       {selectedDoc?.date} • {selectedDoc?.size} • {selectedDoc?.format}
                    </p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <Button className="bg-[#0E56A4] text-white hover:bg-[#093B74]">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                 </Button>
                 <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                       <X className="w-5 h-5" />
                    </Button>
                 </DialogClose>
              </div>
            </div>

            {/* Content Viewer */}
            <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-4 md:p-8">
               {selectedDoc ? (
                  selectedDoc.format === 'PDF' ? (
                     // PDF Viewer Placeholder
                     <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border border-gray-200">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                           <FileText className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">PDF Preview</h3>
                        <p className="text-gray-500 max-w-md mb-6">
                           This is a placeholder for the PDF viewer. In a production environment, this would render the actual PDF file using a library like 'react-pdf' or an iframe.
                        </p>
                        <Button variant="outline" className="border-[#0E56A4] text-[#0E56A4] hover:bg-[#0E56A4]/5">
                           Open in New Tab
                        </Button>
                     </div>
                  ) : (
                     // Image Viewer
                     <div className="relative max-w-full max-h-full shadow-lg rounded-lg overflow-hidden">
                        <img 
                           src={selectedDoc.previewUrl || ''} 
                           alt={selectedDoc.name} 
                           className="max-w-full max-h-full object-contain"
                        />
                     </div>
                  )
               ) : (
                  <div className="text-gray-400">No document selected</div>
               )}
            </div>

          </DialogContent>
        </Dialog>

      </div>
    </DashboardLayout>
  );
}
