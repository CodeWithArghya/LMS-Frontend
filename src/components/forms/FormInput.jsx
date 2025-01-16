export default function FormInput({ 
  label, 
  type = "text", 
  id, 
  placeholder,
  ...props
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm md:text-base placeholder-gray-400"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}