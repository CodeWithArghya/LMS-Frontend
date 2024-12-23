export default function FormInput({ 
  label, 
  type = "text", 
  id, 
  placeholder 
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        placeholder={placeholder}
      />
    </div>
  );
}