import Head from 'next/head';
import Link from 'next/link';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: '5 Simple Tips to Start Budgeting Today',
      date: 'June 1, 2025',
      summary:
        'Learn how to take the first step toward better financial control with these practical budgeting tips anyone can start using immediately.',
      slug: '#',
    },
    {
      id: 2,
      title: 'Top 10 Expense Categories You Should Track',
      date: 'May 24, 2025',
      summary:
        'Understanding where your money goes is the key to cutting down on unnecessary spending. Here are the top categories to monitor.',
      slug: '#',
    },
    {
      id: 3,
      title: 'How to Build an Emergency Fund from Scratch',
      date: 'May 17, 2025',
      summary:
        'Unexpected expenses can ruin your plans. This post guides you through creating an emergency fund even if you’re living paycheck to paycheck.',
      slug: '#',
    },
    {
      id: 4,
      title: 'Manual vs Automated Budget Tracking: Pros & Cons',
      date: 'May 10, 2025',
      summary:
        'Should you stick to spreadsheets or use tools like Budget Tracker? Let’s compare both methods to help you choose the right one.',
      slug: '#',
    },
    {
      id: 5,
      title: 'How to Set Financial Goals That Actually Stick',
      date: 'May 2, 2025',
      summary:
        'Many people set goals, but few follow through. Discover how to set SMART financial goals that keep you motivated long term.',
      slug: '#',
    },
  ];

  return (
    <>
      <Head>
        <title>Blog - Budget Tracker</title>
      </Head>
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-indigo-600 mb-8">Our Blog</h1>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <p className="text-gray-700 mb-3">{post.summary}</p>
                <Link
                  href={post.slug}
                  className="text-indigo-600 hover:underline text-sm font-medium"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
