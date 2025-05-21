import React from 'react';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your payment. Your transaction was successful.</p>
        <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
