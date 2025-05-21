// pages/index.tsx
import Accordion from '../components/demoFullStack/TopicChild';

const MernStackDevelopmentCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: Front-End Foundations',
      subTopics: [
        { title: 'Week 1: HTML Basics and Structure' },
        { title: 'Week 2: CSS Styling and Layouts' },
        { title: 'Week 3: JavaScript Fundamentals' },
        { title: 'Week 4: Responsive Design Principles' },
      ],
    },
    {
      subtitle: 'Month 2: React Fundamentals',
      subTopics: [
        { title: 'Week 1: Introduction to React and Components' },
        { title: 'Week 2: React Props and State Management' },
        { title: 'Week 3: React Hooks (useState, useEffect)' },
        { title: 'Week 4: Forms and User Input in React' },
      ],
    },
    {
      subtitle: 'Month 3: Back-End Basics with Node.js',
      subTopics: [
        { title: 'Week 1: Introduction to Node.js' },
        { title: 'Week 2: Building Simple APIs with Express.js' },
        { title: 'Week 3: Server-Side Routing' },
        { title: 'Week 4: Middleware and Error Handling' },
      ],
    },
    {
      subtitle: 'Month 4: MongoDB and Database Integration',
      subTopics: [
        { title: 'Week 1: Introduction to MongoDB' },
        { title: 'Week 2: CRUD Operations with MongoDB' },
        { title: 'Week 3: Mongoose ODM Basics' },
        { title: 'Week 4: Building RESTful APIs with MongoDB' },
      ],
    },
    {
      subtitle: 'Month 5: Full-Stack Integration',
      subTopics: [
        { title: 'Week 1: Connecting React Frontend with Node Backend' },
        { title: 'Week 2: Authentication Basics (JWT)' },
        { title: 'Week 3: State Management with Context API' },
        { title: 'Week 4: Deploying MERN Applications' },
      ],
    },
    {
      subtitle: 'Month 6: Projects and Career Preparation',
      subTopics: [
        { title: 'Week 1: Todo Application Project' },
        { title: 'Week 2: Blog Platform Project' },
        { title: 'Week 3: E-commerce Store Project' },
        { title: 'Week 4: Portfolio Finalization and Job Preparation' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 6-Month MERN Stack Development Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A beginner-friendly curriculum for mastering MongoDB, Express, React, and Node.js with hands-on projects.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default MernStackDevelopmentCertification;