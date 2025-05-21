
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
    {
      question: "What is Career Launchpad?",
      answer: "Career Launchpad is an online learning platform offering a variety of programs, including Full Stack Development and Digital Marketing, designed to help you acquire in-demand skills at your own pace.",
    },
    {
      question: "How do I enroll in a program?",
      answer: "To enroll in a program, simply visit our website, select the program you're interested in, and follow the registration and payment instructions.",
    },
    {
      question: "What types of programs are available on Career Launchpad?",
      answer: "We offer a wide range of programs, including Full Stack Development, and Digital Marketing designed to help you succeed in the digital economy.",
    },
    {
      question: "Are the programs live or pre-recorded?",
      answer: "Our programs include both live sessions and pre-recorded lectures, allowing you to learn at your own pace while also engaging with instructors in real time.",
    },
    {
      question: "Do you offer certificates upon program completion?",
      answer: "Yes, upon successful completion of a program, you will receive a certificate from Career Launchpad.",
    },
    {
      question: "Is there any support available if I have questions during the program?",
      answer: "Yes, we offer doubt sessions on alternate days where you can ask questions and receive guidance from our instructors.",
    },
    {
      question: "What is the cost of the programs?",
      answer: "Our programs are economically priced to make quality education accessible to everyone. Prices vary depending on the program you choose.",
    },
    {
      question: "What are the technical requirements to take a program?",
      answer: "You'll need a reliable internet connection, a computer or tablet, and basic software such as a web browser and PDF reader to access program materials.",
    },
    {
      question: "How do I contact support if I have issues with my account or program?",
      answer: "You can contact our support team via email or through the support section on our website for any assistance you need.",
    },
    {
      question: "How does Career Launchpad make sure that learning is not impeded by cost?",
      answer: "We make sure that your learning path is never impeded by money by offering our programs at reasonable costs.",
    },
    {
      question: "How can I contact/connect to clear my doubts?",
      answer: "We organize live doubt sessions every alternate day. If you need special attention, we can also arrange one-on-one doubt-clearing sessions.",
    },
    {
      question: "How do I access the program materials?",
      answer: "Once you enroll in a program, you'll gain access to all program materials, including notes, live sessions, and recorded lectures, through your account on our platform.",
    },
  ];
  

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-5">
      <h2 className="text-3xl font-bold text-center mb-8 hover:bg-gray-700 hover:text-white hover:rounded-3xl hover:py-5">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
            <button
              className="w-full text-left p-4 bg-gray-100 focus:outline-none hover:bg-gray-700 hover:text-white hover:scale-105"
              onClick={() => toggleFAQ(index)}
            >
              <div className='flex flex-wrap justify-between'>
              <span className="text-xl font-semibold">{faq.question}</span>
              {activeIndex === index ? (
                    <span className="text-xl font-semibold">{'-'}</span>
            ) :  (
                <span className="text-xl font-semibold">{'+'}</span>
            )}
              
              </div>

            </button>
            {activeIndex === index && (
              <div className="p-4 text-gray-700 hover:bg-gray-600 hover:text-white">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
