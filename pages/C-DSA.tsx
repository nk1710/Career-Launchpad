import Layout from '../components/Layout';
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';

const CProgrammingCourse = dynamic(() => import('../components/5MonthCProgramming'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const DSA: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["C Programming + DSA"];
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
      <CProgrammingCourse />
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
                title: 'Embedded Systems Development',
                description: 'C programming is fundamental for creating firmware for microcontrollers and embedded devices. Efficient data structures and algorithms enable optimized memory usage and performance in resource-constrained environments like IoT devices, automotive systems, and consumer electronics.',
                color: 'blue-200',
                borderColor: 'blue-600',
                borderColorClass: 'border-blue-600',
                textColorClass: 'text-blue-600'
              },
              {
                title: 'Operating System Development',
                description: 'Major operating systems like Linux, Unix, and parts of Windows are written in C. Understanding low-level memory management, efficient algorithms, and data structures is essential for developing kernels, device drivers, and system utilities.',
                color: 'green-200',
                borderColor: 'green-600',
                borderColorClass: 'border-green-600',
                textColorClass: 'text-green-600'
              },
              {
                title: 'Game Engine Development',
                description: 'C\'s performance and memory control make it ideal for building game engines and performance-critical gaming components. Optimized data structures power physics simulations, collision detection, path-finding algorithms, and graphics rendering pipelines.',
                color: 'purple-200',
                borderColor: 'purple-600',
                borderColorClass: 'border-purple-600',
                textColorClass: 'text-purple-600'
              },
              {
                title: 'Database Management Systems',
                description: 'Many database engines like SQLite and parts of MySQL are implemented in C. Efficient implementation of B-trees, hash tables, and other advanced data structures is crucial for query processing, indexing, and transaction management.',
                color: 'orange-200',
                borderColor: 'orange-600',
                borderColorClass: 'border-orange-600',
                textColorClass: 'text-orange-600'
              },
              {
                title: 'High-Performance Computing',
                description: 'C is preferred for scientific computing and applications requiring maximum performance. Advanced algorithm optimization and custom data structures enable efficient processing in fields like computational physics, weather forecasting, and financial modeling.',
                color: 'red-200',
                borderColor: 'red-600',
                borderColorClass: 'border-red-600',
                textColorClass: 'text-red-600'
              },
              {
                title: 'Network Programming',
                description: 'C powers network protocols and infrastructure software. Efficient implementation of queues, graphs, and routing algorithms is essential for developing firewalls, routers, VPN systems, and low-latency networking applications.',
                color: 'indigo-200',
                borderColor: 'indigo-600',
                borderColorClass: 'border-indigo-600',
                textColorClass: 'text-indigo-600'
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
                <h3 className={`text-xl font-semibold mb-4 ${item.textColorClass}`}>
                  {item.title}
                </h3>
                <p className="sm:text-base leading-relaxed text-gray-800 mb-3 text-justify">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DSA;