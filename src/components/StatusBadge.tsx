import React from 'react';
import { cn } from './ui/utils';

export type StatusType =
  | 'Pending'
  | 'Approved'
  | 'Assigned'
  | 'Rented'
  | 'Vacant'
  | 'Past Tenant'
  | 'Completed'
  | 'Canceled'
  | 'Available'
  | 'In Progress'
  | 'Received'
  | 'Replied'
  | 'Seen'
  | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  absolute?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
  absolute = true,
}) => {
  let bgColor = 'bg-[#0E56A4]'; // Default Blue

  // Normalize status for comparison
  const normalizedStatus = status.toLowerCase();

  // Color Mapping
  // Pending — Yellow (#F7C948)
  if (['pending', 'received', 'reviewing', 'warning'].includes(normalizedStatus)) {
    bgColor = 'bg-[#F7C948]';
  }
  // Approved/Completed — Green (#2ECC71)
  else if (['approved', 'completed', 'resolved', 'replied'].includes(normalizedStatus)) {
    bgColor = 'bg-[#2ECC71]';
  }
  // Assigned — Blue (#0E56A4)
  else if (['assigned', 'in progress'].includes(normalizedStatus)) {
    bgColor = 'bg-[#0E56A4]';
  }
  // Rented — Dark Blue (#083B75)
  else if (['rented', 'occupied'].includes(normalizedStatus)) {
    bgColor = 'bg-[#083B75]';
  }
  // Vacant/Past Tenant — Gray (#7D7D7D)
  else if (['vacant', 'past tenant', 'inactive', 'available', 'seen'].includes(normalizedStatus)) {
    bgColor = 'bg-[#7D7D7D]';
  }
  // Canceled — Red (#D9534F)
  else if (['canceled', 'cancelled', 'rejected'].includes(normalizedStatus)) {
    bgColor = 'bg-[#D9534F]';
  }

  // Layout classes
  // shape: rounded-pill (20px radius)
  // padding: 6px vertical (py-1.5), 12px horizontal (px-3)
  // font: 12px–14px medium weight (text-xs font-medium)
  // text color: white
  const layoutClasses =
    'inline-flex items-center justify-center px-3 py-1.5 rounded-[20px] text-white text-xs font-medium shadow-sm';

  // Positioning
  const positionClasses = absolute ? 'absolute top-3 right-3 z-10' : '';

  return <div className={cn(layoutClasses, bgColor, positionClasses, className)}>{status}</div>;
};
