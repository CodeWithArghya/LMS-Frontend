export default function AmPmToggle({ value, onChange }) {
  return (
    <div className="flex rounded-lg overflow-hidden">
      {['AM', 'PM'].map((period) => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            value === period
              ? 'bg-violet-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}