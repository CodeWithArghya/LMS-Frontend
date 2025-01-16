import React from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Sidebar from '../../components/dashboard/instructor/Sidebar';
import CourseCard from '../../components/courses/CourseCard';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';

export default function CoursesPage() {
  const navigate = useNavigate();
  const { courses } = useCourses();

  return (
    <div className="min-h-screen bg-background-primary">
      <DashboardNavbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">My Courses</h1>
            <button
              onClick={() => navigate('/instructor/create-course')}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}