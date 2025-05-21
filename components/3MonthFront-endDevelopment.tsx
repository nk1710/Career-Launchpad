// pages/index.tsx
import Accordion from './demoFullStack/TopicChild';

const FrontendDevelopmentCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: HTML and CSS Fundamentals',
      subTopics: [
        { title: 'Week 1: Introduction to HTML5' },
        { title: 'Week 2: CSS Fundamentals and Box Model' },
        { title: 'Week 3: Responsive Design and Flexbox' },
        { title: 'Week 4: CSS Grid and Advanced Styling' },
      ],
    }, 
    {
      subtitle: 'Month 2: JavaScript Essentials',
      subTopics: [
        { title: 'Week 1: JavaScript Basics and DOM Manipulation' },
        { title: 'Week 2: Events, Forms, and Validation' },
        { title: 'Week 3: Asynchronous JavaScript and Fetch API' },
        { title: 'Week 4: ES6+ Features and JavaScript Modules' },
      ],
    },
    {
      subtitle: 'Month 3: Projects and Portfolio Building',
      subTopics: [
        { title: 'Week 1: Interactive Landing Page Project' },
        { title: 'Week 2: Weather App with API Integration' },
        { title: 'Week 3: E-commerce Product Page Project' },
        { title: 'Week 4: Portfolio Website and Final Assessment' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 3-Month Front-end Development Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A comprehensive curriculum for mastering HTML, CSS, and JavaScript with practical projects.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default FrontendDevelopmentCertification;