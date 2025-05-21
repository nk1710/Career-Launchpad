// pages/index.tsx
import Accordion from '../components/demoFullStack/TopicChild';

const FullStackJavaDevelopmentCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: Core Java Fundamentals',
      subTopics: [
        { title: 'Week 1: Introduction to Java and Development Environment Setup' },
        { title: 'Week 2: Variables, Data Types, and Basic Operations' },
        { title: 'Week 3: Control Flow: Conditionals and Loops' },
        { title: 'Week 4: Methods, Arrays, and String Handling' },
      ],
    },
    {
      subtitle: 'Month 2: Object-Oriented Programming in Java',
      subTopics: [
        { title: 'Week 1: Classes, Objects, and Encapsulation' },
        { title: 'Week 2: Inheritance and Method Overriding' },
        { title: 'Week 3: Interfaces, Abstract Classes, and Polymorphism' },
        { title: 'Week 4: Exception Handling and File I/O Operations' },
      ],
    },
    {
      subtitle: 'Month 3: Data Structures and Algorithms',
      subTopics: [
        { title: 'Week 1: Introduction to Data Structures and Collections Framework' },
        { title: 'Week 2: Lists, Sets, and Maps Implementation' },
        { title: 'Week 3: Stacks, Queues, and Linked Lists' },
        { title: 'Week 4: Basic Sorting and Searching Algorithms' },
      ],
    },
    {
      subtitle: 'Month 4: Advanced Java Features',
      subTopics: [
        { title: 'Week 1: Multithreading and Concurrency Basics' },
        { title: 'Week 2: Java 8+ Features (Lambda Expressions and Streams)' },
        { title: 'Week 3: JDBC and Database Connectivity' },
        { title: 'Week 4: Introduction to Servlets and JSP' },
      ],
    },
    {
      subtitle: 'Month 5: Web Development with Java',
      subTopics: [
        { title: 'Week 1: Introduction to Spring Framework' },
        { title: 'Week 2: Spring Boot Basics and REST Controllers' },
        { title: 'Week 3: Frontend Development with HTML, CSS, and JavaScript' },
        { title: 'Week 4: Integrating Frontend with Java Backend' },
      ],
    },
    {
      subtitle: 'Month 6: Projects and Deployment',
      subTopics: [
        { title: 'Week 1: Employee Management System Project' },
        { title: 'Week 2: E-commerce Application Project' },
        { title: 'Week 3: Project Deployment and DevOps Basics' },
        { title: 'Week 4: Final Assessment and Interview Preparation' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 6-Month Full Stack Java Development Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A beginner-friendly curriculum covering Core Java, Advanced Java, DSA, and Web Development with hands-on projects.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default FullStackJavaDevelopmentCertification;