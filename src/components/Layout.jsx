import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const showFooter = !location.pathname.includes('dashboard');

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {isHomePage && <Navbar />}
      <main className={`flex-grow w-full max-w-[2000px] mx-auto ${isHomePage ? 'pt-16' : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}