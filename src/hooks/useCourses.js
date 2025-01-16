import { useState, useEffect } from 'react';

export function useCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Load courses from localStorage on component mount
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now()
    };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  return {
    courses,
    addCourse
  };
}