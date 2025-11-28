import { Building } from 'lucide-react';
import { CustomTable, TableColumn } from '../common/CustomTable';
import { CustomPagination } from '../common/CustomPagination';
import { AdminDashboardProperty, PaginationInfo } from '../../types/dashboard';
import { StatusBadge } from '../StatusBadge';
import { formatDate } from '../../utils/dateUtils';

interface RecentPropertiesProps {
  properties: AdminDashboardProperty[];
  loading: boolean;
  error: string | null;
  pagination?: PaginationInfo;
  onViewAll: () => void;
  onRowClick: (propertyId: string) => void;
  onPageChange?: (page: number) => void;
}

export function RecentProperties({
  properties,
  loading,
  error,
  pagination,
  onViewAll,
  onRowClick,
  onPageChange,
}: RecentPropertiesProps) {
  const formatStatus = (status: string) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const columns: TableColumn<AdminDashboardProperty>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (property) => (
        <>
          <div className="font-medium text-gray-900">{property.title}</div>
          <div className="text-xs text-gray-500 mt-1">ID: {property.id.slice(0, 8)}...</div>
        </>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (property) => <span className="text-gray-700">{property.location || '—'}</span>,
    },
    {
      key: 'price',
      header: 'Price',
      render: (property) => (
        <span className="font-medium text-brand-blue">
          EGP {Number(property.price).toLocaleString()}/mo
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (property) => (
        <StatusBadge status={formatStatus(property.status)} absolute={false} />
      ),
    },
    {
      key: 'created',
      header: 'Created',
      render: (property) => (
        <span className="text-sm text-gray-600">{formatDate(property.created_at)}</span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Properties</h2>
        <button onClick={onViewAll} className="text-sm text-brand-blue hover:underline">
          View All
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium mb-2">Error loading properties</p>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {!error && (
        <>
          <CustomTable
            data={properties}
            columns={columns}
            onRowClick={(property) => onRowClick(property.id)}
            emptyMessage="No properties have been added yet."
            emptyIcon={<Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />}
            loading={loading}
            loadingMessage="Loading properties..."
          />

          {pagination && onPageChange && (
            <CustomPagination
              pagination={pagination}
              onPageChange={onPageChange}
              itemLabel="properties"
            />
          )}
        </>
      )}
    </div>
  );
}

