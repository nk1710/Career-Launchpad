// pages/index.tsx
import Accordion from '../components/demoFullStack/TopicChild';

const PhpLaravelDevelopmentCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: PHP Fundamentals',
      subTopics: [
        { title: 'Week 1: Introduction to PHP and Server-Side Programming' },
        { title: 'Week 2: PHP Syntax, Variables, and Control Structures' },
        { title: 'Week 3: Functions, Arrays, and Form Handling' },
        { title: 'Week 4: Object-Oriented PHP and MySQL Database Integration' },
      ],
    },
    {
      subtitle: 'Month 2: Laravel Framework Fundamentals',
      subTopics: [
        { title: 'Week 1: Introduction to Laravel and MVC Architecture' },
        { title: 'Week 2: Routing, Controllers, and Blade Templates' },
        { title: 'Week 3: Eloquent ORM and Database Migrations' },
        { title: 'Week 4: Authentication, Authorization, and Middleware' },
      ],
    },
    {
      subtitle: 'Month 3: Advanced Laravel and Projects',
      subTopics: [
        { title: 'Week 1: RESTful API Development with Laravel' },
        { title: 'Week 2: Content Management System Project' },
        { title: 'Week 3: E-commerce Website Project' },
        { title: 'Week 4: Deployment, Testing, and Final Assessment' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 3-Month PHP and Laravel Development Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A comprehensive curriculum for mastering PHP and the Laravel framework with industry-standard projects.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default PhpLaravelDevelopmentCertification;