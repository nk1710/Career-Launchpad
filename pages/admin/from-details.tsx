  import { useEffect, useState } from 'react';
import withAdminAuth from '../../components/withAdminAuth';
import AdminLayout from '../../components/AdminLayout';

function ManageStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [activeStudent, setActiveStudent] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'cards'>('cards');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/submitted-form');
        const data = await res.json();
        setStudents(data.students || []);
      } catch (err) {
        console.error('Error fetching students:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const getColorClass = (text: string) => {
    const colors = [
      'bg-blue-100 text-blue-800', 
      'bg-purple-100 text-purple-800',
      'bg-green-100 text-green-800', 
      'bg-amber-100 text-amber-800',
      'bg-rose-100 text-rose-800', 
      'bg-cyan-100 text-cyan-800'
    ];
    const hash = text?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  };

  const renderDetailCard = (student: any) => (
    <div className="bg-white rounded-lg p-3 shadow-lg grid grid-cols-1 gap-3">
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Personal Information</div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Name:</span>
            <span className="font-medium">{student.name}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Email:</span>
            <span className="break-all">{student.email}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Phone:</span>
            <span>{student.number}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">DOB:</span>
            <span>{student.dob}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Gender:</span>
            <span>{student.gender}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Course Details</div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Course:</span>
            <span className="font-medium">{student.course}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Price:</span>
            <span>₹{student.price}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Duration:</span>
            <span>{student.duration}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Qualification:</span>
            <span>{student.qualification}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Address Details</div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Aadhar:</span>
            <span>{student.aadharNo}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="w-16 sm:w-20 text-xs text-gray-500">State:</span>
            <span>{student.state}</span>
          </div>
          <div className="flex flex-wrap items-start">
            <span className="w-16 sm:w-20 text-xs text-gray-500">Address:</span>
            <span className="text-sm">{student.address}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <AdminLayout title="Form Details">
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="space-y-4 flex flex-col items-center">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
            <div className="text-gray-600">Loading student records...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Form Details">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 lg:p-6">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Student Records</h1>
            <p className="text-sm text-gray-600">Form submissions management</p>
          </div>
          
          <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm w-full sm:w-auto">
            <button 
              onClick={() => setViewMode('timeline')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'timeline' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Timeline View
            </button>
            <button 
              onClick={() => setViewMode('cards')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'cards' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cards View
            </button>
          </div>
        </div>

        <div className="bg-white p-2 mb-4 rounded-lg shadow-sm text-center text-sm text-blue-800 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Click on a student card or timeline item to view complete details</span>
        </div>

        {viewMode === 'timeline' && (
          <div className="relative bg-white rounded-xl shadow-md p-3 sm:p-4 overflow-hidden">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-400"></div>
            
            <div className="space-y-4 sm:space-y-6 ml-8 sm:ml-12 relative pb-4 sm:pb-6">
              {students.map((student, idx) => {
                const colorClass = getColorClass(student.name || '');
                return (
                  <div key={student.id || idx} className="relative">
                    <div 
                      className={`absolute -left-6 sm:-left-8 h-6 w-6 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform ${activeStudent === idx ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setActiveStudent(activeStudent === idx ? null : idx)}
                      aria-label="Toggle student details"
                    >
                      <div className={`h-3 w-3 rounded-full ${colorClass.split(' ')[0].replace('100', '400')}`}></div>
                    </div>
                    
                    <div className={`bg-white p-3 sm:p-4 rounded-lg shadow-sm border-l-4 border-blue-400 ${activeStudent === idx ? 'ring-2 ring-blue-200' : ''}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                        <div>
                          <h3 className="font-medium text-gray-800">{student.name}</h3>
                          <p className="text-sm text-gray-500 break-all">{student.email}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${colorClass}`}>{student.course}</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">₹{student.price}</span>
                        </div>
                      </div>

                      <button 
                        className={`mt-2 w-full text-center py-1.5 text-sm font-medium rounded transition-colors ${
                          activeStudent === idx 
                            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveStudent(activeStudent === idx ? null : idx)}
                      >
                        {activeStudent === idx ? 'Hide Details' : 'View Complete Details'}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`inline-block h-4 w-4 ml-1 transition-transform ${activeStudent === idx ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {activeStudent === idx && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          {renderDetailCard(student)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {students.map((student, idx) => {
              const colorClass = getColorClass(student.name || '');
              return (
                <div 
                  key={student.id || idx} 
                  className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${activeStudent === idx ? 'ring-2 ring-blue-300' : ''}`}
                >
                  <div className="h-2 bg-blue-500"></div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 mr-2">
                        <h3 className="font-medium text-lg text-gray-800 truncate">{student.name}</h3>
                        <p className="text-sm text-gray-500 break-all">{student.email}</p>
                      </div>
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${colorClass} flex items-center justify-center`}>
                        <span className="text-xs font-bold">{getInitials(student.name)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${colorClass}`}>{student.course}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">{student.gender}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 truncate max-w-full">{student.state}</span>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-xs text-gray-500">Phone</span>
                          <p className="truncate">{student.number}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Price</span>
                          <p>₹{student.price}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-xs text-gray-500">Duration</span>
                          <p>{student.duration}</p>
                        </div>
                      </div>
                      
                      <button
                        className={`mt-3 w-full text-center py-2 text-sm font-medium rounded flex items-center justify-center transition-colors ${
                          activeStudent === idx 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveStudent(activeStudent === idx ? null : idx)}
                      >
                        {activeStudent === idx ? 'Hide Details' : 'View Complete Details'}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ml-1 transition-transform ${activeStudent === idx ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {activeStudent === idx && (
                        <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                          {renderDetailCard(student)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 sm:mt-6 text-center text-gray-500 text-sm">
          Showing {students.length} student records
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(ManageStudents);