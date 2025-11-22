import React, { useEffect, useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { getTenantPayments, getPendingPayments, Payment } from '../lib/supabase/paymentsApi';

export const TenantPaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPayments();
    }
  }, [user]);

  const loadPayments = async () => {
    try {
      const data = await getTenantPayments(user!.id);
      setPayments(data);
    } catch (error) {
      console.error('Failed to load payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Payment['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const isOverdue = (payment: Payment) => {
    if (payment.status !== 'pending') return false;
    return new Date(payment.due_date) < new Date();
  };

  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const paidPayments = payments.filter((p) => p.status === 'paid');
  const overduePayments = pendingPayments.filter(isOverdue);
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Payments</h1>
          <p className="text-gray-600 mt-1">View and manage your rent payments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Pending Payments</div>
            <div className="text-3xl font-bold text-yellow-600">
              {totalPending.toLocaleString()} EGP
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {pendingPayments.length} payment{pendingPayments.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Overdue</div>
            <div className="text-3xl font-bold text-red-600">{overduePayments.length}</div>
            <div className="text-sm text-gray-500 mt-1">
              {overduePayments.length > 0 ? 'Requires immediate attention' : 'All up to date'}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Paid This Month</div>
            <div className="text-3xl font-bold text-green-600">{paidPayments.length}</div>
            <div className="text-sm text-gray-500 mt-1">Payment history</div>
          </div>
        </div>

        {/* Pending Payments */}
        {pendingPayments.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="px-6 py-4 bg-yellow-50 border-b border-yellow-200">
              <h2 className="text-lg font-semibold text-yellow-900">Pending Payments</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {pendingPayments.map((payment) => (
                <div key={payment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{payment.payment_for}</h3>
                      {payment.notes && (
                        <p className="text-sm text-gray-600 mt-1">{payment.notes}</p>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                        <span>
                          Amount:{' '}
                          <strong className="text-gray-900">
                            {payment.amount.toLocaleString()} EGP
                          </strong>
                        </span>
                        <span>
                          Due:{' '}
                          <strong className={isOverdue(payment) ? 'text-red-600' : 'text-gray-900'}>
                            {new Date(payment.due_date).toLocaleDateString()}
                          </strong>
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-2">
                      {isOverdue(payment) && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                          OVERDUE
                        </span>
                      )}
                      {payment.payment_link ? (
                        <a
                          href={payment.payment_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                          Pay Now
                        </a>
                      ) : (
                        <div className="text-sm text-gray-500 text-right">
                          <p>No payment link available</p>
                          <p className="text-xs">Contact owner for payment instructions</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading payments...</div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No payment history yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment For
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paid Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.payment_for}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {payment.amount.toLocaleString()} EGP
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm ${isOverdue(payment) ? 'text-red-600 font-semibold' : 'text-gray-900'}`}
                        >
                          {new Date(payment.due_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
