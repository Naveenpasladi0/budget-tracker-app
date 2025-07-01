import React from 'react';
import Link from 'next/link';

function DemoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-12">
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Watch 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Budget Tracker </span>
          in Action
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-10">
          A quick walkthrough of how to manage your income, expenses, and savings with ease.
        </p>

        {/* Embedded YouTube video */}
        <div className="w-full aspect-video mb-10 rounded-xl overflow-hidden shadow-lg border border-gray-300">
          <iframe
            src="https://www.youtube.com/embed/KYDpxoBwil8?si=B32TnnzGMBgRrLfS"
            title="Budget Tracker Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default DemoPage;
