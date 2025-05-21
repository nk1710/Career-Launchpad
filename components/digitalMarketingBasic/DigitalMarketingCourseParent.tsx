// pages/index.tsx
import Accordion from '../demoFullStack/TopicChild';

const DigitalMarketingCourseParent = () => {
  const topics = [
    {
      title: 'Part I: Introduction to Digital Marketing',
      subtitle: 'Introduction',
      subTopics: [
        { title: 'What is Digital Marketing?' },
        { title: 'Importance of Digital Marketing' },
        { title: 'Digital Marketing Platforms and Strategies' },
        { title: 'Understanding the Digital Marketing Funnel' },
      ],
    },
  
    {
      title: 'Part III: Search Engine Optimization (SEO)',
      subtitle: 'SEO',
      subTopics: [
        { title: 'Understanding Search Engines' },
        { title: 'Keyword Research' },
        { title: 'On-Page SEO' },
        { title: 'Off-Page SEO' },
        { title: 'Technical SEO' },
        { title: 'SEO Tools and Techniques' },
        { title: 'SEO Best Practices' },
      ],
    },
    {
      title: 'Part IV: Social Media Marketing',
      subtitle: 'Social Media',
      subTopics: [
        { title: 'Introduction to Social Media Marketing' },
        { title: 'Facebook Marketing' },
        { title: 'Instagram Marketing' },
        { title: 'LinkedIn Marketing' },
        { title: 'Twitter Marketing' },
        { title: 'Social Media Content Planning' },
        { title: 'Social Media Advertising' },
        { title: 'Analytics and Reporting' },
      ],
    },
    {
      title: 'Part V: Content Marketing',
      subtitle: 'Content Marketing',
      subTopics: [
        { title: 'Introduction to Content Marketing' },
        { title: 'Content Creation & Strategy' },
        { title: 'Blogging for Business' },
        { title: 'Creating Engaging Content' },
        { title: 'Content Promotion' },
        { title: 'Measuring Content Effectiveness' },
      ],
    },
    {
      title: 'Part VI: Email Marketing',
      subtitle: 'Email Marketing',
      subTopics: [
        { title: 'Introduction to Email Marketing' },
        { title: 'Building an Email List' },
        { title: 'Creating Effective Email Campaigns' },
        { title: 'Email Automation' },
        { title: 'Email Marketing Tools' },
        { title: 'Measuring Email Marketing Success' },
      ],
    },
    {
      title: 'Part VII: Paid Advertising (PPC)',
      subtitle: 'PPC',
      subTopics: [
        { title: 'Introduction to PPC' },
        { title: 'Google Ads Basics' },
        { title: 'Creating Effective PPC Campaigns' },
        { title: 'Keyword Bidding Strategies' },
        { title: 'Google Display Network' },
        { title: 'Remarketing Strategies' },
        { title: 'Measuring PPC Performance' },
      ],
    },
    {
      title: 'Part VIII: Analytics and Reporting',
      subtitle: 'Analytics',
      subTopics: [
        { title: 'Introduction to Web Analytics' },
        { title: 'Google Analytics Setup' },
        { title: 'Understanding Key Metrics' },
        { title: 'Creating Reports' },
        { title: 'Data-Driven Decision Making' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      {/* First H1: Big in Black */}
      <h1 className="text-4xl font-extrabold text-black text-center mb-8">
        What You’ll Learn in Digital Marketing Basic Course? (Latest Syllabus)
      </h1>

      {/* Second H1: Smaller */}
      <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
        Well-structured & comprehensive curriculum designed according to latest trends and industry standards!
      </h1>

      <Accordion items={topics} />
    </div>
  );
};

export default DigitalMarketingCourseParent;
