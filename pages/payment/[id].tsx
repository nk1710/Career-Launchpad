// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// // import Layout from '../components/Layout';
// import PaymentForm from '../../components/PaymentForm';

// const PaymentPage: React.FC = () => {
//   const router = useRouter();
//   const { id } = router.query; // Get 'id' from URL query parameters
//   const end_point = process.env.NEXT_PUBLIC_API_URL;

//   const [showForm, setShowForm] = useState(true);
//   const [selectedCourseId, setSelectedCourseId] = useState<string>('1');
//   const [price, setSelectedPrice] = useState<number>(1);

//   useEffect(() => {
//     let isMounted = true; // Track if the component is mounted

//     const getDecryption = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!id || typeof id !== 'string') {
//           console.error('Invalid parameter');
//           return;
//         }
//         const response = await fetch(`${end_point}/api/Decrypt?encryptedData=${id}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `${token}`, // Ensure the token format is correct
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const data = await response.json();

//         if (isMounted) { // Only update state if the component is still mounted
//           setSelectedPrice(data.amount);
//           setSelectedCourseId(data.courseId);
//         }
//       } catch (error) {
//         console.error('Error fetching decryption data:', error);
//       }
//     };

//     getDecryption();

//     return () => {
//       isMounted = false; // Cleanup on unmount
//     };
//   }, [id, end_point]);

//   const handleCloseForm = () => setShowForm(false);

//   return (
//     // <Layout>
//       <div className="flex flex-col mt-10 justify-center bg-white p-4">
//         <div className="p-8">
//           {showForm && (
//             <PaymentForm
//               onClose={handleCloseForm}
//               courseId={selectedCourseId}
//               price={price}
//             />
//           )}
//         </div>
//       </div>
//     // </Layout>
//   );
// };

// export default PaymentPage;

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PaymentForm from '../../components/PaymentForm'

const PaymentPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const end_point = process.env.NEXT_PUBLIC_API_URL

  const [showForm, setShowForm] = useState(true)
  const [selectedCourseId, setSelectedCourseId] = useState<string>('1')
  const [price, setSelectedPrice] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const getDecryption = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!id || typeof id !== 'string') {
          setError('Invalid parameter')
          return
        }
        const response = await fetch(
          `${end_point}/api/Decrypt?encryptedData=${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()

        if (isMounted) {
          setSelectedPrice(data.amount)
          setSelectedCourseId(data.courseId)
        }
      } catch (error) {
        setError('Error fetching decryption data')
        console.error('Error fetching decryption data:', error)
      }
    }

    getDecryption()

    return () => {
      isMounted = false
    }
  }, [id, end_point])

  const handleCloseForm = () => setShowForm(false)

  return (
    <div className="flex flex-col mt-10 justify-center bg-white p-4">
      <div className="p-8">
        {error && <p className="text-red-500">{error}</p>}
        {showForm && (
          <PaymentForm
            onClose={handleCloseForm}
            courseId={selectedCourseId}
            price={price}
          />
        )}
      </div>
    </div>
  )
}

export default PaymentPage
