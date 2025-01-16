import { useState, useEffect } from 'react';

export function useAssessments() {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const savedAssessments = localStorage.getItem('assessments');
    if (savedAssessments) {
      setAssessments(JSON.parse(savedAssessments));
    }
  }, []);

  const addAssessment = (text) => {
    const newAssessment = {
      id: Date.now(),
      text,
      completed: false
    };
    const updatedAssessments = [...assessments, newAssessment];
    setAssessments(updatedAssessments);
    localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
  };

  const toggleAssessment = (id) => {
    const updatedAssessments = assessments.map(assessment =>
      assessment.id === id ? { ...assessment, completed: !assessment.completed } : assessment
    );
    setAssessments(updatedAssessments);
    localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
  };

  const removeCompleted = () => {
    const updatedAssessments = assessments.filter(assessment => !assessment.completed);
    setAssessments(updatedAssessments);
    localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
  };

  return {
    assessments,
    addAssessment,
    toggleAssessment,
    removeCompleted
  };
}