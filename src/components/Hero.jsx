import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="bg-gray-900 text-white pt-40 pb-32">
      <div className="container mx-auto px-8 text-center">
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto">
          Transform Your Learning Journey with EduHub
        </h1>
        <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover a new way of learning with our innovative platform. Access world-class courses, 
          expert instructors, and a supportive community.
        </p>
        <Link
          to="/get-started"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-lg text-xl font-semibold hover:opacity-90 transition-opacity inline-block"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}