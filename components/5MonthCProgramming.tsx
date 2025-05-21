// pages/index.tsx
import Accordion from '../components/demoFullStack/TopicChild';

const CProgrammingDsaCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: C Programming Fundamentals',
      subTopics: [
        { title: 'Week 1: Introduction to C and Setting Up the Environment' },
        { title: 'Week 2: Variables, Data Types, and Basic Operations' },
        { title: 'Week 3: Control Flow: Conditionals and Loops' },
        { title: 'Week 4: Functions and Program Structure' },
      ],
    },
    {
      subtitle: 'Month 2: Advanced C Programming',
      subTopics: [
        { title: 'Week 1: Arrays and Strings' },
        { title: 'Week 2: Pointers and Memory Management' },
        { title: 'Week 3: Structures and Unions' },
        { title: 'Week 4: File Handling and Command Line Arguments' },
      ],
    },
    {
      subtitle: 'Month 3: Introduction to Data Structures',
      subTopics: [
        { title: 'Week 1: Introduction to Data Structures and Arrays' },
        { title: 'Week 2: Linked Lists: Single and Double' },
        { title: 'Week 3: Stacks and Implementation' },
        { title: 'Week 4: Queues and Implementation' },
      ],
    },
    {
      subtitle: 'Month 4: Advanced Data Structures and Algorithms',
      subTopics: [
        { title: 'Week 1: Trees and Binary Trees' },
        { title: 'Week 2: Binary Search Trees and Operations' },
        { title: 'Week 3: Sorting Algorithms: Bubble, Selection, and Insertion Sort' },
        { title: 'Week 4: Searching Algorithms: Linear and Binary Search' },
      ],
    },
    {
      subtitle: 'Month 5: Projects and Advanced Topics',
      subTopics: [
        { title: 'Week 1: Library Management System Project' },
        { title: 'Week 2: Simple Text Editor Project' },
        { title: 'Week 3: Data Analysis Tool Project' },
        { title: 'Week 4: Final Assessment and Career Guidance' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 5-Month C Programming and DSA Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A beginner-friendly curriculum for mastering C programming language and essential data structures and algorithms.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default CProgrammingDsaCertification;