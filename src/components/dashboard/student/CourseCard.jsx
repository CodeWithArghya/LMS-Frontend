import React from 'react';
import { BookOpen } from 'lucide-react';

export default function CourseCard({ title, progress }) {
  return (
    <div className="bg-background-secondary p-4 rounded-lg flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
        <BookOpen className="w-8 h-8 text-violet-400" />
      </div>
      <div className="flex-1">
        <h4 className="text-white font-medium">{title}</h4>
        <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
          <div 
            className="bg-violet-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <span className="text-gray-400">{progress}%</span>
    </div>
  );
}