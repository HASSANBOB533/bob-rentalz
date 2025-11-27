import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationInfo } from '../../types/dashboard';

interface CustomPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  itemLabel?: string;   
  className?: string;
  showInfo?: boolean; 
}

export function CustomPagination({
  pagination,
  onPageChange,
  itemLabel = 'items',
  className = '',
  showInfo = true,
}: CustomPaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  const renderPageNumbers = () => {
    const maxVisible = 5;
    let start: number;
    let end: number;

    if (pagination.totalPages <= maxVisible) {
      start = 1;
      end = pagination.totalPages;
    } else if (pagination.currentPage <= 3) {
      start = 1;
      end = maxVisible;
    } else if (pagination.currentPage >= pagination.totalPages - 2) {
      start = pagination.totalPages - maxVisible + 1;
      end = pagination.totalPages;
    } else {
      start = pagination.currentPage - 2;
      end = pagination.currentPage + 2;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={`flex items-center justify-between mt-6 pt-4 border-t border-gray-200 ${className}`}>
      {showInfo && (
        <div className="text-sm text-gray-600">
          Showing page {pagination.currentPage} of {pagination.totalPages} (
          {pagination.totalItems} total {itemLabel})
        </div>
      )}

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => onPageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {renderPageNumbers().map((pageNum) => {
            const isActive = pageNum === pagination.currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors min-w-[2.5rem] ${
                  isActive
                    ? 'bg-[#0E56A4] text-white font-semibold shadow-sm'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

