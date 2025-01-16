import { useState } from 'react';

export default function TimeInput({ value, onChange, max, min, placeholder }) {
  const handleChange = (e) => {
    let newValue = e.target.value.replace(/\D/g, '');
    
    if (newValue) {
      const numValue = parseInt(newValue, 10);
      if (numValue > max) newValue = max.toString();
      if (numValue < min) newValue = min.toString();
    }
    
    onChange(newValue);
  };

  const handleBlur = () => {
    if (value) {
      onChange(value.padStart(2, '0'));
    }
  };

  return (
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className="w-[4.5rem] px-2 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-violet-500 focus:border-transparent 
                text-white text-center text-lg appearance-none"
      min={min}
      max={max}
    />
  );
}