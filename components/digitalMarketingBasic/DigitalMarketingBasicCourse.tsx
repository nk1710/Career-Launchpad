import React, { useState } from 'react';
import Image from '../Image';
import PaymentForm from '../PaymentFormOld';

const DigitalMarketingBasicCourse: React.FC = () => {

  const [showForm, setShowForm] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string>('1')
  const [price, setSelectedPrice] = useState<number>(1)

  const handleOpenForm = (courseId: string, price : number) => {
    setSelectedCourseId(courseId)
    setSelectedPrice(price)
    setShowForm(true)
  }

  const handleCloseForm = () => setShowForm(false)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
      {/* Navigation Links */}
      <div className="flex justify-center space-x-6 text-sm text-gray-600 font-medium">
        <a href="#" className="hover:text-blue-500">Exclusive Offer</a>
        <a href="#" className="text-blue-500 border-b-2 border-blue-500">Course Detail</a>
        <a href="#" className="hover:text-blue-500">Course Curriculum</a>
        <a href="#" className="hover:text-blue-500">Features</a>
        <a href="#" className="hover:text-blue-500">Reviews</a>
        <a href="#" className="hover:text-blue-500">FAQs</a>
      </div>

      {/* Course Details Section */}
     
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
            <div className="text-blue-500 text-4xl mb-2">
              <Image
              src="/students-img.png"
              height={24}
              width={24}
              alt='image'
              />
            </div>
            <div className="text-lg font-bold">150K+</div>
            <div className="text-gray-500">Learners Trained</div>
          </div>
          <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
            <div className="text-blue-500 text-4xl mb-2">
            <Image
              src="/review.png"
              height={24}
              width={24}
              alt='image'
              />
            </div>
            <div className="text-lg font-bold">4.8</div>
            <div className="text-gray-500">700+ Google Reviews</div>
          </div>
          <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
            <div className="text-blue-500 text-4xl mb-2">
            <Image
              src="/live-broadcast.png"
              height={24}
              width={24}
              alt='image'
              />
            </div>
            <div className="text-lg font-bold">4 Months</div>
            <div className="text-gray-500">Live Training</div>
          </div>
        </div>

        <div className="mt-8 lg:grid-cols-2 gap-8">
        {/* Pricing Section */}
        <div className="p-6 border rounded-lg text-center bg-gray-50">
          <div className="text-gray-600 font-medium">Exclusive Offer</div>
          <div className="text-3xl text-green-500 font-bold my-4"></div>
          <div className="text-gray-500">(including GST)</div>
          <div className="line-through text-gray-400 text-sm"></div>
          <button 
           onClick={() => handleOpenForm('2',4999)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
            Buy Now
          </button>
          {showForm && 
      <PaymentForm 
      onClose={handleCloseForm}
      courseId={selectedCourseId}
      price={price}
      />
      }
          <div className="mt-2 text-xs text-gray-500">
            No Cost EMI options available. Experience our demo class for just Rs. 499/- (refundable). Register now!
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingBasicCourse;
