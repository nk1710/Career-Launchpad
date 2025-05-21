// components/layouts/AuthLayout.tsx
import React from 'react'
import Image from '../components/Image'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Illustration/Banner */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex-col justify-center items-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Welcome to Career Launchpad</h1>
          <p className="text-lg mb-8">Your gateway to knowledge and skills that matter. Login to continue your learning journey.</p>
          
          {/* You can add an illustration here */}
<div className="relative w-full h-64">
  <Image
    src="/Laravel.jpg" 
    alt="Learning Illustration" 
    className="w-full h-full object-contain"
    width={600}
    height={300}
  />
</div>
          
          <div className="mt-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 bg-white/20 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Expert-led courses</h3>
                <p className="text-white/80 text-sm">Learn from industry professionals</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/20 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Community support</h3>
                <p className="text-white/80 text-sm">Learn together with peers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          {children}
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>© 2025 Career Launchpad. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout ;