import React from 'react';

export interface AuditLogEntry {
  id: string | number;
  title: string;
  description: string;
  timestamp: string;
}

interface AuditLogProps {
  entries: AuditLogEntry[];
}

export function AuditLog({ entries }: AuditLogProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-[#0E56A4] mb-6">Audit Log</h2>
      <div className="relative pl-4">
        {/* Vertical Line Background */}
        <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gray-100" />

        <div className="space-y-6">
          {entries.map((entry) => (
            <div key={entry.id} className="relative flex gap-4">
              {/* Dot */}
              <div className="absolute -left-[15px] mt-1.5 w-2.5 h-2.5 rounded-full bg-[#0E56A4] ring-4 ring-white" />

              {/* Content */}
              <div className="flex-1 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <h4 className="text-sm font-bold text-gray-900">{entry.title}</h4>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{entry.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
