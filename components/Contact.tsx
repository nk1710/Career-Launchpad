import { FC, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ContactForm: FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailId: '',
    query: '',
  });

  // Validation errors state
  const [errors, setErrors] = useState({
    fullName: '',
    contactNumber: '',
    emailId: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {
      fullName: '',
      contactNumber: '',
      emailId: '',
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!formData.contactNumber.trim() || !/^[6-9][0-9]{9}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Valid Contact Number is required';
      isValid = false;
    }
    if (!formData.emailId.trim() || !/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post(`/api/users/user-queries`, formData);
      Swal.fire({
        title: 'Success!',
        text: 'Form submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setFormData({ fullName: '', contactNumber: '', emailId: '', query: '' });
    } catch (error) {
      console.error('Error submitting form', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue submitting the form. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 p-6 rounded-xl shadow-xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send Us a Message</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-gray-700 font-medium text-sm">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 ${
              errors.fullName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            } focus:border-transparent transition duration-200 outline-none`}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 ${
                errors.contactNumber ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              } focus:border-transparent transition duration-200 outline-none`}
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              pattern="^[6-9][0-9]{9}$"
              title="Mobile number must start with 6-9 and be 10 digits long"
            />
            {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
          </div>
          
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 ${
                errors.emailId ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              } focus:border-transparent transition duration-200 outline-none`}
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            {errors.emailId && <p className="text-red-500 text-xs mt-1">{errors.emailId}</p>}
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="block text-gray-700 font-medium text-sm">
            Your Query <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-transparent transition duration-200 outline-none"
            name="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Please describe your query in detail (up to 250 characters)"
            rows={4}
          />
        </div>
        
        <div className="pt-3">
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-md"
            type="submit"
          >
            Submit Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;