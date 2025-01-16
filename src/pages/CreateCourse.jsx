import React from 'react';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import CreateCourseForm from '../components/courses/CreateCourseForm';

export default function CreateCourse() {
  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      <DashboardNavbar />
      <div className="flex-1 p-4 md:p-8 mt-24">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Create New Course</h1>
        <CreateCourseForm />
      </div>
    </div>
  );
}