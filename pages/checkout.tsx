import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { motion } from "framer-motion";
import {
  CreditCard,
  User,
  Calendar,
  Lock,
  Check,
  BarChart4,
} from 'lucide-react'
import Layout from '../components/Layout'

// Define a type for the payment method
type PaymentMethod = 'card' | 'upi';

// Interface for payment information
interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  bankName: string;
  IFSCCode: string;
  paymentMethod: PaymentMethod;
}

const CheckoutPage = () => {
  const router = useRouter()
  const { course, duration, price, studentName, email } = router.query
  // const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '0704104000119986',
    cardHolder: 'KAJAL RAJPUT',
    bankName: 'IDBI Bank',
    IFSCCode: 'IBKL0000704',
    paymentMethod: 'card', // 'card' or 'upi'
  })

  // Format price with commas and currency symbol
  const formattedPrice = price
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(Number(price))
    : '₹0'

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setPaymentInfo({ ...paymentInfo, [name]: value })
  // }
  
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentInfo({ ...paymentInfo, paymentMethod: method })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // setIsLoading(true)
    setPaymentError(null)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful payment
      setPaymentStatus('success')

      // In a real implementation, you would call your payment API here
      // const response = await fetch('/api/process-payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     amount: price,
      //     course,
      //     email,
      //     paymentInfo
      //   })
      // });
      // const result = await response.json();
      // if (!response.ok) throw new Error(result.error);
      // setPaymentStatus('success');
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentError(
        error instanceof Error ? error.message : 'Payment processing failed. Please try again.'
      )
      setPaymentStatus('error')
    } finally {
      // setIsLoading(false)
    }
  }

  // If no query params are available yet, show loading
  if (!router.isReady) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-60 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 w-full max-w-md bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <NextSeo
        title={`Checkout - ${course || 'Course'} | Career Launchpad`}
        description="Complete your payment to enroll in the course"
      />

      <div className="bg-gradient-to-b from-gray-200 to-white py-10">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <h1 className="text-4xl font-bold text-center  mb-8">
            Complete Your Enrollment
          </h1>
        

          {paymentStatus === 'success' ? (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Payment Successful!
              </h2>
              <p className="text-gray-700 mb-6">
                Thank you for enrolling in our course. Your payment has been
                processed successfully. You will receive a confirmation email
                shortly.
              </p>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
              {/* Order Summary */}
              <div className="lg:w-2/5">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                  <h2 className="text-xl font-bold border-b pb-4 mb-4 flex items-center">
                    <BarChart4 className="mr-2 text-blue-600" size={20} />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-gray-600">Course:</span>
                      <span className="font-medium break-words">
                        {course || 'N/A'}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="break-words">{duration || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-gray-600">Student:</span>
                      <span className="break-words">
                        {studentName || 'N/A'}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-sm break-all">
                        {email || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>{formattedPrice}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg border-t border-dashed mt-2 pt-2">
                      <span>Total:</span>
                      <span className="text-blue-600">
                        {price
                          ? `₹${Math.round(Number(price)).toLocaleString(
                              'en-IN'
                            )}`
                          : '₹0'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 p-4 rounded-md flex items-start">
                    <div className="text-blue-500 mt-1 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-blue-700">
                      Upon successful payment, you will receive access to your
                      course materials and a confirmation email with further
                      instructions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="lg:w-3/5">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold mb-8 text-center md:text-left">
                    Payment Details
                  </h2>
                
                  <h3 className="text-yellow-900 italic text-center bg-green-50">
                  You can pay via account details or QR code—whatever suits you! <br /> Done with the payment? Just snap a screenshot and send it over to our WhatsApp <br />
                    <span className="text-blue-700">
                      {' '}
                      <strong>(+91 6388992862)</strong>{' '}
                    </span>{' '}
                  </h3>

                  {paymentError && (
                    <div
                      className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg"
                      role="alert"
                    >
                      <p className="font-bold">Payment Failed</p>
                      <p>{paymentError}</p>
                    </div>
                  )}

                  <div className="px-4 py-2 sm:px-6 sm:py-4">
                    <div className="flex w-full max-w-md mx-auto shadow-sm rounded-xl overflow-hidden">
                      <button
                        className={`px-3 py-2 w-1/2 text-center transition-all duration-300 ${
                          paymentInfo.paymentMethod === 'card'
                            ? 'bg-blue-600 text-white font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => handlePaymentMethodChange('card')}
                      >
                        Credit/Debit Card
                      </button>
                      <button
                        className={`px-3 py-2 w-1/2 text-center transition-all duration-300 ${
                          paymentInfo.paymentMethod === 'upi'
                            ? 'bg-blue-600 text-white font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => handlePaymentMethodChange('upi')}
                      >
                        UPI Payment
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {paymentInfo.paymentMethod === 'card' ? (
                     <div className="space-y-6">
                     {/* Card Number */}
                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                       <label className="text-gray-700 text-sm font-medium">Card Number</label>
                       <div className="relative w-full sm:w-2/3">
                         <div className="w-full rounded-xl px-4 py-4 pl-12 bg-gray-100">
                          4843720**********
                         </div>
                         <CreditCard className="absolute left-4 top-4 text-blue-500" size={20} />
                       </div>
                     </div>
                   
                     {/* Card Holder Name */}
                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                       <label className="text-gray-700 text-sm font-medium">Card Holder Name</label>
                       <div className="relative w-full sm:w-2/3">
                         <div className="w-full rounded-xl px-4 py-4 pl-12 bg-gray-100">
                           Nikhil Singh
                         </div>
                         <User className="absolute left-4 top-4 text-blue-500" size={20} />
                       </div>
                     </div>
                   
                     {/* Bank Name */}
                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                       <label className="text-gray-700 text-sm font-medium">Bank Name</label>
                       <div className="relative w-full sm:w-2/3">
                         <div className="w-full rounded-xl px-4 py-4 pl-12 bg-gray-100">
                           IDBI Bank
                         </div>
                         <Calendar className="absolute left-4 top-4 text-blue-500" size={20} />
                       </div>
                     </div>
                   
                     {/* IFSC Code */}
                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                       <label className="text-gray-700 text-sm font-medium">IFSC Code</label>
                       <div className="relative w-full sm:w-2/3">
                         <div className="w-full rounded-xl px-4 py-4 pl-12 bg-gray-100">
                           IB******
                         </div>
                         <Lock className="absolute left-4 top-4 text-blue-500" size={20} />
                       </div>
                     </div>
                   </div>
                   
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center">
                          <label className="block text-gray-700  text-sm font-medium mb-4 ">
                            Scan QR Code to Pay
                          </label>
                          <div className="flex justify-center items-center">
                            <div className="w-64 h-70 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden shadow-lg p-2 border-4 border-blue-100">
                            <Image
                              src="/barcode.jpeg"
                              alt="UPI Barcode"
                              width={256}
                              height={256}
                              className="object-cover w-full h-full"
                            />
                            </div>
                          </div>

                          {/* <div className="relative">
                            <input
                              type="text"
                              name="upiId"
                              placeholder="7534077170@ptaxis"
                              className="w-full border border-gray-300 rounded-md px-4 py-3"
                              value={paymentInfo.upiId}
                              onChange={handleInputChange}
                              required
                            />
                          </div> 
                          <p className="text-sm text-gray-500 mt-1">
                            Enter your UPI ID (e.g., yourname@okicici,
                            yourname@ybl)
                          </p>*/}
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                          <p className="text-sm text-yellow-800">
                            You will receive a payment request on your UPI app
                            after proceeding.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* <div className="mt-6">
                      <div className="mb-4 flex items-center">
                        <input
                          type="checkbox"
                          id="terms"
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          required
                        />
                        <label
                          htmlFor="terms"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          I agree to the terms and conditions and privacy policy
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition duration-200 flex items-center justify-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          `Pay ${
                            price
                              ? `₹${Math.round(Number(price)).toLocaleString(
                                  'en-IN'
                                )}`
                              : ''
                          }`
                        )}
                      </button>
                    </div> */}
                  </form>
                
                  <div className="mt-8">
                    <div className="flex justify-center mb-4">
                      <p className="text-sm text-gray-500">
                        Secured Payment By
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                    <Image src="/visa.png" alt="Visa" width={32} height={32} className="h-8" />
                    <Image src="/mastercard.png" alt="Mastercard" width={32} height={32} className="h-8" />
                    <Image src="/rupay.png" alt="RuPay" width={32} height={32} className="h-8" />
                    <Image src="/upi.png" alt="UPI" width={32} height={32} className="h-8" />
                    </div>
                    <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                      <Lock size={14} className="mr-1" />
                      <span>Payments are secure and encrypted</span>
                    </div>
                      <div className="bg-green-50 mt-5 py-2 overflow-hidden whitespace-nowrap border border-green-100">
      <motion.div
        className="text-sm font-small text-gray-800 flex"
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration:10, ease: "linear" }} // Slower speed
      >
        {[...Array(5)].map((_, i) => (
        <span key={i} className="mr-5 italic">
           We will manually verify your transaction once submitted. Keep Patience, If Urgent, contact Us (+91 6388992862).
        </span>
         ))}
      </motion.div>
    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                  <p className="text-gray-600 mb-4">
                    If you have any questions or need assistance with your
                    payment, please contact our support team.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                    <a
                      href="tel:+916388992862"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <strong>+91 6388992862</strong>
                    </a>
                    <a
                      href="mailto:info@placementinstitute.com"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <strong>info@placementinstitute.com</strong>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CheckoutPage