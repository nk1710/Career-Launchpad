import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Book, Calendar, AlertCircle, CheckCircle, Clock, Grid, List } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
import AdminLayout from '../../components/AdminLayout';

// TypeScript interfaces
interface ProgressItem {
  courseName: string;
  month: string;
  watched: number;
  total: number;
  status: string;
  percentage?: number;
}

interface UserData {
  id: string;
  username: string;
  courses: string[];
  progress: ProgressItem[];
  avatar?: string;
  email?: string;
}

function UserProgressPage() {
  const [progressData, setProgressData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch('/api/admin/user-progress');
        const data = await res.json();

        if (Array.isArray(data)) {
          const processedData = data.map((user: UserData) => ({
            ...user,
            progress: user.progress.map(item => ({
              ...item,
              percentage: Math.round((item.watched / item.total) * 100)
            }))
          }));
          setProgressData(processedData);
          if (processedData.length > 0) {
            setActiveUser(processedData[0].id);
          }
        } else {
          console.error('Unexpected API response:', data);
          setProgressData([]);
        }
      } catch (error) {
        console.error('Error fetching progress data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  // Get all unique courses across all users
  const allCourses = Array.from(
    new Set(
      progressData.flatMap(user => 
        user.progress.map(item => item.courseName)
      )
    )
  );

  // Get chart data for active user
  const getChartData = (userId: string) => {
    const user = progressData.find(u => u.id === userId);
    if (!user) return [];
    
    // Group by month and calculate averages
    const monthlyData: Record<string, {month: string, average: number}> = {};
    
    user.progress.forEach(item => {
      if (filterCourse === 'all' || item.courseName === filterCourse) {
        if (!monthlyData[item.month]) {
          monthlyData[item.month] = { month: item.month, average: 0 };
        }
        monthlyData[item.month].average += item.percentage || 0;
      }
    });
    
    // Calculate average for each month
    Object.values(monthlyData).forEach(data => {
      const count = user.progress.filter(p => 
        p.month === data.month && 
        (filterCourse === 'all' || p.courseName === filterCourse)
      ).length;
      data.average = Math.round(data.average / count);
    });
    
    // Convert to array and sort by month
    return Object.values(monthlyData).sort((a, b) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });
  };

  // Get filtered and sorted progress data for the active user
  const getFilteredProgressData = (userId: string) => {
    const user = progressData.find(u => u.id === userId);
    if (!user) return [];
    
    return user.progress
      .filter(item => filterCourse === 'all' || item.courseName === filterCourse)
      .sort((a, b) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthComparison = months.indexOf(a.month) - months.indexOf(b.month);
        return sortOrder === 'asc' ? monthComparison : -monthComparison;
      });
  };

  // Get overall completion percentage for a user
  const getUserCompletionPercentage = (user: UserData): number => {
    if (user.progress.length === 0) return 0;
    
    const totalWatched = user.progress.reduce((sum, item) => sum + item.watched, 0);
    const totalVideos = user.progress.reduce((sum, item) => sum + item.total, 0);
    
    return Math.round((totalWatched / totalVideos) * 100);
  };

  // Function to determine status color
  const getStatusColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-emerald-500';
    if (percentage >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getStatusTextColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-700 font-medium">Loading user progress data...</p>
        </div>
      </div>
    );
  }

  if (progressData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <AlertCircle size={48} className="text-slate-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">No Progress Data Available</h2>
        <p className="text-slate-600 max-w-md text-center">
          There is currently no user progress data to display. This could be because no users have started courses yet or there might be an issue with the data connection.
        </p>
      </div>
    );
  }

  const activeUserData = progressData.find(u => u.id === activeUser) || progressData[0];
  const chartData = getChartData(activeUser || progressData[0].id);
  const filteredProgress = getFilteredProgressData(activeUser || progressData[0].id);

  return (
    <AdminLayout title="User Progress">
      <div className="bg-slate-50 min-h-screen">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">User Progress Dashboard</h1>
                <p className="text-indigo-100">Monitor learner engagement and course completion</p>
              </div>
              <div className="flex gap-2 bg-white/20 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'card' ? 'bg-white text-indigo-700' : 'text-white'}`}
                >
                  <Grid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white text-indigo-700' : 'text-white'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Stats overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Users</p>
                  <p className="text-2xl font-bold text-slate-900">{progressData.length}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Users size={24} className="text-indigo-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Courses</p>
                  <p className="text-2xl font-bold text-slate-900">{allCourses.length}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Book size={24} className="text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Avg. Completion</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {Math.round(
                      progressData.reduce((sum, user) => sum + getUserCompletionPercentage(user), 0) / 
                      progressData.length
                    )}%
                  </p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <CheckCircle size={24} className="text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Main content area with sidebar toggle */}
          <div className="flex flex-col lg:flex-row gap-6 relative">
            {/* Mobile sidebar toggle */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg z-10"
            >
              <Users size={20} />
            </button>

            {/* User selection sidebar - mobile sidebar shows as overlay */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block lg:w-1/4 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden lg:sticky lg:top-4 lg:self-start transition-all duration-300 ease-in-out max-h-[calc(100vh-120px)]`}>
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-medium text-slate-700">Users ({progressData.length})</h3>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500">
                  <span className="sr-only">Close</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
                {progressData.map(user => (
                  <div 
                    key={user.id}
                    onClick={() => {
                      setActiveUser(user.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-50 border-l-4 transition-colors ${
                      activeUser === user.id ? 'border-indigo-500 bg-indigo-50' : 'border-transparent'
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.avatar ? 
                        <Image 
                        src={user.avatar} 
                        alt={user.username} 
                        fill
                        sizes="40px"
                        className="object-cover" 
                      />  : 
                        user.username.charAt(0).toUpperCase()
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{user.username}</p>
                      <div className="flex items-center">
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${getStatusColor(getUserCompletionPercentage(user))}`}
                            style={{ width: `${getUserCompletionPercentage(user)}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs font-medium text-slate-500">{getUserCompletionPercentage(user)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className={`${sidebarOpen && 'lg:w-3/4'} flex-1 transition-all duration-300`}>
              {/* User profile header */}
              <div className="mb-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {activeUserData.avatar ? 
                         <Image 
                         src={activeUserData.avatar} 
                         alt={activeUserData.username} 
                         fill
                         sizes="56px"
                         className="object-cover" 
                       />  : 
                        activeUserData.username.charAt(0).toUpperCase()
                      }
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{activeUserData.username}</h2>
                      <p className="text-sm text-slate-500">{activeUserData.email || 'No email available'}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeUserData.courses.map((course, i) => (
                      <span key={i} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter options */}
              <div className="mb-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor="courseFilter" className="text-sm font-medium text-slate-700">Course:</label>
                    <select 
                      id="courseFilter" 
                      value={filterCourse} 
                      onChange={(e) => setFilterCourse(e.target.value)}
                      className="border border-slate-300 rounded-lg text-sm p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="all">All Courses</option>
                      {allCourses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="sortOrder" className="text-sm font-medium text-slate-700">Sort:</label>
                    <select 
                      id="sortOrder" 
                      value={sortOrder} 
                      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                      className="border border-slate-300 rounded-lg text-sm p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="desc">Latest First</option>
                      <option value="asc">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Progress chart */}
              <div className="mb-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-medium text-slate-800 mb-4">Monthly Progress</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis domain={[0, 100]} stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          borderRadius: '0.5rem',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="average" 
                        name="Completion %" 
                        stroke="#6366f1" 
                        strokeWidth={3} 
                        dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#6366f1' }} 
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#6366f1' }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Progress details */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-medium text-slate-800 mb-4">Progress Details</h3>
                
                {filteredProgress.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50 rounded-lg">
                    <Clock size={32} className="mx-auto text-slate-400 mb-3" />
                    <p className="text-slate-600 font-medium">No progress data available for the selected filters.</p>
                  </div>
                ) : viewMode === 'table' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="px-4 py-3 text-sm font-medium text-slate-600 border-b">Course</th>
                          <th className="px-4 py-3 text-sm font-medium text-slate-600 border-b">Month</th>
                          <th className="px-4 py-3 text-sm font-medium text-slate-600 border-b">Watched</th>
                          <th className="px-4 py-3 text-sm font-medium text-slate-600 border-b">Total</th>
                          <th className="px-4 py-3 text-sm font-medium text-slate-600 border-b">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProgress.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 border-b border-slate-100">
                              <div className="font-medium text-slate-900">{item.courseName}</div>
                            </td>
                            <td className="px-4 py-3 border-b border-slate-100">
                              <div className="flex items-center">
                                <Calendar size={14} className="text-slate-400 mr-2" />
                                <span>{item.month}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 border-b border-slate-100">{item.watched}</td>
                            <td className="px-4 py-3 border-b border-slate-100">{item.total}</td>
                            <td className="px-4 py-3 border-b border-slate-100">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-xs">
                                  <div 
                                    className={`h-2 rounded-full ${getStatusColor(item.percentage || 0)}`}
                                    style={{ width: `${item.percentage}%` }}
                                  ></div>
                                </div>
                                <span className={`text-sm font-medium ${getStatusTextColor(item.percentage || 0)}`}>
                                  {item.percentage}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredProgress.map((item, idx) => (
                      <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-slate-800">{item.courseName}</h4>
                            <div className="flex items-center text-sm text-slate-500 mt-1">
                              <Calendar size={14} className="mr-1" />
                              <span>{item.month}</span>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.percentage && item.percentage >= 80 ? 'bg-emerald-100 text-emerald-800' :
                            item.percentage && item.percentage >= 50 ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {item.status}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getStatusColor(item.percentage || 0)}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${getStatusTextColor(item.percentage || 0)}`}>
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600 mt-2">
                          <span className="flex items-center gap-1">
                            <CheckCircle size={14} className="text-slate-400" /> {item.watched} watched
                          </span>
                          <span className="flex items-center gap-1">
                            <Book size={14} className="text-slate-400" /> {item.total} total
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(UserProgressPage);