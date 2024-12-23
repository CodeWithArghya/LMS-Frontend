import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">EduHub</h3>
            <p className="mb-4">Transform your learning journey with our innovative platform.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-purple-400"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-purple-400"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-purple-400"><FaLinkedin size={24} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="hover:text-purple-400">Courses</Link></li>
              <li><Link to="/about" className="hover:text-purple-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400">Blog</a></li>
              <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <p>Email: support@eduhub.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} EduHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}