// components/AdminLayout.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Users,
  List,
  Plus, 
  Book,
  TrendingUp,
  BookOpen,
  MessageSquare,
  LogOut,
  PieChart,
  Bell,
  ChevronDown,
  Search,
  Menu,
  X,
  VeganIcon
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title = 'Admin Dashboard' }: AdminLayoutProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const quickActions = [
    {
      name: 'Dashboard',
      icon: <PieChart className="h-5 w-5" />,
      path: '/admin/dashboard-admin',
    },
    {
      name: 'Manage Students',
      icon: <List className="h-5 w-5" />,
      path: '/admin/manage-students',
    },
    {
      name: 'Add Students',
      icon: <Plus className="h-5 w-5" />,
      path: '/admin/add-student',
    },
    {
      name: 'Course Form Details',
      icon: <Book className="h-5 w-5" />,
      path: '/admin/from-details',
    },
    {
      name: 'Registered Students',
      icon: <Users className="h-5 w-5" />,
      path: '/admin/registered-users',
    },
    {
      name: 'Student Queries',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/admin/student-queries',
    },
    {
      name: 'Add lectures Videos',
      icon: <VeganIcon className="h-5 w-5" />,
      path: '/admin/add-lectures',
    },
    {
      name: 'Assign Video',
      icon: <BookOpen className="h-5 w-5" />,
      path: '/admin/assign-video',
    },
    {
      name: 'Student Progress',
      icon: <TrendingUp className="h-5 w-5" />,
      path: '/admin/user-progress',
    },
    {
      name: 'Website Queries',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/admin/website-queries',
    },
  ];

  return (
    <>
      <Head>
        <title>{title} - Career Launchpad</title>
      </Head>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black/50 md:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - uses fixed positioning on mobile, normal positioning on desktop */}
        <div 
          className={`fixed z-30 md:relative md:z-auto w-64 flex-shrink-0 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex h-16 items-center justify-center border-b border-slate-700 px-4">
            <h1 className="text-xl font-bold">Career Launchpad</h1>
          </div>
          <div className="flex flex-grow flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {quickActions.map((action) => (
                <a
                  key={action.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(action.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    router.pathname === action.path
                      ? 'bg-slate-700 text-white'
                      : 'text-gray-200 hover:bg-slate-700'
                  }`}
                >
                  <span className="mr-3">{action.icon}</span>
                  <span>{action.name}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="border-t border-slate-700 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-200 hover:bg-slate-700"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="bg-white shadow">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
              <div className="flex items-center">
                {/* Mobile menu toggle */}
                <button
                  className="mr-2 rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
                <span className="text-xl font-bold text-gray-800 md:hidden">
                  Career Launchpad
                </span>
              </div>
              <div className="flex items-center">
                <div className="relative mx-4 hidden md:block">
                  <div className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2">
                    <Search className="h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="ml-2 border-none outline-none"
                    />
                  </div>
                </div>
                <button className="mr-4 rounded-full bg-gray-100 p-1 relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {/* <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span> */}
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      A
                    </div>
                    <span className="ml-2 hidden text-sm font-medium text-gray-700 md:block">
                      Admin
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                  </button>
                  {isDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}