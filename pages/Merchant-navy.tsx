// component/airport.tsx
import React from 'react';
import Layout from '../components/Layout';
import CoursePageComponent from '../components/CoursePageComponent';
import { coursesData } from '../components/allcourses';

const MerchantnavyPage = () => {
  // Get data from our centralized data store
  const merchantCourseData = coursesData["merchant-navy"];

  return (
    <Layout>
      <CoursePageComponent {...merchantCourseData} />
    </Layout>
  );
};

export default MerchantnavyPage;