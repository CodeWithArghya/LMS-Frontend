import { Link } from 'react-router-dom';
import { School, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-gradient-to-r from-purple-800 to-indigo-900'
    }`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <School className="w-7 h-7 md:w-8 md:h-8 text-white" />
            <span className="text-xl md:text-2xl font-bold text-white">EduHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-white hover:text-purple-200 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('goals')} 
              className="text-white hover:text-purple-200 transition-colors"
            >
              Goals
            </button>
            <button 
              onClick={() => scrollToSection('feedback')} 
              className="text-white hover:text-purple-200 transition-colors"
            >
              Feedback
            </button>
            <Link 
              to="/get-started" 
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button - Now on the right */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-64 opacity-100 visible mt-4' 
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="flex flex-col space-y-4 py-4">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-purple-200 text-left px-2 py-1"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('goals')}
              className="text-white hover:text-purple-200 text-left px-2 py-1"
            >
              Goals
            </button>
            <button 
              onClick={() => scrollToSection('feedback')}
              className="text-white hover:text-purple-200 text-left px-2 py-1"
            >
              Feedback
            </button>
            <Link 
              to="/get-started" 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}