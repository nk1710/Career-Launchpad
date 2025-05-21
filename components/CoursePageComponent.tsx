import React, { useState, useEffect } from 'react'
import Image from 'next/image'
// import Link from 'next/link'
import { Clock, BookOpen, BarChart2 } from 'lucide-react'
import CourseModal from './CourseModal'
import { useRouter } from 'next/navigation'

// Type definitions
interface ServiceType {
  title: string
  description: string
}

interface CourseType {
  id?: string
  title: string
  image: string
  originalPrice: string
  discountedPrice: string
  instructor: string
  isNew?: boolean
  slug?: string
}

interface CoursePageComponentProps {
  courseType?: string
  courseTitle: string
  instructorName: string
  studentsEnrolled: string
  courseImage: string
  courseDescription: string[]
  courseServices: ServiceType[]
  originalPrice: string
  discountedPrice: string
  duration: string
  lectures: string
  level: string
  popularCourses: CourseType[]
}

const CoursePageComponent: React.FC<CoursePageComponentProps> = ({
  courseType = 'Diploma',
  courseTitle,
  instructorName,
  studentsEnrolled,
  courseImage,
  courseDescription,
  courseServices,
  originalPrice,
  discountedPrice,
  duration,
  lectures,
  level,
  popularCourses = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  // Track mouse position for 3D effect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-br from-gray-200 to-white min-h-screen">
      {/* Course Header Section with 3D effect */}
      <div className="flex flex-col md:flex-row justify-between backdrop-blur-sm bg-white p-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{courseType}</span>
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-xs font-medium transform hover:scale-105 transition-transform duration-300 shadow-md">
              SPECIAL COURSE
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800 mb-4">
            {courseTitle}
          </h1>
        </div>
        {/* Instructor Info with 3D effect */}
        <div className="flex justify-around p-2 items-center backdrop-blur-sm shadow-md transform transition-all duration-300 hover:scale-105 bg-white rounded-2xl mt-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg transform transition-all duration-300 hover:scale-110">
            PI
          </div>
          <div>
            <p className="text-sm text-gray-600">Instructor</p>
            <p className="font-medium text-lg">{instructorName}</p>
          </div>
          <div className="ml-8 bg-blue-50 shadow-md transform transition-all duration-300 hover:scale-105">
            <p className="text-sm text-gray-600">Students enrolled</p>
            <p className="font-medium text-lg text-blue-700">
              {studentsEnrolled}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area - Desktop grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Content: Course Image and Details */}
        <div className="lg:col-span-2">
          {/* Course Image with 3D effect */}
          <div className="mb-8 overflow-hidden relative shadow-xl transition-all duration-500 cursor-pointer">
            <div
              className="flex h-80 overflow-hidden"
              style={{
                transform: !isMobile
                  ? `perspective(1000px) rotateX(${-mousePosition.y / 10
                  }deg) rotateY(${mousePosition.x / 10}deg)`
                  : 'none',
                transition: isMobile ? 'transform 0.3s ease' : 'none',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-20 bg-gradient-to-tr from-blue-900/20 to-transparent z-10 rounded-3xl"></div>

              {/* Image with proper positioning */}
              <div className="relative w-full h-full">
                <Image
                  src={courseImage}
                  alt={`${courseTitle} Course`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 20vw"
                  className="object-fit rounded-2xl hover:scale-105 transition-transform duration-700"
                  priority
                  loader={({ src }) => src}
                />
              </div>
            </div>
          </div>

          {/* Course Purchase Card for Mobile - Only visible on mobile */}
          <div className="block lg:hidden mt-8">
            <div
              className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-5px]"
              style={{
                transform: !isMobile
                  ? `perspective(1000px) rotateX(${-mousePosition.y / 20
                  }deg) rotateY(${mousePosition.x / 20}deg)`
                  : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-gray-500 line-through">
                    {originalPrice}
                  </span>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                    {discountedPrice}
                  </div>
                </div>
                <button
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={openModal}
                >
                  GET COURSE
                </button>
              </div>

              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Course details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <Clock size={22} className="text-blue-600" />
                    <span className="font-medium">Duration</span>
                  </div>
                  <span className="font-medium text-gray-800">{duration}</span>
                </div>

                <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <BookOpen size={22} className="text-blue-600" />
                    <span className="font-medium">Lectures</span>
                  </div>
                  <span className="font-medium text-gray-800">{lectures}</span>
                </div>

                <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <BarChart2 size={22} className="text-blue-600" />
                    <span className="font-medium">Level</span>
                  </div>
                  <span className="font-medium text-gray-800">{level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6 bg-white/50 backdrop-blur-sm rounded-t-2xl p-2">
            <nav className="flex space-x-8">
              <button className="border-b-2 border-blue-600 text-blue-600 py-4 px-4 font-medium relative overflow-hidden group">
                <span className="relative z-10">Description</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-100 origin-left transition-transform duration-300"></span>
                <span className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </nav>
          </div>

          {/* Course Description */}
          <div className="prose max-w-none bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">
              What Will You Learn?
            </h2>

            {courseDescription.map((paragraph, index) => (
              <div
                key={`desc-${index}`}
                className="relative overflow-hidden"
                style={{
                  transform: !isMobile
                    ? `perspective(1000px) rotateX(${-mousePosition.y / 30
                    }deg) rotateY(${mousePosition.x / 30}deg)`
                    : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <p className="leading-relaxed text-gray-800 mb-6 text-justify p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 bg-white hover:bg-blue-50 transform hover:scale-[1.02] hover:translate-y-[-4px]">
                  {paragraph}
                </p>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}

            {courseServices.length > 0 && (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold mt-12 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">
                  What services are available for someone with a {courseTitle}{' '}
                  Degree?
                </h2>
                <p className="text-base leading-relaxed text-gray-800 mb-6 text-justify px-4">
                  You can work in a variety of jobs associated with this
                  industry as a qualified professional. Among them are:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseServices.map((service, index) => (
                    <div
                      key={`service-${index}`}
                      className="p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 bg-white hover:bg-blue-50 scale-100 hover:scale-[1.03] hover:translate-y-[-4px] relative overflow-hidden"
                      style={{
                        transform: !isMobile
                          ? `perspective(1000px) rotateX(${-mousePosition.y / 40
                          }deg) rotateY(${mousePosition.x / 40}deg)`
                          : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 text-blue-700">
                        {service.title}
                      </h3>
                      <p className="text-base text-gray-800 text-justify">
                        {service.description}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>


        {/* Right Sidebar: Course Purchase and Popular Courses */}
        <div className="lg:col-span-1">
          {/* Course Purchase Card - Only visible on desktop */}
          <div
            className="hidden lg:block bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-5px]"
            style={{
              transform: !isMobile
                ? `perspective(1000px) rotateX(${-mousePosition.y / 20
                }deg) rotateY(${mousePosition.x / 20}deg)`
                : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-gray-500 line-through">
                  {originalPrice}
                </span>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                  {discountedPrice}
                </div>
              </div>
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={openModal}
              >
                GET COURSE
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Course details
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <Clock size={22} className="text-blue-600" />
                  <span className="font-medium">Duration</span>
                </div>
                <span className="font-medium text-gray-800">{duration}</span>
              </div>

              <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <BookOpen size={22} className="text-blue-600" />
                  <span className="font-medium">Lectures</span>
                </div>
                <span className="font-medium text-gray-800">{lectures}</span>
              </div>

              <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <BarChart2 size={22} className="text-blue-600" />
                  <span className="font-medium">Level</span>
                </div>
                <span className="font-medium text-gray-800">{level}</span>
              </div>
            </div>
          </div>

          {/* Popular Courses Section - Visible on both mobile and desktop */}
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              transform: !isMobile
                ? `perspective(1000px) rotateX(${-mousePosition.y / 25
                }deg) rotateY(${mousePosition.x / 25}deg)`
                : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800">
              Popular courses
            </h3>

            <div className="space-y-6">
              {popularCourses.map((course, index) => (
                <div
                  key={`popular-course-${index}`}
                  onClick={()=>router.push(`/${course.slug || convertToSlug(course.title)}`)}
                  className="flex gap-4 pb-6 border-b border-gray-100 group transform transition-all duration-300 hover:translate-y-[-4px]"
                >
                  <div
                    // href={`/${course.slug || convertToSlug(course.title)}`}
                    className="relative w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  >
                    <Image
                      src={course.image}
                      alt={`${course.title} Course`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority
                      loader={({ src }) => src}
                    />
                    {course.isNew && (
                      <span className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                        NEW
                      </span>
                    )}
                  </div>
                  <div>
                   
                      <h4 className="font-medium text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                        {course.title}
                      </h4>
          
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 line-through text-sm">
                        {course.originalPrice}
                      </span>
                      <span className="font-semibold text-blue-700">
                        {course.discountedPrice}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      By {course.instructor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Modal Component */}
      <CourseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        courseTitle={courseTitle}
        duration={duration}
        price={discountedPrice}
        courseList={[
          courseTitle,
          ...popularCourses.map((course) => course.title),
        ]}
      />
    </div>
  )
}

// Helper function to convert course titles to URL slugs
const convertToSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export default CoursePageComponent