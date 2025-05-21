import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const end_point = process.env.NEXT_PUBLIC_API_URL; // Match with your Next.js environment variable

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${end_point}/api/counsellor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token; // Adjust according to your API response structure

      // Store the token in local storage
      localStorage.setItem('authToken', token);

      // On successful login, redirect to home page
      router.push('/counsellor-create-link');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    if (email && password) {
      const formElement = document.getElementById('login-form');
      formElement?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-brown-700">
          Hey! <br /> Join now
        </h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-brown-700 text-sm font-bold mb-2"
            >
              User Name
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-brown-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brown-700 text-white py-3 rounded-md font-bold hover:bg-brown-800 transition"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleLoginClick}
            className="text-brown-700 font-bold border-b-2 border-brown-700 pb-1"
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
