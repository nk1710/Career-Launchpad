// pages/index.tsx
import Accordion from '../components/demoFullStack/TopicChild';

const CppDsaCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: C++ Fundamentals',
      subTopics: [
        { title: 'Week 1: Introduction to C++ and Development Environment Setup' },
        { title: 'Week 2: Variables, Data Types, and Basic Input/Output' },
        { title: 'Week 3: Control Flow: Conditionals and Loops' },
        { title: 'Week 4: Functions, Arrays, and Strings' },
      ],
    },
    {
      subtitle: 'Month 2: Object-Oriented Programming and Basic DSA',
      subTopics: [
        { title: 'Week 1: Classes, Objects, and Encapsulation' },
        { title: 'Week 2: Inheritance, Polymorphism, and Function Overloading' },
        { title: 'Week 3: Introduction to Data Structures and STL Containers' },
        { title: 'Week 4: Stacks, Queues, and Linked Lists Implementation' },
      ],
    },
    {
      subtitle: 'Month 3: Advanced DSA and Projects',
      subTopics: [
        { title: 'Week 1: Sorting Algorithms (Bubble, Selection, Insertion Sort)' },
        { title: 'Week 2: Searching Algorithms and Binary Trees' },
        { title: 'Week 3: Simple Recursion and Problem Solving' },
        { title: 'Week 4: Student Records Management System Project' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 3-Month C++ Programming with DSA Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A beginner-friendly curriculum for mastering C++ programming and essential data structures and algorithms.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default CppDsaCertification;