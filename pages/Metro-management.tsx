// component/airport.tsx
import React from 'react';
import Layout from '../components/Layout';
import CoursePageComponent from '../components/CoursePageComponent';
import { coursesData } from '../components/allcourses';

const MetroManagementPage = () => {
  // Get data from our centralized data store
  const metroCourseData = coursesData["metro-management"];

  return (
    <Layout>
      <CoursePageComponent {...metroCourseData} />
    </Layout>
  );
};

export default MetroManagementPage;