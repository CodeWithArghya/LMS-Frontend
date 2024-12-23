import { Link } from 'react-router-dom';
import { School, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <School className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white">EduHub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-white hover:text-purple-200"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('goals')} 
            className="text-white hover:text-purple-200"
          >
            Goals
          </button>
          <button 
            onClick={() => scrollToSection('feedback')} 
            className="text-white hover:text-purple-200"
          >
            Feedback
          </button>
          <Link to="/get-started" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-purple-800 to-indigo-900 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-purple-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-purple-200 text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('goals')}
              className="text-white hover:text-purple-200 text-left"
            >
              Goals
            </button>
            <button 
              onClick={() => scrollToSection('feedback')}
              className="text-white hover:text-purple-200 text-left"
            >
              Feedback
            </button>
            <Link 
              to="/get-started" 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}