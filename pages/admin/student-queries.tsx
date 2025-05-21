import { useEffect, useState } from 'react';
import axios from 'axios';
import withAdminAuth from '../../components/withAdminAuth';
import AdminLayout from '../../components/AdminLayout';

interface StudentQuery {
  id: number;
  username: string;
  query: string;
  reply: string | null;
  createdAt: string;
}  

function StudentQueries() {
  const [queries, setQueries] = useState<StudentQuery[]>([]);
  const [replyText, setReplyText] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [activeQuery, setActiveQuery] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const fetchQueries = async () => {
    try {
      const res = await axios.get('/api/admin/student-queries', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    
      setQueries(res.data);
    } catch (err) {
      // console.error('Error fetching queries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (id: number) => {
    const reply = replyText[id];
    if (!reply) return;

    try {
      await axios.post(
        '/api/admin/student-queries',
        { id, reply },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setReplyText({...replyText, [id]: ""});
      await fetchQueries();
    } catch (err) {
      // console.error('Error replying to query:', err);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Helper function to safely get the active query
  const getActiveQuery = () => queries.find(q => q.id === activeQuery);
  
  // Format date safely
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleString();
    } catch (e) {
      return '';
    }
  };
  
  // Format time safely
  const formatTime = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleTimeString();
    } catch (e) {
      return '';
    }
  };

  // Filter queries
  const filteredQueries = filter === 'all' 
    ? queries 
    : filter === 'pending' 
      ? queries.filter(q => !q.reply) 
      : queries.filter(q => q.reply);

  return (
    <AdminLayout title="Student Queries">
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Placement Support Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Manage student queries and provide timely assistance</p>
          </div>
          
          {/* Filter tabs */}
          <div className="mb-4 inline-flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'pending' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('replied')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'replied' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Resolved
            </button>
          </div>
          
          {/* Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Query List Panel */}
            <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-1">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-base font-medium text-gray-700">Student Queries ({filteredQueries.length})</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {queries.filter(q => !q.reply).length} unresolved
                </span>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : filteredQueries.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  <p>No queries found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 max-h-[65vh] overflow-y-auto">
                  {filteredQueries.map(query => (
                    <div 
                      key={query.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${activeQuery === query.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}
                      onClick={() => setActiveQuery(query.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{query.username}</p>
                          <p className="text-sm text-gray-500 truncate mt-1">{query.query}</p>
                        </div>
                        {query.reply ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Resolved
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">{formatDate(query.createdAt)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Chat Panel */}
            <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-2 flex flex-col h-[70vh]">
              {activeQuery !== null ? (
                <>
                  {/* Chat header */}
                  <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {getActiveQuery()?.username || ''}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Query ID: #{activeQuery} • {formatDate(getActiveQuery()?.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActiveQuery()?.reply ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {getActiveQuery()?.reply ? 'Resolved' : 'Pending'}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Placement Query
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <div className="space-y-4">
                      {/* Student message */}
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                            <span className="text-white font-medium">
                              {(getActiveQuery()?.username || '').charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="bg-white p-4 rounded-lg shadow-sm max-w-md">
                            <p className="text-sm text-gray-800">
                              {getActiveQuery()?.query || ''}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block">
                            {formatTime(getActiveQuery()?.createdAt)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Admin reply if exists */}
                      {getActiveQuery()?.reply && (
                        <div className="flex justify-end">
                          <div className="mr-3 flex flex-col items-end">
                            <div className="bg-indigo-50 p-4 rounded-lg shadow-sm max-w-md">
                              <p className="text-sm text-gray-800">
                                {getActiveQuery()?.reply}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">
                              Admin • {new Date().toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                              <span className="text-white font-medium">A</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Reply input area */}
                  <div className="border-t border-gray-200 p-4 bg-white">
                    {!getActiveQuery()?.reply ? (
                      <div className="flex items-start space-x-4">
                        <div className="min-w-0 flex-1">
                          <div className="relative">
                            <textarea
                              rows={3}
                              className="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                              placeholder="Type your reply here..."
                              value={replyText[activeQuery] || ''}
                              onChange={(e) => setReplyText({ ...replyText, [activeQuery]: e.target.value })}
                            />
                            <div className="mt-2 flex justify-between">
                              <button
                                onClick={() => {
                                  const template = "Thank you for your query about placement opportunities. Our team will assist you shortly. If your query is urgent, please visit the placement office during working hours.";
                                  setReplyText({ ...replyText, [activeQuery]: template });
                                }}
                                className="text-indigo-600 hover:text-indigo-500 text-sm"
                              >
                                Insert template
                              </button>
                              <span className="text-xs text-gray-500 self-end">
                                Placement Support Team
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => activeQuery !== null && handleReply(activeQuery)}
                          >
                            Send Reply
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">This query has been resolved.</p>
                        <button
                          className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                          onClick={() => {
                            if (activeQuery !== null) {
                              setReplyText({ ...replyText, [activeQuery]: getActiveQuery()?.reply || '' });
                            }
                          }}
                        >
                          Edit Reply
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg className="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="mt-4 text-lg">Select a query from the list</p>
                  <p className="text-sm text-gray-400 mt-2">No query selected</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-indigo-600">{queries.length}</span>
                <span className="ml-2 text-sm text-gray-500">Total Queries</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Placement assistance requests</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-yellow-500">{queries.filter(q => !q.reply).length}</span>
                <span className="ml-2 text-sm text-gray-500">Pending</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Awaiting response</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-green-500">{queries.filter(q => q.reply).length}</span>
                <span className="ml-2 text-sm text-gray-500">Resolved</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Successfully addressed</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(StudentQueries);