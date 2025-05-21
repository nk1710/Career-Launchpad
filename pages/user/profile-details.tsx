'use client'; // This is required for client-side components in Next.js 13+

import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

// Import icons
import { User, Mail, Phone, BookOpen, Shield, Edit, Camera, LogOut, Bell, Moon, Sun } from 'lucide-react';

// Define TypeScript interfaces
interface ProfileData {
  username: string;
  email: string;
  phone?: string;
  enrollmentNo?: string;
  role: string;
}

const ProfileSettings = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<ProfileData>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // For Next.js, it's better to use an environment variable for API URLs
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }
        
        const res = await axios.get('/api/users/profile-details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setProfile(res.data);
        setFormData(res.data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would add the API call to update profile
    // For demo purposes, we'll just update the local state
    setProfile(formData as ProfileData);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-red-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-red-700">Error</h2>
        <p className="text-red-600">{error}</p>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Try Again
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-yellow-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700">No Profile Found</h2>
        <p>Unable to find your profile information. Please try logging in again.</p>
      </div>
    );
  }

  // Type cast formData to ProfileData for type safety when accessing properties
  const typedFormData = formData as ProfileData;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto py-8 px-4">
        <div className={`max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          
          {/* Header */}
          <div className={`px-8 py-6 ${darkMode ? 'bg-indigo-900' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} text-white`}>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <p className="mt-2 opacity-80">Manage your account preferences and settings</p>
          </div>
          
          {/* Content area */}
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className={`w-full md:w-64 p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {profile.username ? profile.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <button className="absolute bottom-4 right-0 p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                    <Camera size={14} />
                  </button>
                </div>
                <h2 className="text-xl font-bold">{profile.username}</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{profile.role}</p>
              </div>
              
              <nav>
                <button 
                  onClick={() => setActiveTab('profile')} 
                  className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} ${darkMode && activeTab === 'profile' ? 'bg-gray-700 text-blue-400' : ''}`}
                >
                  <User size={18} className="mr-3" />
                  <span>Personal Info</span>
                </button>
                <button 
                  onClick={() => setActiveTab('notifications')} 
                  className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'notifications' ? 'bg-blue-100 text-blue-600' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} ${darkMode && activeTab === 'notifications' ? 'bg-gray-700 text-blue-400' : ''}`}
                >
                  <Bell size={18} className="mr-3" />
                  <span>Notifications</span>
                </button>
                <button 
                  onClick={() => setActiveTab('security')} 
                  className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'security' ? 'bg-blue-100 text-blue-600' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} ${darkMode && activeTab === 'security' ? 'bg-gray-700 text-blue-400' : ''}`}
                >
                  <Shield size={18} className="mr-3" />
                  <span>Security</span>
                </button>
                <button 
                  className={`flex items-center w-full p-3 mt-8 rounded-lg text-red-500 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'}`}
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
            
            {/* Main content */}
            <div className="flex-1 p-8">
              {activeTab === 'profile' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold">Personal Information</h3>
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      <Edit size={16} className="mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Username
                          </label>
                          <div className={`flex items-center px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <User size={18} className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input 
                              type="text" 
                              name="username"
                              value={typedFormData.username || ''}
                              onChange={handleInputChange}
                              className={`bg-transparent w-full outline-none ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Email
                          </label>
                          <div className={`flex items-center px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <Mail size={18} className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input 
                              type="email" 
                              name="email"
                              value={typedFormData.email || ''}
                              onChange={handleInputChange}
                              className={`bg-transparent w-full outline-none ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Phone Number
                          </label>
                          <div className={`flex items-center px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <Phone size={18} className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input 
                              type="tel" 
                              name="phone"
                              value={typedFormData.phone || ''}
                              onChange={handleInputChange}
                              className={`bg-transparent w-full outline-none ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Enrollment Number
                          </label>
                          <div className={`flex items-center px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <BookOpen size={18} className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input 
                              type="text" 
                              name="enrollmentNo"
                              value={typedFormData.enrollmentNo || ''}
                              onChange={handleInputChange}
                              className={`bg-transparent w-full outline-none ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-4 mt-6">
                        <button 
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className={`px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Username</p>
                            <div className="flex items-center">
                              <User size={18} className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                              <p className="font-medium">{profile.username}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                            <div className="flex items-center">
                              <Mail size={18} className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                              <p className="font-medium">{profile.email}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                            <div className="flex items-center">
                              <Phone size={18} className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                              <p className="font-medium">{profile.phone || 'N/A'}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Enrollment Number</p>
                            <div className="flex items-center">
                              <BookOpen size={18} className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                              <p className="font-medium">{profile.enrollmentNo || 'N/A'}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Role</p>
                            <div className="flex items-center">
                              <Shield size={18} className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                              <p className="font-medium">{profile.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <h4 className="text-lg font-medium mb-4">Account Status</h4>
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                          <p className={darkMode ? 'text-green-400' : 'text-green-600'}>Active</p>
                        </div>
                        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Your account is in good standing. Last login: Today at 9:45 AM
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Notification Preferences</h3>
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <div>
                          <h4 className="font-medium">SMS Notifications</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive updates via text message</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Push Notifications</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive updates on your device</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div >
                  <h3 className="text-2xl font-semibold mb-6">Security Settings</h3>
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow mb-6`}>
                    <h4 className="font-medium mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Current Password
                        </label>
                        <input 
                          type="password" 
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-300'}`}
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          New Password
                        </label>
                        <input 
                          type="password" 
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-300'}`}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Confirm New Password
                        </label>
                        <input 
                          type="password" 
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-300'}`}
                          placeholder="Confirm new password"
                        />
                      </div>
                      <div>
                        <button 
                          className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
                    <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <button 
                      className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className={`px-8 py-4 ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm">
              <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                © 2025 Your Application Name. All rights reserved.
              </p>
              <div className="flex mt-4 md:mt-0 space-x-4">
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>Privacy Policy</a>
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>Terms of Service</a>
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>Help Center</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;