export interface AdminDashboardProperty {
  id: string;
  title: string;
  location: string;
  price: number;
  status: string;
  created_at: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

