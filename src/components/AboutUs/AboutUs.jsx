import StatCard from './StatCard';
import { FaBook, FaUsers, FaAward } from 'react-icons/fa';

export default function AboutUs() {
  const stats = [
    {
      icon: <FaBook className="text-purple-500" />,
      number: "1000+",
      label: "Courses"
    },
    {
      icon: <FaUsers className="text-pink-500" />,
      number: "50k+",
      label: "Students"
    },
    {
      icon: <FaAward className="text-yellow-500" />,
      number: "200+",
      label: "Instructors"
    }
  ];

  return (
    <div className="bg-gray-800 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">About Us</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              We're a modern learning platform dedicated to making education accessible and engaging. Our platform brings together passionate instructors and eager students in an interactive learning environment.
            </p>
            
            <div className="grid grid-cols-3 gap-8 mt-12">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  number={stat.number}
                  label={stat.label}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-30 blur-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
              alt="Students learning together"
              className="relative rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}