import { Link } from 'react-router-dom';

export default function RoleCard({ icon: Icon, title, description, linkTo }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
      <Icon className="w-24 h-24 md:w-32 md:h-32 mb-6 text-purple-400" />
      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-4">{title}</h2>
      <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8">
        {description}
      </p>
      <Link
        to={linkTo}
        className="w-full md:w-auto inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
      >
        Get Started
      </Link>
    </div>
  );
}