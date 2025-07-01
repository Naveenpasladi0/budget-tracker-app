import React from 'react';
import Link from 'next/link';

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-10 sm:p-16 max-w-4xl text-center border border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
          Master Your Money with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
           Budget Tracker
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Effortlessly track your income, expenses, and savings goals. Gain clear insights into your financial health.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link href="/signup" className="btn-primary">
            Get Started
          </Link>
          <Link href="/demo" className="btn-secondary">
          View Demo
          </Link>
        </div>

        <p className="mt-14 text-sm text-gray-500 italic">
          &ldquo;The first step toward financial freedom is to track your spending.&rdquo;
        </p>
      </div>
    </div>
  );
}

export default HomePage;
