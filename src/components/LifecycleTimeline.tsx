import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export type LifecycleType = 'tenant' | 'property';

interface LifecycleTimelineProps {
  type: LifecycleType;
  currentStage: string;
}

const TENANT_STAGES = ['Prospect', 'Approved', 'Rented', 'Past Tenant'];
const PROPERTY_STAGES = ['Draft', 'Pending Review', 'Approved', 'Assigned', 'Rented', 'Vacant'];

export function LifecycleTimeline({ type, currentStage }: LifecycleTimelineProps) {
  const stages = type === 'tenant' ? TENANT_STAGES : PROPERTY_STAGES;
  
  // Find current index. If status doesn't match exactly, default to first or specific logic
  // For property, 'Active' usually maps to 'Approved' or 'Assigned' depending on context.
  // Let's normalize some common status variations.
  const normalizedStage = (() => {
    if (type === 'property') {
      if (currentStage === 'Pending') return 'Pending Review';
      if (currentStage === 'Active') return 'Approved'; 
    }
    return currentStage;
  })();

  const currentIndex = stages.findIndex(s => s === normalizedStage) !== -1 
    ? stages.findIndex(s => s === normalizedStage) 
    : 0; // Default to 0 if not found, or maybe handle error

  return (
    <div className="w-full py-6 overflow-x-auto">
      <div className="min-w-[320px] px-4">
        <div className="relative flex items-center justify-between w-full">
          
          {/* Connector Line Background */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full" />

          {/* Active Line Progress */}
          <div 
             className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 -z-10 rounded-full transition-all duration-500"
             style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
          />

          {stages.map((stage, index) => {
            const isCompleted = index < currentIndex;
            const isActive = index === currentIndex;
            const isFuture = index > currentIndex;

            return (
              <div key={stage} className="flex flex-col items-center gap-2 relative group">
                {/* Node Circle */}
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-300 bg-white
                    ${isCompleted ? 'border-green-500 text-green-500' : ''}
                    ${isActive ? 'border-[#0E56A4] text-[#0E56A4] scale-110 shadow-md' : ''}
                    ${isFuture ? 'border-gray-300 text-gray-300' : ''}
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 fill-current" />
                  ) : (
                    <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#0E56A4]' : 'bg-gray-300'}`} />
                  )}
                </div>

                {/* Label */}
                <span 
                  className={`
                    absolute top-10 text-xs font-medium whitespace-nowrap px-2 py-1 rounded
                    ${isActive ? 'text-[#0E56A4] font-bold bg-blue-50' : ''}
                    ${isCompleted ? 'text-green-600' : ''}
                    ${isFuture ? 'text-gray-400' : ''}
                  `}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Spacing for labels below */}
      <div className="h-6" />
    </div>
  );
}
