import '@/styles/globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import Layout from '@/components/common/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </AuthProvider>
  );
}

export default MyApp;
