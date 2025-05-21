// component/airport.tsx
import React from 'react';
import Layout from '../components/Layout';
import CoursePageComponent from '../components/CoursePageComponent';
import { coursesData } from '../components/allcourses';

const tourismManagementPage = () => {
  // Get data from our centralized data store
  const tourismCourseData = coursesData["tourism-management"];

  return (
    <Layout>
      <CoursePageComponent {...tourismCourseData} />
    </Layout>
  );
};

export default tourismManagementPage;