import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Head from 'next/head';

const Image = dynamic(() => import('../components/Image'));

interface FormData {
  fullName: string;
  contactNumber: string;
  email: string;
  course: string;
}

const SpeakToCounselor: React.FC = () => {
  const end_point = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    contactNumber: '',
    email: '',
    course: '',
  });

  const [errors, setErrors] = useState<Record<keyof FormData, string>>({
    fullName: '',
    contactNumber: '',
    email: '',
    course: '',
  });

  const validate = (): boolean => {
    const newErrors = { ...errors };
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
        const response = await fetch(`${end_point}/api/create/counselor/form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert('Details submitted successfully!'); // Using native alert to reduce dependency
          setFormData({
            fullName: '',
            contactNumber: '',
            email: '',
            course: '',
          });
        } else {
          alert('Submission failed. Please try again.'); // Using native alert to reduce dependency
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Submission failed. Please try again.'); // Using native alert to reduce dependency
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row bg-gradient-to-r from-green-100 to-green-300 py-8 px-4 lg:px-12 rounded-2xl shadow-xl overflow-hidden">
        <Head>
          <title>Career Launchpad - Speak to Our Counselor</title>
          <meta name="description" content="Welcome to Career Launchpad, your source for online skill development our programs." />
          <meta property="og:title" content="Career Launchpad - Speak to Our Counselor" />
          <meta property="og:description" content="Welcome to Career Launchpad, your source for online skill development our programs." />
          <meta property="og:image" content="https://placementinstitute.com/bg3.png" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="600" />
          <meta property="og:url" content="https://placementinstitute.com/speakToOurCounselor" />
        </Head>
        <div className="w-full lg:w-1/2 flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Speak To Our Counselor</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                required
              />
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="contactNumber" className="block text-lg font-semibold text-gray-700">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                required
                pattern="^[6-9][0-9]{9}$"
                title="Mobile number must start with 6 and be 10 digits long"
              />
              {errors.contactNumber && <p className="text-red-600 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email Id</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                required
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="course" className="block text-lg font-semibold text-gray-700">Select Your Course</label>
              <select
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                required
              >
                <option value="">Select</option>
                <option value="course1">Full Stack Development</option>
                <option value="course2">Digital Marketing</option>
              </select>
              {errors.course && <p className="text-red-600 text-sm mt-1">{errors.course}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition-colors transform hover:scale-105 text-lg"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:pl-6 lg:mt-0">
          <Image
            src="/Counselor.png"
            alt="Counselor"
            width={600}
            height={700}
            className="rounded-lg shadow-lg max-w-full h-auto object-cover transition-transform transform hover:scale-105"
          />
        </div>
      </div>
    </Layout>
  );
};

export default SpeakToCounselor;
