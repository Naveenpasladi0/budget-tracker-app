import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for redirection
import { auth } from '@/lib/firebase/auth'; // Your Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase SDK function

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To display auth errors
  const [loading, setLoading] = useState(false); // To show loading state during login
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Set loading true
    try {
      // Actual Firebase login call
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully!');
      // Redirect user on successful login to the dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err.message); // Display Firebase error message
      console.error("Login Error:", err);
    } finally {
      setLoading(false); // Set loading false after attempt
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;