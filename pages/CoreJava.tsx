
import Layout from '../components/Layout';
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';

const ThreeMonthCoreJavaCourse = dynamic(() => import('../components/3MonthCoreJava'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const Programming: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["corejava + DSA"];
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
      <ThreeMonthCoreJavaCourse />
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
    title: 'Enterprise Software Development',
    description: 'Java\'s platform independence, security, and scalability make it ideal for enterprise applications. Combined with efficient data structures, Java powers mission-critical systems across banking, healthcare, and manufacturing industries.',
    borderColorClass: 'border-blue-600',
    textColorClass: 'text-blue-600'
  },
  {
    title: 'Android Application Development',
    description: 'Core Java skills form the foundation for Android development. Strong understanding of Java collections, threading, and efficient algorithms enables creating responsive, resource-optimized mobile applications for billions of devices.',
    borderColorClass: 'border-green-600',
    textColorClass: 'text-green-600'
  },
  {
    title: 'Financial Systems & Trading',
    description: 'Java\'s precision and reliability combined with optimized data structures power high-frequency trading platforms and banking systems. Efficient algorithms ensure real-time processing of transactions with minimal latency.',
    borderColorClass: 'border-purple-600',
    textColorClass: 'text-purple-600'
  },
  {
    title: 'Big Data Processing',
    description: 'Frameworks like Hadoop and Spark rely on Java\'s robust processing capabilities. Advanced knowledge of Java data structures enables efficient handling of massive datasets, parallel processing, and complex data transformations.',
    borderColorClass: 'border-orange-600',
    textColorClass: 'text-orange-600'
  },
  {
    title: 'Backend API Services',
    description: 'Java powers scalable backend services with frameworks like Spring. Efficient algorithm implementation ensures optimal API performance, while Java\'s threading model supports high-concurrency applications serving millions of requests.',
    borderColorClass: 'border-red-600',
    textColorClass: 'text-red-600'
  },
  {
    title: 'Gaming & Simulation',
    description: 'Java\'s object-oriented paradigm and efficient data structures enable development of complex game systems and simulations. From collision detection algorithms to path-finding and AI behavior trees, Java DSA skills are fundamental for game logic.',
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

export default Programming;


