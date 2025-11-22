import { ArrowLeft, TrendingUp, DollarSign, Home, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Badge } from '../components/ui/badge';

const OVERVIEW_STATS = [
  {
    label: 'Monthly Income',
    value: 'EGP 178,000',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    label: 'Annual Income',
    value: 'EGP 2,136,000',
    icon: TrendingUp,
    color: 'text-[#0E56A4]',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Total Properties Rented',
    value: '5',
    icon: Home,
    color: 'text-[#E9C500]',
    bgColor: 'bg-yellow-50',
  },
  {
    label: 'Outstanding Payments',
    value: 'EGP 25,000',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
];

const PAYMENT_HISTORY = [
  {
    id: 1,
    property: 'Luxury 3BR Apartment',
    tenant: 'Sarah Ahmed',
    amount: 25000,
    date: 'Dec 1, 2024',
    status: 'Paid',
  },
  {
    id: 2,
    property: 'Modern Villa with Pool',
    tenant: 'Mohamed Hassan',
    amount: 75000,
    date: 'Dec 1, 2024',
    status: 'Paid',
  },
  {
    id: 3,
    property: 'Spacious 2BR Penthouse',
    tenant: 'Layla Ibrahim',
    amount: 35000,
    date: 'Dec 5, 2024',
    status: 'Pending',
  },
  {
    id: 4,
    property: 'Cozy Studio Apartment',
    tenant: 'Omar Youssef',
    amount: 15000,
    date: 'Dec 1, 2024',
    status: 'Paid',
  },
  {
    id: 5,
    property: 'Sea View Apartment',
    tenant: 'Fatima Ali',
    amount: 28000,
    date: 'Dec 1, 2024',
    status: 'Paid',
  },
  {
    id: 6,
    property: 'Modern Villa with Pool',
    tenant: 'Mohamed Hassan',
    amount: 75000,
    date: 'Nov 1, 2024',
    status: 'Paid',
  },
  {
    id: 7,
    property: 'Luxury 3BR Apartment',
    tenant: 'Karim Nabil',
    amount: 25000,
    date: 'Oct 15, 2024',
    status: 'Overdue',
  },
];

export default function OwnerFinancialReportsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <DashboardLayout userRole="owner">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/owner/dashboard"
          className="inline-flex items-center gap-2 text-[#0E56A4] hover:text-[#0A3F79] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[#0E56A4] mb-2">Financial Reports</h1>
          <p className="text-gray-600">Your income and financial performance overview</p>
        </div>

        {/* A) Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {OVERVIEW_STATS.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className={`${stat.color}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* B) Revenue Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-[#0E56A4] mb-6">Revenue Overview</h2>
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Revenue chart will be displayed here</p>
              <p className="text-sm text-gray-400 mt-1">Monthly income trends and analytics</p>
            </div>
          </div>
        </div>

        {/* C) Payment History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-[#0E56A4]">Payment History</h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {PAYMENT_HISTORY.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{payment.tenant}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#0E56A4]">
                        EGP {payment.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{payment.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {PAYMENT_HISTORY.map((payment) => (
              <div key={payment.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">{payment.property}</p>
                    <p className="text-sm text-gray-600">{payment.tenant}</p>
                  </div>
                  <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm text-gray-600">{payment.date}</p>
                  <p className="font-medium text-[#0E56A4]">
                    EGP {payment.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
