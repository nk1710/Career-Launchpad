// pages/index.tsx
import Accordion from '../components/demoFullStack/TopicChild';

const AdvancedSqlCertification = () => {
 
  const topics = [
    {
      subtitle: 'Month 1: SQL Fundamentals Review and Advanced Queries',
      subTopics: [
        { title: 'Week 1: SQL Basics Review and Best Practices' },
        { title: 'Week 2: Advanced SELECT Statements and Filtering' },
        { title: 'Week 3: Joins: Inner, Outer, Cross, and Self Joins' },
        { title: 'Week 4: Subqueries and Common Table Expressions (CTEs)' },
      ],
    },
    {
      subtitle: 'Month 2: Database Design and Performance',
      subTopics: [
        { title: 'Week 1: Database Normalization and Table Design' },
        { title: 'Week 2: Indexes and Query Optimization' },
        { title: 'Week 3: Views, Stored Procedures, and Functions' },
        { title: 'Week 4: Transactions, Triggers, and Error Handling' },
      ],
    },
    {
      subtitle: 'Month 3: Advanced Topics and Projects',
      subTopics: [
        { title: 'Week 1: Window Functions and Advanced Aggregations' },
        { title: 'Week 2: Analytical Functions and Data Analysis' },
        { title: 'Week 3: E-commerce Database Project' },
        { title: 'Week 4: HR Management Database Project and Final Assessment' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You&apos;ll Learn in the 3-Month Advanced SQL Certification
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        A straightforward curriculum for mastering advanced SQL techniques with practical database projects.
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default AdvancedSqlCertification;