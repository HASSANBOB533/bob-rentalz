import React from 'react';
import { Building, Calendar, DollarSign, User, FileText, Hash } from 'lucide-react';

interface ArchivedRentalSummaryProps {
  propertyName: string;
  propertyRef: string;
  leaseStart: string;
  leaseEnd: string;
  leaseDuration?: string;
  finalRent: string;
  tenantName: string;
  ownerName: string;
  finalNotes?: string[];
}

export function ArchivedRentalSummary({
  propertyName,
  propertyRef,
  leaseStart,
  leaseEnd,
  leaseDuration = "12 Months",
  finalRent,
  tenantName,
  ownerName,
  finalNotes = ["Final inspection completed.", "All keys returned.", "No outstanding payments."]
}: ArchivedRentalSummaryProps) {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-xl font-bold text-[#0E56A4]">Archived Rental Summary</h2>
      
      {/* Summary Card */}
      <div className="bg-[#F7F7F7] rounded-xl p-5 md:p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            {/* Left Column */}
            <div className="space-y-4">
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-2 font-semibold">
                        <Building className="w-3 h-3"/> Property Name
                    </p>
                    <p className="font-bold text-gray-900 text-lg">{propertyName}</p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-2 font-semibold">
                        <Hash className="w-3 h-3"/> Reference Code
                    </p>
                    <p className="font-mono font-medium text-[#0E56A4]">{propertyRef}</p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-2 font-semibold">
                        <User className="w-3 h-3"/> Tenant Name
                    </p>
                    <p className="font-medium text-gray-900">{tenantName}</p>
                </div>
                 <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-2 font-semibold">
                        <User className="w-3 h-3"/> Owner Name
                    </p>
                    <p className="font-medium text-gray-900">{ownerName}</p>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-2 font-semibold">
                            <Calendar className="w-3 h-3"/> Start Date
                        </p>
                        <p className="font-medium text-gray-900">{leaseStart}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-2 font-semibold">
                            <Calendar className="w-3 h-3"/> End Date
                        </p>
                        <p className="font-medium text-gray-900">{leaseEnd}</p>
                    </div>
                 </div>
                 <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-semibold">Total Duration</p>
                    <p className="font-medium text-gray-900">{leaseDuration}</p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-2 font-semibold">
                        <DollarSign className="w-3 h-3"/> Final Monthly Rent
                    </p>
                    <p className="font-bold text-gray-900 text-lg">{finalRent}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Final Notes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0E56A4]"/> Final Notes
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <ul className="list-disc list-inside space-y-1 text-gray-600">
                {finalNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
}
