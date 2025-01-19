import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">
              LearnWithFun
            </h3>
            <p className="mb-4 text-sm md:text-base">
              Transform your learning journey with our innovative platform.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="hover:text-purple-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link
                  to="/courses"
                  className="hover:text-purple-400 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-purple-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-purple-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-sm md:text-base mb-2">
              Email: eduhublmsofficials@gmail.com
            </p>
            <p className="text-sm md:text-base">Phone: (XX) XXXXXXX </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm md:text-base">
          <p>
            &copy; {new Date().getFullYear()} Learn With Fun. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
