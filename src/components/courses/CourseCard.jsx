export default function CourseCard({ title, description, category, level }) {
  return (
    <div className="bg-background-secondary rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-violet-400 text-sm">{category}</span>
        <span className="bg-violet-600 text-white text-sm px-3 py-1 rounded-full">
          {level}
        </span>
      </div>
    </div>
  );
}