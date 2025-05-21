import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Search, UserPlus, Filter, ChevronDown } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
import AdminLayout from '../../components/AdminLayout';

interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  enrollmentNo: string;
  createdAt: string;
}

function ManageStudents() {
  const [users, setUsers] = useState<User[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ username: '', password: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  const openEditModal = (user: User) => {
    setEditUserId(user.id);
    setEditForm({ username: user.username, password: '' });
    setEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditForm({ username: '', password: '' });
    setEditUserId(null);
  };

  const toggleExpandUser = (id: number) => {
    setExpandedUser(expandedUser === id ? null : id);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch('/api/admin/edit-user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editUserId, ...editForm }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setUsers((prev) =>
          prev.map((user) =>
            user.id === editUserId ? { ...user, username: editForm.username } : user
          )
        );
        closeEditModal();
      } else {
        alert(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Edit error:', error);
      alert('Something went wrong!');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`/api/admin/delete-user?id=${id}`, {
          method: 'DELETE',
        });

        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          setUsers((prev) => prev.filter((user) => user.id !== id));
        } else {
          alert(data.message || 'Failed to delete user');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Something went wrong!');
      }
    }
  };

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const res = await fetch('/api/admin/admin-created-users');
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error('Failed to fetch admin-created users:', err);
      }
    };

    fetchAdminUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Manage Students">
      <div className="p-3 md:p-6 max-w-full">
        {/* Header Section - Mobile Optimized */}
        <div className="flex flex-col mb-4">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">Student Management</h1>
          <p className="text-sm text-gray-500 mt-1 mb-3">Manage admin-created student accounts</p>
          <Link href="/admin/add-student">
          <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors w-full md:w-auto md:self-end">
            <UserPlus size={18} />
            <span>Add Student</span>
          </button>
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          {/* Search & Filters - Mobile Stacked */}
          <div className="p-3 bg-gray-50 border-b">
            <div className="flex flex-col gap-3">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors flex-1">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white flex-1">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Card View (Shows on small screens only) */}
          <div className="md:hidden">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="border-b last:border-b-0">
                  <div 
                    className="p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpandUser(user.id)}
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{user.username}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="mt-1">
                        <span className="inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 px-2 py-0.5">
                          {user.enrollmentNo}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronDown 
                        size={20} 
                        className={`text-gray-500 transition-transform ${expandedUser === user.id ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {expandedUser === user.id && (
                    <div className="px-4 pb-4 bg-gray-50 rounded-b-lg">
                      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Phone:</p>
                          <p className="font-medium">{user.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Created:</p>
                          <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(user);
                          }}
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(user.id);
                          }}
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No students found matching your search criteria.
              </div>
            )}
          </div>

          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{user.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{user.phone || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {user.enrollmentNo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            onClick={() => openEditModal(user)}
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            onClick={() => handleDelete(user.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No students found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination - Mobile Optimized */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between flex-wrap gap-y-3">
            <div className="w-full sm:w-auto flex justify-between sm:hidden">
              <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                  <span className="font-medium">{filteredUsers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal - Mobile Optimized */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeEditModal}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Edit Student Information
                </h3>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                      <span className="ml-1 text-xs text-gray-500">(leave blank to keep current password)</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full mb-2 sm:mb-0 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2.5 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleEditSubmit}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default withAdminAuth(ManageStudents);