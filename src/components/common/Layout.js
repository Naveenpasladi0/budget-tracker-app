import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading state
  const router = useRouter();

  const checkLogin = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLogin();
    window.addEventListener('storage', checkLogin);
    router.events?.on('routeChangeComplete', checkLogin);

    return () => {
      window.removeEventListener('storage', checkLogin);
      router.events?.off('routeChangeComplete', checkLogin);
    };
  }, []);

  const handleDashboardClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  if (isLoggedIn === null) return null; // Delay render until we know auth state

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition">
            Budget Tracker
          </Link>

          <nav className="flex space-x-6 text-sm font-medium text-gray-600">
            <Link href="/about" className="px-4 py-2 rounded hover:bg-indigo-100 hover:text-indigo-600 transition">
              About Us
            </Link>

            <Link href="/blog" className="px-4 py-2 rounded hover:bg-indigo-100 hover:text-indigo-600 transition">
              Blog
            </Link>

            <Link href="/contact" className="px-4 py-2 rounded hover:bg-indigo-100 hover:text-indigo-600 transition">
              Contact Us
            </Link>

            <button
              onClick={handleDashboardClick}
              className="px-4 py-2 rounded hover:bg-indigo-100 hover:text-indigo-600 transition"
            >
              Dashboard
            </button>

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded text-red-500 hover:bg-red-100 hover:text-red-600 transition"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white border-t border-gray-200 text-center text-sm text-gray-500 py-6">
        &copy; {new Date().getFullYear()}{' '}
        <span className="text-indigo-600 font-semibold">Budget Tracker</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
