import { FileText, RotateCcw, Calendar, User, Home, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as adminApi from '../lib/supabase/adminApi';

interface DeletedDocument {
  id: string;
  user_id: string;
  property_id: string | null;
  document_type: string;
  file_path: string;
  verified: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

export function AdminDeletedDocumentsPage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<DeletedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState<string | null>(null);

  useEffect(() => {
    fetchDeletedDocuments();
  }, []);

  const fetchDeletedDocuments = async () => {
    setLoading(true);
    try {
      const { data, error } = await adminApi.viewDeletedDocuments();

      if (error) {
        toast.error('Failed to load deleted documents');
        console.error(error);
        return;
      }

      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching deleted documents:', error);
      toast.error('An error occurred while loading documents');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (documentId: string) => {
    setRestoring(documentId);
    try {
      const { success, error } = await adminApi.restoreDocument(documentId);

      if (success) {
        toast.success('Document restored successfully!');
        // Remove from list
        setDocuments(documents.filter((doc) => doc.id !== documentId));
      } else {
        toast.error(error || 'Failed to restore document');
      }
    } catch (error) {
      console.error('Error restoring document:', error);
      toast.error('An error occurred while restoring the document');
    } finally {
      setRestoring(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDocumentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      contract: 'bg-blue-100 text-blue-800',
      tenancy_agreement: 'bg-green-100 text-green-800',
      id_document: 'bg-purple-100 text-purple-800',
      proof_of_income: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || colors.other;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Trash2 className="h-8 w-8 text-red-600" />
                Deleted Documents
              </h1>
              <p className="mt-2 text-sm text-gray-600">View and restore soft-deleted documents</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B5273]"></div>
            <p className="mt-4 text-gray-600">Loading deleted documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Deleted Documents</h3>
            <p className="text-gray-600">There are no soft-deleted documents in the system.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Path
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deleted At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentTypeColor(doc.document_type)}`}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        {doc.document_type || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="text-sm text-gray-900 truncate max-w-xs"
                        title={doc.file_path}
                      >
                        {doc.file_path}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span
                          className="font-mono text-xs truncate max-w-[120px]"
                          title={doc.user_id}
                        >
                          {doc.user_id.substring(0, 8)}...
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(doc.updated_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRestore(doc.id)}
                        disabled={restoring === doc.id}
                        className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {restoring === doc.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Restoring...
                          </>
                        ) : (
                          <>
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Restore
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Info Box */}
        {documents.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">About Soft Delete</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    These documents have been soft-deleted and are invisible to all users via RLS
                    policies. Click &quot;Restore&quot; to make a document visible again by setting{' '}
                    <code className="bg-blue-100 px-1 rounded">deleted = false</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
