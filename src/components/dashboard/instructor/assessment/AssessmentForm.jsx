import { useState } from 'react';

export default function AssessmentForm({ onSubmit }) {
  const [assessment, setAssessment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assessment.trim()) return;
    onSubmit(assessment);
    setAssessment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={assessment}
          onChange={(e) => setAssessment(e.target.value)}
          placeholder="Add new assessment..."
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Add Assessment
        </button>
      </div>
    </form>
  );
}