

import React from 'react';
import Link from 'next/link';

interface SuccessPageProps {
  message: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-800">Payment Successful!</h1>
        <p className="mt-4 text-green-600">{message}</p>
        <p className="mt-2 text-gray-700">
          Your username and password have been sent to your given email. Please check your email, log in to the LMS dashboard, and access your course. Thank you!
        </p>
        <div className="mt-6">
          <Link 
          href="/"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {/* <a className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"> */}
              Go to Dashboard
            {/* </a> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
