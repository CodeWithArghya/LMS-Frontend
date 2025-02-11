import React from "react";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import Sidebar from "../../components/dashboard/student/Sidebar";

function CourseCard({ title, instructor, duration, level, image }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">Instructor: {instructor}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-purple-400">{duration}</span>
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full">
            {level}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  // Sample course data
  const courses = [
    {
      title: "Introduction to Web Development",
      instructor: "John Doe",
      duration: "8 weeks",
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Advanced JavaScript Concepts",
      instructor: "Jane Smith",
      duration: "10 weeks",
      level: "Advanced",
      image:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Python for Data Science",
      instructor: "Mike Johnson",
      duration: "12 weeks",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "UI/UX Design Fundamentals",
      instructor: "Sarah Wilson",
      duration: "6 weeks",
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Mobile App Development",
      instructor: "Alex Brown",
      duration: "14 weeks",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Machine Learning Basics",
      instructor: "Emily Chen",
      duration: "16 weeks",
      level: "Advanced",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardNavbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Available Courses
            </h1>
            <p className="text-gray-400">
              Explore our wide range of courses and start learning today
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            />
            <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white">
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
