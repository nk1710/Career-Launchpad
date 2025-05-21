

// components/PaymentForm.tsx
import React, { useState, useEffect } from 'react';
import { load } from '@cashfreepayments/cashfree-js';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';


interface FormData {
  name: string;
  mobile: string;
  email: string;
  price : number;
}

interface PaymentFormProps {
  onClose: () => void;
  // onSubmit: (data: any) => void;
  courseId: string;
  price : number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onClose, courseId ,price}) => {
  const end_point = process.env.NEXT_PUBLIC_API_URL
 const router = useRouter()

  // const [orderId, setOrderId] = useState<string | null>(null);
  // const [sessionId, setSessionId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({ name: '', mobile: '', email: '' , price : price });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cashfree, setCashfree] = useState<any>(null);

  useEffect(() => {
    const initializeSDK = async () => {
      const cashfreeInstance = await load({ mode: 'production' });
      setCashfree(cashfreeInstance);
    };

    initializeSDK();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${end_point}/api/course/purchase/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, courseId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const { order_id, payment_session_id } = result?.data || {};

      if (order_id && payment_session_id && cashfree) {
        // setOrderId(order_id);
        // setSessionId(payment_session_id);

        const checkoutOptions = {
          paymentSessionId: payment_session_id,
          redirectTarget: '_modal',
        };

        cashfree.checkout(checkoutOptions).then(() => {
          // console.log('Payment initiated:', res);
          //verify payment 
          verifyPayment(order_id);

        }).catch((error: any) => {
          console.error('Payment initiation failed:', error);
        });
      } else {
        throw new Error('Missing order ID or payment session ID');
      }

      // onSubmit(result);
      onClose();
    } catch (error) {
      setError('Failed to submit form');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (order_id : any)=>{
      try{
        const response = await fetch(`${end_point}/api/course/verify/${order_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, courseId }),
        });
  
        if (!response.ok) {
          // throw new Error('Network response was not ok');
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue submitting the form. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return
        } else if(response.ok){
        router.push('/payment-success');
        }
        // setPaymentStatus('success');
    } catch (error) {
      console.error('Payment verification failed:', error);
      router.push('/payment-failure');
      // setPaymentStatus('failed');
    }
  };

  

  return (
    <>
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
    <h2 className="text-xl font-bold mb-4">Payment Details</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mobile" className="block text-gray-700">Mobile</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
          pattern="^[6-9][0-9]{9}$"
          title="Mobile number must start with 6 and be 10 digits long"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          title="Please enter a valid email address"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex justify-between">
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
    </>
  );
};

export default PaymentForm;
