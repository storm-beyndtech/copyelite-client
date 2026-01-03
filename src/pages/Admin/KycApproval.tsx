import { useState, useEffect } from 'react';
import {
  Eye,
  Check,
  X,
  Clock,
  FileText,
  Search,
  RefreshCw,
  Shield,
} from 'lucide-react';
import { apiGet, apiPut } from '@/utils/api';

type KycSubmission = {
  _id: string;
  name: string;
  email: string;
  documentFront?: string;
  documentBack?: string;
  documentNumber?: string;
  documentExpDate?: string;
  status: boolean;
  createdAt?: string;
};

export default function KycApproval() {
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const [kycSubmissions, setKycSubmissions] = useState<KycSubmission[] | null>(
    null,
  );
  const [filteredSubmissions, setFilteredSubmissions] = useState<
    KycSubmission[] | null
  >(null);
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingDocument, setViewingDocument] = useState<{
    type: string;
    url: string;
  } | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const submissionsPerPage = 10;

  useEffect(() => {
    const fetchKycSubmissions = async () => {
      try {
        setFetching(true);
        const res = await apiGet(`${url}/kycs`);
        const data = await res.json();
        setKycSubmissions(data || []);
        setFilteredSubmissions(data || []);
      } catch (error) {
        console.error('Error fetching KYC submissions:', error);
      } finally {
        setFetching(false);
      }
    };

    fetchKycSubmissions();
  }, []);

  const handleSearch = (search: string) => {
    setSearchQuery(search);
    applyFilters(filterType, search);
    setCurrentPage(1);
  };

  const applyFilters = (type: string, search: string = searchQuery) => {
    let filtered = kycSubmissions || [];

    // Apply status filter
    switch (type) {
      case 'pending':
        filtered = filtered.filter((submission) => !submission.status);
        break;
      case 'approved':
        filtered = filtered.filter((submission) => submission.status);
        break;
      case 'incomplete':
        filtered = filtered.filter(
          (submission) =>
            !submission.documentFront ||
            !submission.documentBack ||
            !submission.documentNumber,
        );
        break;
      default:
        break;
    }

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (submission) =>
          submission.name.toLowerCase().includes(search.toLowerCase()) ||
          submission.email.toLowerCase().includes(search.toLowerCase()) ||
          submission.documentNumber
            ?.toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    setFilteredSubmissions(filtered);
    setSelectedSubmissions([]);
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
    applyFilters(type);
    setCurrentPage(1);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSubmissions(
        currentSubmissions.map((submission) => submission._id),
      );
    } else {
      setSelectedSubmissions([]);
    }
  };

  const handleSelectSubmission = (submissionId: string) => {
    setSelectedSubmissions((prev) => {
      if (prev.includes(submissionId)) {
        return prev.filter((id) => id !== submissionId);
      }
      return [...prev, submissionId];
    });
  };

  const handleApproveSubmission = async (
    submissionId: string,
    email: string,
  ) => {
    try {
      const res = await apiPut(`${url}/kycs`, { email, kyc: submissionId });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to approve submission.');
      }

      // Update state locally
      setKycSubmissions(
        (prev) =>
          prev?.map((submission) =>
            submission._id === submissionId
              ? { ...submission, status: true }
              : submission,
          ) || null,
      );

      applyFilters(filterType);
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  const handleRejectSubmission = async (submissionId: string) => {
    try {
      console.log(`Rejecting submission: ${submissionId}`);
      alert('Rejection functionality would be implemented here');
    } catch (error) {
      console.error('Error rejecting submission:', error);
    }
  };

  const handleBulkApprove = async () => {
    try {
      await Promise.all(
        selectedSubmissions.map(async (submissionId) => {
          const submission = kycSubmissions?.find(
            (s) => s._id === submissionId,
          );
          if (!submission) return;

          const res = await apiPut(`${url}/kycs`, {
            email: submission.email,
            kyc: submissionId,
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error(
              `Error approving submission ${submissionId}:`,
              errorData.message,
            );
          }
        }),
      );

      // Update state locally
      setKycSubmissions(
        (prev) =>
          prev?.map((submission) =>
            selectedSubmissions.includes(submission._id)
              ? { ...submission, status: true }
              : submission,
          ) || null,
      );

      applyFilters(filterType);
      setSelectedSubmissions([]);
    } catch (error) {
      console.error('Error bulk approving submissions:', error);
    }
  };

  const getUserAvatar = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=E5E7EB&color=374151&size=40`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Sort submissions: pending first, then by date
  const sortedSubmissions = filteredSubmissions
    ? filteredSubmissions.sort((a, b) => {
        if (!a.status && b.status) return -1;
        if (a.status && !b.status) return 1;
        return (
          new Date(b.createdAt || '').getTime() -
          new Date(a.createdAt || '').getTime()
        );
      })
    : [];

  // Pagination
  const totalPages = Math.ceil(sortedSubmissions.length / submissionsPerPage);
  const startIndex = (currentPage - 1) * submissionsPerPage;
  const endIndex = startIndex + submissionsPerPage;
  const currentSubmissions = sortedSubmissions.slice(startIndex, endIndex);

  if (fetching) {
    return (
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                KYC Approvals ({filteredSubmissions?.length || 0})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                  value={searchQuery}
                  className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 w-64"
                  placeholder="Search submissions..."
                />
              </div>

              <button
                onClick={() => window.location.reload()}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RefreshCw className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'All Submissions' },
              { key: 'pending', label: 'Pending' },
              { key: 'approved', label: 'Approved' },
              { key: 'incomplete', label: 'Incomplete' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleFilter(filter.key)}
                className={`px-3 py-1 text-sm font-medium rounded-lg whitespace-nowrap ${
                  filterType === filter.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedSubmissions.length ===
                        currentSubmissions.length &&
                      currentSubmissions.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  User Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  Document Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
              {currentSubmissions.length > 0 ? (
                currentSubmissions.map((submission) => (
                  <tr
                    key={submission._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedSubmissions.includes(submission._id)}
                        onChange={() => handleSelectSubmission(submission._id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={getUserAvatar(submission.name)}
                          alt={submission.name}
                        />
                        <div className="ml-4 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {submission.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {submission.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900 dark:text-white">
                          Doc #: {submission.documentNumber || 'N/A'}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          Expires: {formatDate(submission.documentExpDate)}
                        </div>
                        <div className="flex gap-2 mt-2">
                          {submission.documentFront && (
                            <button
                              onClick={() =>
                                setViewingDocument({
                                  type: 'Front',
                                  url: submission.documentFront!,
                                })
                              }
                              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1 whitespace-nowrap"
                            >
                              <FileText className="h-3 w-3" />
                              Front
                            </button>
                          )}
                          {submission.documentBack && (
                            <button
                              onClick={() =>
                                setViewingDocument({
                                  type: 'Back',
                                  url: submission.documentBack!,
                                })
                              }
                              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1 whitespace-nowrap"
                            >
                              <FileText className="h-3 w-3" />
                              Back
                            </button>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.status
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}
                      >
                        {submission.status ? (
                          <>
                            <Check className="h-3 w-3" />
                            Approved
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3" />
                            Pending
                          </>
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(submission.createdAt)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {!submission.status && (
                          <>
                            <button
                              onClick={() =>
                                handleApproveSubmission(
                                  submission._id,
                                  submission.email,
                                )
                              }
                              className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
                              title="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleRejectSubmission(submission._id)
                              }
                              className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => {
                            console.log(
                              `Viewing details for ${submission.name}`,
                            );
                            // You can implement a detailed view modal here
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No KYC submissions found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {filterType === 'all'
                        ? 'No KYC submissions have been made yet.'
                        : `No ${filterType} KYC submissions found.`}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedSubmissions.length > 0 && (
        <div className="fixed bottom-4 right-4 flex gap-2 z-40">
          <button
            onClick={handleBulkApprove}
            className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-lg"
          >
            <Check className="h-4 w-4" />
            Approve Selected ({selectedSubmissions.length})
          </button>
          <button
            onClick={() => alert('Bulk reject functionality')}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 shadow-lg"
          >
            <X className="h-4 w-4" />
            Reject Selected ({selectedSubmissions.length})
          </button>
        </div>
      )}

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-[999999] p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Document - {viewingDocument.type}
              </h3>
              <button
                onClick={() => setViewingDocument(null)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-auto max-h-[75vh]">
              <div className="flex justify-center">
                <img
                  src={viewingDocument.url}
                  alt={`Document ${viewingDocument.type}`}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMzAgMTUwTDI3MCA5MEwyNzAgMTIwSDMwMFYxODBIMjcwVjIxMEwyMzAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
