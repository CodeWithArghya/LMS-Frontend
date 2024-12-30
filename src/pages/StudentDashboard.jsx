import React, { useState } from 'react';
import { Award } from 'lucide-react';
import Sidebar from '../components/dashboard/student/Sidebar';
import StatCard from '../components/dashboard/student/StatCard';
import CourseCard from '../components/dashboard/student/CourseCard';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { icon: Award, value: '29', label: 'COURSES TO DO' },
    { icon: Award, value: '6', label: 'OVERDUE COURSES' },
    { icon: Award, value: '1', label: 'COMPLETED COURSES' }
  ];

  const rewards = [1, 2, 3, 4, 5];

  const courses = [
    { title: 'Basics of HTML', progress: 75 },
    { title: 'Angular in steps', progress: 45 },
    { title: 'Bootstrap Foundation', progress: 30 }
  ];

  return (
    <div className="min-h-screen bg-background-primary flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Rewards Section */}
        <div className="bg-background-secondary p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-xl">REWARDS</h3>
            <button className="text-violet-400 hover:text-violet-300">VIEW ALL</button>
          </div>
          <div className="flex space-x-4">
            {rewards.map((_, index) => (
              <div key={index} className="w-12 h-12 rounded-full bg-violet-700 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-background-secondary p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-xl">COURSES</h3>
            <button className="text-violet-400 hover:text-violet-300">VIEW ALL</button>
          </div>
          <div className="space-y-4">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}