import Head from 'next/head';

export default function About() {
  const journey = [
    {
      year: '2020',
      title: 'Idea was Born',
      description:
        'In 2020, the idea for Budget Tracker was born from a personal need to track daily expenses. It started as a side project with a simple spreadsheet.',
      image: 'https://media.licdn.com/dms/image/v2/C5612AQFkVlHLz4M2dQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520132017671?e=2147483647&v=beta&t=CcnOMbw3PcZ8-I4b62ZXwLa-d6zA46YqxpgWPnEtNBU',
    },
    {
      year: '2021',
      title: 'Prototype Launch',
      description:
        'We developed a basic web app prototype and tested it with friends and family. Feedback was overwhelming and encouraging.',
      image: 'https://www.oneinc.com/hubfs/Imported_Blog_Media/Blockchain%20Blog%20Header-1.jpg',
    },
    {
      year: '2022',
      title: 'Going Public',
      description:
        'In 2022, Budget Tracker was officially launched to the public with core features like daily logging, reports, and account syncing.',
      image: 'https://static.vecteezy.com/system/resources/previews/023/659/747/non_2x/successful-businessman-earning-investment-profit-rich-man-with-wealth-early-retirement-financial-independence-concept-happy-rich-businessman-lying-singing-on-pile-of-coins-and-banknotes-vector.jpg',
    },
    {
      year: '2023',
      title: 'Mobile Optimization & Growth',
      description:
        'We focused on making the app mobile-first and saw over 10,000 new users. Customer support and user feedback were enhanced significantly.',
      image: 'https://images.squarespace-cdn.com/content/v1/6347d87215451023fa1fa2fd/d4ee70e6-19dd-49d8-8640-804461e908b9/ASO+success+image.png',
    },
    {
      year: '2024',
      title: 'Smart Budgeting with AI',
      description:
        'We introduced AI-driven recommendations, smart category tracking, and monthly insights, helping users save more efficiently.',
      image: 'https://duetmoney.com/images/blog/ai-budgeting.svg',
    },
    {
      year: '2025',
      title: 'Community & Expansion',
      description:
        'Now in 2025, Budget Tracker is home to a community of 50,000+ users. We’re expanding globally and adding features based on community-driven suggestions.',
      image: 'https://nasscom.in/ai/nasscom-ai-community/images/networking-1.jpg',
    },
  ];

  return (
    <>
      <Head>
        <title>About Us - Budget Tracker</title>
      </Head>
      <div className="bg-white min-h-screen text-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-indigo-600 mb-6">About Us</h1>
          <p className="text-lg mb-8 leading-relaxed">
            Budget Tracker is a powerful, easy-to-use tool designed to help individuals manage their personal
            finances with confidence. Our mission is to empower users to take control of their financial health
            through daily tracking, smart insights, and simple tools that work across devices.
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Journey</h2>
            <div className="space-y-12">
              {journey.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6`}
                >
                  <div className="md:w-1/2">
                    <img
                      src={item.image}
                      alt={`${item.year} - ${item.title}`}
                      className="rounded-lg shadow-md w-full object-cover h-64"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold text-indigo-500">{item.year}</h3>
                    <h4 className="text-lg font-semibold mt-1 mb-2">{item.title}</h4>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
