// pages/admin/dashboard-admin.js

import { useRouter } from 'next/router'
import {
  Users,
  Building,
  CheckCircle,
  TrendingUp,
  Book,
  MessageSquare,
  Plus,
  List
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import withAdminAuth from '../../components/withAdminAuth'
import { useState, useEffect } from 'react'

function AdminDashboard () {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    managedStudents: 0,
    interestedStudents: 0,
    activeCompanies: 0,
    completionRate: 0
  })
 
  

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchDashboardStats = async () => {
      try {
        // Fetch student count
        const studentsRes = await fetch('/api/admin/student-stats');
        const studentsData = await studentsRes.json();
        
        if (studentsRes) {
          setDashboardData({
            totalStudents: studentsData.adminCreatedUserCount || 0,
            managedStudents: studentsData.managedStudents || 0,
            interestedStudents: studentsData.interestedStudentsCount || 0,
            activeCompanies: studentsData.activeCompanies || 0,
            completionRate: studentsData.completionRate || 0
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);
 
  const stats = [
    {
      label: 'Total Students',
      value: dashboardData.totalStudents.toLocaleString(),
      icon: <Users className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      path: '/admin/manage-students',
      // growth: '+12%',
    },
    {
      label: 'Interested Students',
      value: dashboardData.interestedStudents.toLocaleString(),
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      path: '/admin/from-details',
      // growth: '+8%',
    },
    {
      label: 'Active Companies',
      value: dashboardData.activeCompanies.toLocaleString(),
      icon: <Building className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      // growth: '+5%',
    },
    {
      label: 'Completion Rate',
      value: `${dashboardData.completionRate}`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-amber-400 to-amber-600',
      // growth: '+3%',
    },
  ]

  const quickActions = [
    {
      name: 'Manage Students',
      icon: <List className="h-5 w-5" />,
      path: '/admin/manage-students',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    },
    {
      name: 'Add Students',
      icon: <Plus className="h-5 w-5" />,
      path: '/admin/add-student',
      color: 'bg-gradient-to-br from-green-500 to-green-700',
    },
    {
      name: 'Course Forms',
      icon: <Book className="h-5 w-5" />,
      path: '/admin/from-details',
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    },
    {
      name: 'Registered Students',
      icon: <Users className="h-5 w-5" />,
      path: '/admin/registered-users',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    },
    {
      name: 'Student Progress',
      icon: <TrendingUp className="h-5 w-5" />,
      path: '/admin/from-details',
      color: 'bg-gradient-to-br from-teal-500 to-teal-700',
    },
    {
      name: 'Student Queries',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/admin/student-queries',
      color: 'bg-gradient-to-br from-amber-500 to-amber-700',
    },
    {
      name: 'Website Queries',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/admin/website-queries',
      color: 'bg-gradient-to-br from-red-500 to-red-700',
    }
  ]

  // Loading state
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      {/* 3D Header Banner */}
      <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 p-6 text-white shadow-lg transform transition-all hover:scale-[1.01]">
        <div className="relative z-10">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-white p-2 text-blue-600 shadow-md">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
              <div className="mt-2 flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <span className="ml-2 text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
      </div>

      {/* Stats with 3D effects */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-xl bg-white p-1 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
            onClick={() => {
              if (stat?.path && typeof stat.path === 'string') {
             router.push(stat.path);
            } else {
              console.warn('Invalid stat.path', stat?.path);
            }
          }}
              
            
          >
            <div className="rounded-lg bg-gray-50 p-5 transition-transform duration-300 group-hover:-translate-y-1">
              <div className="flex items-center">
                <div
              
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.color} text-white shadow-lg transition-all duration-300 group-hover:rotate-3 group-hover:scale-110`}
                >
                  {stat.icon}
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="ml-2 text-sm font-medium text-green-600">
                      {/* {stat.growth} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity with 3D effects */}
      <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="group overflow-hidden rounded-xl bg-white p-1 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="h-full rounded-lg bg-gray-50">
            <div className="border-b border-gray-200 bg-white px-5 py-4">
              <h3 className="text-lg font-bold text-gray-900">
                Recent Placements
              </h3>
            </div>
            <div className="p-5">
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {[
                    {
                      name: "Alex Johnson",
                      company: "Google",
                      time: "2 hours ago",
                      icon: <Users className="h-5 w-5" />,
                      color: "bg-blue-100 text-blue-600"
                    },
                    {
                      name: "Maria Garcia",
                      company: "Microsoft",
                      time: "5 hours ago",
                      icon: <Users className="h-5 w-5" />,
                      color: "bg-green-100 text-green-600"
                    },
                    {
                      name: "James Wilson",
                      company: "Amazon",
                      time: "1 day ago",
                      icon: <Users className="h-5 w-5" />,
                      color: "bg-purple-100 text-purple-600"
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center py-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color} shadow-sm transition-all duration-300 group-hover:shadow-md`}>
                        {item.icon}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name} placed at {item.company}
                        </p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                      <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        New
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="group overflow-hidden rounded-xl bg-white p-1 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="h-full rounded-lg bg-gray-50">
            <div className="border-b border-gray-200 bg-white px-5 py-4">
              <h3 className="text-lg font-bold text-gray-900">
                Upcoming Events
              </h3>
            </div>
            <div className="p-5">
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {[
                    {
                      name: "Google",
                      eventType: "Virtual Recruitment Drive",
                      date: "May 2, 2025",
                      icon: <Building className="h-5 w-5" />,
                      color: "bg-green-100 text-green-600"
                    },
                    {
                      name: "Amazon",
                      eventType: "Campus Interview",
                      date: "May 10, 2025",
                      icon: <Building className="h-5 w-5" />,
                      color: "bg-blue-100 text-blue-600"
                    },
                    {
                      name: "Microsoft",
                      eventType: "Tech Talk",
                      date: "May 15, 2025",
                      icon: <Building className="h-5 w-5" />,
                      color: "bg-purple-100 text-purple-600"
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center py-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color} shadow-sm transition-all duration-300 group-hover:shadow-md`}>
                        {item.icon}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name} {item.eventType}
                        </p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        Upcoming
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions with 3D effects */}
      <div className="overflow-hidden rounded-xl bg-white p-1 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="rounded-lg bg-gray-50">
          <div className="border-b border-gray-200 bg-white px-5 py-4">
            <h3 className="text-lg font-bold text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  onClick={() => router.push(action.path)}
                  className={`group flex flex-col items-center justify-center rounded-xl ${action.color} p-5 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    {action.icon}
                  </div>
                  <span className="mt-3 text-center text-sm font-medium">
                    {action.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

// Export with authentication wrapper
export default withAdminAuth(AdminDashboard)