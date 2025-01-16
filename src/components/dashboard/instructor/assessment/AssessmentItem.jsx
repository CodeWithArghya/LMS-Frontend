export default function AssessmentItem({ assessment, onToggle }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
      <input
        type="checkbox"
        checked={assessment.completed}
        onChange={() => onToggle(assessment.id)}
        className="w-5 h-5 rounded border-gray-500 text-violet-600 focus:ring-violet-500"
      />
      <span className={`text-white flex-1 ${assessment.completed ? 'line-through text-gray-400' : ''}`}>
        {assessment.text}
      </span>
    </div>
  );
}