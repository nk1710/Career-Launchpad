import React from 'react';
import BookDemoForm from '../BookDemoForm';
import Image from '../Image';

const MernStackCourse: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8 bg-gray-50">
      <div className="lg:w-2/3 w-full">
        <div className="flex items-center space-x-2 mb-2">
       
          <Image
            src="/bg3.png" // replace with your logo path
              alt="Zoom"
            width={150}
            height={50}
            className="h-6"
            unoptimized
            priority={true}
          />

          
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
            Live Classes
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Best MERN Stack Course (Online Training With Certificate)
        </h1>
        <p className="text-gray-700 mb-6">
          MERN Stack is a combination of MongoDB, ExpressJS, ReactJS, and NodeJS, all of which are based on JavaScript. Since these technologies facilitate the development of dynamic, responsive, and appealing websites and web apps, companies all over India and globally need MERN Stack developers.
        </p>
        <p className="text-gray-700 mb-6">
          Enroll in the best MERN stack course online by WsCube Tech to become a master at it and explore high-paying job opportunities. It includes hands-on 15+ projects, pro certification, job assistance, regular training, and much more.
        </p>
        <p className="text-gray-700 mb-4">
          Book your demo class now to get started!
        </p>
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
            <span className="text-gray-600">(4.9)</span>
          </div>
          <span className="text-gray-500 ml-2">(1857 Reviews)</span>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
          Download Curriculum
        </button>
      </div>

      <BookDemoForm/>
    </div>
  );
};

export default MernStackCourse;
