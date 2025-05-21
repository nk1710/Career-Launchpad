import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Layout from '../components/Layout';

const end_point = process.env.NEXT_PUBLIC_API_URL;

const CreatePayment: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('No authentication token found');
        return;
      }

      try {
        const response = await fetch(`${end_point}/api/counsellor/course/getlist`, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data.data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) {
      setError('Please select a course');
      return;
    }

    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('No authentication token found');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${end_point}/api/Encrypt`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourseId,
          amount: amount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate payment link');
      }

      const data = await response.json();
      // Link for live environment
      const link = `https://placementinstitute.com/payment/${data.encrypted}`;

      setGeneratedLink(link);
      setSuccess('Payment link generated successfully!');
    } catch (err) {
      setError('Failed to generate payment link');
    } finally {
      setLoading(false);
    }
  }, [selectedCourseId, amount]);

  const handleCopyLink = useCallback(() => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert('Link copied to clipboard!');
    }
  }, [generatedLink]);

  const renderCourses = useMemo(() => (
    courses.map((course: any) => (
      <option key={course.id} value={course.id}>
        {course.name}
      </option>
    ))
  ), [courses]);

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-6">Create Payment</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="course" className="block text-sm font-bold mb-2 text-gray-700">
            Course
          </label>
          <select
            id="course"
            value={selectedCourseId || ''}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select a course</option>
            {renderCourses}
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-bold mb-2 text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md font-bold hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && (
          <div className="mt-6">
            <p className="text-green-500 mb-2">{success}</p>
            {generatedLink && (
              <div>
                <p className="text-gray-700 mb-2">Generated Link:</p>
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                />
                <button
                  onClick={handleCopyLink}
                  className="w-full bg-green-500 text-white py-2 rounded-md font-bold hover:bg-green-600 transition"
                >
                  Copy Link
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </Layout>
  );
};

export default CreatePayment;