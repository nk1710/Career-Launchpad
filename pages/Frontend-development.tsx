
import Layout from '../components/Layout';
import { motion } from "framer-motion";
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';

const Mern6MonthWebDevelopment = dynamic(() => import('../components/3MonthFront-endDevelopment'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const WebDevelopment: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["frontend-development"];
// Create a ref to scroll to the syllabus section
const syllabusRef = useRef<HTMLDivElement>(null);

// Scroll function
const scrollToSyllabus = () => {
  syllabusRef.current?.scrollIntoView({ behavior: 'smooth' });
};
  return (
    <Layout>
      <NextSeo
        title={courseData.seoTitle}
        description={courseData.seoDescription}
        openGraph={{
          title: courseData.ogTitle,
          description: courseData.ogDescription,
          images: [
            {
              url: courseData.ogImageUrl,
              width: 800,
              height: 600,
              alt: `Career Launchpad ${courseData.title} Courses`,
            },
          ],
          url: courseData.canonicalUrl,
          type: 'website',
        }}
      />
      <Head>
        <title>Career Launchpad - {courseData.title} course</title>
        <link rel="canonical" href={courseData.canonicalUrl} />
        <meta
          name="description"
          content={courseData.seoDescription}
        />
        <meta property="og:title" content={`Career Launchpad - ${courseData.title}`} />
        <meta
          property="og:description"
          content={courseData.ogDescription}
        />
        <meta
          property="og:image"
          content={courseData.ogImageUrl}
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta
          property="og:url"
          content={courseData.canonicalUrl}
        />
      </Head>
      {/* Reusable Course Component */}
      <CourseComponent courseData={courseData} onViewSyllabusClick={scrollToSyllabus} />

      {/* Target scroll section */}
      <div ref={syllabusRef}>
        <Mern6MonthWebDevelopment />
      </div>
      <CertificateComponent />

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-8">
            Uses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
  {
    title: 'Interactive Web Applications',
    description: 'Front-end development enables creating dynamic, responsive applications with intuitive user interfaces. These applications enhance user experience through real-time feedback, animations, and interactive elements without page refreshes.',
    borderColorClass: 'border-orange-500',
    textColorClass: 'text-orange-500'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Build compelling online shopping experiences with product galleries, shopping carts, payment integrations, and personalized recommendations. Front-end technologies enable smooth, device-optimized browsing and purchasing journeys.',
    borderColorClass: 'border-pink-500',
    textColorClass: 'text-pink-500'
  },
  {
    title: 'Corporate Websites',
    description: 'Create professional company websites that effectively communicate brand identity, services, and values. Front-end development ensures these sites are visually impressive, easy to navigate, and optimized for conversion across all devices.',
    borderColorClass: 'border-gray-600',
    textColorClass: 'text-gray-600'
  },
  {
    title: 'Single Page Applications',
    description: 'Develop modern SPAs that load once and dynamically update as users interact. These applications offer desktop-like experiences in the browser with smoother transitions, better performance, and improved user engagement.',
    borderColorClass: 'border-blue-500',
    textColorClass: 'text-blue-500'
  },
  {
    title: 'Progressive Web Apps',
    description: 'Create applications that work offline, load instantly, and provide app-like experiences on the web. PWAs combine the best of web and mobile apps with features like push notifications, home screen installation, and offline functionality.',
    borderColorClass: 'border-red-500',
    textColorClass: 'text-red-500'
  },
  {
    title: 'User Interface Systems',
    description: 'Design and implement component libraries and design systems that ensure consistency across digital products. Front-end development establishes reusable UI elements that maintain brand identity while improving development efficiency.',
    borderColorClass: 'border-green-500',
    textColorClass: 'text-green-500'
  },
].map((item, index) => (
  
  <motion.div
    key={index}
    className={`bg-white rounded-xl shadow-md border-l-4 ${item.borderColorClass} p-6 transition-shadow duration-300 cursor-pointer`}
    whileHover={{
      rotateX: 5,
      rotateY: 5,
      scale: 1.03,
      transition: { type: "spring", stiffness: 300 },
    }}
    style={{
      perspective: 1000,
      transformStyle: "preserve-3d",
    }}
  >
    <h3 className={`text-xl font-semibold mb-4  ${item.textColorClass}`}>
      {item.title}
    </h3>
    <p className="sm:text-base leading-relaxed text-gray-800 mb-3 text-justify ">{item.description}</p>
  </motion.div>
  

))}

          </div>
        </div>
      </div>
    </Layout>
  );
};
export default WebDevelopment;