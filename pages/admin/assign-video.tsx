import { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import AdminLayout from '../../components/AdminLayout'
import withAdminAuth from '../../components/withAdminAuth'

Modal.setAppElement('#__next') // Required for accessibility in Next.js

interface LectureVideo {
  id: number
  title: string
  url: string
  courseId: string
  month: number
}

interface CourseData {
  courseId: string
  courseName: string
  months: {
    [month: string]: LectureVideo[]
  }
}

const AssignVideo = () => {
  const [courses, setCourses] = useState<CourseData[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [targetCourseId, setTargetCourseId] = useState<string | null>(null)
  const [targetMonth, setTargetMonth] = useState<number | null>(null)
  const [notification, setNotification] = useState({ show: false, message: '' })

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get('/api/admin/assignVideo')
        const data = res.data

        if (typeof data === 'object' && !Array.isArray(data)) {
          const formatted: CourseData[] = []

          for (const [courseId, courseInfo] of Object.entries(data)) {
            const courseData = courseInfo as {
              courseName: string
              months: { [month: string]: LectureVideo[] }
            }

            formatted.push({
              courseId,
              courseName: courseData.courseName,
              months: courseData.months,
            })
          }

          setCourses(formatted)
          if (formatted.length > 0) {
            setSelectedCourse(formatted[0].courseId)
            const firstMonthKey = Object.keys(formatted[0].months)[0]
            if (firstMonthKey) setSelectedMonth(firstMonthKey)
          }
        } else {
          console.error('Unexpected API format')
        }
      } catch (error) {
        console.error('Error fetching lecture videos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const handleOpenModal = (courseId: string, month: number) => {
    setTargetCourseId(courseId)
    setTargetMonth(month)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setUsername('')
  }

  const showNotification = (message: string) => {
    setNotification({ show: true, message })
    setTimeout(() => setNotification({ show: false, message: '' }), 3000)
  }

  const handleAddUser = async () => {
    if (!username || !targetCourseId || targetMonth === null) return

    try {
      await axios.post('/api/admin/unlockVideo', {
        username,
        courseId: targetCourseId,
        month: targetMonth,
      })

      showNotification(`Access granted to ${username} for Month ${targetMonth}`)
      handleCloseModal()
    } catch (error: any) {
      console.error('Error unlocking video:', error)
      alert(error?.response?.data?.message || 'Failed to unlock video')
    }
  }

  const getSelectedCourseData = () => {
    return courses.find((course) => course.courseId === selectedCourse)
  }

  const getMonthsForSelectedCourse = () => {
    const course = getSelectedCourseData()
    return course ? Object.keys(course.months).map((m) => parseInt(m)) : []
  }

  const getSelectedVideos = () => {
    if (!selectedCourse || !selectedMonth) return []
    const course = courses.find((c) => c.courseId === selectedCourse)
    return course && course.months[selectedMonth]
      ? course.months[selectedMonth]
      : []
  }

  if (isLoading) {
    return (
      <AdminLayout title="Assign Videos">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Assign Videos">
      {/* Notification toast */}
      <div
        className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${
          notification.show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>{notification.message}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4">
          <h1 className="text-white text-xl md:text-2xl font-bold">
            Video Access Management
          </h1>
          <p className="text-blue-100 mt-1 text-sm md:text-base">
            Assign course content to students based on enrollment month
          </p>
        </div>

        {/* Main layout - Three-column design */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Course Selection */}
          <div className="w-full md:w-1/4 bg-gray-50 border-r border-gray-200">
            <div className="p-4">
              <h2 className="font-medium text-gray-700 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-blue-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                Courses
              </h2>
              <div className="space-y-2 max-h-64 md:max-h-96 overflow-y-auto">
                {courses.map((course) => (
                  <button
                    key={course.courseId}
                    onClick={() => {
                      setSelectedCourse(course.courseId)
                      const firstMonthKey = Object.keys(course.months)[0]
                      if (firstMonthKey) setSelectedMonth(firstMonthKey)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                      selectedCourse === course.courseId
                        ? 'bg-blue-700 text-white'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                    {course.courseName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Month Selection */}
          <div className="w-full md:w-1/4 bg-white border-r border-gray-200">
            {selectedCourse ? (
              <div className="p-4 flex flex-col h-full">
                <h2 className="font-medium text-gray-700 mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Months
                </h2>

                {/* Month selection area */}
                <div className="space-y-2 flex-grow overflow-y-auto mb-4">
                  {getMonthsForSelectedCourse().map((month) => (
                    <button
                      key={month}
                      onClick={() => setSelectedMonth(month.toString())}
                      className={`w-full px-3 py-2 rounded-md text-left transition-colors duration-200 flex items-center ${
                        selectedMonth === month.toString()
                          ? 'bg-blue-700 text-white'
                          : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        ></path>
                      </svg>
                      Month {month}
                    </button>
                  ))}
                </div>

                {/* Add User Button - Highlighted at bottom of column */}
                {selectedMonth && (
                  <div className="sticky bottom-0 bg-white pt-2 pb-2 border-t border-gray-200">
                    <button
                      onClick={() =>
                        handleOpenModal(selectedCourse, parseInt(selectedMonth))
                      }
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md flex items-center justify-center transition-colors duration-200 shadow-md"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        ></path>
                      </svg>
                      <span className="font-bold">GRANT ACCESS</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
                <svg
                  className="w-12 h-12 text-gray-300 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="text-gray-500">Select a course to view months</p>
              </div>
            )}
          </div>

          {/* Right Column - Videos Content */}
          <div className="w-full md:w-2/4 p-4">
            {selectedCourse && selectedMonth ? (
              <>
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {getSelectedCourseData()?.courseName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Month {selectedMonth} Videos
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {getSelectedVideos().length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {getSelectedVideos().map((video) => (
                        <div
                          key={video.id}
                          className="bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:shadow transition-shadow duration-300"
                        >
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-3">
                              <svg
                                className="w-5 h-5 text-blue-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            </div>
                            <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-full overflow-hidden">
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl">
                                  {video.title}
                                </h3>
                                <div className="w-full max-w-[300px] overflow-hidden">
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs sm:text-sm md:text-base text-blue-600 hover:text-blue-800 transition-colors duration-200 mt-1 inline-block truncate"
                                  >
                                    {video.url}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg
                        className="w-12 h-12 text-gray-400 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                        ></path>
                      </svg>
                      <p className="text-gray-500">
                        No videos available for this month.
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <svg
                  className="w-16 h-16 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-500">
                  Select a course and month to view videos
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Add User Modal"
        className="m-4 max-w-md mx-auto bg-white rounded-lg shadow-xl outline-none p-0 overflow-hidden border border-gray-200"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div className="relative">
          {/* Modal Header */}
          <div className="bg-green-600 p-4 text-white">
            <h2 className="text-lg font-medium">
              Grant Access to Month {targetMonth}
            </h2>
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-green-200 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter student username"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="text-sm text-gray-500 mb-4 bg-green-50 p-3 rounded-md border border-green-100">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-green-700 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p>
                  This will grant the student access to all videos in Month{' '}
                  {targetMonth}.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className={`px-4 py-2 rounded-md text-white transition-colors duration-200 ${
                  username.trim()
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!username.trim()}
              >
                Grant Access
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}

export default withAdminAuth(AssignVideo)
