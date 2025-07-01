import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '@/lib/firebase/auth';
import Link from 'next/link';
import Head from 'next/head';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password, fullName);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign up. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const floatingIcons = useMemo(() => {
    return Array.from({ length: 15 }).map((_, idx) => {
      const icons = ['wallet', 'attach_money', 'currency_rupee', 'euro'];
      const icon = icons[idx % icons.length];
      const zoneWidth = 100 / 15;
      const left = Math.floor(idx * zoneWidth + Math.random() * zoneWidth * 0.8);
      const delay = Math.random() * 10;
      const size = Math.random() * (2.5 - 1.5) + 1.5;

      return (
        <span
          key={idx}
          className="material-symbols-outlined ribbon-icon"
          style={{
            left: `${left}%`,
            top: '100vh',
            fontSize: `${size}rem`,
            animationDelay: `${delay}s`,
          }}
        >
          {icon}
        </span>
      );
    });
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
        <style>{`
          @keyframes floatUp {
            0% {
              transform: translateY(0);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              transform: translateY(-120vh);
              opacity: 0;
            }
          }
          .ribbon-icon {
            animation: floatUp 14s linear infinite;
            position: absolute;
            pointer-events: none;
            font-variation-settings:
              'FILL' 1,
              'wght' 600,
              'GRAD' 0,
              'opsz' 48;
            color: inherit;
          }
        `}</style>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">
        {/* Floating Icons */}
        <div className="absolute inset-0 z-0 pointer-events-none">{floatingIcons}</div>

        {/* Signup Card */}
        <div className="w-full max-w-2xl py-16 px-10 rounded-2xl bg-white shadow-2xl border border-gray-200 z-10 relative">
          <h2 className="text-3xl font-bold text-center text-gray-800">Create your account</h2>
          <p className="mt-2 text-sm text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Start tracking your learning today
          </p>
          <p className="mt-1 text-center text-base text-gray-600 font-medium">
            Take control of your finances — track spending, build savings, and budget smarter.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
              type="text"
              required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="mt-1 w-full px-4 py-3.5 border rounded-xl text-sm border-gray-300"
                />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-3.5 border rounded-xl text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3.5 border rounded-xl text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-1">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
