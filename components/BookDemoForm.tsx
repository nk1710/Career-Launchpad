import React, { useState } from 'react';

const BookDemoForm: React.FC = () => {

  const end_point = process.env.NEXT_PUBLIC_API_URL

  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    profession: '',
    state: '',
    course: 'all'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loadin
    // Replace with your backend API URL
    const apiUrl = `${end_point}/api/create/query/form`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission (e.g., show a success message, reset form, etc.)
        alert('class booked successfully!');
        setFormData({
          fullName: '',
          email: '',
          contactNumber: '',
          profession: '',
          state: '',
          course: ''
        });
      } else {
        // Handle errors (e.g., show an error message)
        alert('Failed to book class. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while booking the demo class. Please try again later.');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="lg:w-1/3 w-full bg-white p-6 rounded-lg shadow-lg mb-8 lg:mt-8 flex flex-col items-center justify-center mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Book Now</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          name="fullName"
          placeholder="Enter your name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Enter your mobile number"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          required
          pattern="^[6-9][0-9]{9}$"
          title="Mobile number must start with 6 and be 10 digits long"
        />
        <input
          type="text"
          name="profession"
          placeholder="Enter your profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="Enter your state"
          value={formData.state}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white w-full py-3 rounded-lg font-semibold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
};

export default BookDemoForm;
