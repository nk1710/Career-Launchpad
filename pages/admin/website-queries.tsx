import React, { useState, useEffect } from 'react'
import axios from 'axios'
import withAdminAuth from '../../components/withAdminAuth'
import AdminLayout from '../../components/AdminLayout'
import { Mail, Phone, Calendar, Eye, Trash2, AlertTriangle, Search } from 'lucide-react'

// Define the type for the UserQuery data structure
interface UserQuery {
  id: number
  fullName: string
  contactNo: string
  emailId: string
  query: string
  createdAt: string
  updatedAt: string
}

const WebsiteQueries: React.FC = () => {
  const [queries, setQueries] = useState<UserQuery[]>([])
  const [filteredQueries, setFilteredQueries] = useState<UserQuery[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [queriesPerPage] = useState<number>(8)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedQuery, setSelectedQuery] = useState<UserQuery | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/admin/website-queries')
        if (response.status !== 200) {
          throw new Error('Failed to fetch queries')
        }

        // Check if response.data is an array, otherwise extract the array from the response
        const queriesData = Array.isArray(response.data)
          ? response.data
          : response.data.queries || response.data.data || []

        // Sort queries by date (newest first)
        const sortedQueries = [...queriesData].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        setQueries(sortedQueries)
        setFilteredQueries(sortedQueries)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching queries:', err)
        setError('Failed to fetch Website queries. Please try again later.')
        setLoading(false)
      }
    }

    fetchQueries()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredQueries(queries)
    } else {
      const filtered = queries.filter(
        query => 
          query.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.emailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.query.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredQueries(filtered)
      setCurrentPage(1) // Reset to first page when filtering
    }
  }, [searchTerm, queries])

  // Get current queries for pagination
  const indexOfLastQuery = currentPage * queriesPerPage
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage
  const currentQueries = filteredQueries.slice(indexOfFirstQuery, indexOfLastQuery)
  const totalPages = Math.ceil(filteredQueries.length / queriesPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this query?'
    )
    if (!confirmDelete) return

    try{
      await axios.delete(`/api/admin/website-delete-queries?id=${id}`) // Fixed the endpoint URL
      setQueries(prev => prev.filter(q => q.id !== id)) // Fixed the filter condition
      if (isModalOpen && selectedQuery?.id === id) {
        setIsModalOpen(false)
        setSelectedQuery(null)
      }
    } catch (error) {
      console.error('Failed to delete query:', error)
      alert('Failed to delete query. Please try again.')
    }
  }

  const handleView = (query: UserQuery) => {
    setSelectedQuery(query)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedQuery(null)
  }

  // Function to truncate text with ellipsis
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  if (loading) {
    return (
      <AdminLayout title="Website Queries">
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-700">Loading user queries...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout title="Website Queries">
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg border-l-4 border-red-500 max-w-lg">
            <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Website Queries">
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">Website User Queries</h1>
            <p className="mt-2 opacity-90">Manage and respond to user inquiries from your website</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Search and Stats Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={20} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
                placeholder="Search by name, email or query content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              Total Queries: <span className="font-semibold text-indigo-600">{queries.length}</span>
            </div>
          </div>
          
          {filteredQueries.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Queries Found</h2>
              <p className="text-gray-500">
                {searchTerm ? 'No results match your search criteria.' : 'There are no user queries at this time.'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Query Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentQueries.map((query) => (
                  <div
                    key={query.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-indigo-400 cursor-pointer transform hover:scale-105"
                  >
                    <div className="border-b border-gray-100 bg-gradient-to-r from-purple-300 to-indigo-300 px-4 py-3">
                      <h2 className="text-lg font-semibold text-indigo-800 truncate">
                        {query.fullName}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {formatDate(query.createdAt)}
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-2 text-sm">
                        <Mail size={16} className="text-indigo-500 mr-2" />
                        <span className="text-gray-900 truncate">{query.emailId}</span>
                      </div>
                      <div className="flex items-center mb-3 text-sm">
                        <Phone size={16} className="text-indigo-500 mr-2" />
                        <span className="text-gray-900">{query.contactNo}</span>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-900 h-16 overflow-hidden">
                          {truncateText(query.query, 100)}
                        </p>
                      </div>
                      <div className="flex justify-between mt-2">
                        <button
                          className="flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors text-sm"
                          onClick={() => handleView(query)}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </button>
                        <button
                          className="flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm"
                          onClick={() => handleDelete(query.id)}
                        >
                          <Trash2 size={16} className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="inline-flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 border-r border-gray-200 ${
                        currentPage === 1 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      Previous
                    </button>
                    
                    <div className="hidden sm:flex">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        // Show first page, last page, current page, and pages around current
                        const showPage = 
                          pageNumber === 1 || 
                          pageNumber === totalPages || 
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                        
                        // Show ellipsis instead of page numbers
                        if (!showPage) {
                          // Show only one ellipsis between groups of visible pages
                          if (pageNumber === 2 || pageNumber === totalPages - 1) {
                            return (
                              <span key={`ellipsis-${pageNumber}`} className="px-3 py-2 text-gray-400">
                                ...
                              </span>
                            );
                          }
                          return null;
                        }
                        
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`px-3 py-2 ${
                              currentPage === pageNumber
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-indigo-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="sm:hidden px-3 py-2 border-l border-r border-gray-200">
                      <span className="text-gray-700">
                        {currentPage} of {totalPages}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 border-l border-gray-200 ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal for Viewing Full Query */}
      {isModalOpen && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-3/4 overflow-hidden">
            <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Query Details</h3>
              <button 
                onClick={closeModal}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-indigo-700 mb-1">{selectedQuery.fullName}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Mail size={16} className="mr-2 text-indigo-500" />
                  {selectedQuery.emailId}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Phone size={16} className="mr-2 text-indigo-500" />
                  {selectedQuery.contactNo}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2 text-indigo-500" />
                  {formatDate(selectedQuery.createdAt)}
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-gray-700 font-medium mb-2">Query Content:</h4>
                <p className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded-md border border-gray-200">
                  {selectedQuery.query}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
              <button
                onClick={() => handleDelete(selectedQuery.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors mr-2 flex items-center"
              >
                <Trash2 size={16} className="mr-1" /> Delete
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default withAdminAuth(WebsiteQueries)