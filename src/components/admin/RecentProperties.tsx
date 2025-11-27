import { Building } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';
import { AdminDashboardProperty } from '../../types/dashboard';

interface RecentPropertiesProps {
  properties: AdminDashboardProperty[];
  loading: boolean;
  error: string | null;
  onViewAll: () => void;
  onRowClick: (propertyId: string) => void;
}

export function RecentProperties({
  properties,
  loading,
  error,
  onViewAll,
  onRowClick,
}: RecentPropertiesProps) {
  const formatStatus = (status: string) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Properties</h2>
        <button onClick={onViewAll} className="text-sm text-[#0E56A4] hover:underline">
          View All
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0E56A4] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium mb-2">Error loading properties</p>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
          <p className="text-gray-600">No properties have been added yet.</p>
        </div>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onRowClick(property.id)}
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{property.title}</div>
                    <div className="text-xs text-gray-500 mt-1">ID: {property.id.slice(0, 8)}...</div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{property.location || '—'}</td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-[#0E56A4]">
                      EGP {Number(property.price).toLocaleString()}/mo
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={formatStatus(property.status)} absolute={false} />
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(property.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

