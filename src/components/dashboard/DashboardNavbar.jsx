import { Link } from 'react-router-dom';
import { School, Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-gradient-to-r from-purple-800 to-indigo-900'
    }`}>
      <div className="max-w-[2000px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <School className="w-7 h-7 md:w-8 md:h-8 text-white" />
            <span className="text-xl md:text-2xl font-bold text-white">EduHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-purple-200 transition-colors"
            >
              Home
            </Link>
            <button 
              className="text-white hover:text-purple-200 transition-colors flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm">
            <div className="px-4 py-3 space-y-3">
              <Link 
                to="/" 
                className="block text-white hover:text-purple-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <button 
                className="w-full text-left text-white hover:text-purple-200 flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}