// pages/index.tsx
import Accordion from '../components/demoFullStack/TopicChild';

const AdvancedJavaDsaCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: Core Java Refresher and Advanced OOP',
      subTopics: [
        { title: 'Week 1: Java Fundamentals Review and Best Practices' },
        { title: 'Week 2: Advanced Object-Oriented Programming Concepts' },
        { title: 'Week 3: Exception Handling and Input/Output Operations' },
        { title: 'Week 4: Collections Framework Overview (Lists and Sets)' },
      ],
    },
    {
      subtitle: 'Month 2: Java Collections and Basic Data Structures',
      subTopics: [
        { title: 'Week 1: Maps, Hash Tables, and Their Applications' },
        { title: 'Week 2: Implementing and Using Stacks and Queues' },
        { title: 'Week 3: Linked Lists: Implementation and Operations' },
        { title: 'Week 4: Trees: Binary Trees and Binary Search Trees' },
      ],
    },
    {
      subtitle: 'Month 3: Advanced Data Structures and Algorithms',
      subTopics: [
        { title: 'Week 1: Heaps and Priority Queues' },
        { title: 'Week 2: Graphs: Representation and Traversals' },
        { title: 'Week 3: Searching Algorithms and Their Implementation' },
        { title: 'Week 4: Sorting Algorithms and Their Implementation' },
      ],
    },
    {
      subtitle: 'Month 4: Advanced Java Features and Database Integration',
      subTopics: [
        { title: 'Week 1: Multithreading and Concurrency Basics' },
        { title: 'Week 2: Java 8+ Features (Lambda, Streams, Optional)' },
        { title: 'Week 3: JDBC and Database Connectivity' },
        { title: 'Week 4: Introduction to Java Persistence API (JPA)' },
      ],
    },
    {
      subtitle: 'Month 5: Projects and Real-World Applications',
      subTopics: [
        { title: 'Week 1: Employee Management System Project' },
        { title: 'Week 2: Bank Transaction Processing System Project' },
        { title: 'Week 3: E-commerce Inventory Management Project' },
        { title: 'Week 4: Final Assessment and Career Preparation' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 5-Month Advanced Java with DSA Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A comprehensive yet accessible curriculum for mastering advanced Java programming and essential data structures and algorithms.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default AdvancedJavaDsaCertification;