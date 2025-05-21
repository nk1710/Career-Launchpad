import Layout from '../components/Layout';
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';

const Mern12MonthAndDsa = dynamic(() => import('../components/5MonthAdvancedJava'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const WebDevelopment: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["Advanced-Java"];
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
      <Mern12MonthAndDsa />
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
    title: 'Enterprise Applications',
    description:
      'Java remains the foundation of large-scale enterprise systems with frameworks like Spring and Jakarta EE. Its robust architecture handles complex business logic, transaction management, and integration with legacy systems while ensuring scalability and security.',
    borderColorClass: 'border-blue-600',
    textColorClass: 'text-blue-600',
  },
  {
    title: 'Financial Systems',
    description:
      'Java powers mission-critical financial applications including banking systems, trading platforms, and payment processors. Its strong type safety, high performance, and security features make it the preferred choice for applications requiring absolute reliability and precision.',
    borderColorClass: 'border-green-600',
    textColorClass: 'text-green-600',
  },
  {
    title: 'Big Data Processing',
    description:
      "Advanced Java skills are essential for big data ecosystems with frameworks like Hadoop, Spark, and Kafka. Java's performance optimization, concurrency controls, and memory management enable efficient processing of massive datasets across distributed systems.",
    borderColorClass: 'border-purple-600',
    textColorClass: 'text-purple-600',
  },
  {
    title: 'Cloud-Native Applications',
    description:
      'Build microservices and cloud-native applications with Spring Boot, Quarkus, and Micronaut. Java\'s containerization support, dynamic scaling capabilities, and resilience patterns enable building systems that thrive in modern cloud environments.',
    borderColorClass: 'border-red-600',
    textColorClass: 'text-red-600',
  },
  {
    title: 'Mobile Development',
    description:
      'Java remains fundamental for Android app development. Advanced Java certification builds expertise in app architecture, background processing, data storage, and integration with platform APIs, providing skills to build sophisticated mobile applications.',
    borderColorClass: 'border-yellow-600',
    textColorClass: 'text-yellow-600',
  },
  {
    title: 'Integration Systems',
    description:
      'Develop robust integration solutions connecting disparate enterprise systems. Java\'s extensive libraries support protocols like SOAP, REST, JMS, and AMQP, while frameworks like Apache Camel enable implementing enterprise integration patterns efficiently.',
    borderColorClass: 'border-indigo-600',
    textColorClass: 'text-indigo-600',
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


