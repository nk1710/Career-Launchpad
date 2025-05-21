
import Layout from '../components/Layout';
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';

const FullstackCourse = dynamic(() => import('../components/6MonthFullstack'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const WebDevelopment: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["Full-stack"];
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
      <FullstackCourse />
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
    title: 'Enterprise Solution Development',
    description:
      'Build complete enterprise-grade applications using the full Java ecosystem. From backend services with Spring Boot to optimized algorithms, this comprehensive skill set enables creating scalable, secure, and maintainable systems that drive major organizations worldwide.',
    borderColorClass: 'border-blue-600',
    textColorClass: 'text-blue-600',
  },
  {
    title: 'Financial Technology',
    description:
      'Java dominates financial systems development for its reliability and performance. Create trading platforms, banking applications, and payment systems that handle time-sensitive transactions with precision while implementing complex algorithms for risk analysis and fraud detection.',
    borderColorClass: 'border-green-600',
    textColorClass: 'text-green-600',
  },
  {
    title: 'Cloud & Microservices Architecture',
    description:
      'Design modern distributed systems with Java microservices and efficient algorithms. This combined expertise enables building resilient, high-performance cloud applications that scale dynamically and process data efficiently across distributed environments.',
    borderColorClass: 'border-purple-600',
    textColorClass: 'text-purple-600',
  },
  {
    title: 'Big Data Engineering',
    description:
      'Excel in big data ecosystems where Java powers technologies like Hadoop, Spark, and Kafka. The combination of Java proficiency and advanced algorithm knowledge enables building sophisticated data processing pipelines and analytics systems that extract value from massive datasets.',
    borderColorClass: 'border-red-600',
    textColorClass: 'text-red-600',
  },
  {
    title: 'Full Stack Development',
    description:
      'Create end-to-end applications with Java backends and modern frontends. This comprehensive skill set allows building complete solutions from database design and API development to implementing efficient algorithms that power complex business logic and user experiences.',
    borderColorClass: 'border-yellow-600',
    textColorClass: 'text-yellow-600',
  },
  {
    title: 'Technical Leadership',
    description:
      'Excel in senior development and architecture roles where deep technical knowledge is essential. The combination of core programming fundamentals, advanced framework expertise, and algorithm optimization skills prepares you to lead technical teams and make critical architecture decisions.',
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


