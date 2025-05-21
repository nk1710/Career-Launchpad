import { useEffect, useState } from 'react';
import withAdminAuth from '../../components/withAdminAuth';
import AdminLayout from '../../components/AdminLayout';
import { Search, Download, RefreshCw, User, Mail, Phone, Calendar } from 'lucide-react';

interface UserData {
  id: string;
  username: string;
  email: string;
  phone?: string;
  createdAt: string;
}

function ManageStudents() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{key: keyof UserData, direction: 'asc' | 'desc'}>({ 
    key: 'createdAt', 
    direction: 'desc' 
  });
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card'); // Default to card view on mobile

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/registered-users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error('Failed to fetch registered users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof UserData): void => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      // String comparison (case-insensitive)
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.username?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      (user.phone && user.phone.toLowerCase().includes(searchLower))
    );
  });

  const exportToCsv = (): void => {
    const headers = ['Username', 'Email', 'Phone', 'Created At'];
    const csvRows = [headers];
    
    filteredUsers.forEach(user => {
      csvRows.push([
        user.username,
        user.email,
        user.phone || 'N/A',
        new Date(user.createdAt).toLocaleDateString()
      ]);
    });
    
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'registered_users.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AdminLayout title="Registered Users">
      <div className="p-2 sm:p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 mb-4">
          {/* Header Section */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-800 mb-4">
            User Registered
          </h1>
            
          {/* Search Section - Full width on mobile */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search users..."
              className="pl-9 pr-3 py-2 border-2 border-indigo-200 rounded-lg w-full focus:outline-none focus:border-indigo-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-indigo-400 h-4 w-4" />
          </div>
              
          {/* Action Buttons - Mobile optimized layout */}
          <div className="flex w-full gap-2 mb-4">
            <button 
              onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
              className="flex-1 flex items-center justify-center px-2 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
            >
              {viewMode === 'table' ? 'Cards' : 'Table'}
            </button>
            
            <button 
              onClick={exportToCsv}
              className="flex-1 flex items-center justify-center px-2 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
            
            <button 
              onClick={fetchUsers}
              aria-label="Refresh data"
              className="w-12 flex items-center justify-center px-2 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {/* Counter Section */}
          <div className="text-xs sm:text-sm text-gray-500 mb-3">
            Showing {filteredUsers.length} of {users.length} users
          </div>
            
          {/* Content Section */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-base sm:text-lg">No users found</div>
            </div>
          ) : viewMode === 'table' ? (
            /* Mobile-optimized Table View */
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <table className="w-full bg-white text-sm">
                <thead>
                  <tr className="bg-indigo-100">
                    <th 
                      className="px-2 py-2 text-left whitespace-nowrap" 
                      onClick={() => handleSort('username')}
                    >
                      <div className="flex items-center">
                        User
                        {sortConfig.key === 'username' && (
                          <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-2 py-2 text-left whitespace-nowrap"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center">
                        Email
                        {sortConfig.key === 'email' && (
                          <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-2 py-2 text-left whitespace-nowrap"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center">
                        Date
                        {sortConfig.key === 'createdAt' && (
                          <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-indigo-50 transition-colors border-t border-gray-200"
                    >
                      <td className="px-2 py-2 truncate max-w-[100px]">{user.username}</td>
                      <td className="px-2 py-2 truncate max-w-[120px]">{user.email}</td>
                      <td className="px-2 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Mobile-first Card View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="bg-white p-3 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-indigo-100 rounded-full p-1.5 mr-2">
                      <User className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="font-semibold text-base truncate">{user.username}</div>
                  </div>
                  
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 text-gray-400 mr-1.5 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 text-gray-400 mr-1.5 flex-shrink-0" />
                      <span>{user.phone || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 text-gray-400 mr-1.5 flex-shrink-0" />
                      <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(ManageStudents);