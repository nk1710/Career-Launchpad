import Layout from '../components/Layout';
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';

const AdvancedSQLCourse = dynamic(() => import('../components/3MonthAdvancedSQL'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const WebDevelopment: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["Advanced-SQL"];
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
      <AdvancedSQLCourse />
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
    title: 'Business Intelligence',
    description:
      'Advanced SQL skills are essential for creating sophisticated data analytics solutions. SQL experts can design complex queries that transform raw business data into actionable insights, build interactive dashboards, and develop automated reporting systems that drive strategic decision-making.',
    borderColorClass: 'border-blue-600',
    textColorClass: 'text-blue-600'
  },
  {
    title: 'Data Warehousing',
    description:
      'SQL powers enterprise data warehouses that integrate information from multiple sources. Advanced techniques enable designing optimized star and snowflake schemas, implementing ETL processes, and creating dimensional models that support complex analytical needs while maintaining performance.',
    borderColorClass: 'border-green-600',
    textColorClass: 'text-green-600'
  },
  {
    title: 'Financial Systems',
    description:
      'Financial institutions rely on SQL for transaction processing, risk analysis, and regulatory compliance. Advanced SQL enables building systems that handle millions of financial transactions with ACID compliance, generate regulatory reports, and maintain detailed audit trails.',
    borderColorClass: 'border-purple-600',
    textColorClass: 'text-purple-600'
  },
  {
    title: 'E-commerce Platforms',
    description:
      'SQL databases form the backbone of modern e-commerce systems. Advanced SQL skills allow developing sophisticated product catalogs, inventory management systems, order processing workflows, and personalized recommendation engines that scale with growing business needs.',
    borderColorClass: 'border-red-600',
    textColorClass: 'text-red-600'
  },
  {
    title: 'Healthcare Information Systems',
    description:
      'Healthcare providers use SQL-based systems for patient records, clinical data, and insurance processing. Advanced SQL enables building HIPAA-compliant databases with complex relationships between medical entities, optimized query performance, and robust security controls.',
    borderColorClass: 'border-yellow-600',
    textColorClass: 'text-yellow-600'
  },
  {
    title: 'Enterprise Applications',
    description:
      'SQL is fundamental to ERP, CRM, and other enterprise systems. Advanced SQL practitioners can integrate these systems efficiently, implement complex business rules through stored procedures, optimize performance for large datasets, and ensure data integrity across the organization.',
    borderColorClass: 'border-indigo-600',
    textColorClass: 'text-indigo-600'
  }
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


