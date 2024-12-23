import { Link } from 'react-router-dom';
import { GraduationCap, School } from 'lucide-react';

export default function GetStarted() {
  return (
    <div className="bg-gray-900 min-h-screen pt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Choose Your Role
        </h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Student Card */}
          <div className="bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <GraduationCap className="w-32 h-32 mb-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Student</h2>
            <p className="text-gray-300 text-lg mb-8">
              If you are a student click here
            </p>
            <Link
              to="/student/signin"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          {/* Instructor Card */}
          <div className="bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <School className="w-32 h-32 mb-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Instructor</h2>
            <p className="text-gray-300 text-lg mb-8">
              If you are an Instructor click here
            </p>
            <Link
              to="/instructor/signin"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}