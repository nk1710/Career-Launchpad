import React from 'react';
import Image from '../Image';

const CeoThoughts: React.FC = () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 bg-white p-8 rounded-lg shadow-lg">
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
      
         <Image
              src="/bg2.png"
              alt="Kushagra Bhatia" 
              className="w-48 h-48 object-contain"
              width={48}
              height={48}
              unoptimized
              priority={true}
            />
      </div>
      <div className="w-full md:w-2/3 text-center md:text-left mt-6 md:mt-0">
        <h1 className="text-2xl font-bold text-black mb-4">
          {"It's time for you to future-proof your career"}
        </h1>
        <p className="text-gray-600">
          “We know that we are influencing the foundations of your future, and we take this responsibility very seriously. With WsCube Tech, I ensure that you always get top-class training backed by practical projects and future prospects. Wishing you a successful & future-proof career!”
        </p>
        <p className="mt-4 text-gray-800 font-semibold">
          — Ceo, Founder, Career Launchpad      </p>
      </div>
    </div>
  );
};

export default CeoThoughts;
