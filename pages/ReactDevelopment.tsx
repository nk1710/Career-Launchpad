
import Layout from '../components/Layout';
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';

const Mern6MonthWebDevelopment = dynamic(() => import('../components/3MonthReactDevelopment'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const WebDevelopment: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["react-development"];
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
      <CourseComponent courseData={courseData}  onViewSyllabusClick={scrollToSyllabus} />
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
    title: 'Single Page Applications',
    description: 'React excels at building dynamic SPAs that load once and update content without page refreshes. Its virtual DOM efficiently renders only what changes, resulting in faster, more responsive applications with smooth user experiences.',
    borderColorClass: 'border-blue-500',
    textColorClass: 'text-blue-500'
  },
  {
    title: 'Mobile Applications',
    description: 'With React Native, React developers can leverage their skills to build native mobile apps for iOS and Android from a single codebase. This cross-platform approach significantly reduces development time and maintenance costs.',
    borderColorClass: 'border-green-500',
    textColorClass: 'text-green-500'
  },
  {
    title: 'Enterprise Dashboards',
    description: 'React\'s component-based architecture is perfect for creating complex data dashboards and admin interfaces. Its efficient rendering makes it ideal for visualizing real-time data and managing large datasets with optimal performance.',
    borderColorClass: 'border-purple-600',
    textColorClass: 'text-purple-600'
  },
  {
    title: 'E-commerce Platforms',
    description: 'React powers many modern e-commerce sites with features like dynamic product filtering, cart management, and checkout processes. Its state management solutions enable seamless shopping experiences across devices.',
    borderColorClass: 'border-orange-500',
    textColorClass: 'text-orange-500'
  },
  {
    title: 'Social Media Applications',
    description: 'Major platforms like Facebook use React to handle complex UI updates and user interactions. React efficiently manages news feeds, messaging interfaces, notifications, and other dynamic content with minimal performance overhead.',
    borderColorClass: 'border-pink-500',
    textColorClass: 'text-pink-500'
  },
  {
    title: 'Progressive Web Apps',
    description: 'React is an excellent choice for PWAs that work offline and offer app-like experiences on the web. Combined with tools like service workers, React enables fast-loading, installable web applications that function across all devices.',
    borderColorClass: 'border-teal-500',
    textColorClass: 'text-teal-500'
  },
].map((item, index) => (
  // <div key={index} className={`bg-white rounded-xl shadow-md border-l-4 ${item.borderColorClass} p-6 hover:shadow-lg transition-shadow duration-300`}>
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


