import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BookOpen, Award, Users, Briefcase, BarChart, Calendar, Clock, CheckCircle } from 'lucide-react';

const differentiators = [
  {
    image: '/Industry-Expert Instructors.jpg',
    alt: 'Industry-Expert Instructors',
    content: 'The quality of education can depend heavily on the expertise of instructors. Our team consists of instructors who are reputed in their respective industries. Our educators are seasoned professionals who have amassed many years of practical experience in their respective fields.',
    icon: <Users className="w-6 h-6" />
  },
  {
    image: '/Personalized Learning Paths.jpg',
    alt: 'Real-Time Project Experience',
    content: 'We go beyond mere simulations by offering you live projects involving real-time problem solving and collaboration. Apart from adding to your technical skills, such hands-on experience helps in developing other soft skills such as teamwork and communication. Working with us enables you to get a feel for working in a real corporate environment on live projects.',
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    image: '/Certificates for Project.jpg',
    alt: 'Certificates for Project Completion and Internship',
    content: 'We believe in the validation of attainment that you get. On completion of your project and assignment, both the project completion certificate and internship certificates shall be availed to you. This credential serves as validation for hard work and commitment to excellence with skills acquired.',
    icon: <Award className="w-6 h-6" />
  },
  {
    image: '/Corporate Experience.jpg',
    alt: 'Corporate Experience',
    content: 'Our goal is to give you an education that prepares you for the professional world. We do this by emulating what a corporate-style learning environment would look like through real projects and interaction with professionals in your field.',
    icon: <BarChart className="w-6 h-6" />
  },
  {
    image: '/Personalized Learning Paths.jpg',
    alt: 'Personalized Learning Paths',
    content: 'We understand that every student has unique needs and goals. We offer personalized learning paths which will fit your schedule, pace, and professional goals. Our flexible format of courses will let you focus on the very areas where improvement is needed most.',
    icon: <BookOpen className="w-6 h-6" />
  },
  { 
    image: '/Our Vision.jpg', 
    alt: 'Our Vision', 
    content: 'Our vision is to democratize access to high-quality education so that everyone can get the training they need to thrive in the quickly changing digital world of today, regardless of background or ability to pay.',
    icon: <Users className="w-6 h-6" />
  },
  { 
    image: '/Resonable Price.jpg', 
    alt: 'Reasonable Price', 
    content: 'We have very affordable and flexible programs that will fit your budget and schedule without ever having to sacrifice quality for cost.',
    icon: <Clock className="w-6 h-6" />
  },
  { 
    image: '/Recorded Lectures for Missed Classes.jpg', 
    alt: 'Recorded Lecture for Missed Classes', 
    content: 'Missed a class? No worries. Our recorded lectures ensure you can catch up anytime, anywhere.',
    icon: <Calendar className="w-6 h-6" />
  },
  { 
    image: '/Alternative Day Doubt Sessions.jpg', 
    alt: 'Alternative Day Doubt Sessions', 
    content: 'We provide alternative day doubt sessions to address all your queries and ensure a comprehensive understanding of the material.',
    icon: <CheckCircle className="w-6 h-6" /> 
  },
];

const DifferenceSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const router = useRouter(); 
  // Group features into rows of 3 for the hexagon layout
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-purple-100 opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-blue-600">Us</span>?
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gray-300"></div>
            <div className="px-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="h-px w-16 bg-gray-300"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our Career Launchpad offers a unique approach to career preparation, focusing on 
            practical experience and industry-relevant skills.
          </p>
        </div>

         {/* Main Feature Display */}
         <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Side */}
            <div className="relative h-80">
              <Image
                src={differentiators[activeFeature].image}
                alt={differentiators[activeFeature].alt}
                layout="fill"
                // objectFit="contain"
                className="transition-all duration-700 ease-in-out"
                loader={({ src }) => src}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
                <div className="p-8">
                  <div className="inline-block p-3 bg-white rounded-full text-blue-600 mb-4">
                    {differentiators[activeFeature].icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {differentiators[activeFeature].alt}
                  </h3>
                </div>
              </div>
            </div>
            
            {/* Content Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="sm:text-base leading-relaxed text-gray-800 mb-3 text-justify ">
                {differentiators[activeFeature].content}
              </p>
              <div className="flex items-center mt-8">
                <span className="text-sm font-medium text-blue-600 mr-4">
                  Feature {activeFeature + 1} of {differentiators.length}
                </span>
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${((activeFeature + 1) / differentiators.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
         {/* Hexagon Grid Layout */}
         <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">
            Explore Our Key Differentiators
          </h3>
          
          <div className="flex flex-col items-center">
            {rows.map((row, rowIndex) => (
              <div 
                key={rowIndex} 
                className={`flex flex-wrap justify-center ${rowIndex % 2 === 1 ? 'md:-ml-24' : ''}`}
              >
                {row.map((featureIndex) => (
                  <div
                    key={featureIndex}
                    className="group m-2 md:m-4 cursor-pointer"
                    onClick={() => setActiveFeature(featureIndex)}
                  >
                    <div className={`w-24 h-24 md:w-32 md:h-32 relative flex items-center justify-center transition-all duration-300 ${
                      activeFeature === featureIndex 
                        ? 'bg-blue-600 text-white scale-110 z-10'
                        : 'bg-white text-blue-600 hover:bg-blue-50'
                    } shadow-lg rounded-xl transform rotate-45 overflow-hidden`}>
                      <div className="absolute inset-0 transform -rotate-45 flex items-center justify-center">
                        <div className="text-center p-4">
                          {differentiators[featureIndex].icon}
                          <p className="text-xs mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {differentiators[featureIndex].alt.split(' ')[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Feature List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {differentiators.map((feature, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                activeFeature === index 
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-800 shadow hover:shadow-md hover:bg-blue-50'
              }`}
              onClick={() => setActiveFeature(index)}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 mr-4 rounded-lg ${
                  activeFeature === index 
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-lg">{feature.alt}</h4>
              </div>
              <p className={`text-sm ${
                activeFeature === index ? 'text-blue-100' : 'text-gray-600' 
              }`}>
                {feature.content.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Ready to Boost Your Career?</h3>
          <button onClick={() => router.push('/login')} className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-700">
            Login To Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;