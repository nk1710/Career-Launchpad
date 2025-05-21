
import Layout from '../components/Layout';
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';

const Mern6MonthCourse = dynamic(() => import('../components/6MonthMernstack'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const WebDevelopment: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["Mern-stack development"];
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
      <Mern6MonthCourse />
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
    title: 'Single Page Applications',
    description: 'MERN stack is ideal for building dynamic SPAs with React frontend. Its component-based architecture enables developers to create interactive user interfaces with smooth navigation and state management, eliminating page reloads for a seamless user experience.',
    borderColorClass: 'border-blue-600',
    textColorClass: 'text-blue-600'
  },
  {
    title: 'Social Media Platforms',
    description: 'Build feature-rich social networking applications with MERN stack. MongoDB efficiently stores user profiles and content, while React renders dynamic feeds. Node.js and Express handle real-time features like notifications, messaging, and content sharing.',
    borderColorClass: 'border-green-600',
    textColorClass: 'text-green-600'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Develop comprehensive online shopping platforms with MERN. React provides interactive product galleries and shopping carts, while MongoDB efficiently manages product catalogs and user data. Express APIs handle payment processing, order management, and authentication.',
    borderColorClass: 'border-purple-600',
    textColorClass: 'text-purple-600'
  },
  {
    title: 'Dashboard Applications',
    description: 'Create data visualization dashboards and admin panels with MERN stack. React\'s component library ecosystem offers charts, graphs, and UI elements for building intuitive interfaces. MongoDB\'s aggregation pipeline enables complex data processing for analytics.',
    borderColorClass: 'border-red-600',
    textColorClass: 'text-red-600'
  },
  {
    title: 'Collaborative Tools',
    description: 'Build real-time collaboration tools like project management applications, document editors, and team communication platforms. MERN stack with Socket.io integration enables instant updates, collaborative editing, and synchronized workflows across devices.',
    borderColorClass: 'border-yellow-600',
    textColorClass: 'text-yellow-600'
  },
  {
    title: 'Content Management Systems',
    description: 'Develop custom CMS solutions with MERN stack\'s flexibility. React provides intuitive content editing interfaces, MongoDB stores structured and unstructured content, while Express APIs handle content delivery, user permissions, and media management.',
    borderColorClass: 'border-indigo-600',
    textColorClass: 'text-indigo-600'
  },
].map((item, index) => (
  // <div
  //   key={index}
  //   className={`bg-white rounded-xl shadow-md border-l-4 ${item.borderColorClass} p-6 hover:shadow-lg transition-shadow duration-300`}
  // >
  //   <h3 className={`text-xl font-semibold mb-4 ${item.textColorClass}`}>
  //     {item.title}
  //   </h3>
  //   <p className="text-gray-700">{item.description}</p>
  // </div>
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
  <h3 className={`text-xl font-semibold mb-4 ${item.textColorClass}`}>
    {item.title}
  </h3>
  <p className=" sm:text-base leading-relaxed text-gray-800 mb-3 text-justify ">{item.description}</p>
</motion.div>
))}

    </div>
  </div>
</div>
    </Layout>
  );
};

export default WebDevelopment;


