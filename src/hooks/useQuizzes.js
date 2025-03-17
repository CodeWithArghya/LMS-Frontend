import { useState, useEffect } from 'react';

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    // Load quizzes from localStorage on component mount
    const savedQuizzes = localStorage.getItem('quizzes');
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes));
    }

    // Load quiz attempts from localStorage
    const savedAttempts = localStorage.getItem('quizAttempts');
    if (savedAttempts) {
      setAttempts(JSON.parse(savedAttempts));
    }
  }, []);

  const addQuiz = (quiz) => {
    const updatedQuizzes = [...quizzes, quiz];
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  const updateQuiz = (updatedQuiz) => {
    const updatedQuizzes = quizzes.map(quiz => 
      quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    );
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  const deleteQuiz = (id) => {
    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== id);
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  const publishQuiz = (id, publishStatus) => {
    const updatedQuizzes = quizzes.map(quiz => 
      quiz.id === id ? { ...quiz, published: publishStatus } : quiz
    );
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  const getQuizById = (id) => {
    return quizzes.find(quiz => quiz.id === id);
  };

  const getPublishedQuizzes = () => {
    return quizzes.filter(quiz => quiz.published);
  };

  const submitQuizAttempt = (attempt) => {
    const updatedAttempts = [attempt, ...attempts];
    setAttempts(updatedAttempts);
    localStorage.setItem('quizAttempts', JSON.stringify(updatedAttempts));
  };

  const getQuizAttempts = () => {
    return attempts;
  };

  return {
    quizzes,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    publishQuiz,
    getQuizById,
    getPublishedQuizzes,
    submitQuizAttempt,
    getQuizAttempts
  };
}