// pages/index.tsx
import Accordion from '../components/demoFullStack/TopicChild';

const ReactDevelopmentCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: React Fundamentals',
      subTopics: [
        { title: 'Week 1: Introduction to React and JSX' },
        { title: 'Week 2: Components, Props, and State' },
        { title: 'Week 3: React Hooks and Event Handling' },
        { title: 'Week 4: Forms and Controlled Components' },
      ],
    },
    {
      subtitle: 'Month 2: Advanced React and State Management',
      subTopics: [
        { title: 'Week 1: React Router and Single Page Applications' },
        { title: 'Week 2: Context API and Global State' },
        { title: 'Week 3: Redux Fundamentals' },
        { title: 'Week 4: API Integration and Async Operations' },
      ],
    },
    {
      subtitle: 'Month 3: Projects and Deployment',
      subTopics: [
        { title: 'Week 1: Task Management Application Project' },
        { title: 'Week 2: E-commerce Dashboard Project' },
        { title: 'Week 3: Social Media Platform Project' },
        { title: 'Week 4: Deployment, Performance Optimization, and Final Assessment' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 3-Month React.js Development Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A comprehensive curriculum for mastering React.js with real-world projects and industry best practices.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default ReactDevelopmentCertification;