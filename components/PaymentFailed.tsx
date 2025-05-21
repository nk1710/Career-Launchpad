import React from 'react';

const PaymentFailure: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-gray-700 mb-6">Unfortunately, your transaction could not be completed.</p>
        <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
