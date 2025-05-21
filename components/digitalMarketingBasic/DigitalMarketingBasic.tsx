import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ReactTyped } from 'react-typed';

const GlobalButtons = dynamic(() => import('../GlobalButtons'));
const PaymentForm = dynamic(() => import('../PaymentForm'));
const Image = dynamic(() => import('../Image'));

const DigitalMarketingBasic: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('1');
  const [price, setSelectedPrice] = useState<number>(1);

  const handleOpenForm = (courseId: string, price: number) => {
    setSelectedCourseId(courseId);
    setSelectedPrice(price);
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center py-8 px-20 gap-4 bg-white">
        <div className="lg:w-2/3 w-full">
          <h1 className="text-4xl text-blue-600 font-bold mb-4">
            <ReactTyped
              strings={["Best Digital Marketing Basic Course (Online Training With Certificate)"]}
              typeSpeed={100}
              backSpeed={50}
            />
          </h1>
        </div>
      </div>
      <div className="bg-gray-50 w-full flex items-center justify-center py-12">
        <div className="bg-gray-200 rounded-lg shadow-lg w-full max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-white py-6 bg-gradient-to-r from-blue-500 to-blue-700">
            Digital Marketing (Basic)
          </h2>
          <div className="flex flex-col md:flex-row items-center p-8 bg-white">
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
              {/* Optimized image with Next.js Image component */}
              <Image
                src="/DM Basic.jpg"
                alt="Digital Marketing Basic"
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 text-left md:pl-8">
              <p className="text-gray-700 text-base mt-12 mb-4 leading-relaxed">
                Digital Marketing Basic is an essential course for anyone looking to understand and excel in the world of online marketing. This course provides a comprehensive introduction to digital marketing strategies and tools that can help you build a successful online presence.
              </p>
              <p className="text-gray-700 text-base mb-4 leading-relaxed">
                Enroll in the top-rated Digital Marketing Basic course online with WsCube Tech to gain foundational skills and explore lucrative career opportunities in the digital space. The course includes practical training, hands-on projects, certification, and job assistance, making it an excellent choice for beginners looking to start their journey in digital marketing.
              </p>
              <p className="text-gray-700 mb-4">
                Book your demo class now to take the next step in your digital marketing career!
              </p>
              <div className='grid justify-center'>
                <GlobalButtons />
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-green-600 mr-2">
                  
                  </span>
                  <button onClick={() => handleOpenForm('4', 12499)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Buy Now
                  </button>
                  {showForm && (
                    <PaymentForm
                      onClose={handleCloseForm}
                      courseId={selectedCourseId}
                      price={price}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalMarketingBasic;