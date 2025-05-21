import Layout from '../components/Layout';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import Image from 'next/image'; // Add this import for Next.js Image component

// Define types for image objects
interface ImageItem {
  image: string;
  alt: string;
}

// Dynamic imports with proper types
const DifferenceSection = dynamic(() => import('../components/DifferentSection'));
const CustomImage = dynamic(() => import('../components/Image'));

// Image data with proper typing
const picture: ImageItem[] = [
  { image: '/Our Mission.jpg', alt: 'Our Mission' },
];

// Add more image constants for new visual elements
const heroBackground = '/B1.jpg'; // Add a background image for hero section
const timelineIcons: ImageItem[] = [
  { image: '/establish.jpg', alt: 'Establishment Icon' },
  { image: '/Regis.jpg', alt: 'Registration Icon' },
  { image: '/Gov.jpg', alt: 'Government Recognition Icon' },
];
// Properly typed component
const About: React.FC = () => {
  return (
    <Layout>
      <NextSeo
        title="About Us - Career Launchpad | Online Skill Development"
        description="Discover Career Launchpad, your trusted source for online skill development. Learn about our mission, values, and expert-led programs designed to enhance your skills."
        openGraph={{
          title: 'About Us - Career Launchpad | Online Skill Development',
          description: 'Discover Career Launchpad, your trusted source for online skill development. Learn about our mission, values, and expert-led programs designed to enhance your skills.',
          images: [
            {
              url: 'https://placementinstitute.com/bg3.png',
              width: 800,
              height: 600,
              alt: 'Career Launchpad About Us',
            },
          ],
          url: 'https://placementinstitute.com/about-us',
          type: 'website',
        }}
      />

      <Head>
        <link rel="canonical" href="https://placementinstitute.com/about-us" />
        <meta name="description" content="Learn about Career Launchpad, our mission, and how we provide accessible and affordable education to help you become a Full Stack Developer." />
        <meta property="og:image" content="https://placementinstitute.com/path-to-your-image.jpg" />
        <meta property="og:url" content="https://placementinstitute.com/about-us" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Enhanced Hero Section with Background Image */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="absolute inset-0 opacity-20 z-0">
          {/* Add hero background image */}
          <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${heroBackground})` }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
         
          {/* Fixed conflicting classnames - removed text-gray-800 */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">About Us</h1>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto">
            Your journey to professional success begins with understanding our story
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Institute Introduction with Image */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Career Launchpad</h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 text-justify">
                  Career Launchpad stands as a beacon of excellence in the realm of professional education, offering a diverse array of diploma courses ranging from metro and airport management to hotel administration and beyond. Endorsed by government-approved bodies including    
                  <span className="text-red-500 font-bold"> NCT</span> (National Capital Territory),
                  <span className="text-red-500 font-bold"> MSME</span> (Micro, Small, and Medium Enterprises), <span className="text-red-500 font-bold">MCA</span> (Ministry of Corporate Affair&apos;s)
                  , our institute prides itself on delivering industry-relevant curriculum and hands-on training that empowers students to excel in their chosen fields. With a commitment to nurturing talent and fostering innovation, Career Launchpad is the premier destination for individuals seeking to embark on a rewarding career journey in today&apos;s dynamic job market.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-1 rounded-full shadow-lg relative">
                  <div className="bg-white rounded-full p-4">
                    <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">SINCE 2015</span>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full shadow-md"></div>
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-blue-400 rounded-full shadow-md"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Timeline Section with Icons */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Our Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute top-0 left-1/2 w-1 h-full bg-red-500 transform -translate-x-1/2"></div>
              
              {/* Timeline items */}
              <div className="grid grid-cols-1 gap-8">
                {/* Timeline item 1 */}
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div className="md:text-right md:pr-10 mb-8 md:mb-0">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                      <div className="flex md:justify-end mb-4">
                        {/* Fixed img tag - replaced with Next Image */}
                        <Image src={timelineIcons[0].image} alt={timelineIcons[0].alt} width={48} height={48} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Establishment</h3>
                      <p className="text-gray-600">
                        <span className="text-red-500 font-bold">Welcome to Career Launchpad: </span>
                        Established in 2015, by a group of visionary thinkers and intellectuals.
                      </p>
                    </div>
                  </div>
                  <div className="md:text-left md:pl-10 hidden md:block">
                    {/* Timeline marker */}
                    <div className="relative h-full">
                      <div className="absolute top-6 -left-14 w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-md"></div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline item 2 */}
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div className="hidden md:block">
                    {/* Timeline marker */}
                    <div className="relative h-full">
                      <div className="absolute top-6 -right-14 w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-md"></div>
                    </div>
                  </div>
                  <div className="md:text-left md:pl-10">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                      <div className="flex mb-4">
                        {/* Fixed img tag - replaced with Next Image */}
                        <Image src={timelineIcons[1].image} alt={timelineIcons[1].alt} width={48} height={48} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Formal Registration</h3>
                      <p className="text-gray-600">Formally registered with the education trust in 2016.</p>
                    </div>
                  </div>
                </div>
                
                {/* Timeline item 3 */}
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div className="md:text-right md:pr-10 mb-8 md:mb-0">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                      <div className="flex md:justify-end mb-4">
                        {/* Fixed img tag - replaced with Next Image */}
                        <Image src={timelineIcons[2].image} alt={timelineIcons[2].alt} width={48} height={48} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Government Recognition</h3>
                      <p className="text-gray-600">Registered with the Ministry of Corporate Affairs (MCA) – Government of India in 2017.</p>
                    </div>
                  </div>
                  <div className="md:text-left md:pl-10 hidden md:block">
                    {/* Timeline marker */}
                    <div className="relative h-full">
                      <div className="absolute top-6 -left-14 w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Purpose - Enhanced with decorative elements */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-30 -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full opacity-30 -ml-6 -mb-6"></div>
              
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Our Vision</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify relative z-10">
                Our aim is to deliver value-based education in an intellectually stimulating environment conducive to the holistic development of our students.
                <span className="text-red-500 font-bold"> Career Launchpad </span> has built a reputation for academic excellence by offering practical and high-quality academic programs in the domains of Aviation, and Hotel Management.

                Since our inception, we have fostered entrepreneurship, encouraged innovative thinking, and embraced technological advancements to prepare our students for leadership roles in the dynamic professional landscape.

                Career Launchpad provides the real-world experience necessary to thrive in today&apos;s competitive global marketplace.
              </p>
            </div>
          </div>

          {/* Success Stories Section with Testimonial Cards */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold inline-block relative">
                Success Stories
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"></span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Success Story Card 1 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>
                <div className="p-6">
                  {/* Add student image */}
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                      {/* Placeholder for student image */}
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Student Success</h3>
                      <p className="text-sm text-gray-500">Class of 2022</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-base lg:text-lg mb-4 text-justify">
                    Discover your pathway to success with Career Launchpad, an esteemed educational institution approved by government bodies including NCT, MSME, and MCA. With a diverse array of diploma courses ranging from metro and airport management to hotel management and beyond, we offer students a gateway to exciting career opportunities in the rapidly evolving industries of today.
                  </p>
                </div>
              </div>
              
              {/* Success Story Card 2 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>
                <div className="p-6">
                  {/* Add student image */}
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                      {/* Placeholder for student image */}
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Career Journey</h3>
                      <p className="text-sm text-gray-500">Class of 2021</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-base lg:text-lg mb-4 text-justify">
                    At Career Launchpad, we&apos;re committed to providing quality education, industry-relevant training, and personalized support to empower our students to excel in their chosen fields and achieve their professional aspirations. Join us and embark on a journey towards a brighter future filled with endless possibilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission Section - Keep the existing structure */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold inline-block relative">
                Our Mission
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"></span>
              </h2>
            </div>
            
            {picture.map((pic, index) => (
              <div key={index} className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image container */}
                  <div className="relative">
                    <CustomImage 
                      src={pic.image} 
                      alt={pic.alt} 
                      width={600} 
                      height={500} 
                      className="w-full h-full object-cover" 
                      loader={({ src }: { src: string }) => src} 
                    />
                  </div>
                  
                  {/* Content container */}
                  <div className="p-8">
                    <div className="space-y-6">
                      <div className="mb-4">
                        <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">Our Purpose</span>
                      </div>
                      <p className="text-gray-700 text-base lg:text-lg leading-relaxed text-justify">
                        At Career Launchpad, our mission is to empower individuals with the skills, knowledge, and confidence to build successful careers. We provide high-quality education through industry-relevant courses, expert-led training, and hands-on learning experiences.
                      </p>
                      
                      <div className="border-l-4 border-red-500 pl-4 py-2">
                        <p className="lg:text-lg leading-relaxed italic sm:text-base text-gray-800 mb-3 text-justify">
                          {/* Fixed apostrophe error using &apos; */}
                          We go beyond just teaching—we help our students get placed in top companies by providing career guidance, job-oriented training, and real-world exposure. Our commitment to excellence ensures that every student receives certifications that validate their expertise and enhance their employability in a competitive job market.
                        </p>
                      </div>
                      
                      <p className="text-gray-700 text-base lg:text-lg leading-relaxed text-justify">
                        By bridging the gap between education and employment, we strive to create a future where learning leads to real opportunities. Whether you&apos;re looking to upskill, switch careers, or secure your dream job, Career Launchpad is here to support your journey to success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Core Values Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold inline-block relative">
                Our Core Values
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"></span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Value 1 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="h-2 bg-red-500"></div>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-gray-600">Striving for the highest quality in education</p>
                </div>
              </div>
              
              {/* Value 2 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="h-2 bg-blue-500"></div>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-gray-600">Building strong industry relationships</p>
                </div>
              </div>
              
              {/* Value 3 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="h-2 bg-green-500"></div>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-gray-600">Embracing new ideas in education</p>
                </div>
              </div>
              
              {/* Value 4 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="h-2 bg-purple-500"></div>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Adaptability</h3>
                  <p className="text-gray-600">Preparing for changing job markets</p>
                </div>
              </div>
            </div>
          </div>
          {/* The original DifferenceSection component */}
          <DifferenceSection />
        </div>
      </section>
    </Layout>
  );
};
export default About;