import React, { useState } from 'react';
import { ReactTyped } from "react-typed";
// import Image from 'next/image';
import Image from '../components/Image'
// import dynamic from 'next/dynamic';
import CourseModal from './CourseModal';

// const PaymentForm = dynamic(() => import('./PaymentFormOld'));

interface CourseComponentProps {
    courseData: {
      id: string;
      title: string;
      typedTitles: string[];
      highlightPoints: string[];
      heroTitle: string;
      heroSubtitle: string;
      imageSrc: string;
      price: number;
      originalPrice: number;
      discount: string;
      duration: string;
      contentHours: string;
      description: string;
      learningPoints: string[];
    }
    onViewSyllabusClick?: () => void; 
  }
  
  const CourseComponent: React.FC<CourseComponentProps> = ({ courseData, onViewSyllabusClick }) => {
    // const [showPaymentForm, setShowPaymentForm] = useState(false);
    // const [selectedCourseId, setSelectedCourseId] = useState<string>(courseData.id);
    // const [price, setSelectedPrice] = useState<number>(courseData.price);

    
    // Add state for the enrollment modal
    const [showEnrollModal, setShowEnrollModal] = useState(false);
  
    // const handleOpenPaymentForm = () => {
    //   setSelectedCourseId(courseData.id);
    //   setSelectedPrice(courseData.price);
    //   setShowPaymentForm(true);
    // };
  
    // const handleClosePaymentForm = () => setShowPaymentForm(false);
    
    // Handlers for the enrollment modal
    const handleOpenEnrollModal = () => {
      setShowEnrollModal(true);
    };
  
    const handleCloseEnrollModal = () => {
      setShowEnrollModal(false);
    };
  
    // Calculate discount percentage
    // const discountPercentage = Math.round(((courseData.originalPrice - courseData.price) / courseData.originalPrice) * 100);
  
  return (
    <>
      <div className="flex flex-col justify-center bg-white p-4">
        <div className="text-center mt-10">
          <h1 className="text-2xl text-blue-600 sm:text-3xl font-bold mb-4 hover:text-4xl">
            <ReactTyped
              strings={courseData.typedTitles}
              typeSpeed={100}
              backSpeed={50}
            />
          </h1>
          <ul className="text-base sm:text-lg text-gray-700 space-y-2">
            {courseData.highlightPoints.map((point, index) => (
              <li key={index} className={index === 1 ? "text-red-500" : ""}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 w-full py-12 px-4">
        <div className="w-full max-w-none mx-auto overflow-hidden rounded-2xl shadow-xl bg-white border border-gray-100">
          {/* Hero Banner */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-400"></div>
              <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-green-400"></div>
              <div className="absolute bottom-10 left-1/2 w-40 h-40 rounded-full bg-purple-400"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center px-8">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                {courseData.heroTitle}
              </h1>
              <p className="text-blue-100 text-sm md:text-base max-w-2xl">
                {courseData.heroSubtitle}
              </p>
            </div>
          </div>

          {/* Course Content */}
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="w-full md:w-2/5 p-6 md:p-8">
              <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <Image
                  src={courseData.imageSrc}
                  alt={courseData.heroTitle}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <div className="flex items-center space-x-2 mb-1">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold">12 hands-on projects</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6 px-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-800">₹{courseData.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 line-through">₹{courseData.originalPrice.toLocaleString()}</span>
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {courseData.discount}
                </div>
              </div>
            </div>
            
            {/* Description Section */}
            <div className="w-full md:w-3/5 p-6 md:p-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="flex h-8 w-8 rounded-full bg-green-100 text-green-500 items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-500">Duration : {courseData.duration}</span>
                
                <span className="flex h-8 w-8 rounded-full bg-blue-100 text-blue-500 items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-500">{courseData.contentHours} of content</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-3">Learn {courseData.heroTitle} with Projects</h2>
              
              <p className="sm:text-base leading-relaxed text-gray-800 mb-3 text-justify">
                {courseData.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">What you&apos;ll learn:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {courseData.learningPoints.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                   onClick={handleOpenEnrollModal}
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-blue-600 rounded-lg group"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-600 rounded-full group-hover:w-full group-hover:h-56"></span>
                  <span className="relative flex items-center">
                    Enroll Now
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
                
                <button 
                 onClick={onViewSyllabusClick}
                className="inline-flex items-center justify-center px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  View Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
 {/* Render the CourseModal component when showEnrollModal is true */}
 {showEnrollModal && (
        <CourseModal 
          isOpen={showEnrollModal}
          onClose={handleCloseEnrollModal}
          courseTitle={courseData.title || courseData.heroTitle}
          duration={courseData.duration}
          courseList={courseData.learningPoints}
          price={courseData.price.toString()}
        />
      )}
      {/* {showForm && (
        <div className="p-8">
          <PaymentForm onClose={handleCloseForm} courseId={selectedCourseId} price={price} />
        </div>
      )} */}
    </>
  );
};

export default CourseComponent;