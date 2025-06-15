import EditUserModal from '@/components/EditUserModal';
import PageLoader from '@/components/PageLoader';
import { contextData } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { Search, Users, RefreshCw } from 'lucide-react';

export default function ActiveUsers() {
  const { user: admin } = contextData();
  const [users, setUsers] = useState<any>(null);
  const [filteredUsers, setFilteredUsers] = useState<any>(null);
  const [userData, setUserData] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [reFetch, setReFetch] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${url}/users`);
      const data = await res.json();

      if (res.ok) {
        const filteredData = data.filter((user: any) => user._id !== admin._id);
        setUsers(filteredData);
        setFilteredUsers(filteredData);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [reFetch]);

  const handleUserData = (userObj: any) => {
    setUserData(userObj);
    setReFetch(!reFetch);
  };

  const handleSearch = (search: string) => {
    setSearchQuery(search);
    let filtered = users.filter(
      (user: any) =>
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.toLowerCase().includes(search.toLowerCase()) ||
        user.country.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  // Get user avatar
  const getUserAvatar = (user: any) => {
    if (user.profileImage) {
      return user.profileImage;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.fullName || user.email,
    )}&background=E5E7EB&color=374151&size=40`;
  };

  // Pagination
  const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers
    ? filteredUsers.slice(startIndex, endIndex)
    : [];

  if (fetching) return <PageLoader />;

  return (
    <>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Users ({filteredUsers?.length || 0})
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
                  placeholder="Search users..."
                />
              </div>

              <button
                onClick={() => setReFetch(!reFetch)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RefreshCw className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
              {currentUsers.length > 0 ? (
                currentUsers.map((user: any) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={getUserAvatar(user)}
                          alt={user.fullName}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.fullName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.phone || 'N/A'}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.country}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        Deposit: ${(user.deposit || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Interest: ${(user.interest || 0).toLocaleString()}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleUserData(user)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        Edit user
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Simple Pagination */}
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

      {userData && (
        <EditUserModal userData={userData} handleUserData={handleUserData} />
      )}
    </>
  );
}
