
import dynamic from 'next/dynamic';
import React from 'react';
import Head from 'next/head'; // Static import for managing head tags and SEO
import { NextSeo } from 'next-seo'; // Static import for SEO management
import { ReactTyped } from 'react-typed'; // Correct import statement
import CareerDomains2 from '../components/CareerDomains2';
import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks
// Dynamically import components
const Layout = dynamic(() => import('../components/Layout'));
const CourseUse = dynamic(() => import('../components/CourseUse'));




const About: React.FC = () => {

  // **********************
const [isVisible, setIsVisible] = useState(false);
  
useEffect(() => {
  setIsVisible(true);
}, []);

const technologies = ['HTML', 'CSS', 'PHP','Tourism Management','JavaScript', 'React.js','Hotel Management', 'MySQL','C++','MERN','Metro Management', ];
const [techIndex, setTechIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setTechIndex((prevIndex) => (prevIndex + 1) % technologies.length);
  }, 2000);
  
  return () => clearInterval(interval);
}, [technologies.length]);
  return (
    <Layout>
      <NextSeo
  title="Best Full Stack Development Courses - Career Launchpad"
  description="Discover Career Launchpad top full stack development courses. Learn essential skills in front-end and back-end technologies to kickstart your career."
  openGraph={{
    title: 'Best Full Stack Development Courses - Career Launchpad',
    description: 'Discover Career Launchpad top full stack development courses. Learn essential skills in front-end and back-end technologies to kickstart your career.',
    images: [
      {
        url: 'https://www.placementinstitute.com/og-image.jpg', // Update if you have a specific image for full stack
        width: 800,
        height: 600,
        alt: 'Career Launchpad Best Full Stack Development Courses',
      },
    ],
    url: 'https://www.placementinstitute.com/best-full-stack-development', // Ensure this is the correct URL
    type: 'website', // Specify the type of the content
  }}
/>

   


      <Head>
        <title>Career Launchpad - Development course</title>
        <link rel="alternate" href="https://www.placementinstitute.com/best-full-stack-development"/>
        <meta
          name="description"
          content="Welcome to Career Launchpad, your source for online skill development our programs."
        />
        <meta property="og:title" content="Career Launchpad - best-digital-marketing-advanced" />
        <meta
          property="og:description"
          content="Welcome to Career Launchpad, your source for online skill development our programs."
        />
        <meta
          property="og:image"
          content="https://placementinstitute.com/bg3.png"
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta
          property="og:url"
          content="https://placementinstitute.com/best-full-stack-development"
        />
        {/* Add other meta tags as needed */}

      </Head>

      <div className="flex flex-col mt-10 justify-center bg-white p-4">
        <div className="text-center">
          <h1 className="text-2xl text-blue-400 sm:text-3xl font-bold mb-4">
            {/* Consider optimizing ReactTyped or use a static text */}
            <ReactTyped strings={["Certified Programming and Development Programs"]} typeSpeed={100} backSpeed={50} />
          </h1>

          <CareerDomains2/>
          <CourseUse /> 

         
{/* ******************** */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900  sm:py-16 min-h-screen">
  <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 perspective-1000">
    <div 
      className={`
        bg-white p-6 sm:p-8 rounded-xl shadow-2xl 
        transform ${isVisible ? 'translate-y-0 rotate-x-0' : 'translate-y-20 rotate-x-12'} 
        transition-all duration-1000 ease-out 
        border-t-8 border-red-500
        relative overflow-hidden
      `}
      style={{ 
        transformStyle: 'preserve-3d',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)' 
      }}
    >
      {/* Decorative 3D circles */}
      <div className="absolute -top-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-20 blur-lg"></div>
      <div className="absolute -bottom-10 -left-10 w-28 h-28 sm:w-40 sm:h-40 bg-gradient-to-tr from-blue-400 to-indigo-600 rounded-full opacity-20 blur-lg"></div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex flex-wrap items-center">
        <span className="text-red-500 mr-2 transform hover:scale-110 transition-transform duration-300">
          Career Launchpad
        </span>
        {/* 
        <span className="text-lg text-gray-500 hidden sm:inline">|</span>
        <span className="ml-0 sm:ml-2 text-xl sm:text-2xl font-semibold text-indigo-600">
          Full Stack Development
        </span> */}
      </h2>

      <div className="space-y-4 sm:space-y-6">
      <p className=" bg-gradient-to-r from-blue-500/20 to-purple-500/20text-lg leading-relaxed">
      <strong className="font-semibold text-red-500">
                      <ReactTyped strings={["Career Launchpad"]} typeSpeed={100} loop={true} backSpeed={50} />
                    </strong>
                     offers a comprehensive Full Stack
                    Development Training designed to equip you with the skills needed to
                    excel in today’s competitive tech industry. This full-time program
                    covers both frontend and backend development, ensuring you gain a
                    well-rounded understanding of how web applications are built from
                    the ground up.
                  </p>
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 sm:p-4 rounded-lg shadow-inner">
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            The course curriculum includes essential technologies like{' '}
            <span className="font-semibold text-red-500 inline-block">
             <h2>{technologies[techIndex]}</h2> 
            </span> and <span className="font-semibold text-red-500">MySQL</span>, along with
            hands-on projects that simulate real-world scenarios. You will learn how to
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:space-x-4 my-4 sm:my-6">
          {technologies.map((tech, index) => (
            <div 
              key={tech}
              className={`
                px-3 py-1.5 rounded-lg shadow-md font-medium text-sm
                transform transition-all duration-300
                ${index === techIndex ? 
                  'bg-red-500 text-white scale-110 -translate-y-1' : 
                  'bg-white text-gray-700 hover:bg-gray-100'}
              `}
            >
              {tech}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow border-l-4 border-indigo-500 transform hover:scale-105 transition-transform duration-300">
            <h3 className="font-semibold text-indigo-600 mb-1 sm:mb-2 text-base sm:text-lg">Learn With Experts</h3>
            <p className="text-gray-700 text-sm sm:text-base">Interactive learning with real-world projects.</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow border-l-4 border-red-500 transform hover:scale-105 transition-transform duration-300">
            <h3 className="font-semibold text-red-500 mb-1 sm:mb-2 text-base sm:text-lg">Recorded Lectures</h3>
            <p className="text-gray-700 text-sm sm:text-base">Review at your own pace with recorded sessions.</p>
          </div>
        </div>

        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-4 sm:mt-6">
          With its comprehensive curriculum and affordable pricing , 
          <span> <strong className="font-semibold text-red-500">
                      <ReactTyped strings={["Career Launchpad"]} typeSpeed={100} loop={true} backSpeed={50} />
                    </strong></span> is the perfect choice for anyone looking to become a skilled Full Stack Developer.
        </p>

        <div className="mt-6 sm:mt-8 text-center">
          {/* <button className="bg-red-500 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg shadow-lg font-semibold transform hover:scale-105 hover:bg-red-600 transition-all duration-300">
            Enroll Now
          </button> */}
        </div>
      </div>

      {/* 3D corner fold effect */}
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-red-100">
        <div 
          className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400 to-red-600"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
            transform: 'translateZ(5px)'
          }}
        ></div>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </Layout>
  );
};

export default About;