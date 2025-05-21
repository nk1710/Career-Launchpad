// components/SignUpForm.tsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SignUpForm: React.FC = () => {
  const end_point = process.env.NEXT_PUBLIC_API_URL
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    dateOfBirth: '',
    course: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    dateOfBirth: '',
    course: '',
  });

  const validate = () => {
    const newErrors = {
      fullName: '',
      contactNumber: '',
      email: '',
      dateOfBirth: '',
      course: '',
    };

    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required.';
      isValid = false;
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact Number is required.';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
      isValid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required.';
      isValid = false;
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    
    event.preventDefault();

    if (validate()) {
      try {
        const response = await fetch(`${end_point}/api/create/query/form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Query submitted successfully!',
          });

          setFormData({
            fullName: '',
            contactNumber: '',
            email: '',
            dateOfBirth: '',
            course: '',
          });
        } else {
         
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Sign Up Failed. Please try again.',
          });
        }
      } catch (error) {
        // console.error('Error submitting form:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Sign Up Failed. Please try again.',
        });
      }
    }
  };

  return (
    <div className="md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Query form!</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Contact Number *</label>
          <input
            type="text"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            pattern="^[6-9][0-9]{9}$"
            title="Mobile number must start with 6 and be 10 digits long"
          />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Email Id *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Date Of Birth *</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Select Your Course *</label>
          <select
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="course1">Full Stack Development</option>
            <option value="course2">Digital Marketing</option>
            {/* Add more options as needed */}
          </select>
          {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
