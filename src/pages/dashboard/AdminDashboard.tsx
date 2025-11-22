import { useNavigate } from 'react-router-dom';
import { Trash2, Users, Home, FileText, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Deleted Documents',
      description: 'View and restore soft-deleted documents',
      icon: Trash2,
      color: 'bg-red-500',
      path: '/admin/deleted-documents'
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      color: 'bg-blue-500',
      path: '/admin/users'
    },
    {
      title: 'Properties',
      description: 'Manage property listings',
      icon: Home,
      color: 'bg-green-500',
      path: '/admin/properties'
    },
    {
      title: 'Documents',
      description: 'Manage all documents',
      icon: FileText,
      color: 'bg-purple-500',
      path: '/admin/documents'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to the Admin Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-left"
            >
              <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
