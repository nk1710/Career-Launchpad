
import Layout from '../components/Layout';
import { useRef } from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import CourseComponent from '../components/IT-Course';
import coursesData from '../components/IT-CourseData';
import { motion } from 'framer-motion';

const LaravelCourse = dynamic(() => import('../components/3MonthLaravelDevelopment'));
const CertificateComponent = dynamic(() => import('../components/CertificateComponent'));

const WebDevelopment: React.FC = () => {
  // Get data for this specific course
  const courseData = coursesData["laravel-development"];
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
      <LaravelCourse />
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
    description: 'Laravel provides a robust foundation for building secure, scalable enterprise applications. Its elegant syntax, powerful ORM, and built-in authentication make it ideal for developing complex business systems with reduced development time.',
    color: 'red-200',
    borderColorClass: 'border-red-600',
    textColorClass: 'text-red-600'
  },
  {
    title: 'E-commerce Platforms',
    description: 'Laravel excels at powering online stores with its strong security features, payment gateway integrations, and database management. Its ecosystem includes packages specifically designed for inventory management, product catalogs, and checkout systems.',
    color: 'blue-200',
    borderColorClass: 'border-blue-600',
    textColorClass: 'text-blue-600'
  },
  {
    title: 'Content Management Systems',
    description: 'Build custom CMS solutions with Laravel\'s flexible architecture. Its blade templating engine, form handling, and file management make it perfect for creating tailored content management systems that precisely match client requirements.',
    color: 'green-200',
    borderColorClass: 'border-green-600',
    textColorClass: 'text-green-600'
  },
  {
    title: 'API Development',
    description: 'Laravel offers exceptional tools for building RESTful APIs with its resource controllers, API authentication, and rate limiting. Laravel Passport and Sanctum provide OAuth2 servers and API token authentication for secure, scalable API services.',
    color: 'purple-200',
    borderColorClass: 'border-purple-600',
    textColorClass: 'text-purple-600'
  },
  {
    title: 'SaaS Applications',
    description: 'Laravel\'s subscription billing integration, multi-tenancy support, and queuing systems make it an excellent choice for Software-as-a-Service products. Features like Laravel Cashier streamline subscription management and recurring billing.',
    color: 'yellow-200',
    borderColorClass: 'border-yellow-600',
    textColorClass: 'text-yellow-600'
  },
  {
    title: 'Real-time Applications',
    description: 'Laravel Echo and broadcasting channels enable powerful real-time features like live notifications, chat applications, and dashboards. When combined with WebSockets through Laravel Pusher, developers can create responsive, live-updating web applications.',
    color: 'indigo-200',
    borderColorClass: 'border-indigo-600',
    textColorClass: 'text-indigo-600'
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


