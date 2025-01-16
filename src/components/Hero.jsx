import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="bg-gray-900 text-white pt-20 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto px-4">
          Transform Your Learning Journey with EduHub
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto px-4 leading-relaxed">
          Discover a new way of learning with our innovative platform. Access
          world-class courses, expert instructors, and a supportive community.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link
            to="/get-started"
            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-lg text-lg md:text-xl font-semibold hover:opacity-90 transition-opacity inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
