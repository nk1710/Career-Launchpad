import React, { useState, useEffect } from 'react'
import { BookOpen, MessageCircle, Settings, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

const UserDashboard = () => {
  const [name, setName] = useState('')
  const router = useRouter()

  // Initialize user name with a dummy value or fetch from an API
  useEffect(() => {
    // Example: Fetch user name from local storage or API
    const userName = localStorage.getItem('userName') || 'Student'
    setName(userName)
  }, [])

  // Main navigation sections
  const sections = [
    {
      title: 'Lectures',
      description:
        'Access all your enrolled video lectures and track your progress.',
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      href: '/user/lectures',
      color: 'bg-gradient-to-r from-purple-600 to-purple-800',
      // stats: '12 courses',
    },
    {
      title: 'Send Queries',
      description: 'Need help? Submit your queries and get support.',
      icon: <MessageCircle className="w-8 h-8 text-indigo-600" />,
      href: '/user/queries',
      // stats: '2 pending',
    },
    {
      title: 'Profile Settings',
      description: 'Update your personal information and change password.',
      icon: <Settings className="w-8 h-8 text-emerald-600" />,
      href: '/user/profile-details',
      // stats: 'Last updated: 5d ago',
    },
  ]

  // Quick access items
  const quickAccess = [
    {
      name: 'Lectures',
      icon: <BookOpen className="w-5 h-5" />,
      href: '/user/lectures',
    },
    {
      name: 'Send Queries',
      href: '/user/queries',
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      name: 'Profile Setting',
      href: '/user/profile-details',
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  // Recent activity data
  const recentActivity = [
    { text: 'Completed "React Fundamentals" module', time: '2 hours ago' },
    { text: 'Submitted a query about API integration', time: '1 day ago' },
    { text: 'Started "Advanced Node.js" course', time: '3 days ago' },
  ]
  const handleLogout = () => {
    // Clear auth tokens or user state
    // Redirect to login or home
    // Replace console.log with a more appropriate method
    localStorage.removeItem("token")
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Top navigation bar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-700">
                Career Launchpad{' '}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6">
                {quickAccess.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center text-gray-700 hover:text-blue-600 text-sm font-medium relative"
                    onClick={() => router.push(item.href)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-orange-500 hover:underline ml-2 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {name.split(' ')[0]}!
          </h1>
          <p className="mt-2 text-gray-600">
            Continue your learning journey or explore new courses.
          </p>
        </div>

        {/* Main sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {sections.map((section, index) => (
            <a
              key={index}
              href={section.href}
              className="bg-green-500 rounded-xl shadow-sm hover:shadow-lg transition-all p-6 flex flex-col border border-indigo-500 relative overflow-hidden group scale-100 hover:scale-105 hover:bg-color-200"
            >
              <div className="absolute w-1 h-full left-0 top-0 bg-blue-500 group-hover:bg-blue-600 transition-colors"></div>
              <div className="mb-4 p-3 rounded-lg bg-gray-50 inline-block shadow-md">
                {section.icon}
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {section.title}
              </h2>
              <p className="text-gray-800 text-sm mb-4">
                {section.description}
              </p>
              <div className="mt-auto">
                {/* <span className="text-xs font-medium text-gray-500">
                  {section.stats}
                </span> */}
              </div>
              <div className="absolute bottom-0 right-0 w-0 h-0 border-solid border-transparent border-b-[20px] border-r-[20px] border-b-blue-600 border-r-yellow-500 group-hover:border-b-orange-500 group-hover:border-r-blue-800 transition-colors"></div>
            </a>
          ))}
        </div>

        {/* Additional sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course Progress Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 col-span-3 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Course Progress
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    React Fundamentals
                  </span>
                  <span className="text-sm font-medium text-gray-500">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Advanced Node.js
                  </span>
                  <span className="text-sm font-medium text-gray-500">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: '20%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    UI/UX Design Principles
                  </span>
                  <span className="text-sm font-medium text-gray-500">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: '40%' }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a
                href="/user/all-courses"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all courses →
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="border-l-2 border-blue-200 pl-3 py-1"
                >
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="/user/activity"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all activity →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-sm text-gray-500 ">
              Copyright© 2025, All rights reserved | Career Launchpad India
              Pvt. Ltd.
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/help" className="text-sm text-gray-500 hover:text-gray-700">Help Center</a>
              <a href="/contact" className="text-sm text-gray-500 hover:text-gray-700">Contact</a>
              <a href="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
              <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UserDashboard