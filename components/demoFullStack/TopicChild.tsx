import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SubTopic {
  title: string;
}

interface Topic {
  subtitle: string;
  subTopics: SubTopic[];
}

interface AccordionProps {
  items: Topic[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <div className="w-full space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <button
            className="w-full flex justify-between items-center p-4 bg-gray-600 text-white text-left focus:outline-none font-semibold text-lg"
            onClick={() => toggleAccordion(index)}
          >
            <span>{item.subtitle}</span>
            <span>
              {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>
          {activeIndex === index && (
            <div className="bg-gray-50 p-6">
              <h4 className="text-lg font-bold text-blue-600 mb-4 text-center"></h4>
              <ul className="space-y-2">
                {item.subTopics.map((subTopic, subIndex) => (
                  <li
                    key={subIndex}
                    className="flex items-center text-gray-800 text-sm font-medium"
                  >
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {subTopic.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;