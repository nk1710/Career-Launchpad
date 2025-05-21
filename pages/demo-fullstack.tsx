import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import Layout from '../components/Layout';

const MernStackCourse = dynamic(() => import('../components/demoFullStack/MernStackCourse'), { ssr: false });
const CourseDetails = dynamic(() => import('../components/demoFullStack/CourseDetails'), { ssr: false });
const CertificateComponent = dynamic(() => import('../components/demoFullStack/CertificateNewDesign'), { ssr: false });
const TopicParent = dynamic(() => import('../components/demoFullStack/TopicParent'), { ssr: false });
const FeaturesSection = dynamic(() => import('../components/demoFullStack/FeaturesSection'), { ssr: false });
const CeoThoughts = dynamic(() => import('../components/demoFullStack/CeoThoughts'), { ssr: false });
const TestimonialsCarousel = dynamic(() => import('../components/demoFullStack/TestimonialsCaraousel'), { ssr: false });
const HiringCompanies = dynamic(() => import('../components/demoFullStack/HiringCompanies'), { ssr: false });

const DemoPage: React.FC = () => {
  return (
    <Layout>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <MernStackCourse />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <CourseDetails/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <CertificateComponent/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TopicParent/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturesSection/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <CeoThoughts/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TestimonialsCarousel/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <HiringCompanies/>
        </Suspense>
      </div>
    </Layout>
  );
};

export default DemoPage;