import { useState, useCallback } from 'react';
import Image from '../components/Image';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const PaymentForm = dynamic(() => import('../components/PaymentFormOld'), { ssr: false });

const About: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('1');
  const [price, setSelectedPrice] = useState<number>(12999);

  const handleOpenForm = useCallback((courseId: string, price: number) => {
    setSelectedCourseId(courseId);
    setSelectedPrice(price);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => setShowForm(false), []);

  return (
    <Layout>
      <NextSeo
        title="Career Launchpad - best-app-dsa"
        description="Welcome to Career Launchpad, your source for online skill development our programs."
        openGraph={{
          title: 'Career Launchpad - best-courses',
          description: 'Welcome to Career Launchpad, your source for online skill development our programs.',
          images: [
            {
              url: 'https://placementinstitute.com/bg3.png',
              width: 800,
              height: 600,
              alt: 'Career Launchpad courses',
            },
          ],
        }}
      />

      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-8">
        <div className="bg-gray-300 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-center text-white py-6 bg-gray-600">
            Full Stack Development
          </h1>
          <div className="flex flex-col md:flex-row items-center p-8 bg-white">
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
              <Image
                src="/full.png"
                alt="Full Stack Development"
                className="max-w-full h-auto"
                width={600}
                height={600}
              />
            </div>
            <div className="w-full md:w-1/2 text-left md:pl-8">
              <p className="text-gray-700 text-base mb-6">
                A flexible software engineer skilled in both frontend and backend
                development is known as a full-stack developer. They are capable of handling
                all aspects of a web application, including database management, server
                administration, and user interface (UI). A Full Stack Developer is qualified to
                work with the whole spectrum of technologies utilized in a web application,
                which is referred to as “full stack” technology.
              </p>

              <button
                onClick={() => handleOpenForm('1', 12999)}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <PaymentForm
          onClose={handleCloseForm}
          courseId={selectedCourseId}
          price={price}
        />
      )}

      <div className="p-8">
        <button
          onClick={() => handleOpenForm('1', 12999)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Buy Now
        </button>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-8">Uses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Developing Whole Stack End-to-End Solutions',
                text: 'Complete web apps may be created by developers from beginning to end. They are capable of designing and implementing the application\'s front end and back end, making sure that every component functions as a whole.'
              },
              {
                title: 'Startup Environments',
                text: 'Due to their ability to manage several facets of development, Full Stack Developers are extremely important in startups and small businesses. Their adaptability enables entrepreneurs to develop and grow their products effectively without requiring a sizable workforce.'
              },
              {
                title: 'Full Stack Project Management',
                text: 'Because they are well-versed in the interplay of many technologies, developers are ideal for positions involving project management. They may manage the front-end and back-end teams’ collaboration, supervise the development process, and make sure the project is completed on schedule.'
              },
              {
                title: 'Updating and Maintenance',
                text: 'After an application is live, Full Stack Developers are crucial for continuing updates and maintenance. They are able to integrate new features, fix problems with the entire stack, and make sure the application stays current with changing customer demands and technological advancements.'
              },
              {
                title: 'Consulting and Freelance',
                text: 'A lot of Full Stack Developers provide their knowledge to a variety of clients by working as consultants or independent contractors. Their wide range of abilities enables them to take on a variety of tasks and adjust to various technological specifications.'
              }
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-center text-4xl font-bold text-gray-900 mb-8">Salary & Growth</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Salary</h3>
                <p className="text-gray-700">
                  Complete Stack In the United States, average yearly pay for developers vary from $70,000 to $120,000, dependent on expertise and geographic area. These are competitive salaries for developers. Even higher compensation may be demanded for senior positions or those in significant IT centers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth</h3>
                <p className="text-gray-700">
                  The necessity for adaptable experts who can manage a variety of web development facets is fueling the robust and ongoing demand for Full Stack Developers. There are several options for professional growth in this field, including Lead Developer, Technical Architect, and Engineering Manager roles. Prospects for growth can be further enhanced by embracing new technology and continuing to learn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            <strong>Career Launchpad</strong> offers a comprehensive Full Stack Development course designed to equip you with the skills needed to excel in today’s competitive tech industry. This full-time program covers both frontend and backend development, ensuring you gain a well-rounded understanding of how web applications are built from the ground up.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The course curriculum includes essential technologies like <strong>HTML, CSS, JavaScript, React, Node.js,</strong> and <strong>MySQL</strong>. You’ll learn to create dynamic, responsive user interfaces and robust server-side applications, all under the guidance of instructors with real-world corporate experience. This hands-on approach ensures that you not only understand the theory but also how to apply it in practical, real-world scenarios.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            In addition to live online sessions, Career Launchpad provides recorded lectures, allowing you to review and reinforce your learning at your own pace. The course also includes projects from the very first month, culminating in a major project that demonstrates your expertise. Upon completion, you’ll receive an internship certificate, validating your skills and enhancing your job prospects.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The course is designed to fit around your schedule, with flexible timings available. Whether you’re looking to start a new career or advance your current role, the Full Stack Development program at Career Launchpad provides the comprehensive education and practical experience needed to succeed.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;