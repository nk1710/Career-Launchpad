// component/airport.tsx
import React from 'react';
import Layout from '../components/Layout';
import CoursePageComponent from '../components/CoursePageComponent';
import { coursesData } from '../components/allcourses';

const AirportManagementPage = () => {
  // Get data from our centralized data store
  const airportCourseData = coursesData["airport-management"];

  return (
    <Layout>
      <CoursePageComponent {...airportCourseData} />
    </Layout>
  );
};

export default AirportManagementPage;