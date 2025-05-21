// pages/index.tsx
import Accordion from '../components/demoFullStack/TopicChild';

const JavaDsaCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: Java Fundamentals',
      subTopics: [
        { title: 'Week 1: Introduction to Java and Setup' },
        { title: 'Week 2: Variables, Data Types, and Basic Operations' },
        { title: 'Week 3: Control Flow Statements and Loops' },
        { title: 'Week 4: Methods, Arrays, and String Manipulation' },
      ],
    },
    {
      subtitle: 'Month 2: Object-Oriented Programming and Basic DSA',
      subTopics: [
        { title: 'Week 1: Classes, Objects, and Encapsulation' },
        { title: 'Week 2: Inheritance, Polymorphism, and Interfaces' },
        { title: 'Week 3: Introduction to Data Structures (Lists and ArrayLists)' },
        { title: 'Week 4: Stacks, Queues, and Basic Algorithms' },
      ],
    },
    {
      subtitle: 'Month 3: Advanced DSA and Projects',
      subTopics: [
        { title: 'Week 1: Searching and Sorting Algorithms' },
        { title: 'Week 2: Maps, Sets, and Hash Tables' },
        { title: 'Week 3: Basic Recursion and Problem Solving' },
        { title: 'Week 4: Capstone Project: Student Management System' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 3-Month Core Java with DSA Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A beginner-friendly curriculum for mastering Java programming and essential data structures and algorithms.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default JavaDsaCertification;