// component/airport.tsx
import React from 'react';
import Layout from '../components/Layout';
import CoursePageComponent from '../components/CoursePageComponent';
import { coursesData } from '../components/allcourses';

const HotelManagementPage = () => {
  // Get data from our centralized data store
  const hotelCourseData = coursesData["hotel-management"];

  return (
    <Layout>
      <CoursePageComponent {...hotelCourseData} />
    </Layout>
  );
};

export default HotelManagementPage;