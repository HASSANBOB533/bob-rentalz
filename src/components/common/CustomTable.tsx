import { ReactNode } from 'react';

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface CustomTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  className?: string;
  rowClassName?: string | ((item: T, index: number) => string);
}

export function CustomTable<T extends { id?: string }>({
  data,
  columns,
  onRowClick,
  emptyMessage = 'No items found',
  emptyIcon,
  loading = false,
  loadingMessage = 'Loading...',
  className = '',
  rowClassName = '',
}: CustomTableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-12 text-center">
        {emptyIcon}
        <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-4">No items found</h3>
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  const getRowClassName = (item: T, index: number): string => {
    const baseClasses = 'border-b border-gray-100 hover:bg-gray-50 transition-colors';
    const clickableClass = onRowClick ? 'cursor-pointer' : '';
    
    if (typeof rowClassName === 'function') {
      return `${baseClasses} ${clickableClass} ${rowClassName(item, index)}`;
    }
    
    return `${baseClasses} ${clickableClass} ${rowClassName}`;
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-left py-3 px-4 text-sm font-semibold text-gray-700 ${column.headerClassName || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className={getRowClassName(item, index)}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td key={column.key} className={`py-4 px-4 ${column.className || ''}`}>
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

