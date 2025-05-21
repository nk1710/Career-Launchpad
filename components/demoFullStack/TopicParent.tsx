// pages/index.tsx
import Accordion from './TopicChild';

const Parent = () => {
  const topics = [
    {
      title : 'Part- I: HTML, CSS, JavaScript, jQuery, Tailwind CSS',  
      subtitle: 'HTML',
      subTopics: [
        { title: 'HTML Editors' },
        { title: 'HTML Elements' },
        { title: 'HTML Links' },
        { title: 'HTML Attributes' },
        { title: 'HTML Paragraphs' },
        { title: 'HTML Formatting' },
        { title: 'HTML Blocks' },
        { title: 'HTML ID' },
        { title: 'HTML Basics' },
        { title: 'HTML Images' },
        { title: 'HTML Lists' },
        { title: 'HTML Headings' },
        { title: 'HTML Styles' },
        { title: 'HTML Comments' },
        { title: 'HTML Classes' },
      ],
    },
    {
      title: ' Part II CSS',
      subtitle:'CSS',
      subTopics: [
        { title: 'CSS Syntax' },
        { title: 'CSS Selectors' },
        { title: 'CSS Colors' },
        { title: 'CSS Backgrounds' },
        { title: 'CSS Borders' },
        { title: 'CSS Margins' },
        { title: 'CSS Padding' },
        { title: 'CSS Height/Width' },
        // More subtopics
      ],
    },
    {
      title: 'part III JavaScript',
      subtitle:'JavaScript',
      subTopics: [
        { title: 'JavaScript Introduction' },
        { title: 'JavaScript Variables' },
        { title: 'JavaScript Operators' },
        { title: 'JavaScript Functions' },
        { title: 'JavaScript Events' },
        // More subtopics
      ],
    },
    {
      title: 'part IV React',
      subtitle: 'React',
      subTopics: [
        { title: 'React Components' },
        { title: 'React State' },
        { title: 'React Props' },
        { title: 'React Lifecycle' },
        { title: 'React Hooks' },
        // More subtopics
      ],
    },
    // Add more topics as needed
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
    <div className="max-w-4xl mx-auto mt-10 p-4">
  {/* First H1: Big in Black */}
  <h1 className="text-4xl font-extrabold text-black text-center mb-8">
    What You’ll Learn in MERN Stack Course Online? (Latest Syllabus)
  </h1>

  {/* Second H1: Smaller */}
  <h1 className="text-xl font-medium text-gray-700 text-center mb-6">
    Well-structured & comprehensive curriculum designed according to latest trends and industry standards!
  </h1>

  {/* Third H1: Small in Custom Green */}
</div>

      <Accordion items={topics} />

    </div>
  );
};

export default Parent;
