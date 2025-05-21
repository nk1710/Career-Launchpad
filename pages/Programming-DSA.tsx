
import Layout from '../components/Layout';
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';

const ProgrammingCourse = dynamic(() => import('../components/3MonthC++withDSA'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const WebDevelopment: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["C++ Programming + DSA"];
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
      <ProgrammingCourse />
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
    title: 'Game Development',
    description: 'C++ remains the industry standard for developing high-performance games and game engines. Its efficiency, memory management capabilities, and direct hardware access enable developers to create resource-intensive 3D worlds with smooth gameplay and realistic physics.',
    borderColorClass: 'border-blue-600',
    textColorClass: 'text-blue-600'
  },
  {
    title: 'Financial Systems',
    description: 'C++ powers high-frequency trading platforms and financial modeling software where microseconds matter. Its low latency, deterministic memory management, and optimization capabilities make it ideal for time-critical applications in quantitative finance and risk analysis.',
    borderColorClass: 'border-green-600',
    textColorClass: 'text-green-600'
  },
  {
    title: 'System Programming',
    description: 'Build operating systems, drivers, and embedded software with C++. Its low-level memory access combined with high-level abstractions provides the perfect balance for developing system-level software that must be both efficient and maintainable.',
    borderColorClass: 'border-purple-600',
    textColorClass: 'text-purple-600'
  },
  {
    title: 'High-Performance Computing',
    description: 'C++ excels in scientific computing, simulations, and data processing applications. Its computational efficiency, parallelization capabilities, and template metaprogramming enable the development of complex algorithms that process massive datasets with optimal performance.',
    borderColorClass: 'border-red-600',
    textColorClass: 'text-red-600'
  },
  {
    title: 'Software Infrastructure',
    description: 'Many core software infrastructure components are built with C++, including databases, web browsers, and search engines. Its combination of performance and abstraction capabilities makes it ideal for building sophisticated software that millions depend on daily.',
    borderColorClass: 'border-yellow-600',
    textColorClass: 'text-yellow-600'
  },
  {
    title: 'Real-time Systems',
    description: 'Develop robotics, IoT devices, and real-time control systems with C++. Its precise timing control, deterministic behavior, and efficient resource utilization enable building responsive systems that must reliably meet strict timing requirements.',
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


