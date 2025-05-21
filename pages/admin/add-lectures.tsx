import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';

type CourseOption = {
  courseId: string;
  courseName: string;
  duration: string;
};

const AddCoursePage = () => {
  const [form, setForm] = useState({
    courseId: '',
    title: '',
    url: '',
    month: '',
  });
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/admin/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/admin/add-course', {
        ...form,
        month: parseInt(form.month, 10),
      });
      setMessage({ text: 'Course video assigned successfully!', type: 'success' });
      setForm({ courseId: '', title: '', url: '', month: '' });
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Failed to assign course video', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-blue-50 min-h-screen p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-md shadow-sm">
            <div className="bg-blue-100 px-4 py-3 border-b border-blue-200">
              <h1 className="text-xl font-medium text-blue-800">Assign Course Video</h1>
            </div>

            {message.text && (
              <div className={`px-4 py-2 text-sm ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Course</label>
                  <select
                    name="courseId"
                    value={form.courseId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.courseId} value={course.courseId}>
                        {course.courseName} ({course.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Month</label>
                  <select
                    name="month"
                    value={form.month}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select month</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                      <option key={month} value={month}>Month {month}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Video Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter video title"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Video URL</label>
                <input
                  type="url"
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/video"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setForm({ courseId: '', title: '', url: '', month: '' })}
                  className="px-4 py-2 text-sm border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-70"
                >
                  {isLoading ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCoursePage;